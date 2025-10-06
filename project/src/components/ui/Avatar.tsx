import React from 'react';
import { BaseComponentProps } from '../../types';
import { generateInitials } from '../../utils/helpers';

export interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circular' | 'rounded' | 'square';
  fallbackColor?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name = '',
  size = 'md',
  variant = 'circular',
  fallbackColor = 'from-indigo-500 to-cyan-500',
  onClick,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const variantClasses = {
    circular: 'rounded-full',
    rounded: 'rounded-xl',
    square: 'rounded-lg',
  };

  const baseClasses = `
    inline-flex items-center justify-center font-medium text-white
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${onClick ? 'cursor-pointer hover:scale-110 transition-transform duration-200' : ''}
    ${className}
  `.trim();

  const initials = generateInitials(name);

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        className={`${baseClasses} object-cover`}
        onClick={onClick}
        onError={(e) => {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    );
  }

  return (
    <div
      className={`${baseClasses} bg-gradient-to-r ${fallbackColor}`}
      onClick={onClick}
    >
      {initials}
    </div>
  );
};

export default Avatar;