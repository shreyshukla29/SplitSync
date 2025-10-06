import React from 'react';
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import Card from '../../../ui/Card';
import Badge from '../../../ui/Badge';
import Avatar from '../../../ui/Avatar';
import { formatCurrency, formatDate } from '../../../../utils/helpers';
import { Currency, SplitType } from '../../../../types/enums';
import { ExpenseCardProps } from './types';
import { useExpenseCard } from './useExpenseCard';
import ExpenseNotesButton from './ExpenseNotesButton';

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  id,
  title,
  amount,
  currency = Currency.INR,
  paidBy,
  paidByName,
  splitType,
  date,
  hasNotes = false,
  commentCount = 0,
  userShare,
  onNotesClick,
}) => {
  const { getSplitTypeLabel, getTotalNotifications } = useExpenseCard();

  const totalNotifications = getTotalNotifications(hasNotes, commentCount);
  const splitLabel = getSplitTypeLabel(splitType);

  return (
    <Card hover className="group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white group-hover:text-gray-100 mb-2">
            {title}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Avatar name={paidByName} size="xs" />
              <span>Paid by {paidByName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{formatDate(date)}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xl font-bold text-emerald-400">
            {formatCurrency(amount, currency)}
          </p>
          <Badge variant="success" size="sm">
            {splitLabel}
          </Badge>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="text-sm">
          <span className="text-gray-400">Your share:</span>
          <span className="text-white font-medium ml-2">
            {formatCurrency(userShare || 0, currency)}
          </span>
        </div>

        <ExpenseNotesButton
          notificationCount={totalNotifications}
          onClick={() => onNotesClick?.(id)}
        />
      </div>
    </Card>
  );
};

export default ExpenseCard;