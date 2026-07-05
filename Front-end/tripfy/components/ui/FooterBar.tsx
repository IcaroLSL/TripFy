import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import MateriaIcon from 'react-native-vector-icons/MaterialIcons';

const FooterBar = () => {
    const theme = useColorScheme() || 'light';
    return (
        <View className={`w-screen items-center px-8 justify-between flex self-end flex-row ${theme === 'light' ? 'bg-[#1A1A2E]' : 'bg-[#F7F5F0]'} py-2`}>
            <MateriaIcon name="home" size={24} color={theme === 'light' ? '#FFFFFF' : '#1A1A2E'} />
            <MateriaIcon name="favorite" size={24} color={theme === 'light' ? '#FFFFFF' : '#1A1A2E'} />
            <View className={`p-4  ${theme === 'light' ? 'bg-[#1E6B5E]' : 'bg-[#1E6B5E]'} bottom-4 rounded-full`}>
                <MateriaIcon name="add" size={24} color="#FFFFFF" />
            </View>
            <MateriaIcon name="flight" size={24} color={theme === 'light' ? '#FFFFFF' : '#1A1A2E'} />
            <MateriaIcon name="person" size={24} color={theme === 'light' ? '#FFFFFF' : '#1A1A2E'} />
        </View>
    )
}

export default FooterBar