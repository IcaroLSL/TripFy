import React from 'react';
import { View, Text } from 'react-native';

interface StarRatingProps {
  avaliacao: number; // 1.0 a 5.0
  totalAvaliacoes?: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
}

const StarSvg: React.FC<{ fill: number; size: number }> = ({ fill, size }) => {
  // fill: 0 = vazia, 0.5 = meia, 1 = cheia
  return (
    <View style={{ width: size, height: size }}>
      <Text
        style={{ fontSize: size, lineHeight: size * 1.2 }}
        className="text-center"
      >
        {fill >= 1 ? '★' : fill >= 0.5 ? '★' : '☆'}
      </Text>
    </View>
  );
};

export const StarRating: React.FC<StarRatingProps> = ({
  avaliacao,
  totalAvaliacoes,
  size = 'sm',
  showCount = true,
}) => {
  const starSize = size === 'sm' ? 14 : 20;
  const textColor = '#F4A623';
  const emptyColor = '#E5E7EB';
  const textSize = size === 'sm' ? 'text-caption' : 'text-label';

  // Arredonda para meia estrela mais proxima
  const rounded = Math.round(avaliacao * 2) / 2;

  return (
    <View className="flex-row items-center gap-1">
      <View className="flex-row gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = Math.min(1, Math.max(0, rounded - (star - 1)));
          return (
            <Text
              key={star}
              style={{
                fontSize: starSize,
                lineHeight: starSize * 1.2,
                color: fill >= 1 ? textColor : fill >= 0.5 ? textColor : emptyColor,
              }}
            >
              {fill >= 0.5 ? '★' : '☆'}
            </Text>
          );
        })}
      </View>
      {showCount && totalAvaliacoes !== undefined && (
        <Text className={`${textSize} text-muted ml-1`} style={{ fontFamily: 'Inter' }}>
          {avaliacao.toFixed(1)} ({totalAvaliacoes})
        </Text>
      )}
    </View>
  );
};