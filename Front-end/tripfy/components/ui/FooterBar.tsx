import { View, Text, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import MateriaIcon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

const FooterBar = () => {
    const { signOut } = useAuthStore()
    const theme = useColorScheme() || 'light';

    return (
        <View className={`w-full items-center px-8 justify-between flex self-end flex-row ${theme === 'light' ? 'bg-[#FFFFFF]' : 'bg-[#1A1A2E]'} py-2`}>
            <TouchableOpacity onPress={() => router.push('/home/home')} >
                <View className={`p-4  ${theme === 'light' ? 'active:bg-gray-100' : 'active:bg-gray-100/10'} rounded-full`}>
                    <MateriaIcon name="home" size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity  >
                <View className={`p-4  ${theme === 'light' ? 'active:bg-gray-100' : 'active:bg-gray-100/10'} rounded-full`}>
                    <MateriaIcon name="favorite" size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
                </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {console.log('teste');router.push('/criar-roteiro/CriarRoteiro')}}>
                <View className={`p-4  ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-600'} rounded-full`}>
                    <MateriaIcon name="add" size={24} color="#FFFFFF" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity  >
                <View className={`p-4  ${theme === 'light' ? 'active:bg-gray-100' : 'active:bg-gray-100/10'} rounded-full`}>
                    <MateriaIcon name="flight" size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>{console.log('teste'); signOut()}} >
                <View className={`p-4  ${theme === 'light' ? 'active:bg-gray-100' : 'active:bg-gray-100/10'} rounded-full`}>
                    <MateriaIcon name="person" size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default FooterBar