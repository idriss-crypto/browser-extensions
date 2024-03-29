import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useMemo } from 'react';

interface Properties {
  children: React.ReactNode;
  onError: (meta: unknown) => void;
}

export const WithQueryClient = ({ children, onError }: Properties) => {
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: { retry: false, staleTime: Number.POSITIVE_INFINITY },
        mutations: { retry: false },
      },
      queryCache: new QueryCache({
        onError: (error, query) => {
          onError({ queryKey: query.queryKey, queryError: query.state.error, error });
        },
      }),
      mutationCache: new MutationCache({
        onError: (error, variables) => {
          const { signer: _signer, ...variablesWithoutSigner } =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            variables as any;
          onError({ variablesWithoutSigner, error });
        },
      }),
    });
  }, [onError]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
