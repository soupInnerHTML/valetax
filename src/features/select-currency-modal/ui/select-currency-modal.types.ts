import {
  type SelectedCurrency,
  type SelectedCurrencyType,
} from '@/entities/currency/model/currency.types';

export interface ISelectCurrencyModalProps {
  selectedCurrency: SelectedCurrency;
  setSelectedCurrency: (selectedCurrency: SelectedCurrency) => void;
  selectedCurrencyType: SelectedCurrencyType;
  setSelectedCurrencyType: (selectedCurrencyType: SelectedCurrencyType) => void;
}
