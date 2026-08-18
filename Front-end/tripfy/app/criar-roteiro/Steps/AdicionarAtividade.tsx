import { View, Text, useColorScheme, TouchableOpacity, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'
import { ScreenContent } from '../../../components/ScreenContent'
import { AppDescription, AppText, AppTitle } from '../../../components/ui/TextApp'
import { Button } from '../../../components/ui/Button'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import Search from '../../../components/ui/Search'
import { useForm } from 'react-hook-form'
import { TextField } from '../../../components/ui/FormFields/TextField'

const AdicionarAtividade = () => {
    const color = useColorScheme() || 'light';
    const { control } = useForm()
    return (
        <ScreenContent>
            <View className='flex flex-row justify-between'>
                <View></View>

                <AppTitle theme={color} >Adicionar Atividade</AppTitle>

                <TouchableOpacity className='rounded-full border border-blue-500 p-1' onPress={() => router.back()}>
                    <MaterialIcons name="close" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <View className='flex self-center'>
                <AppDescription theme={color}>
                    Dia 1
                </AppDescription>
            </View>
            <View>
                <TextField icon='search' theme={color} control={control} name='atividade' placeholder='Buscar por nome (ex: Museu Nacional)' />
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 0 }}
                contentContainerStyle={{
                    gap: 16,
                    paddingVertical: 4,
                    alignItems: 'center',
                }}
            >
                <Button onPress={() => { }} theme={color} className='flex-row p-2 justify-between items-center rounded-md'>
                    <AppText theme={color}>
                        Categoria · 12
                    </AppText>

                    <MaterialIcons
                        name="arrow-drop-down"
                        size={20}
                        color={color === 'light' ? 'black' : 'white'}
                    />
                </Button>

                <Button onPress={() => { }} theme={color} className='flex-row p-2 justify-between items-center rounded-md'>
                    <AppText theme={color}>
                        Preço · $–$$$
                    </AppText>

                    <MaterialIcons
                        name="arrow-drop-down"
                        size={20}
                        color={color === 'light' ? 'black' : 'white'}
                    />
                </Button>

                <Button onPress={() => { }} theme={color} className='flex-row p-2  justify-between items-center rounded-md'>
                    <AppText theme={color}>
                        Avaliação · 4★+
                    </AppText>

                    <MaterialIcons
                        name="arrow-drop-down"
                        size={20}
                        color={color === 'light' ? 'black' : 'white'}
                    />
                </Button>
            </ScrollView>

            <View className='flex-row justify-between items-center mt-6'>
                <AppText theme={color}>
                    Atividades encontradas
                </AppText>

                <TouchableOpacity>
                    <AppText
                        theme={color}
                        className='text-blue-500'
                    >
                        Ver todas
                    </AppText>
                </TouchableOpacity>
            </View>

            <ScrollView>
                <Button className='flex flex-row justify-between gap-2 items-center' onPress={() => { }} theme={color} variant='outline'>
                    <Image source={ { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10' } } style={{ width: 40, height: 40, borderRadius: 8 }} />

                    <Text className={`text-base flex-1 ${color === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={2} ellipsizeMode='tail'>
                       Esportes · Complexo esportivo — Grátis · 4.1★ · 3.4 km
                    </Text>

                    <Pressable onPress={() => {}}>
                        <MaterialIcons name='close' color='white' size={20} />
                    </Pressable>
                </Button>
            </ScrollView>
        </ScreenContent>
    )
}

export default AdicionarAtividade