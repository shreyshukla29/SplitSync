interface InputStylesProps {
  error: boolean;
  disabled: boolean;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
  className: string;
}

export const useInputStyles = () => {
  const getInputClasses = ({
    error,
    disabled,
    hasLeftIcon,
    hasRightIcon,
    className,
  }: InputStylesProps): string => {
    const baseClasses = 'w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300';
    
    const stateClasses = error
      ? 'border-red-500/40 focus:ring-red-500 focus:border-red-500'
      : 'border-white/20 focus:ring-emerald-500 focus:border-transparent';
      
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
    const iconClasses = `${hasLeftIcon ? 'pl-12' : ''} ${hasRightIcon ? 'pr-12' : ''}`;

    return [
      baseClasses,
      stateClasses,
      disabledClasses,
      iconClasses,
      className,
    ].filter(Boolean).join(' ');
  };

  const getContainerClasses = (): string => 'space-y-2';

  return { getInputClasses, getContainerClasses };
};