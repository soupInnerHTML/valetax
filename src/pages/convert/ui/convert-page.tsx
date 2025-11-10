import React from 'react';

import { useRates } from '../model';

import styles from './convert-page.module.css';

import { ConversionResult } from '@/features/conversion-result/ui';
import { Status } from '@/features/status/ui';
import { ConvertForm } from '@/widgets/convert-form/ui';

export const ConvertPage = () => {
  const { exchangeRate, inverseRate, refetch, isLoading } = useRates();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Currency converter</h1>
      <h4 className={styles.subtitle}>Get real-time exchange rates</h4>
      <Status refetch={refetch} />
      <div className={styles.convert}>
        <ConvertForm />
        <ConversionResult {...{ inverseRate, exchangeRate, isLoading }} />
      </div>
    </div>
  );
};
