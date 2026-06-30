import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  type TouchableOpacityProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  iconLeft?: string;
  iconRight?: string;
}

const variantStyles: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: 'bg-primary', text: 'text-white', border: 'border-primary' },
  secondary: { bg: 'bg-secondary', text: 'text-white', border: 'border-secondary' },
  outline: { bg: 'bg-transparent', text: 'text-primary', border: 'border-primary' },
  ghost: { bg: 'bg-transparent', text: 'text-primary', border: 'border-transparent' },
};

const sizeStyles: Record<string, { py: string; px: string; textSize: string }> = {
  sm: { py: 'py-1', px: 'px-3', textSize: 'text-label' },
  md: { py: 'py-2.5', px: 'px-5', textSize: 'text-body' },
  lg: { py: 'py-3.5', px: 'px-8', textSize: 'text-heading' },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  iconLeft,
  iconRight,
  style,
  ...props
}) => {
  const isDisabled = disabled || loading;
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isDisabled}
      style={[style as ViewStyle]}
      className={`flex-row items-center justify-center rounded-md ${s.py} ${s.px} ${v.bg} border ${v.border} ${isDisabled ? 'opacity-50' : ''}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#1E6B5E' : '#FFFFFF'} size="small" />
      ) : (
        <>
          {iconLeft && <Text className="mr-2">{iconLeft}</Text>}
          <Text
            className={`${s.textSize} font-[600] ${v.text}`}
            style={{ fontFamily: 'Inter' }}
          >
            {children}
          </Text>
          {iconRight && <Text className="ml-2">{iconRight}</Text>}
        </>
      )}
    </TouchableOpacity>
  );
};