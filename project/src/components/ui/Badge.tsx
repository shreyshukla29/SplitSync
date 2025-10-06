import React from 'react';
import { BaseComponentProps } from '../../types';
import { NotificationType } from '../../types/enums';

export interface BadgeProps extends BaseComponentProps {
  variant?: NotificationType | 'neutral' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  count?: number;
  maxCount?: number;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  dot = false,
  count,
  maxCount = 99,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const variantClasses = {
    primary: 'bg-emerald-500 text-white',
    success: 'bg-emerald-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
    neutral: 'bg-gray-500 text-white',
  };

  const sizeClasses = {
    sm: dot ? 'w-2 h-2' : 'px-2 py-1 text-xs min-w-[1.25rem] h-5',
    md: dot ? 'w-3 h-3' : 'px-2.5 py-1 text-sm min-w-[1.5rem] h-6',
    lg: dot ? 'w-4 h-4' : 'px-3 py-1.5 text-base min-w-[2rem] h-8',
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  const displayCount = count !== undefined && count > maxCount ? `${maxCount}+` : count;

  if (dot) {
    return <span className={classes} />;
  }

  return (
    <span className={classes}>
      {count !== undefined ? displayCount : children}
    </span>
  );
};

export default Badge;