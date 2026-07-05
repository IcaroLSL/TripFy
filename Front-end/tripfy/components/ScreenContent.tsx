import React from 'react';
import { Text, View } from 'react-native';

import FooterBar from './ui/FooterBar';

interface ScreenContentProps {
  title: string;
  path: string;
  children?: React.ReactNode;
}

export const ScreenContent: React.FC<ScreenContentProps> = ({ title, path, children }) => {
  return (
    <View className='h-screen w-screen bg-[#F5F5F5] flex flex-col justify-between'>
      <Text className='text-3xl font-bold'>{title}</Text>
      {children}
      <FooterBar/>
    </View>
  );
};
