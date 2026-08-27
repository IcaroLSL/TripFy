import React from 'react';
import { ScrollView, useColorScheme, View } from 'react-native';

import FooterBar from './ui/FooterBar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContentProps {
  children?: React.ReactNode;
  footerBar?: boolean
  tabIndex?: number
}

export const ScreenContent: React.FC<ScreenContentProps> = ({ children, footerBar = true, tabIndex }) => {
  const theme: 'light' | 'dark' = useColorScheme() || 'light';
  return (
    <SafeAreaProvider>
      <SafeAreaView className={`flex-1 w-full ${theme === 'light' ? 'bg-[#F5F5F5]' : 'bg-[#0F0F1A]'} flex flex-col justify-between`}>

        <ScrollView
          className='flex-1 w-full'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className='p-4 gap-4 flex-1'>
            {children}
          </View>
        </ScrollView>

        {footerBar && <FooterBar tabIndex={tabIndex} />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
