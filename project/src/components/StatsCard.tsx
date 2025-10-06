import React from 'react';

interface StatsCardProps {
  title: string;
  amount: number;
  type: 'owe' | 'owed';
  currency?: string;
}

function StatsCard({ title, amount, type, currency = '₹' }: StatsCardProps) {
  const isNegative = type === 'owe';
  
  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border ${
      isNegative 
        ? 'border-red-500/20 hover:border-red-500/40' 
        : 'border-emerald-500/20 hover:border-emerald-500/40'
    } hover:scale-105 hover:shadow-inner transition-all duration-300 group`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm font-medium mb-1">{title}</p>
          <p className={`text-2xl font-bold ${
            isNegative ? 'text-red-400' : 'text-emerald-400'
          }`}>
            {currency}{Math.abs(amount).toLocaleString()}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isNegative 
            ? 'bg-red-500/20 group-hover:bg-red-500/30' 
            : 'bg-emerald-500/20 group-hover:bg-emerald-500/30'
        } transition-colors duration-300`}>
          <span className={`text-xl ${isNegative ? 'text-red-400' : 'text-emerald-400'}`}>
            {isNegative ? '↗' : '↙'}
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className={`text-xs font-medium ${
          isNegative ? 'text-red-300' : 'text-emerald-300'
        }`}>
          {isNegative ? 'Amount you owe' : 'Amount owed to you'}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;