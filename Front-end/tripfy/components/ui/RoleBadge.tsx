import React from 'react';
import { View, Text } from 'react-native';
import { PapelGrupo } from '../../src/types';
import { PAPEIS_GRUPO } from '../../src/constants';

interface RoleBadgeProps {
  papel: PapelGrupo;
  size?: 'sm' | 'md';
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ papel, size = 'sm' }) => {
  const config = PAPEIS_GRUPO[papel];
  const isSmall = size === 'sm';

  return (
    <View
      className={`rounded-pill px-2 ${isSmall ? 'py-0.5' : 'py-1'}`}
      style={{ backgroundColor: config.bg }}
    >
      <Text
        className={`${isSmall ? 'text-[10px]' : 'text-caption'} font-[600]`}
        style={{ color: config.textColor, fontFamily: 'Inter' }}
      >
        {config.label}
      </Text>
    </View>
  );
};