import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CategoriaAtividade } from '../../src/types';
import { CATEGORIAS } from '../../src/constants';

interface CategoryChipProps {
  categoria: CategoriaAtividade;
  selected?: boolean;
  onPress?: (categoria: CategoriaAtividade) => void;
  size?: 'sm' | 'md';
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  categoria,
  selected = false,
  onPress,
  size = 'md',
}) => {
  const cat = CATEGORIAS[categoria];
  const isSmall = size === 'sm';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress?.(categoria)}
      className={`flex-row items-center rounded-pill border px-3 ${isSmall ? 'py-0.5' : 'py-1.5'} ${
        selected ? 'border-primary bg-primary' : 'border-border bg-surface'
      }`}
    >
      <Text className={isSmall ? 'text-sm' : 'text-base'}>{cat.icone}</Text>
      <Text
        className={`ml-1.5 ${isSmall ? 'text-caption' : 'text-label'} font-[500] ${
          selected ? 'text-white' : 'text-text'
        }`}
        style={{ fontFamily: 'Inter' }}
      >
        {cat.label}
      </Text>
    </TouchableOpacity>
  );
};