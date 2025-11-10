import React from 'react';
import { Provider } from 'react-redux';

import { type IStoreProviderProps } from './store-provider.types';

import { store } from '@/app/store';

export const StoreProvider: React.FC<IStoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
