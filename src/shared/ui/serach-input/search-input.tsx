import React from 'react';

import styles from './search-input.module.css';
import { type ISearchInputProps } from './search-input.types';

export const SearchInput = React.forwardRef<HTMLInputElement, ISearchInputProps>(
  (props, ref) => {
    return (
      <div className={styles.searchInputContainer}>
        <input
          type='text'
          {...props}
          ref={ref}
          className={styles.searchInput}
          placeholder={'Search currency'}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
