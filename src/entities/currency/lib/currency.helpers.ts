import { currencies, type ICurrency } from '../model';

export const getCurrencyFromCode = (symbol: string): ICurrency | undefined => {
  return currencies.find(currency => currency.code === symbol);
};
