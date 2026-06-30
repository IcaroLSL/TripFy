import React from 'react';
import { View, Text } from 'react-native';
import { FaixaPreco } from '../../src/types';

interface PriceIndicatorProps {
  faixa: FaixaPreco;
  size?: 'sm' | 'md';
}

const NIVEIS = ['$', '$$', '$$$', '$$$$'];

export const PriceIndicator: React.FC<PriceIndicatorProps> = ({ faixa, size = 'sm' }) => {
  if (faixa === FaixaPreco.GRATUITO) {
    return (
      <View className="rounded-sm bg-success px-1.5 py-0.5">
        <Text className="text-caption font-[600] text-white" style={{ fontFamily: 'Inter' }}>
          Gratis
        </Text>
      </View>
    );
  }

  const nivelAtivo = NIVEIS.indexOf(faixa);
  const textSize = size === 'sm' ? 'text-caption' : 'text-label';

  return (
    <View className="flex-row items-center gap-0.5">
      {NIVEIS.map((cifrao, i) => (
        <Text
          key={i}
          className={`${textSize} font-[700]`}
          style={{
            fontFamily: 'Inter',
            color: i <= nivelAtivo ? '#F4A623' : '#E5E7EB',
          }}
        >
          {cifrao}
        </Text>
      ))}
    </View>
  );
};