import React from 'react';
import { PlusIcon, UserGroupIcon, CreditCardIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  type: 'groups' | 'transactions' | 'expenses';
  onAction?: () => void;
}

function EmptyState({ type, onAction }: EmptyStateProps) {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'groups':
        return {
          icon: UserGroupIcon,
          emoji: '👥',
          title: 'No groups yet',
          description: 'Create your first group to start splitting expenses with friends, roommates, or colleagues.',
          actionText: 'Create Your First Group',
          tips: [
            'Add friends and family members',
            'Track shared expenses easily',
            'Settle balances with one tap'
          ]
        };
      
      case 'transactions':
        return {
          icon: CreditCardIcon,
          emoji: '💳',
          title: 'No transactions yet',
          description: 'Your transaction history will appear here once you start adding expenses and making payments.',
          actionText: 'Add Your First Expense',
          tips: [
            'All your payments will be tracked',
            'Filter by date, type, or group',
            'Export transaction history'
          ]
        };
      
      case 'expenses':
        return {
          icon: PlusIcon,
          emoji: '💰',
          title: 'No expenses yet',
          description: 'Start by adding your first shared expense to this group.',
          actionText: 'Add First Expense',
          tips: [
            'Split bills equally or custom amounts',
            'Add notes and photos',
            'Track who paid what'
          ]
        };
      
      default:
        return {
          icon: PlusIcon,
          emoji: '📝',
          title: 'Nothing here yet',
          description: 'Get started by adding some content.',
          actionText: 'Get Started',
          tips: []
        };
    }
  };

  const content = getEmptyStateContent();
  const Icon = content.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      {/* Animated Icon Container */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 animate-pulse-slow">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 rounded-full flex items-center justify-center">
            <span className="text-4xl mb-2">{content.emoji}</span>
          </div>
        </div>
        
        {/* Floating decoration */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center animate-bounce">
          <Icon className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md space-y-4">
        <h3 className="text-2xl font-bold text-white">{content.title}</h3>
        <p className="text-gray-300 leading-relaxed">{content.description}</p>
        
        {/* Tips */}
        {content.tips.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mt-6">
            <h4 className="text-white font-semibold mb-4 flex items-center">
              <span className="mr-2">💡</span>
              What you can do:
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {content.tips.map((tip, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 flex-shrink-0"></div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300 mt-8"
          >
            <PlusIcon className="h-5 w-5" />
            <span>{content.actionText}</span>
          </button>
        )}
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}

export default EmptyState;