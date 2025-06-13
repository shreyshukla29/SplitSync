import React, { useState } from 'react';
import { CalendarIcon, UserIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import ExpenseNotesModal from './ExpenseNotesModal';

interface ExpenseCardProps {
  title: string;
  amount: number;
  paidBy: string;
  splitType: string;
  date: string;
  currency?: string;
  hasNotes?: boolean;
  commentCount?: number;
}

function ExpenseCard({ 
  title, 
  amount, 
  paidBy, 
  splitType, 
  date, 
  currency = '₹',
  hasNotes = false,
  commentCount = 0
}: ExpenseCardProps) {
  const [showNotesModal, setShowNotesModal] = useState(false);

  // Mock data for the modal
  const mockNote = hasNotes ? {
    content: "This was for our team dinner after the project completion. Everyone agreed to split equally.",
    author: paidBy,
    timestamp: date,
    isCurrentUser: paidBy === 'You'
  } : undefined;

  const mockComments = [
    {
      id: '1',
      author: 'Ravi',
      message: 'Thanks for organizing this! The food was amazing 🍕',
      timestamp: '2024-01-15T20:30:00Z',
      isCurrentUser: false
    },
    {
      id: '2',
      author: 'You',
      message: 'No problem! Glad everyone enjoyed it.',
      timestamp: '2024-01-15T20:45:00Z',
      isCurrentUser: true
    },
    {
      id: '3',
      author: 'Priya',
      message: 'We should do this more often!',
      timestamp: '2024-01-15T21:00:00Z',
      isCurrentUser: false
    }
  ].slice(0, commentCount);

  const handleAddComment = (message: string) => {
    console.log('Adding comment:', message);
    // In a real app, this would make an API call
  };

  const handleEditNote = (content: string) => {
    console.log('Editing note:', content);
    // In a real app, this would make an API call
  };

  const handleDeleteComment = (commentId: string) => {
    console.log('Deleting comment:', commentId);
    // In a real app, this would make an API call
  };

  const totalNotifications = (hasNotes ? 1 : 0) + commentCount;

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 hover:border-white/40 hover:scale-[1.02] transition-all duration-300 group relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-gray-100 mb-2">
              {title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <UserIcon className="h-4 w-4" />
                <span>Paid by {paidBy}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{date}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-xl font-bold text-emerald-400">
              {currency}{amount.toLocaleString()}
            </p>
            <div className="inline-block bg-emerald-400/20 text-emerald-400 text-xs font-medium px-2 py-1 rounded-full mt-1">
              {splitType}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-400">Your share:</span>
            <span className="text-white font-medium ml-2">
              {currency}{(amount / 4).toFixed(2)}
            </span>
          </div>

          {/* Notes/Comments Button */}
          <button
            onClick={() => setShowNotesModal(true)}
            className="relative p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 text-gray-400 hover:text-white group/notes"
            title={`${totalNotifications} note${totalNotifications !== 1 ? 's' : ''} and comment${totalNotifications !== 1 ? 's' : ''}`}
          >
            <ChatBubbleLeftIcon className="h-5 w-5" />
            {totalNotifications > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {totalNotifications > 9 ? '9+' : totalNotifications}
                </span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Notes Modal */}
      <ExpenseNotesModal
        isOpen={showNotesModal}
        onClose={() => setShowNotesModal(false)}
        expenseTitle={title}
        note={mockNote}
        comments={mockComments}
        onAddComment={handleAddComment}
        onEditNote={handleEditNote}
        onDeleteComment={handleDeleteComment}
      />
    </>
  );
}

export default ExpenseCard;