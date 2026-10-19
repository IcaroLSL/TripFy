import { View, Text, useColorScheme, Image, ScrollView } from 'react-native'
import React from 'react'
import { ScreenContent } from '../../components/ScreenContent'
import { AppDescription, AppText, AppTitle } from '../../components/ui/TextApp'
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons'
import { Button } from '../../components/ui/Button'
import Divider from '../../components/ui/Divider'
import Card from '../../components/ui/Card'
import WarningCard from '../../components/ui/WarningCard'
import { router } from 'expo-router'

interface RoteiroInfo {
    name: string;
    creator: string;
    location: string;
    duration: string;
    price: string;
    rating: number;
    savedAt: string;
    privacy: 'public' | 'private';
}

const RoteirosSalvos = () => {
    const theme = useColorScheme() || 'light';
    return (
        <ScreenContent tabIndex={1}>
            <View className='flex justify-center items-center'>
                <AppTitle theme={theme}>Roteiros Salvos</AppTitle>
                <AppDescription theme={theme}>
                    x roteiros
                </AppDescription>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} >
                <View className='gap-4'>

                    <CardRoteiro roteiroInfo={{
                        name: 'Serra Gaúcha: rota do vinho',
                        creator: '@carlaenoturismo',
                        location: 'Gramado, RS',
                        duration: '4 dias',
                        price: 'R$ 690',
                        rating: 4.7,
                        savedAt: 'Salvo há 1 semana',
                        privacy: 'public'
                    }} theme={theme} />

                    <CardRoteiro roteiroInfo={{
                        name: 'Serra Gaúcha: rota do vinho',
                        creator: '@carlaenoturismo',
                        location: 'Gramado, RS',
                        duration: '4 dias',
                        price: 'R$ 690',
                        rating: 4.7,
                        savedAt: 'Salvo há 1 semana',
                        privacy: 'private'
                    }} theme={theme} />
                </View>
            </ScrollView>
        </ScreenContent>
    )
}

export default RoteirosSalvos

const CardRoteiro = ({ theme, roteiroInfo }: { theme: 'light' | 'dark', roteiroInfo: RoteiroInfo }) => {
    const isPublic = roteiroInfo.privacy === 'public';
    
    const handlePress = () => {
        if (isPublic) {
            router.push({pathname: '/roteiros-salvos/[roteiroId]/Detalhe', params: { roteiroId: '1' }});
        }
    };

    return (
        <Card 
            theme={theme} 
            className='p-4 rounded-md' 
            pressable={isPublic}
            onPress={isPublic ? handlePress : undefined}
        >
            <View className='flex flex-row justify-between items-start '>
                <Image source={require('../../assets/images/image-placeholder.jpeg')} className='w-16 h-16 rounded-md' />
                <View className='flex flex-col flex-1 ml-4'>
                    <AppTitle theme={theme}>{roteiroInfo.name}</AppTitle>
                    <AppText theme={theme}>{roteiroInfo.creator}</AppText>
                    <AppText theme={theme}>{roteiroInfo.location} · {roteiroInfo.duration} · {roteiroInfo.price} · {roteiroInfo.rating}<AppText theme={theme} className='text-yellow-500'>★</AppText></AppText>
                </View>
                <Button variant='custom' className='px-2 py-2 rounded-full' theme={theme} onPress={() => { }}>
                    <MaterialIcons name='favorite' size={24} color={'#ef4444'} />
                </Button>
            </View>

            <Divider theme={theme} />

            {roteiroInfo.privacy === 'public' ? (
                <View className='flex flex-row justify-between'>

                    <AppText theme={theme} >
                        Público
                    </AppText>

                    <AppText theme={theme}>
                        {roteiroInfo.savedAt}
                    </AppText>
                </View>

            ) : (
                <View className='gap-4'>
                    <WarningCard>
                        <AppText theme={theme}>
                            🔒 O criador tornou este roteiro privado.

                        </AppText>
                    </WarningCard>

                    <Button variant='default' className='px-2 py-2 rounded-full' theme={theme} onPress={() => { }}>
                        <AppText theme={theme} className='text-blue-500'>
                            Remover
                        </AppText>
                    </Button>
                </View>
            )}



        </Card>
    )
}