import { View, Text } from 'react-native'
import React from 'react'



interface CardProps {
    className?: string;
    children?: React.ReactNode;
}

const WarningCard = ({ className, children }: CardProps) => {

  return (
    <View className={`rounded-md p-4 bg-blue-500/10 border border-dashed border-blue-500 ${className || ''}`}>
        {children}
    </View>
  )
}

export default WarningCard


