import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './currency.module.css';
import { type ICurrencyProps } from './currency.types';

// eslint-disable-next-line react/display-name
export const Currency = forwardRef<HTMLButtonElement, ICurrencyProps>(
  ({ symbolNative, code, name, onSelect, className, selected }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(styles.currency, className, {
          [styles.selectedCurrency]: selected,
        })}
        onClick={() => onSelect(code)}
      >
        <div
          className={clsx(styles.symbol, {
            [styles.symbolLong]: symbolNative.length > 3,
          })}
        >
          {symbolNative}
        </div>
        <div className={styles.names}>
          <p className={styles.code}>{code}</p>
          <p className={styles.name}>{name}</p>
        </div>
      </button>
    );
  }
);
