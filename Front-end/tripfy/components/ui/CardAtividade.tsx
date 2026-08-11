import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { CardAtividadeProps } from '@/interfaces/CardAtividade'
import { AppDescription, AppText, AppTitle } from './TextApp'
import { MaterialIcons } from '@expo/vector-icons'
import Card from './Card'
import { Button } from './Button'

const CardAtividade = ({ image, title, stars, priceLevel, added, theme }: CardAtividadeProps) => {
    return (
        <Card theme={theme} className={`min-w-[180px] max-w-[180px] p-0 shadow-md rounded-md`}>
            <View className='relative'>
                <Image source={image !== '' ? { uri: image } : require('../../assets/images/image-placeholder.jpeg')} style={{ width: '100%', height: 130, borderRadius: 8, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }} />
            </View>

            <View className='p-4'>

                <AppTitle theme={theme}>{title}</AppTitle>
                <View className='flex-row justify-between items-center  mt-2'>
                    <View className='flex-row items-center gap-3'>
                        {priceLevel !== null ? (
                            <View className='flex-row items-center'>
                                {Array.from({ length: priceLevel }).map((_, i) => (
                                    <MaterialIcons
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


                        <View>
                            <AppText theme={theme} className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                                {stars} <MaterialIcons name="star" color={'#eab308'} className='text-yellow-500' />
                            </AppText>
                        </View>
                    </View>
                    <Button  onPress={()=> {}} variant={added ? 'outline' : 'default'} theme={theme} className='px-1 py-1 rounded-md'>
                        <Text className={`text-sm text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                            {added ? (<MaterialIcons name="check" color={'white'} size={16} />) :  (<MaterialIcons name="add" color={'white'} size={16} />)}
                        </Text>
                    </Button>
                </View>
            </View>
        </Card>
    )
}

export default CardAtividade