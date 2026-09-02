import { View, Text, TouchableOpacity } from 'react-native'
import React, { Children } from 'react'

interface CardProps {
    className?: string;
    children?: React.ReactNode;
    theme: 'light' | 'dark';
    pressable?: boolean;
    onPress?: () => void;
}

const Card = ({ className, children, theme, pressable, onPress }: CardProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={`shadow-md rounded-md ${className || ''} ${theme === 'light' ? 'bg-white' : 'bg-[#1A1A2E]'} ${pressable ? 'active:bg-gray-200/50 dark:active:bg-[#1A1A2E]/50' : ''}`}>
        {children}
    </TouchableOpacity>
  )
}

export default Card