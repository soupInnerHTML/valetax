import { type ICurrency } from '@/entities/currency/model';

export interface ICurrencyProps extends ICurrency {
  onSelect: (code: string) => void;
  className?: string;
  selected?: boolean;
}
