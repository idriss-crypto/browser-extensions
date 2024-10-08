import {
  BrowserClient,
  createTransport,
  defaultStackParser,
  Scope,
  extraErrorDataIntegration,
  makeFetchTransport,
  getDefaultIntegrations,
} from '@sentry/browser';
import { ReactNode, createContext, useContext, useMemo } from 'react';

import { SendToSentryCommand } from './commands';

const OBJ_DEPTH = 10;

type SentryExecutionEnvironment = 'injected-app' | 'service-worker';

const integrations = getDefaultIntegrations({}).filter((defaultIntegration) => {
  return !['BrowserApiErrors', 'Breadcrumbs', 'GlobalHandlers'].includes(
    defaultIntegration.name,
  );
});

const NETWORK_ERRORS_DUE_TO_ABORTED_REQUEST = [
  'TypeError: Failed to fetch',
  'TypeError: NetworkError when attempting to fetch resource.',
];

// Old version and new version in compat mode of MooTools framework is overriding Function.prototype.bind which causes React and other libraries throw runtime error
const RUNTIME_ERRORS_DUE_TO_MOOTOOLS_FRAMEWORK = [
  "TypeError: Cannot read properties of undefined (reading 'lastRenderedReducer')",
  'TypeError: c is not a function',
];

const createClient = (executionEnvironment: SentryExecutionEnvironment) => {
  return new BrowserClient({
    dsn: process.env.SENTRY_DSN,
    enabled: process.env.SENTRY_ENVIRONMENT === 'production',
    ignoreErrors: [
      ...NETWORK_ERRORS_DUE_TO_ABORTED_REQUEST,
      ...RUNTIME_ERRORS_DUE_TO_MOOTOOLS_FRAMEWORK,
    ],
    transport:
      executionEnvironment === 'service-worker'
        ? makeFetchTransport
        : (options) => {
            return createTransport(options, async (request) => {
              const command = new SendToSentryCommand({
                url: options.url,
                body: request.body,
                headers: options.headers,
                fetchOptions: options.fetchOptions,
              });

              const { status, headers } = await command.send();

              return {
                statusCode: status,
                headers,
              };
            });
          },
    stackParser: defaultStackParser,
    environment: process.env.SENTRY_ENVIRONMENT,
    integrations: [
      ...integrations,
      extraErrorDataIntegration({ depth: OBJ_DEPTH }),
    ],

    tracesSampleRate: 0.1,
    normalizeDepth: OBJ_DEPTH + 1,
  });
};

export const createObservabilityScope = (
  executionEnvironment: SentryExecutionEnvironment,
) => {
  const client = createClient(executionEnvironment);
  const scope = new Scope();
  scope.setClient(client);

  scope.setContext('Environment', { execution: executionEnvironment });

  client.init();

  return scope;
};

// TODO: figure out interface which is not coupled with Sentry
export type ObservabilityScope = Scope;

type ObservabilityScopeContextValue = ObservabilityScope;
const ObservabilityScopeContext = createContext<
  ObservabilityScopeContextValue | undefined
>(undefined);

export const useObservabilityScope = () => {
  const context = useContext(ObservabilityScopeContext);
  if (!context) {
    throw new Error('Expected WithObservabilityScope');
  }

  return context;
};

interface Properties {
  children: ReactNode;
}
export const WithObservabilityScope = ({ children }: Properties) => {
  const scope = useMemo(() => {
    return createObservabilityScope('injected-app');
  }, []);

  return (
    <ObservabilityScopeContext.Provider value={scope}>
      {children}
    </ObservabilityScopeContext.Provider>
  );
};
