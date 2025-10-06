import { Currency } from '../../../../types/enums';

export interface StatsCardProps {
  title: string;
  amount: number;
  type: 'owe' | 'owed';
  currency?: Currency;
  className?: string;
}