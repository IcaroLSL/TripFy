import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

import FooterBar from './ui/FooterBar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContentProps {
  children?: React.ReactNode;
}

export const ScreenContent: React.FC<ScreenContentProps> = ({ children }) => {
  const theme: 'light' | 'dark' = useColorScheme() || 'light';
  return (
    <SafeAreaProvider>

      <SafeAreaView className={`h-screen w-screen ${theme === 'light' ? 'bg-[#F5F5F5]' : 'bg-[#0F0F1A]'} flex flex-col justify-between`}>
        
        <View className='p-4 gap-4'>
          {children}
        </View>

        <FooterBar />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
