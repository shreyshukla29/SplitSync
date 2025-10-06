import React from 'react';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import Badge from '../../../ui/Badge';

interface ExpenseNotesButtonProps {
  notificationCount: number;
  onClick: () => void;
}

const ExpenseNotesButton: React.FC<ExpenseNotesButtonProps> = ({
  notificationCount,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 text-gray-400 hover:text-white group/notes"
      title={`${notificationCount} note${notificationCount !== 1 ? 's' : ''} and comment${notificationCount !== 1 ? 's' : ''}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      {notificationCount > 0 && (
        <div className="absolute -top-1 -right-1">
          <Badge variant="error" size="sm" count={notificationCount} maxCount={9} />
        </div>
      )}
    </button>
  );
};

export default ExpenseNotesButton;