import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';

import ClockIcon from '../../assets/icons/clock-icon.svg';

import styles from './last-updated.module.css';
import { type ILastUpdatedProps } from './last-updated.types';

export const LastUpdated: React.FC<ILastUpdatedProps> = ({ date, isOnline }) => {
  const parsedDate = useMemo(() => {
    if (!date) return null;
    return dayjs(date).format('MM/DD/YYYY, hh:mm A');
  }, [date]);

  if (!date) {
    return <Skeleton width={212} height={15} />;
  }

  return (
    <div className={styles.lastUpdated}>
      <img src={ClockIcon} alt='clock' className={styles.clock} />
      <span className={styles.date}>
        {isOnline ? 'Last updated:' : 'Using cached rates from: '} {parsedDate}
      </span>
    </div>
  );
};
