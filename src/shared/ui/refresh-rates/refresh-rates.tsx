import React from 'react';

import RefreshIcon from '../../assets/icons/material-symbols_refresh-rounded.svg';

import styles from './refresh-rates.module.css';
import { type IRefreshRatesProps } from './refresh-rates.types';

export const RefreshRates: React.FC<IRefreshRatesProps> = ({ onRefresh }) => {
  return (
    <button className={styles.refreshRates} onClick={onRefresh}>
      <img src={RefreshIcon} alt={'refresh'} />
      <span>Refresh rates</span>
    </button>
  );
};
