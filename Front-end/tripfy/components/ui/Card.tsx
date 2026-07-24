import { View, Text } from 'react-native'
import React, { Children } from 'react'

interface CardProps {
    className?: string;
    children?: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return (
    <View className={`shadow-md rounded-md ${className || ''}`}>
        {children}
    </View>
  )
}

export default Card