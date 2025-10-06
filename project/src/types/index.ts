import {
  UserRole,
  SplitType,
  ExpenseCategory,
  TransactionType,
  TransactionStatus,
  PaymentMethod,
  BalanceType,
  Currency,
  LoadingState,
  NotificationType,
  ApiStatus,
  FileType,
  UploadStatus
} from './enums';

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  displayName?: string;
  profilePicture?: string;
  upiId?: string;
  currency: Currency;
  defaultSplit: SplitType;
  createdAt: string;
  updatedAt: string;
}

// Group Types
export interface Group {
  id: string;
  name: string;
  description?: string;
  members: GroupMember[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupMember {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  joinedAt: string;
}

// Expense Types
export interface Expense {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currency: Currency;
  groupId: string;
  paidBy: string;
  paidByName: string;
  splitType: SplitType;
  splits: ExpenseSplit[];
  category?: ExpenseCategory;
  date: string;
  createdAt: string;
  updatedAt: string;
  hasNotes: boolean;
  commentCount: number;
}

export interface ExpenseSplit {
  userId: string;
  userName: string;
  amount: number;
  percentage?: number;
  paid: boolean;
}

// Balance Types
export interface Balance {
  userId: string;
  userName: string;
  amount: number;
  type: BalanceType;
}

// Transaction Types
export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  currency: Currency;
  fromUserId: string;
  fromUserName: string;
  toUserId?: string;
  toUserName?: string;
  groupId?: string;
  groupName?: string;
  expenseId?: string;
  status: TransactionStatus;
  date: string;
  createdAt: string;
}

// Note and Comment Types
export interface ExpenseNote {
  id: string;
  expenseId: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseComment {
  id: string;
  expenseId: string;
  message: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

// State Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: LoadingState;
  error: string | null;
}

export interface UiNotification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: number;
  duration?: number;
}

export interface FileUpload {
  file: File;
  type: FileType;
  status: UploadStatus;
  progress: number;
  url?: string;
  error?: string;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingProps {
  isLoading: boolean;
  error?: string | null;
  retry?: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}