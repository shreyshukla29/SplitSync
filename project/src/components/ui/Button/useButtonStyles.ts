import { ComponentVariant, ComponentSize } from '../../../types/enums';

interface ButtonStylesProps {
  variant: ComponentVariant;
  size: ComponentSize;
  disabled: boolean;
  fullWidth: boolean;
  className: string;
}

export const useButtonStyles = () => {
  const getButtonClasses = ({
    variant,
    size,
    disabled,
    fullWidth,
    className,
  }: ButtonStylesProps): string => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantClasses = {
      [ComponentVariant.PRIMARY]: 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:scale-105 hover:shadow-lg focus:ring-emerald-500',
      [ComponentVariant.SECONDARY]: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 focus:ring-white/50',
      [ComponentVariant.OUTLINE]: 'border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white focus:ring-emerald-500',
      [ComponentVariant.GHOST]: 'text-gray-300 hover:text-white hover:bg-white/10 focus:ring-white/50',
      [ComponentVariant.ERROR]: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500',
      [ComponentVariant.SUCCESS]: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500',
      [ComponentVariant.WARNING]: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 focus:ring-yellow-500',
      [ComponentVariant.INFO]: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500',
    };

    const sizeClasses = {
      [ComponentSize.XS]: 'px-2 py-1 text-xs',
      [ComponentSize.SM]: 'px-3 py-2 text-sm',
      [ComponentSize.MD]: 'px-4 py-3 text-base',
      [ComponentSize.LG]: 'px-6 py-4 text-lg',
      [ComponentSize.XL]: 'px-8 py-5 text-xl',
    };

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none' : '';
    const widthClasses = fullWidth ? 'w-full' : '';

    return [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabledClasses,
      widthClasses,
      className,
    ].filter(Boolean).join(' ');
  };

  return { getButtonClasses };
};