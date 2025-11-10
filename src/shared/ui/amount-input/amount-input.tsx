import React from 'react';

import styles from './amount-input.module.css';
import { type AmountInputProps } from './amount-input.types';

export const AmountInput: React.FC<AmountInputProps> = props => {
  return (
    <div>
      <p className={styles.title}>Amount</p>
      <input className={styles.input} {...props} type={'number'} />
    </div>
  );
};
