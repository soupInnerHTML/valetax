import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type IConversionState } from './converter.types';

import { MAX_CONVERTER_VALUE, MIN_CONVERTER_VALUE } from '@/shared/lib/consts';

const initialState: IConversionState = {
  reloadDate: 0,
  from: 'USD',
  to: 'EUR',
  amount: 1,
};

export const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    updateReloadDate: state => {
      state.reloadDate = new Date().getTime();
    },
    updateFrom: (state, action: PayloadAction<string>) => {
      state.from = action.payload;
    },
    updateTo: (state, action: PayloadAction<string>) => {
      state.to = action.payload;
    },
    switchCurrencies: state => {
      [state.from, state.to] = [state.to, state.from];
    },
    updateAmount: (state, action: PayloadAction<number>) => {
      state.amount = Math.max(
        MIN_CONVERTER_VALUE,
        Math.min(action.payload, MAX_CONVERTER_VALUE)
      );
    },
  },
});

export const { updateReloadDate, updateFrom, updateTo, switchCurrencies, updateAmount } =
  converterSlice.actions;
export default converterSlice.reducer;
