import React from 'react';
import { Link } from 'react-router-dom';
import { UserGroupIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

interface GroupCardProps {
  id: string;
  name: string;
  balance: number;
  memberCount: number;
  members: string[];
  currency?: string;
}

function GroupCard({ id, name, balance, memberCount, members, currency = '₹' }: GroupCardProps) {
  const isPositive = balance >= 0;
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 group">
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
          <p className={`text-lg font-bold ${
            isPositive ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {isPositive ? '+' : ''}{currency}{balance.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">
            {isPositive ? 'You are owed' : 'You owe'}
          </p>
        </div>
      </div>

      {/* Member avatars */}
      <div className="flex items-center space-x-2 mb-4">
        {members.slice(0, 4).map((member, index) => (
          <div
            key={index}
            className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-medium"
          >
            {member.charAt(0).toUpperCase()}
          </div>
        ))}
        {members.length > 4 && (
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">
            +{members.length - 4}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex space-x-2">
        <Link
          to={`/groups/${id}`}
          className="flex-1 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-medium py-2 px-4 rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300 text-center"
        >
          View Group
        </Link>
        <button className="bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-sm font-medium py-2 px-4 rounded-xl transition-all duration-300 flex items-center space-x-1">
          <CurrencyRupeeIcon className="h-4 w-4" />
          <span>Settle</span>
        </button>
      </div>
    </div>
  );
}

export default GroupCard;