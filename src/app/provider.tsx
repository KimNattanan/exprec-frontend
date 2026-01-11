'use client'

import { MainErrorFallback } from "@/components/errors/main";
import { queryConfig } from "@/lib/react-query";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

type AppProviderProps = {
  children: React.ReactNode
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
        queryCache: new QueryCache({
          onError: (error, query) => {
            if(error.message === 'Unauthorized' && window.location.pathname !== '/') {
              window.location.href = '/';
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, query) => {
            if(error.message === 'Unauthorized' && window.location.pathname !== '/') {
              window.location.href = '/';
            }
          },
        }),
      }),
  );

  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  )
};