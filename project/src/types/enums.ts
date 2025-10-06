export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member'
}

export enum AuthStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  ERROR = 'error'
}


export enum SplitType {
  EQUAL = 'equal',
  CUSTOM = 'custom',
  PERCENTAGE = 'percentage'
}

export enum ExpenseCategory {
  FOOD = 'food',
  TRANSPORT = 'transport',
  ACCOMMODATION = 'accommodation',
  ENTERTAINMENT = 'entertainment',
  UTILITIES = 'utilities',
  SHOPPING = 'shopping',
  HEALTHCARE = 'healthcare',
  OTHER = 'other'
}


export enum TransactionType {
  EXPENSE = 'expense',
  PAYMENT = 'payment',
  SETTLEMENT = 'settlement'
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export enum PaymentMethod {
  UPI = 'upi',
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash',
  CARD = 'card'
}

export enum BalanceType {
  OWE = 'owe',
  OWED = 'owed'
}


export enum Currency {
  INR = 'INR',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  AUD = 'AUD'
}


export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export enum ModalType {
  ADD_EXPENSE = 'addExpense',
  SETTLE_PAYMENT = 'settlePayment',
  EXPENSE_NOTES = 'expenseNotes',
  CREATE_GROUP = 'createGroup',
  EDIT_PROFILE = 'editProfile'
}

export enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  VALIDATION_ERROR = 'validation_error',
  UNAUTHORIZED = 'unauthorized',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  SERVER_ERROR = 'server_error'
}

export enum FileType {
  IMAGE = 'image',
  DOCUMENT = 'document',
  QR_CODE = 'qr_code'
}

export enum UploadStatus {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  SUCCESS = 'success',
  ERROR = 'error'
}

// Navigation Enums
export enum AppRoute {
  HOME = 'home',
  LOGIN = 'login',
  SIGNUP = 'signup',
  DASHBOARD = 'dashboard',
  GROUPS = 'groups',
  GROUP_DETAILS = 'group_details',
  TRANSACTIONS = 'transactions',
  PROFILE = 'profile',
  ONBOARDING = 'onboarding'
}

// Theme Enums
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

export enum ComponentSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}

export enum ComponentVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  GHOST = 'ghost',
  OUTLINE = 'outline'
}


export enum LayoutType {
  SIDEBAR = 'sidebar',
  TOPBAR = 'topbar',
  MINIMAL = 'minimal'
}

export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop'
}