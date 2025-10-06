import React from 'react';
import { ComponentVariant, ComponentSize, LoadingState } from '../../../types/enums';
import { ButtonProps } from '../../../types/ui';
import { useButtonStyles } from './useButtonStyles';
import { LoadingSpinner } from '../LoadingSpinner';

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = ComponentVariant.PRIMARY,
  size = ComponentSize.MD,
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  testId,
}) => {
  const { getButtonClasses } = useButtonStyles();
  const isDisabled = disabled || loading;

  const classes = getButtonClasses({
    variant,
    size,
    disabled: isDisabled,
    fullWidth,
    className,
  });

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LoadingSpinner size={ComponentSize.SM} />
          <span>Loading...</span>
        </>
      );
    }

    return (
      <>
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </>
    );
  };

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
      data-testid={testId}
    >
      {renderContent()}
    </button>
  );
};