import React from 'react';
import { BaseComponentProps } from '../../types';

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick,
}) => {
  const baseClasses = 'bg-white/10 backdrop-blur-md rounded-2xl border border-white/20';
  
  const variantClasses = {
    default: '',
    elevated: 'shadow-xl',
    outlined: 'border-2',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const interactiveClasses = hover || onClick
    ? 'hover:border-white/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer'
    : '';

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${interactiveClasses}
    ${className}
  `.trim();

  const Component = onClick ? 'button' : 'div';

  return (
    <Component className={classes} onClick={onClick}>
      {children}
    </Component>
  );
};

export default Card;