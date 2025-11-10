export interface IConversionState {
  reloadDate: number;
  from: string;
  to: string;
  amount: number;
}

export interface IRatesResponse {
  success: boolean;
  terms: string;
  privacy: string;
  timestamp: number;
  date: string;
  base: string;
  rates: Record<string, number>;
}

export interface IExchangeProps {
  exchangeRate: string;
  inverseRate: string;
  isLoading: boolean;
}

export interface IRatesCachedData {
  data: IRatesResponse;
  timestamp: number;
  currency: string;
}
