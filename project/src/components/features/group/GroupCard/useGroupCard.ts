import { BalanceType } from '../../../../types/enums';
import { UseGroupCardProps, MemberAvatars } from './types';

export const useGroupCard = ({ balance, members, memberCount }: UseGroupCardProps) => {
  const isPositive = balance >= 0;
  
  const balanceText = isPositive ? 'You are owed' : 'You owe';
  
  const memberAvatars: MemberAvatars = {
    visible: members.slice(0, 4),
    overflow: Math.max(0, members.length - 4),
  };

  return {
    isPositive,
    balanceText,
    memberAvatars,
  };
};