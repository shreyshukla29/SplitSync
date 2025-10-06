import React from 'react';
import { StatsCardProps } from './types';
import { useStatsCard } from './useStatsCard';

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  amount,
  type,
  currency,
  className = '',
}) => {
  const { getCardClasses, getAmountClasses, getIconClasses, formatAmount, getIcon } = useStatsCard();

  return (
    <div className={getCardClasses(type, className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm font-medium mb-1">{title}</p>
          <p className={getAmountClasses(type)}>
            {formatAmount(amount, currency)}
          </p>
        </div>
        <div className={getIconClasses(type)}>
          <span className="text-xl">{getIcon(type)}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs font-medium text-gray-300">
          {type === 'owe' ? 'Amount you owe' : 'Amount owed to you'}
        </div>
      </div>
    </div>
  );
};