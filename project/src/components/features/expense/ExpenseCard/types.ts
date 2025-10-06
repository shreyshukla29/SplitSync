import { Currency, SplitType } from '../../../../types/enums';

export interface ExpenseCardProps {
  id: string;
  title: string;
  amount: number;
  currency?: Currency;
  paidBy: string;
  paidByName: string;
  splitType: SplitType;
  date: string;
  hasNotes?: boolean;
  commentCount?: number;
  userShare?: number;
  onNotesClick?: (expenseId: string) => void;
}