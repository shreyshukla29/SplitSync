import { SplitType } from '../../../../types/enums';
import { SPLIT_TYPE_CONFIG } from '../../../../utils/constants';

export const useExpenseCard = () => {
  const getSplitTypeLabel = (splitType: SplitType): string => {
    return SPLIT_TYPE_CONFIG[splitType]?.name || 'Unknown';
  };

  const getTotalNotifications = (hasNotes: boolean, commentCount: number): number => {
    return (hasNotes ? 1 : 0) + commentCount;
  };

  return {
    getSplitTypeLabel,
    getTotalNotifications,
  };
};