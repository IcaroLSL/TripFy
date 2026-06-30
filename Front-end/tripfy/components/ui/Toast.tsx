import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  visible: boolean;
  mensagem: string;
  variant?: ToastVariant;
  duracao?: number;
  onDismiss: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

const variantConfig: Record<ToastVariant, { bg: string; text: string; icone: string }> = {
  success: { bg: 'bg-success', text: 'text-white', icone: '✓' },
  error: { bg: 'bg-error', text: 'text-white', icone: '✕' },
  warning: { bg: 'bg-secondary', text: 'text-white', icone: '⚠' },
  info: { bg: 'bg-text', text: 'text-white', icone: 'ℹ' },
};

export const Toast: React.FC<ToastProps> = ({
  visible,
  mensagem,
  variant = 'info',
  duracao = 3000,
  onDismiss,
  actionLabel,
  onAction,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 15,
        stiffness: 150,
      }).start();

      const timer = setTimeout(() => {
        hide();
      }, duracao);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hide = () => {
    Animated.timing(translateY, {
      toValue: -100,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onDismiss());
  };

  if (!visible) return null;

  const config = variantConfig[variant];

  return (
    <Animated.View
      style={{ transform: [{ translateY }] }}
      className={`absolute top-14 left-md right-md z-50 flex-row items-center rounded-md px-lg py-3 shadow-modal ${config.bg}`}
    >
      <Text className={`${config.text} text-sm mr-2`}>{config.icone}</Text>
      <Text
        className={`${config.text} text-body flex-1`}
        style={{ fontFamily: 'Inter' }}
        numberOfLines={2}
      >
        {mensagem}
      </Text>
      {actionLabel && onAction && (
        <TouchableOpacity onPress={onAction} className="ml-3">
          <Text
            className={`${config.text} text-label font-[700] underline`}
            style={{ fontFamily: 'Inter' }}
          >
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};