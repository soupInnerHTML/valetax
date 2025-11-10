import { useMemo } from 'react';
import { useDebounce } from 'use-debounce';

import { useAppSelector } from '@/app/store/hooks';
import { useGetRatesQuery, selectConverter } from '@/entities/converter/model';
import { AMOUNT_DEBOUNCE_TIMEOUT } from '@/shared/lib/consts';

export const useRates = () => {
  const { from, to, amount } = useAppSelector(selectConverter);

  const { data, refetch, isLoading, isError, fetchStatus } = useGetRatesQuery(from);

  const [debouncedAmount] = useDebounce(amount, AMOUNT_DEBOUNCE_TIMEOUT);

  const { exchangeRate, inverseRate } = useMemo(() => {
    if (!data?.rates || !to || !from) {
      return { exchangeRate: '0', inverseRate: '0' };
    }

    // Прямой курс: from -> to
    const directRate = data.rates[to];

    if (directRate === undefined || directRate === null) {
      return { exchangeRate: '0', inverseRate: '0' };
    }

    const exchangeRate = (debouncedAmount * directRate).toFixed(6);

    // Обратный курс: to -> from (1 / directRate)
    const inverseRateValue = directRate !== 0 ? 1 / directRate : 0;
    const inverseRate = (debouncedAmount * inverseRateValue).toFixed(6);

    return { exchangeRate, inverseRate };
  }, [data, from, to, debouncedAmount]);

  console.log(isError, !data?.success, fetchStatus);

  return {
    exchangeRate,
    inverseRate,
    refetch,
    isLoading:
      isLoading ||
      (isError && !data?.success) ||
      (!data?.rates.length && fetchStatus === 'paused'),
  };
};
