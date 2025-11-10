import React from 'react';
// eslint-disable-next-line import/order
import ReactDOM from 'react-dom/client';
import 'react-loading-skeleton/dist/skeleton.css';

import './app/styles/index.css';
import { ToastContainer } from 'react-toastify';

import { QueryProvider } from './app/providers/query-provider/ui';
import { StoreProvider } from './app/providers/store-provider/ui';
import { Main } from './app/ui';

import { CacheProvider } from '@/app/providers/cache-provier/ui';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <CacheProvider>
        <QueryProvider>
          <Main />
          <ToastContainer />
        </QueryProvider>
      </CacheProvider>
    </StoreProvider>
  </React.StrictMode>
);
