import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './Card'
import { CardRoteiroProps } from '../../interfaces/CardRoteiro'
import { AppDescription, AppText, AppTitle } from './TextApp'
import { DefaultProps } from '../../interfaces/DefaultProps'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const CardRoteiro = ({ image, title, location, stars, tripDays, priceLevel, liked, theme }: CardRoteiroProps & DefaultProps) => {

  return (
    <Card className={`min-w-[200px] max-w-[500px] p-0 ${theme === 'light' ? 'bg-white' : 'bg-[#1A1A2E]'} shadow-md rounded-md`}>

      <View className='relative'>
        <Image source={{ uri: image }} style={{ width: '100%', height: 130, borderRadius: 8, borderBottomRightRadius:0, borderBottomLeftRadius: 0 }} />
        
        <View className='absolute top-2 left-2 right-2 flex flex-row justify-between'>
          <View className={`${theme === 'light' ? 'bg-white' : 'bg-[#1A1A2E]'} rounded-full px-2 flex flex-row items-center space-x-1`}>
            <MaterialIcon name="star" className='text-yellow-300' />
            <AppText theme={theme}>{stars}</AppText>
          </View>
          <View className={`${theme === 'light' ? 'bg-white' : 'bg-[#1A1A2E]'} rounded-full px-2 py-2 flex flex-row items-center space-x-1`}>
            {liked ? <MaterialIcon name="favorite" className='text-red-500' /> : <MaterialIcon name="favorite-border" className='text-red-500' />}
          </View>
        </View>
      </View>
      <View className='p-4'>

        <AppTitle theme={theme}>{title}</AppTitle>
        <View className='flex-row space-x-1'>
          <MaterialIcon name="place" className='text-gray-400' />
          <AppDescription theme={theme}>{location}</AppDescription>
        </View>
        {/* <Text>{stars}</Text> */}
        <View className='flex-row space-x-2'>
          <AppText theme={theme} className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Preço avaliado: {priceLevel}<MaterialIcon name="attach-money" className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} /></AppText>
          <View className={`self-end ${theme === 'light' ? 'bg-gray-200' : 'bg-[#1A1A2E]'} rounded-full px-2`}>
            <AppText theme={theme} className='text-gray-900'>{tripDays} dias</AppText>
          </View>
        </View>
        {/* <Text>{liked ? 'Liked' : 'Not Liked'}</Text> */}
      </View>

    </Card>
  )
}

export default CardRoteiro

const styles = StyleSheet.create({})