import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Roteiro } from '@/interfaces/Roteiro'
import { ScreenContent } from '../../../components/ScreenContent'
import { useLocalSearchParams } from 'expo-router'
import { AppTitle } from '../../../components/ui/TextApp'

const RoteiroId = () => {
    const theme: 'light' | 'dark' = useColorScheme() || 'light'
    const {roteiroId, roteiroName} = useLocalSearchParams<{ roteiroId: string, roteiroName: string }>()
    return (
        <>
            <ScreenContent tabIndex={3}>
                <View className='items-center flex self-center flex-wrap justify-center'>
                    <AppTitle theme={theme} className='text-2xl font-bold'>{roteiroName}</AppTitle>
                </View>
            </ScreenContent>
        </>
    )
}

export default RoteiroId