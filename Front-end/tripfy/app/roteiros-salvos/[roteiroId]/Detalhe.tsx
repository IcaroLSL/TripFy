import { View, Text, useColorScheme, ScrollView, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ScreenContent } from '../../../components/ScreenContent'
import { AppDescription, AppText, AppTitle } from '../../../components/ui/TextApp'
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons'
import { Button } from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import WarningCard from '../../../components/ui/WarningCard'

const Detalhe = () => {
    const { roteiroId } = useLocalSearchParams()
    const theme = useColorScheme() || 'light';
    return (
        <ScreenContent>
            <View className='flex flex-row justify-between items-center'>
                <Button variant='custom' className='px-2 py-2 rounded-full' theme={theme} onPress={() => { }}>
                    <MaterialIcons name='chevron-left' size={28} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
                </Button>

                <AppTitle theme={theme}>Detalhes</AppTitle>

                <Button variant='custom' className='px-2 py-2 rounded-full' theme={theme} onPress={() => { }}>
                    <MaterialIcons name='favorite' size={24} color={'#ef4444'} />
                </Button>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} >
                <Image source={require('../../../assets/images/image-placeholder.jpeg')} className='w-full h-60 rounded-md mb-4' />

                <View className='gap-2x'>
                    <AppTitle theme={theme}>Trilhas na Chapada Diamantina</AppTitle>
                    <AppDescription theme={theme}>
                        por @pedroaventura · Palmeiras, BA · 6 dias
                    </AppDescription>

                    <View className='flex flex-row gap-4'>

                        <Button variant='custom' className='px-4 py-2 rounded-full border border-blue-500' theme={theme} onPress={() => { }}>
                            <AppText theme={theme} className='text-white'>🌐 Público</AppText>
                        </Button>


                        <Button variant='custom' className='px-4 py-2 rounded-full border border-blue-500' theme={theme} onPress={() => { }}>
                            <AppText theme={theme} className='text-white'>R$ 980 · 4.8★</AppText>
                        </Button>
                    </View>

                    <ScrollView style={{ maxHeight: 220 }} showsVerticalScrollIndicator={false}>
                        <View className='gap-4'>
                            <Card theme={theme} className='p-4 rounded-md flex-1 flex-row items-center' pressable={false}>
                                <AppTitle theme={theme}>Dia 1</AppTitle>
                                <AppDescription theme={theme}> — Cachoeira da Fumaça, Vale do Pati (3 atividades)</AppDescription>
                            </Card>
                            <Card theme={theme} className='p-4 rounded-md flex-1 flex-row items-center' pressable={false}>
                                <AppTitle theme={theme}>Dia 1</AppTitle>
                                <AppDescription theme={theme}> — Cachoeira da Fumaça, Vale do Pati (3 atividades)</AppDescription>
                            </Card>
                            <Card theme={theme} className='p-4 rounded-md flex-1 flex-row items-center' pressable={false}>
                                <AppTitle theme={theme}>Dia 1</AppTitle>
                                <AppDescription theme={theme}> — Cachoeira da Fumaça, Vale do Pati (3 atividades)</AppDescription>
                            </Card>
                            <Card theme={theme} className='p-4 rounded-md flex-1 flex-row items-center' pressable={false}>
                                <AppTitle theme={theme}>Dia 1</AppTitle>
                                <AppDescription theme={theme}> — Cachoeira da Fumaça, Vale do Pati (3 atividades)</AppDescription>
                            </Card>
                            <Card theme={theme} className='p-4 rounded-md flex-1 flex-row items-center' pressable={false}>
                                <AppTitle theme={theme}>Dia 1</AppTitle>
                                <AppDescription theme={theme}> — Cachoeira da Fumaça, Vale do Pati (3 atividades)</AppDescription>
                            </Card>
                            <Card theme={theme} className='p-4 rounded-md flex-1 flex-row items-center' pressable={false}>
                                <AppTitle theme={theme}>Dia 1</AppTitle>
                                <AppDescription theme={theme}> — Cachoeira da Fumaça, Vale do Pati (3 atividades)</AppDescription>
                            </Card>
                            <Card theme={theme} className='p-4 rounded-md flex-1 flex-row items-center' pressable={false}>
                                <AppTitle theme={theme}>Dia 1</AppTitle>
                                <AppDescription theme={theme}> — Cachoeira da Fumaça, Vale do Pati (3 atividades)</AppDescription>
                            </Card>
                        </View>
                    </ScrollView>

                    <Button theme={theme} onPress={() => { }}>
                        <AppText theme={theme} className='text-blue-500'>
                            Clonar para editar
                        </AppText>
                    </Button>

                </View>
            </ScrollView>
        </ScreenContent>
    )
}

export default Detalhe