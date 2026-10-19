import { View, Pressable } from 'react-native'
import React, { Children } from 'react'

interface CardProps {
  className?: string;
  children?: React.ReactNode;
  theme: 'light' | 'dark';
  pressable?: boolean;
  onPress?: () => void;
}

const Card = ({ className, children, theme, pressable = false, onPress }: CardProps) => {
  return (
    <Pressable onPress={onPress} disabled={!pressable}>
      <View pointerEvents={pressable ? 'none' : 'auto'} className={`shadow-md rounded-md ${className || ''} ${theme === 'light' ? 'bg-white' : 'bg-[#1A1A2E]'} ${pressable && 'active:bg-[#1A1A2E]/60'}`}>
        {children}
      </View>
    </Pressable>
  )
}

export default Card