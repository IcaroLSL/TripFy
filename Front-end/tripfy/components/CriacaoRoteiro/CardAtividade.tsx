import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { CardAtividadeProps } from '@/interfaces/CardAtividade'
import { AppDescription, AppText, AppTitle } from '../ui/TextApp'
import { MaterialIcons } from '@expo/vector-icons'
import Card from '../ui/Card'
import { Button } from '../ui/Button'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ModalAtividadeTime from './ModalAtividadeTime'

const formSchema = z.object({
    startTime: z.string().min(1, { message: "Horário de início é obrigatório" }),
    endTime: z.string().min(1, { message: "Horário de fim é obrigatório" }),
})

type FormData = z.infer<typeof formSchema>;

const CardAtividade = ({ atividade, theme, onAddActivity, added }: CardAtividadeProps) => {
    const [addedActivity, setAddedActivity] = useState<boolean>(added)
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false)
    const addedActivityRef = useRef<boolean>(false)
    const { control, handleSubmit, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startTime: '',
            endTime: '',
        },
    });

    const handleSetAddedActivity = useCallback((value: boolean) => {
        addedActivityRef.current = value
        setAddedActivity(value)
    }, [])

    const handleAddActivity = useCallback(() => {
        if (addedActivityRef.current) {
            handleSetAddedActivity(false)
        } else {
            setShowTimePicker(true)
        }
    }, [addedActivityRef, handleSetAddedActivity])


    const handleCloseModal = useCallback(() => {
        reset()
        setShowTimePicker(false)
    }, [reset])

    return (
        <>
            <Card theme={theme} className={`min-w-[180px] max-w-[180px] p-0 shadow-md rounded-md`}>
                <View className='relative'>
                    <Image source={atividade.image !== '' ? { uri: atividade.image } : require('../../assets/images/image-placeholder.jpeg')} style={{ width: '100%', height: 130, borderRadius: 8, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }} />
                </View>

                <View className='p-4'>

                    <AppTitle theme={theme}>{atividade.name}</AppTitle>
                    <View className='flex-row justify-between items-center  mt-2'>
                        <View className='flex-row items-center gap-3'>
                            {atividade.priceLevel !== null ? (
                                <View className='flex-row items-center'>
                                    {Array.from({ length: atividade.priceLevel }).map((_, i) => (
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
                                    {atividade.stars} <MaterialIcons name="star" color={'#eab308'} className='text-yellow-500' />
                                </AppText>
                            </View>
                        </View>
                        {added ? (
                            <Button onPress={handleAddActivity} variant={added ? 'outline' : 'default'} theme={theme} className='px-1 py-1 rounded-md'>
                                <Text className={`text-sm text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                    <MaterialIcons name="close" color={'white'} size={16} />
                                </Text>
                            </Button>
                        ) : (
                            <Button onPress={handleAddActivity} variant={added ? 'outline' : 'default'} theme={theme} className='px-1 py-1 rounded-md'>
                                <Text className={`text-sm text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                   <MaterialIcons name="add" color={'white'} size={16} />
                                </Text>
                            </Button>
                        )}

                    </View>
                </View>
            </Card>
            {showTimePicker && <ModalAtividadeTime setAddedActivity={handleSetAddedActivity} activity={atividade} onConfirm={onAddActivity} reset={reset} onClose={handleCloseModal} handleSubmit={handleSubmit} startTime='startTime' endTime='endTime' theme={theme} control={control} />}
        </>

    )
}

export default CardAtividade