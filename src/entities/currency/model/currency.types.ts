export interface ICurrency {
  name: string;
  symbol: string;
  symbolNative: string;
  decimalDigits: number;
  rounding: number;
  code: string;
  namePlural: string;
  countryCodeISO2: string;
  flagSrc: string;
}

export type SelectedCurrencyType = 'from' | 'to' | null;
export type SelectedCurrency = string | null;
