import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useMemo } from 'react';

interface Properties {
  children: React.ReactNode;
  onError: (error: Error, variables: unknown) => void;
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
          onError(error, { queryKey: query.queryKey });
        },
      }),
      mutationCache: new MutationCache({
        onError: (error, variables) => {
          onError(error, variables);
        },
      }),
    });
  }, [onError]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
