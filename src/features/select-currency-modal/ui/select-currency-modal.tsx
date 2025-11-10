import React, { useCallback, useRef } from 'react';
import Modal from 'react-modal';

import { useArrows, useFilteredCurrencies } from '../model';

import styles from './select-currency-modal.module.css';
import { type ISelectCurrencyModalProps } from './select-currency-modal.types';

import { useAppDispatch } from '@/app/store/hooks';
import { updateFrom, updateTo } from '@/entities/converter/model/converter.store';
import { type ICurrency } from '@/entities/currency/model';
import { Currency } from '@/shared/ui/currency';
import { SearchInput } from '@/shared/ui/serach-input';

Modal.setAppElement('#root');

export const SelectCurrencyModal: React.FC<ISelectCurrencyModalProps> = ({
  selectedCurrency,
  setSelectedCurrency,
  selectedCurrencyType,
  setSelectedCurrencyType,
}) => {
  const { filteredCurrencies, setSearchQuery, searchQuery } =
    useFilteredCurrencies(selectedCurrencyType);

  const { itemRefs } = useArrows(selectedCurrency, filteredCurrencies);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const onCurrencySelect = useCallback(
    (code: string, currency: ICurrency) => {
      dispatch((selectedCurrencyType === 'to' ? updateTo : updateFrom)(code));
      setSelectedCurrency(currency.code);
      setTimeout(() => {
        setSelectedCurrency(null);
        setSelectedCurrencyType(null);
      }, 500);
    },
    [dispatch, selectedCurrencyType, setSelectedCurrency, setSelectedCurrencyType]
  );

  const blurInputOnArrowPress: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      inputRef.current?.blur();
    }
  };

  return (
    <Modal
      isOpen={!!selectedCurrency}
      onRequestClose={() => {
        setSelectedCurrency(null);
        setSelectedCurrencyType(null);
      }}
      className={styles.selectCurrencyModal}
      overlayClassName={{
        base: styles.selectCurrencyModalOverlay,
        afterOpen: styles.selectCurrencyModalOverlayAfterOpen,
        beforeClose: styles.selectCurrencyModalOverlayBeforeClose,
      }}
      closeTimeoutMS={300}
    >
      <div className={styles.selectCurrencyModalContent}>
        <button className={styles.close} onClick={() => setSelectedCurrency(null)} />
        <h2 className={styles.title}>Select currency</h2>
        <p className={styles.subtitle}>
          Choose a currency from the list below or use the search bar to find a specific
          currency.
        </p>
        <SearchInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          ref={inputRef}
          onKeyDown={blurInputOnArrowPress}
        />
        <div className={styles.selectCurrencyModalCurrencies}>
          {filteredCurrencies.map((currency, index) => (
            <Currency
              ref={el => {
                itemRefs.current[index] = el;
              }}
              key={currency.code}
              {...currency}
              onSelect={code => onCurrencySelect(code, currency)}
              className={styles.currency}
              selected={selectedCurrency === currency.code}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};
