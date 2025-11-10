import React, { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDebounce } from 'use-debounce';

import { formatRate } from '../lib';

import styles from './conversion-result.module.css';

import { useAppSelector } from '@/app/store/hooks';
import { selectConverter, type IExchangeProps } from '@/entities/converter/model';
import { getCurrencyFromCode } from '@/entities/currency/lib';
import { AMOUNT_DEBOUNCE_TIMEOUT } from '@/shared/lib/consts';

export const ConversionResult: React.FC<IExchangeProps> = ({
  exchangeRate,
  inverseRate,
  isLoading,
}) => {
  const { amount: rawAmount, from, to } = useAppSelector(selectConverter);
  const [amount] = useDebounce(rawAmount, AMOUNT_DEBOUNCE_TIMEOUT);
  const symbol = useMemo(() => {
    return getCurrencyFromCode(to)?.symbolNative;
  }, [to]);
  const formatedExchangeRate = useMemo(
    () => formatRate(Number(exchangeRate)),
    [exchangeRate]
  );
  return (
    <div className={styles.conversionResult}>
      <p className={styles.title}>Conversion result</p>
      {isLoading ? (
        <div className={styles.priceSkeleton}>
          <Skeleton height={29} width={71} className={styles.price} inline />
        </div>
      ) : (
        <p className={styles.price}>
          {symbol}
          {formatedExchangeRate}
        </p>
      )}
      <p className={styles.amount}>
        {amount} {from} =
      </p>
      <div className={styles.hr} />
      <div className={styles.row}>
        <span className={styles.key}>Exchange Rate</span>
        {isLoading ? (
          <Skeleton height={15} width={134} inline className={styles.value} />
        ) : (
          <span className={styles.value}>
            {amount} {from} = {exchangeRate} {to}
          </span>
        )}
      </div>
      <div className={styles.row}>
        <span className={styles.key}>Inverse Rate</span>
        {isLoading ? (
          <Skeleton height={15} width={134} inline className={styles.value} />
        ) : (
          <span className={styles.value}>
            {amount} {to} = {inverseRate} {from}
          </span>
        )}
      </div>
      <div className={styles.hr} />
      <p className={styles.info}>
        Rates are for informational purposes only and may not reflect real-time market
        rates
      </p>
    </div>
  );
};
