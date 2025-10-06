import React from 'react';
import { ComponentSize } from '../../../types/enums';

interface LoadingSpinnerProps {
  size?: ComponentSize;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = ComponentSize.MD,
  className = '',
}) => {
  const sizeClasses = {
    [ComponentSize.XS]: 'w-3 h-3',
    [ComponentSize.SM]: 'w-4 h-4',
    [ComponentSize.MD]: 'w-5 h-5',
    [ComponentSize.LG]: 'w-6 h-6',
    [ComponentSize.XL]: 'w-8 h-8',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 border-white/30 border-t-white rounded-full animate-spin ${className}`}
    />
  );
};