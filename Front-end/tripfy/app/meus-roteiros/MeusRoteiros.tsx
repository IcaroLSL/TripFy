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
import { router } from 'expo-router'

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
          <MaterialIcons name='add' size={24} color={theme === 'light' ? '#FFFFFF' : '#FFFFFF'} />
          <AppTitle className='text-white' theme={theme}>Novo</AppTitle>
        </Button>
      </View>

      <View>
        <AppText theme={theme}>
          x roteiros
        </AppText>
      </View>

      {roteiros.length > 0 ? (
        <>
          <TextField theme={theme} control={control} name='roteiro' placeholder='Buscar roteiros...' icon='search' />

          <View className='flex flex-row gap-4'>
            <Button variant='custom' className={`rounded-full px-4 py-2 active:opacity-75 border border-blue-600 ${filter === 'todos' ? 'bg-blue-600 text-white' : 'bg-transparent text-blue-600'}`} theme={theme} onPress={() => { setFilter('todos') }}>
              <AppText className={filter === 'todos' ? 'text-white' : ''} theme={theme}>Todos</AppText>
            </Button>

            <Button variant='custom' className={`rounded-full px-4 py-2 active:opacity-75 border border-blue-600 ${filter === 'emGrupo' ? 'bg-blue-600 text-white' : 'bg-transparent text-blue-600'}`} theme={theme} onPress={() => { setFilter('emGrupo') }}>
              <AppText className={filter === 'emGrupo' ? 'text-white' : ''} theme={theme}>Em grupo</AppText>
            </Button>

            <Button variant='custom' className={`rounded-full px-4 py-2 active:opacity-75 border border-blue-600 ${filter === 'rascunhos' ? 'bg-blue-600 text-white' : 'bg-transparent text-blue-600'}`} theme={theme} onPress={() => { setFilter('rascunhos') }}>
              <AppText className={filter === 'rascunhos' ? 'text-white' : ''} theme={theme}>Rascunhos</AppText>
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
                  <AppText className='text-white' theme={theme}>Editar</AppText>
                </Button>
              </Card>
            ))}
          </View>
        </>
      ) : (
        <View className="flex-1 justify-center items-center px-6">
          {/* Ícone principal com fundo suave */}
          <View
            className="w-24 h-24 mb-8 justify-center items-center rounded-full"
            style={{
              backgroundColor: theme === 'light' ? '#e5e7eb' : '#2563eb26', // tint 10-15%
            }}
          >
            <MaterialIcons
              name="flight"
              size={44}
              color={theme === 'light' ? '#2563eb' : '#60A5FA'}
              style={{ transform: [{ rotate: '-45deg' }] }}
            />

            {/* Badge ancorado no canto, com borda "cutout" */}
            <View
              className="absolute justify-center items-center rounded-full"
              style={{
                bottom: -2,
                right: -2,
                width: 32,
                height: 32,
                backgroundColor: theme === 'light' ? '#2563eb' : '#2563eb',
                borderWidth: 3,
                borderColor: theme === 'light' ? '#FFFFFF' : '#0B0F1A', // cor do fundo da tela
              }}
            >
              <MaterialIcons name="add" size={16} color="#FFFFFF" />
            </View>
          </View>

          <AppTitle theme={theme} className="text-xl font-bold text-center mb-2">
            Nenhum roteiro ainda
          </AppTitle>
          <AppText theme={theme} className="text-center text-sm leading-6 mb-6">
            Monte seu primeiro roteiro em poucos passos — a gente te ajuda com
            sugestões pelo caminho.
          </AppText>
          <Button
            variant="custom"
            theme={theme}
            className="flex-row justify-center items-center gap-2 py-3 px-6 active:opacity-75 bg-blue-600 rounded-full"
            onPress={() => router.push('/criar-roteiro/CriarRoteiro')}
          >
            <MaterialIcons name="add" size={20} color="#FFFFFF" />
            <AppText theme={theme} className="text-white font-semibold">
              Criar roteiro
            </AppText>
          </Button>
        </View>
      )}


    </ScreenContent>
  )
}

export default MeusRoteiros