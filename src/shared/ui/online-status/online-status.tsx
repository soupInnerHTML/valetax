import clsx from 'clsx';
import React from 'react';

import WifiOffIcon from '../../assets/icons/wifi-off-icon.svg';
import WifiOnIcon from '../../assets/icons/wifi-on-icon.svg';

import styles from './online-status.module.css';
import { type IOnlineStatusProps } from './online-status.types';

export const OnlineStatus: React.FC<IOnlineStatusProps> = ({ isOnline }) => {
  return (
    <div className={clsx(styles.onlineStatus, { [styles.statusInactive]: !isOnline })}>
      <img src={isOnline ? WifiOnIcon : WifiOffIcon} alt='Online status' />
      <p>{isOnline ? 'Online' : 'Offline'}</p>
    </div>
  );
};
