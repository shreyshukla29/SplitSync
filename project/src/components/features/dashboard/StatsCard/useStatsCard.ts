import { Currency } from '../../../../types/enums';
import { formatCurrency } from '../../../../utils/helpers';

export const useStatsCard = () => {
  const getCardClasses = (type: 'owe' | 'owed', className: string): string => {
    const baseClasses = 'bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border hover:scale-105 hover:shadow-inner transition-all duration-300 group';
    const typeClasses = type === 'owe' 
      ? 'border-red-500/20 hover:border-red-500/40' 
      : 'border-emerald-500/20 hover:border-emerald-500/40';
    
    return `${baseClasses} ${typeClasses} ${className}`;
  };

  const getAmountClasses = (type: 'owe' | 'owed'): string => {
    return `text-2xl font-bold ${type === 'owe' ? 'text-red-400' : 'text-emerald-400'}`;
  };

  const getIconClasses = (type: 'owe' | 'owed'): string => {
    const baseClasses = 'w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300';
    const typeClasses = type === 'owe'
      ? 'bg-red-500/20 group-hover:bg-red-500/30 text-red-400'
      : 'bg-emerald-500/20 group-hover:bg-emerald-500/30 text-emerald-400';
    
    return `${baseClasses} ${typeClasses}`;
  };

  const formatAmount = (amount: number, currency?: Currency): string => {
    return formatCurrency(Math.abs(amount), currency);
  };

  const getIcon = (type: 'owe' | 'owed'): string => {
    return type === 'owe' ? '↗' : '↙';
  };

  return {
    getCardClasses,
    getAmountClasses,
    getIconClasses,
    formatAmount,
    getIcon,
  };
};