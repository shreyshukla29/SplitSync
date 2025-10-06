import React from 'react';
import { Link } from 'react-router-dom';
import { UserGroupIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import Card from '../../../ui/Card';
import Avatar from '../../../ui/Avatar';
import { Button } from '../../../ui/Button';
import { formatCurrency, getBalanceColor } from '../../../../utils/helpers';
import { GroupCardProps } from './types';
import { useGroupCard } from './useGroupCard';

const GroupCard: React.FC<GroupCardProps> = ({
  id,
  name,
  balance,
  memberCount,
  members,
  currency,
  onSettle,
}) => {
  const { isPositive, balanceText, memberAvatars } = useGroupCard({
    balance,
    members,
    memberCount,
  });

  return (
    <Card hover>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <UserGroupIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-gray-100">
              {name}
            </h3>
            <p className="text-sm text-gray-300">
              {memberCount} member{memberCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className={`text-lg font-bold ${getBalanceColor(isPositive ? 'owed' : 'owe')}`}>
            {isPositive ? '+' : ''}{formatCurrency(balance, currency)}
          </p>
          <p className="text-xs text-gray-400">
            {balanceText}
          </p>
        </div>
      </div>

      {/* Member avatars */}
      <div className="flex items-center space-x-2 mb-4">
        {memberAvatars.visible.map((member, index) => (
          <Avatar
            key={index}
            name={member}
            size="sm"
          />
        ))}
        {memberAvatars.overflow > 0 && (
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">
            +{memberAvatars.overflow}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex space-x-2">
        <Link to={`/groups/${id}`} className="flex-1">
          <Button variant="primary" className="w-full">
            View Group
          </Button>
        </Link>
        <Button
          variant="secondary"
          onClick={() => onSettle?.(id, Math.abs(balance))}
          icon={<CurrencyRupeeIcon className="h-4 w-4" />}
        >
          Settle
        </Button>
      </div>
    </Card>
  );
};

export default GroupCard;