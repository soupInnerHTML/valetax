'use client';

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { persistQueryClient } from '@tanstack/query-persist-client-core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { type IQueryProvider } from './query-provider.types';

export const QueryProvider: React.FC<IQueryProvider> = ({ children }) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient();

    client.getQueryCache().subscribe(event => {
      if (event.type === 'updated') {
        const query = event.query;
        const state = query.state;

        if (state.status === 'error') {
          const cachedData = client.getQueryData(query.queryKey);
          const message =
            state.error instanceof Error ? state.error.message : 'Unknown error';

          if (cachedData) {
            toast.warning(`${message}. Used data from cache`);
          } else {
            toast.error(message);
          }
        }
      }
    });

    return client;
  });

  const persister = createAsyncStoragePersister({
    storage: window.localStorage,
  });

  persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 5,
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
