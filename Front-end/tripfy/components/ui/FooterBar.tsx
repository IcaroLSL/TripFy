import { View, Text, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import MateriaIcon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { SafeAreaView } from 'react-native-safe-area-context';

const FooterBar = ({ tabIndex }: { tabIndex?: number }) => {
    const { signOut } = useAuthStore()
    const theme = useColorScheme() || 'light';

    return (
        <SafeAreaView edges={['bottom']} className={`w-full ${theme === 'light' ? 'bg-[#FFFFFF]' : 'bg-[#1A1A2E]'}`}>
            <View className='w-full items-center px-8 justify-between flex self-end flex-row py-2'>
                <TouchableOpacity className={`p-4 ${tabIndex === 0 ? 'bg-blue-900' : ''} ${theme === 'light' ? 'active:bg-gray-100' : 'active:bg-gray-100/10'} rounded-full`} onPress={() => router.push('/home/home')} >
                    <View>
                        <MateriaIcon name="home" size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className={`p-4 ${tabIndex === 1 ? 'bg-blue-900' : ''} ${theme === 'light' ? 'active:bg-gray-100' : 'active:bg-gray-100/10'} rounded-full`} onPress={() => { }}>
                    <View>
                        <MateriaIcon name="favorite" size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
                    </View>
                </TouchableOpacity>


                <TouchableOpacity className={`p-4 ${tabIndex === 2 ? 'bg-blue-900' : ''} ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-600'} rounded-full bottom-4`} onPress={() => { router.push('/criar-roteiro/CriarRoteiro') }}>
                    <View>
                        <MateriaIcon name="add" size={24} color="#FFFFFF" />
                    </View>
                </TouchableOpacity>


                <TouchableOpacity className={`p-4 ${tabIndex === 3 ? 'bg-blue-900' : ''} ${theme === 'light' ? 'active:bg-gray-100' : 'active:bg-gray-100/10'} rounded-md`} onPress={() => { router.push('/meus-roteiros/MeusRoteiros') }}>
                    <View>
                        <MateriaIcon name="flight" size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className={`p-4 ${tabIndex === 4 ? 'bg-blue-600/30' : ''} flex self-center items-center ${theme === 'light' ? 'active:bg-gray-100' : 'active:bg-gray-100/10'} rounded-full`} onPress={() => { signOut() }} >
                    <MateriaIcon name="person" size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default FooterBar