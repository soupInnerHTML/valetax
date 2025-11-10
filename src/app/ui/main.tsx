import React from 'react';

import styles from './main.module.css';

import { ConvertPage } from '@/pages/convert/ui';

export const Main = () => {
  return (
    <div className={styles.container}>
      <ConvertPage />
    </div>
  );
};
