import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import { type ICacheProviderProps } from './cache-provider.types';

import { persistor } from '@/app/store';

export const CacheProvider: React.FC<ICacheProviderProps> = ({ children }) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};
