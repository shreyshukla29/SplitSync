import { ComponentSize, ComponentVariant, LoadingState } from './enums';

export interface BaseUIProps {
  className?: string;
  children?: React.ReactNode;
  testId?: string;
}

export interface InteractiveProps extends BaseUIProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface FormFieldProps extends BaseUIProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export interface ButtonProps extends InteractiveProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export interface InputProps extends FormFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export interface CardProps extends BaseUIProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: ComponentSize;
  hover?: boolean;
}

export interface ModalProps extends BaseUIProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ComponentSize;
  closeOnOverlayClick?: boolean;
}

export interface LoadingProps {
  state: LoadingState;
  error?: string | null;
  retry?: () => void;
}