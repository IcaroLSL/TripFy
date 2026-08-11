import { View, Text, TextInput } from 'react-native'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { DefaultProps } from '../../src/interfaces/DefaultProps'

const Search = ({ theme, className }: DefaultProps) => {
    return (
        <View className={`flex-row items-center justify-start gap-2 px-4 py-2 rounded-lg ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'} ${className}`}>
            <MaterialIcon name='search' size={20} color={theme === 'light' ? '#000' : '#fff'} />
            <TextInput className='w-full' placeholder='Para onde você vai?' placeholderTextColor={theme === 'light' ? '#000' : '#fff'} />
        </View>
    )
}

export default Search