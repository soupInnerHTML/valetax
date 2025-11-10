import { useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useAppSelector } from '@/app/store/hooks';
import { selectConverter } from '@/entities/converter/model';
import { currencies, type ICurrency } from '@/entities/currency/model';
import {
  type SelectedCurrency,
  type SelectedCurrencyType,
} from '@/entities/currency/model/currency.types';

export const useFilteredCurrencies = (selectedCurrencyType: SelectedCurrencyType) => {
  const { from, to } = useAppSelector(selectConverter);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 250);

  const uniqueCurrencies = useMemo(() => {
    const excludedCode = selectedCurrencyType === 'to' ? from : to;
    return currencies.filter(currency => currency.code !== excludedCode);
  }, [from, to, selectedCurrencyType]);

  const filteredCurrencies = useMemo(() => {
    const query = debouncedSearchQuery.trim().toLowerCase();

    if (!query) return uniqueCurrencies;

    return uniqueCurrencies.filter(currency => {
      const nameMatch = currency.name.toLowerCase().includes(query);
      const codeMatch = currency.code.toLowerCase().includes(query);
      return nameMatch || codeMatch;
    });
  }, [uniqueCurrencies, debouncedSearchQuery]);

  return { filteredCurrencies, searchQuery, setSearchQuery };
};

export const useArrows = (
  selectedCurrency: SelectedCurrency,
  filteredCurrencies: ICurrency[]
) => {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!selectedCurrency) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();

      if (tagName === 'input' || tagName === 'textarea') return;

      if (!filteredCurrencies.length) return;

      const currentFocusedIndex = itemRefs.current.findIndex(
        ref => ref === document.activeElement
      );

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentFocusedIndex + 1) % filteredCurrencies.length;
        itemRefs.current[nextIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex =
          (currentFocusedIndex - 1 + filteredCurrencies.length) %
          filteredCurrencies.length;
        itemRefs.current[prevIndex]?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [selectedCurrency, filteredCurrencies]);

  return { itemRefs };
};
