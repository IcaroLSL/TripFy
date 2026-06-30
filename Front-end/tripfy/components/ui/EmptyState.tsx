import React from 'react';
import { View, Text } from 'react-native';
import { Button } from './Button';

interface EmptyStateProps {
  icone?: string;
  titulo: string;
  descricao?: string;
  acaoLabel?: string;
  onAcao?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icone = '📭',
  titulo,
  descricao,
  acaoLabel,
  onAcao,
}) => {
  return (
    <View className="flex-1 items-center justify-center px-xl py-xl">
      <Text className="text-[48px] mb-lg">{icone}</Text>
      <Text
        className="text-heading font-[600] text-text text-center mb-2"
        style={{ fontFamily: 'Inter' }}
      >
        {titulo}
      </Text>
      {descricao && (
        <Text
          className="text-body text-muted text-center mb-lg max-w-xs"
          style={{ fontFamily: 'Inter' }}
        >
          {descricao}
        </Text>
      )}
      {acaoLabel && onAcao && (
        <Button variant="primary" size="md" onPress={onAcao}>
          {acaoLabel}
        </Button>
      )}
    </View>
  );
};