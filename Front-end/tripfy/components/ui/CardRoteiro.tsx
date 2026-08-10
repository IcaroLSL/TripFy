import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Card from './Card'
import { CardRoteiroProps } from '../../src/interfaces/CardRoteiro'
import { AppDescription, AppText, AppTitle } from './TextApp'
import { DefaultProps } from '../../src/interfaces/DefaultProps'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const CardRoteiro = ({ image, title, location, stars, tripDays, priceLevel, liked, theme }: CardRoteiroProps & DefaultProps) => {
  const [isLiked, setIsLiked] = React.useState(liked);

  const onLikePress = () => {
    setIsLiked(!isLiked);
  }

  return (
    <Card theme={theme} className={`min-w-[250px] max-w-[250px] p-0 shadow-md rounded-md`}>

      <View className='relative'>
        <Image source={image !== '' ? { uri: image } : require('../../assets/images/image-placeholder.jpeg')} style={{ width: '100%', height: 130, borderRadius: 8, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }} />

        <View className='absolute top-2 left-2 right-2 flex flex-row items-center justify-between'>
          <View className={`${theme === 'light' ? 'bg-white' : 'bg-[#1A1A2E]'} rounded-full px-2 py-1 flex flex-row items-center space-x-1`}>
            <MaterialIcon name="star" color={'#eab308'} className='text-yellow-500' />
            <AppText theme={theme}>{stars}</AppText>
          </View>
          <TouchableOpacity  className={`${theme === 'light' ? 'bg-white active:bg-white/50' : 'bg-[#1A1A2E] active:bg-[#1A1A2E]/50'} rounded-full px-2 py-2 flex flex-row items-center space-x-1`} onPress={onLikePress}>
            {isLiked ? <MaterialIcon name="favorite" color={"#ef4444"} size={24} className='text-red-500' /> : <MaterialIcon color={'#ef4444'} name="favorite-border" size={24} className='text-red-500' />}
          </TouchableOpacity>
        </View>
      </View>
      <View className='p-4'>

        <AppTitle theme={theme}>{title}</AppTitle>
        <View className='flex-row space-x-1'>
          <MaterialIcon name="place" className='text-gray-400' />
          <AppDescription theme={theme}>{location}</AppDescription>
        </View>

        <View className='flex-row justify-between items-center mt-2'>
          <View className='flex-row items-center gap-1'>
            <AppText theme={theme} className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
              Preço avaliado:
            </AppText>

            {priceLevel !== null ? (
              <View className='flex-row items-center gap-0.5'>
                {Array.from({ length: priceLevel }).map((_, i) => (
                  <MaterialIcon
                    key={i}
                    name="attach-money"
                    color={'#16a34a'}
                    size={16}
                  />
                ))}
              </View>
            ) : (
              <AppText theme={theme} className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                Não disponível
              </AppText>
            )}
          </View>

          <View className={`self-end ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-400'} rounded-full px-2`}>
            <AppText theme={theme} className='text-gray-900'>{tripDays} dias</AppText>
          </View>
        </View>
      </View>

    </Card>
  )
}

export default CardRoteiro

const styles = StyleSheet.create({})