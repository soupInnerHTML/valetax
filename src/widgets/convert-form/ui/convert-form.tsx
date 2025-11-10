import React, { useMemo, useState } from 'react';

import styles from './convert-form.module.css';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectConverter } from '@/entities/converter/model';
import {
  switchCurrencies,
  updateAmount,
} from '@/entities/converter/model/converter.store';
import { getCurrencyFromCode } from '@/entities/currency/lib';
import {
  type SelectedCurrency,
  type SelectedCurrencyType,
} from '@/entities/currency/model/currency.types';
import { SelectCurrencyModal } from '@/features/select-currency-modal/ui';
import { AmountInput } from '@/shared/ui/amount-input';
import { Currency } from '@/shared/ui/currency';

export const ConvertForm = () => {
  const { from, to, amount } = useAppSelector(selectConverter);
  const dispatch = useAppDispatch();
  const fromCurrency = useMemo(() => getCurrencyFromCode(from), [from]);
  const toCurrency = useMemo(() => getCurrencyFromCode(to), [to]);
  const [selectedCurrency, setSelectedCurrency] = useState<SelectedCurrency>(null);
  const [selectedCurrencyType, setSelectedCurrencyType] =
    useState<SelectedCurrencyType>(null);
  return (
    <div className={styles.convertForm}>
      <AmountInput
        min={0.01}
        max={100_000_000_000_000}
        value={amount}
        onChange={e => {
          dispatch(updateAmount(Number(e.target.value)));
        }}
      />
      {fromCurrency && toCurrency && (
        <div className={styles.currencies}>
          <div className={styles.currency}>
            <p className={styles.title}>From</p>
            <Currency
              {...fromCurrency}
              onSelect={code => {
                setSelectedCurrency(code);
                setSelectedCurrencyType('from');
              }}
            />
          </div>
          <button
            className={styles.switch}
            onClick={() => dispatch(switchCurrencies())}
          />
          <div className={styles.currency}>
            <p className={styles.title}>To</p>
            <Currency
              {...toCurrency}
              onSelect={code => {
                setSelectedCurrency(code);
                setSelectedCurrencyType('to');
              }}
            />
          </div>
        </div>
      )}
      <SelectCurrencyModal
        {...{
          selectedCurrencyType,
          setSelectedCurrencyType,
          selectedCurrency,
          setSelectedCurrency,
        }}
      />
    </div>
  );
};
