import { View, Text } from 'react-native'
import React from 'react'
import { AppDescription } from './TextApp';

interface DividerProps {
  theme: 'light' | 'dark';
  message?: string;
}

const Divider = ({ theme, message }: DividerProps) => {
  return (
    <View className="flex-row items-center justify-between gap-4 my-4">

      {message ? (
        <>
          <View className={`flex-1 h-[1px] ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`} />
            <AppDescription theme={theme} className="text-center">
              {message}
            </AppDescription>
          <View className={`flex-1 h-[1px] ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`} />

        </>

      ) : (
        <View className={`flex-1 h-[1px] ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`} />
      )}

    </View>
  )
}

export default Divider