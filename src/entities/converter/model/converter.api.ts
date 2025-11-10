import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';

import { updateReloadDate } from './converter.store';
import { type IRatesResponse } from './converter.types';

import { useAppDispatch } from '@/app/store/hooks';

const fetchRates = async (base: string): Promise<IRatesResponse> => {
  const res = await fetch(`https://api.fxratesapi.com/latest?base=${base}`);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

export const useGetRatesQuery = (base: string): UseQueryResult<IRatesResponse, Error> => {
  const dispatch = useAppDispatch();

  const queryResult = useQuery<IRatesResponse, Error>({
    queryKey: ['rates', base],
    queryFn: () => fetchRates(base),
    staleTime: 1000,
    retry: 2,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      dispatch(updateReloadDate());
    }
  }, [queryResult.isSuccess, queryResult.data, dispatch]);

  return queryResult;
};
