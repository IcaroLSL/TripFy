import { View, Text } from 'react-native'
import React from 'react'

interface StepViewerProps {
    totalSteps: number;
    currentStep: number;
}

const StepViewer = ({ totalSteps, currentStep }: StepViewerProps) => {
  return (
    <View className='flex flex-row gap-6 justify-center'>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          className={`w-16 h-3  rounded-full ${index + 1 === currentStep ? 'bg-blue-600' : 'bg-gray-300'}`}
        />
      ))}
    </View>
  )
}

export default StepViewer