import { View, Text } from 'react-native'
import React, { Children } from 'react'

interface CardProps {
    className?: string;
    children?: React.ReactNode;
    theme: 'light' | 'dark';
}

const Card = ({ className, children, theme }: CardProps) => {
  return (
    <View className={`shadow-md rounded-md p-4 ${className || ''} ${theme === 'light' ? 'bg-white' : 'bg-[#1A1A2E]'}`}>
        {children}
    </View>
  )
}

export default Card