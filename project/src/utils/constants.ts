import { Currency, ExpenseCategory, SplitType } from '../types/enums';


export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

export const AUTH_CONFIG = {
  TOKEN_KEY: 'splitsync_token',
  REFRESH_TOKEN_KEY: 'splitsync_refresh_token',
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000,
} as const;


export const UI_CONFIG = {
  NOTIFICATION_DURATION: 5000,
  LOADING_DELAY: 300,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
} as const;


export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 5,
} as const;

export const FILE_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, 
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
} as const;


export const CURRENCY_CONFIG: Record<Currency, { symbol: string; name: string }> = {
  [Currency.INR]: { symbol: '₹', name: 'Indian Rupee' },
  [Currency.USD]: { symbol: '$', name: 'US Dollar' },
  [Currency.EUR]: { symbol: '€', name: 'Euro' },
  [Currency.GBP]: { symbol: '£', name: 'British Pound' },
  [Currency.CAD]: { symbol: 'C$', name: 'Canadian Dollar' },
  [Currency.AUD]: { symbol: 'A$', name: 'Australian Dollar' },
} as const;


export const EXPENSE_CATEGORIES: Record<ExpenseCategory, { icon: string; name: string; color: string }> = {
  [ExpenseCategory.FOOD]: { icon: '🍕', name: 'Food & Dining', color: 'text-orange-400' },
  [ExpenseCategory.TRANSPORT]: { icon: '🚗', name: 'Transportation', color: 'text-blue-400' },
  [ExpenseCategory.ACCOMMODATION]: { icon: '🏠', name: 'Accommodation', color: 'text-green-400' },
  [ExpenseCategory.ENTERTAINMENT]: { icon: '🎬', name: 'Entertainment', color: 'text-purple-400' },
  [ExpenseCategory.UTILITIES]: { icon: '⚡', name: 'Utilities', color: 'text-yellow-400' },
  [ExpenseCategory.SHOPPING]: { icon: '🛍️', name: 'Shopping', color: 'text-pink-400' },
  [ExpenseCategory.HEALTHCARE]: { icon: '🏥', name: 'Healthcare', color: 'text-red-400' },
  [ExpenseCategory.OTHER]: { icon: '📝', name: 'Other', color: 'text-gray-400' },
} as const;


export const SPLIT_TYPE_CONFIG: Record<SplitType, { name: string; description: string; icon: string }> = {
  [SplitType.EQUAL]: { name: 'Equal Split', description: 'Split evenly among all members', icon: '⚖️' },
  [SplitType.CUSTOM]: { name: 'Custom Split', description: 'Set custom amounts for each member', icon: '🎯' },
  [SplitType.PERCENTAGE]: { name: 'Percentage Split', description: 'Split by percentage', icon: '📊' },
} as const;


export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  UPI_ID: /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;


export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'Invalid file type. Please select a valid file.',
} as const;


export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back! Login successful.',
  SIGNUP_SUCCESS: 'Account created successfully! Welcome to SplitSync.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  EXPENSE_CREATED: 'Expense added successfully.',
  EXPENSE_UPDATED: 'Expense updated successfully.',
  EXPENSE_DELETED: 'Expense deleted successfully.',
  PAYMENT_SUCCESS: 'Payment completed successfully.',
  GROUP_CREATED: 'Group created successfully.',
  GROUP_UPDATED: 'Group updated successfully.',
} as const;