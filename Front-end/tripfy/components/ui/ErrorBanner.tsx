import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MENSAGENS_ERRO } from '../../src/constants';

interface ErrorBannerProps {
  codigo?: string;
  mensagem?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  fixo?: boolean; // banner fixo no topo
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  codigo,
  mensagem,
  onRetry,
  onDismiss,
  fixo = false,
}) => {
  const msg = mensagem || (codigo ? MENSAGENS_ERRO[codigo] : 'Erro desconhecido.');

  const banner = (
    <View
      className={`flex-row items-start gap-3 rounded-md border border-error/20 bg-[#FEF2F2] px-md py-3 ${
        fixo ? '' : 'mx-md'
      }`}
    >
      <Text className="text-base mt-0.5">⚠️</Text>
      <Text
        className="flex-1 text-body text-text"
        style={{ fontFamily: 'Inter' }}
      >
        {msg}
      </Text>
      <View className="flex-row gap-2">
        {onRetry && (
          <TouchableOpacity onPress={onRetry} className="rounded-sm bg-primary px-3 py-1.5">
            <Text className="text-caption font-[600] text-white" style={{ fontFamily: 'Inter' }}>
              Tentar novamente
            </Text>
          </TouchableOpacity>
        )}
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss} className="py-1.5">
            <Text className="text-base text-muted">✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (fixo) {
    return (
      <View className="absolute top-14 left-0 right-0 z-50 px-md">{banner}</View>
    );
  }

  return <View className="py-2">{banner}</View>;
};