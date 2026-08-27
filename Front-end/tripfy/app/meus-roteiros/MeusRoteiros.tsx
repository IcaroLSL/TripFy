import { View, Text, useColorScheme, Image } from 'react-native'
import React from 'react'
import { ScreenContent } from '../../components/ScreenContent'
import { AppText, AppTitle } from '../../components/ui/TextApp'
import { Button } from '../../components/ui/Button'
import { MaterialIcons } from '@expo/vector-icons'
import Search from '../../components/ui/Search'
import { TextField } from '../../components/ui/FormFields/TextField'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import { CardRoteiroProps } from '@/interfaces/CardRoteiro'
import Card from '../../components/ui/Card'

const formSchema = z.object({
  roteiro: z.string().max(100, { message: 'O nome do roteiro não pode exceder 100 caracteres.' }).optional(),
})

type FormData = z.infer<typeof formSchema>

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
    title: "6 dias na Praia do Meio",
    location: "São Paulo, Brasil",
    stars: 4.5,
    tripDays: 3,
    priceLevel: 3,
    liked: false,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10",
    title: "24 horas nos Montes Apalaches",
    location: "São Paulo, Brasil",
    stars: 4.5,
    tripDays: 3,
    priceLevel: 4,
    liked: false,
  },
];


const MeusRoteiros = () => {
  const theme = useColorScheme() || 'light';
  const [filter, setFilter] = React.useState<'todos' | 'emGrupo' | 'rascunhos'>('todos');
  const { control } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  return (
    <ScreenContent tabIndex={3}>
      <View className='flex flex-row justify-between items-center'>
        <AppTitle theme={theme}>Meus Roteiros</AppTitle>
        <Button variant='custom' theme={theme} className=' flex-row justify-center items-center gap-1 py-2 px-4 active:opacity-75 bg-blue-600 rounded-full' onPress={() => { }}>
          <MaterialIcons name='add' size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
          <AppTitle theme={theme}>Novo</AppTitle>
        </Button>
      </View>

      <View>
        <AppText theme={theme}>
          x roteiros
        </AppText>
      </View>

      <TextField theme={theme} control={control} name='roteiro' placeholder='Buscar roteiros...' icon='search' />

      <View className='flex flex-row gap-4'>
        <Button variant='custom' className={`rounded-full px-4 py-2 active:opacity-75 border border-blue-600 ${filter === 'todos' ? 'bg-blue-600 text-white' : 'bg-transparent text-blue-600'}`} theme={theme} onPress={() => { setFilter('todos') }}>
          <AppText theme={theme}>Todos</AppText>
        </Button>

        <Button variant='custom' className={`rounded-full px-4 py-2 active:opacity-75 border border-blue-600 ${filter === 'emGrupo' ? 'bg-blue-600 text-white' : 'bg-transparent text-blue-600'}`} theme={theme} onPress={() => { setFilter('emGrupo') }}>
          <AppText theme={theme}>Em grupo</AppText>
        </Button>

        <Button variant='custom' className={`rounded-full px-4 py-2 active:opacity-75 border border-blue-600 ${filter === 'rascunhos' ? 'bg-blue-600 text-white' : 'bg-transparent text-blue-600'}`} theme={theme} onPress={() => { setFilter('rascunhos') }}>
          <AppText theme={theme}>Rascunhos</AppText>
        </Button>
      </View>

      <View className='gap-4'>
        {roteiros.map((roteiro, index) => (
          <Card theme={theme} key={index} className={`flex flex-row justify-between items-center p-4 rounded-md`}>
            <View className='flex flex-row gap-4 items-center flex-1'>
              {
                roteiro.image ? (
                  <View className={`w-16 h-16 rounded-md ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`}>
                    <Image source={{ uri: roteiro.image }} className='w-full h-full rounded-md' />
                  </View>
                ) : (
                  <View className={`w-16 h-16 rounded-md ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`}>
                    <Image source={require('../../assets/images/image-placeholder.jpeg')} className='w-full h-full rounded-md' />
                  </View>
                )
              }
              <View className='flex-1'>
                <AppTitle
                  className='text-lg font-bold'
                  theme={theme}
                >
                  {roteiro.title}
                </AppTitle>
                <AppText
                  theme={theme}
                >
                  {roteiro.location}
                </AppText>
              </View>
            </View>

            <Button variant='custom' className={`rounded-full px-4 py-2 active:opacity-75 border border-blue-600 ${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`} theme={theme} onPress={() => { }}>
              <AppText theme={theme}>Editar</AppText>
            </Button>
          </Card>
        ))}
      </View>
    </ScreenContent>
  )
}

export default MeusRoteiros