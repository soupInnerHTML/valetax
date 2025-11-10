import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useNetworkStatus } from '../model';

import styles from './status.module.css';
import { type IStatusProps } from './status.types';

import { useAppSelector } from '@/app/store/hooks';
import { selectConverterReloadDate } from '@/entities/converter/model';
import { LastUpdated } from '@/shared/ui/last-updated';
import { OnlineStatus } from '@/shared/ui/online-status';
import { RefreshRates } from '@/shared/ui/refresh-rates';

export const Status: React.FC<IStatusProps> = ({ refetch }) => {
  const { isOnline } = useNetworkStatus();
  const reloadDate = useAppSelector(selectConverterReloadDate);

  const debouncedRefetch = useDebouncedCallback(refetch, 250);

  return (
    <div className={styles.status}>
      <OnlineStatus isOnline={isOnline} />
      <LastUpdated date={reloadDate} isOnline={isOnline} />
      <RefreshRates onRefresh={debouncedRefetch} />
    </div>
  );
};
