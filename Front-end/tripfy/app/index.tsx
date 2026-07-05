import { StatusBar } from 'expo-status-bar';

import '../global.css'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenContent } from '../components/ScreenContent';
import { Text, useColorScheme, View } from 'react-native';
import Card from '../components/ui/Card';
import CardRoteiro from '../components/ui/CardRoteiro';

export default function App() {
  const theme: 'light' | 'dark' = useColorScheme() || 'light';
  console.log('Current theme:', theme);
  return (
    <SafeAreaProvider>
      <ScreenContent title="Home" path="App.tsx">
        <View
          className='flex-1 items-center justify-center bg-white'
        >
          <Text>Welcome to TripFy!</Text>
          <CardRoteiro
            theme={theme}
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10'
            title="3 dias em Monte Verde"
            location="São Paulo, Brasil"
            stars={4.5}
            tripDays={3}
            priceLevel={2}
            liked={false}
          />
        </View>
      </ScreenContent>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
