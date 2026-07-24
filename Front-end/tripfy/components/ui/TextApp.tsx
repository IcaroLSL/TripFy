import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DefaultProps } from '../../interfaces/DefaultProps'

export const AppText = ({theme, className, children}: DefaultProps & { children: React.ReactNode }) => {

  return (
      <Text className={`${theme === 'light' ? 'text-black' : 'text-white'} ${className} text-base`}>
        {children}
      </Text>
  )
}



export const AppTitle = ({theme, className, children}: DefaultProps & { children: React.ReactNode }) => {

  return (
      <Text className={`${theme === 'light' ? 'text-black' : 'text-white'} ${className} font-bold text-lg`}>
        {children}
      </Text>
  )
}

export const AppDescription = ({theme, className, children}: DefaultProps & { children: React.ReactNode }) => {

  return (
      <Text className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} ${className} text-sm`}>
        {children}
      </Text>
  )
}


