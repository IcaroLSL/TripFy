import React from 'react';
import { Button, Text, View } from 'react-native';

import { EditScreenInfo } from './EditScreenInfo';
import { router } from 'expo-router';

interface ScreenContentProps {
  title: string;
  path: string;
  children?: React.ReactNode;
}

export const ScreenContent: React.FC<ScreenContentProps> = ({ title, path, children }) => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <View className={styles.separator} />
      <View className='bg-red-500 p-2 gap-2'>
        <Button onPress={()=> router.push('/about/lista')} title='press me'/>
      </View>
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};

const styles = {
  container: `items-center flex-1 justify-center bg-white`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
