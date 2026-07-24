import { View, Text, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import MateriaIcon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

const FooterBar = () => {
    const theme = useColorScheme() || 'light';
    return (
        <View className={`w-screen items-center px-8 justify-between flex self-end flex-row ${theme === 'light' ? 'bg-[#FFFFFF]' : 'bg-[#1A1A2E]'} py-2`}>
            <MateriaIcon name="home" size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
            <MateriaIcon name="favorite" size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
            <TouchableOpacity onPress={() => router.push('/criar-roteiro/CriarRoteiro')}>
                <View className={`p-4  ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-600'} bottom-4 rounded-full`}>
                    <MateriaIcon name="add" size={24} color="#FFFFFF" />
                </View>
            </TouchableOpacity>
            <MateriaIcon name="flight" size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
            <MateriaIcon name="person" size={24} color={theme === 'light' ? '#1A1A2E' : '#FFFFFF'} />
        </View>
    )
}

export default FooterBar