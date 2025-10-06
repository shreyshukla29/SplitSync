import { Currency, BalanceType, TransactionStatus, NotificationType } from '../types/enums';
import { CURRENCY_CONFIG, VALIDATION_RULES } from './constants';


export const formatCurrency = (amount: number, currency: Currency = Currency.INR): string => {
  const config = CURRENCY_CONFIG[currency];
  return `${config.symbol}${amount.toLocaleString()}`;
};

export const getCurrencySymbol = (currency: Currency): string => {
  return CURRENCY_CONFIG[currency]?.symbol || '₹';
};


export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInHours = (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`;
  } else if (diffInHours < 24 * 7) {
    return `${Math.floor(diffInHours / 24)}d ago`;
  } else {
    return formatDate(dateObj);
  }
};


export const getBalanceColor = (type: BalanceType): string => {
  return type === BalanceType.OWE ? 'text-red-400' : 'text-emerald-400';
};

export const getBalanceIcon = (type: BalanceType): string => {
  return type === BalanceType.OWE ? '↗' : '↙';
};


export const getTransactionStatusColor = (status: TransactionStatus): string => {
  switch (status) {
    case TransactionStatus.COMPLETED:
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    case TransactionStatus.PENDING:
      return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
    case TransactionStatus.FAILED:
      return 'bg-red-500/20 text-red-400 border-red-500/40';
    case TransactionStatus.CANCELLED:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    default:
      return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
  }
};


export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL.test(email);
};

export const validateUpiId = (upiId: string): boolean => {
  return VALIDATION_RULES.UPI_ID.test(upiId);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

export const validateName = (name: string): boolean => {
  return name.length >= VALIDATION_RULES.NAME_MIN_LENGTH && 
         name.length <= VALIDATION_RULES.NAME_MAX_LENGTH;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const generateInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};


export const groupBy = <T, K extends keyof any>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = key(item);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// File Utilities
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

// Notification Utilities
export const getNotificationIcon = (type: NotificationType): string => {
  switch (type) {
    case NotificationType.SUCCESS:
      return '✅';
    case NotificationType.ERROR:
      return '❌';
    case NotificationType.WARNING:
      return '⚠️';
    case NotificationType.INFO:
      return 'ℹ️';
    default:
      return 'ℹ️';
  }
};

// Debounce Utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Local Storage Utilities
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
};