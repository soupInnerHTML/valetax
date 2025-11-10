import { type RootState } from '@/app/store';

export const selectConverter = (state: RootState) => state.converter;
export const selectConverterReloadDate = (state: RootState) => state.converter.reloadDate;
