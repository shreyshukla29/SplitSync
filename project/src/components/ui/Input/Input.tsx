import React, { forwardRef } from 'react';
import { InputProps } from '../../../types/ui';
import { useInputStyles } from './useInputStyles';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error,
  label,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconClick,
  testId,
  ...props
}, ref) => {
  const { getInputClasses, getContainerClasses } = useInputStyles();

  const inputClasses = getInputClasses({
    error: !!error,
    disabled,
    hasLeftIcon: !!leftIcon,
    hasRightIcon: !!rightIcon,
    className,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          data-testid={testId}
          {...props}
        />
        
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            disabled={disabled}
          >
            {rightIcon}
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-400">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';