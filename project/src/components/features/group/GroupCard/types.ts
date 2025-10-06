import { Currency } from '../../../../types/enums';

export interface GroupCardProps {
  id: string;
  name: string;
  balance: number;
  memberCount: number;
  members: string[];
  currency?: Currency;
  onSettle?: (groupId: string, amount: number) => void;
}

export interface UseGroupCardProps {
  balance: number;
  members: string[];
  memberCount: number;
}

export interface MemberAvatars {
  visible: string[];
  overflow: number;
}