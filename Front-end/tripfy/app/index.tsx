import { StatusBar } from 'expo-status-bar';

import '../global.css'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenContent } from '../components/ScreenContent';
import { Text, useColorScheme, View } from 'react-native';
import Card from '../components/ui/Card';
import CardRoteiro from '../components/ui/CardRoteiro';
import CarrosselRoteiros from '../components/ui/CarrosselRoteiros';
import { CardRoteiroProps } from '../interfaces/CardRoteiro';
import Search from '../components/ui/Search';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
  const theme: 'light' | 'dark' = useColorScheme() || 'light';
  console.log('Current theme:', theme);

  const roteiros: CardRoteiroProps[] = [
    {
      image:
        "",
      title: "3 dias em Monte Verde",
      location: "São Paulo, Brasil",
      stars: 4.5,
      tripDays: 3,
      priceLevel: 2,
      liked: true,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10",
      title: "3 dias em Monte Verde",
      location: "São Paulo, Brasil",
      stars: 4.5,
      tripDays: 3,
      priceLevel: 3,
      liked: false,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10",
      title: "3 dias em Monte Verde",
      location: "São Paulo, Brasil",
      stars: 4.5,
      tripDays: 3,
      priceLevel: 4,
      liked: false,
    },
  ];

  return (
    <SafeAreaProvider>
      <ScreenContent>
        <View className='flex flex-row w-full gap-4'>
          <Search theme={theme}  className='w-full'/>
          <View className={`rounded-full items-center p-2 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'}`}>
            <MaterialIcon name='notifications' size={24} color={theme === 'light' ? '#000' : '#fff'} />
          </View>
        </View>
        <CarrosselRoteiros theme={theme} titulo='Perto de Você' descricao='Raio de 50km da sua localização' listaRoteiros={roteiros} />
        <CarrosselRoteiros theme={theme} titulo='Mais Bem Avaliados' descricao='Nota Acima de 4.5' listaRoteiros={roteiros} />

      </ScreenContent>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
