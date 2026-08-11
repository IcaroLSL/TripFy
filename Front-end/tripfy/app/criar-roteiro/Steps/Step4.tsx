import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StepProps } from '@/interfaces/StepProps'
import Divider from '../../../components/ui/Divider'
import { Button } from '../../../components/ui/Button'
import { AppDescription, AppTitle } from '../../../components/ui/TextApp'
import CardAtividade from '../../../components/ui/CardAtividade'
import { MaterialIcons } from '@expo/vector-icons'

const Step4 = ({ theme, currentStep, setCurrentStep, setRoteiroData, roteiroData }: StepProps) => {
    const [days, setDays] = useState<number[]>([]);
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        roteiroData.startDate && roteiroData.endDate && setDays(Array.from({ length: (roteiroData.endDate.getTime() - roteiroData.startDate.getTime()) / (1000 * 60 * 60 * 24) + 1 }, (_, i) => i + 1));
    }, [roteiroData])

    const onSubmit = () => {

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className='gap-4'>

                <AppTitle theme={theme}>Monte o seu roteiro</AppTitle>
                <AppDescription theme={theme}>Adicione as atividades por dia e horário</AppDescription>

                <View className='gap-2'>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View className='flex flex-row gap-2'>
                            {days.map((day) => (
                                <Pressable
                                    className={`rounded-t-md px-4 py-2 flex-1 items-center justify-center ${selectedDay === day
                                        ? 'bg-blue-600 border-blue-600'
                                        : theme === 'dark'
                                            ? 'bg-gray-700 border-gray-700'
                                            : 'bg-white border-[#E5E7EB]'
                                        }`}
                                    key={day}
                                    onPress={() => setSelectedDay(day)}
                                >
                                    <Text className={`text-base ${selectedDay === day
                                        ? 'text-white'
                                        : theme === 'light'
                                            ? 'text-black'
                                            : 'text-white'
                                        }`}>
                                        Dia {day}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>
                    <View className='flex flex-row justify-end items-center'>
                        <AppDescription theme={theme}>x/x atividades hoje</AppDescription>
                    </View>
                </View>

                <AppTitle theme={theme}>Sugerido para você</AppTitle>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View className='gap-4 flex flex-row'>
                        <CardAtividade theme={theme} image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10"'
                            title='Praia do Meio'
                            stars={5}
                            priceLevel={3}
                            added={true} />
                        <CardAtividade theme={theme}
                            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHzhGHbChZMwDEMsqT9tv58DsvXqcgqcsYKG0tNXjzFg&s=10'
                            title='Bar do Português'
                            stars={5}
                            priceLevel={3}
                            added={false} />
                        <CardAtividade theme={theme}
                            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE1xwFHEtfu7cCaDBXocSAZUqhyP2YuDuRbjMu5V4sSnJK-kG3L4PpkJEx&s=10'
                            title='Parque do Oeste'
                            stars={5}
                            priceLevel={3}
                            added={false} />
                        <CardAtividade theme={theme}
                            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS-gGIxkpjdfwhWHKTZTIELWLn0NmChPYxRUFnaW-Y7A&s=10'
                            title='Pub 8'
                            stars={5}
                            priceLevel={3}
                            added={false} />
                        <CardAtividade theme={theme}
                            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSFSI00xdY4mh-zeCv1LX_U18aPVGnN3qOSKFqWojggQyy8PlBvj7E82M&s=10'
                            title='Biblioteca'
                            stars={5}
                            priceLevel={3}
                            added={false} />
                        <CardAtividade theme={theme}
                            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsxYS84-qOB8dVRRYvX3Q1n9salZ9zh0yt7DTgtYmZuT3_zlXBvUf1Bq2D&s=10'
                            title='Shopping Jaraguá'
                            stars={5}
                            priceLevel={3}
                            added={false} />
                    </View>
                </ScrollView>

                <Button onPress={() => { }} theme={theme} variant='dashed'>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        Adicionar atividade
                    </Text>
                </Button>

                <AppTitle theme={theme}>Manhã - 06:00 - 12:00</AppTitle>

                <Button className='flex flex-row justify-between' onPress={() => { }} theme={theme} variant='outline'>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        Visita ao Museu: 10:00 - 12:00 - $$
                    </Text>

                    <MaterialIcons name='close' color='white' size={20} />
                </Button>

                <Button className='flex flex-row justify-between' onPress={() => { }} theme={theme} variant='outline'>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        Visita ao Museu: 10:00 - 12:00 - $$
                    </Text>

                    <MaterialIcons name='close' color='white' size={20} />
                </Button>

                <AppTitle theme={theme}>Tarde - 12:00 - 18:00</AppTitle>

                <Button className='flex flex-row justify-between' onPress={() => { }} theme={theme} variant='outline'>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        Visita ao Museu: 12:00 - 13:00 - $$
                    </Text>

                    <MaterialIcons name='close' color='white' size={20} />
                </Button>

                <Button className='flex flex-row justify-between' onPress={() => { }} theme={theme} variant='outline'>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        Visita ao Museu: 10:00 - 12:00 - $$
                    </Text>

                    <MaterialIcons name='close' color='white' size={20} />
                </Button>

                <AppTitle theme={theme}>Noite - 18:00 - 00:00</AppTitle>

                <Button className='flex flex-row justify-between' onPress={() => { }} theme={theme} variant='outline'>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        Visita ao Museu: 10:00 - 12:00 - $$
                    </Text>

                    <MaterialIcons name='close' color='white' size={20} />
                </Button>

                <Button className='flex flex-row justify-between' onPress={() => { }} theme={theme} variant='outline'>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        Visita ao Museu: 10:00 - 12:00 - $$
                    </Text>

                    <MaterialIcons name='close' color='white' size={20} />
                </Button>

                <AppTitle theme={theme}>Madrugada - 00:00 - 06:00</AppTitle>

                <Button className='flex flex-row justify-between' onPress={() => { }} theme={theme} variant='outline'>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        Visita ao Museu: 10:00 - 12:00 - $$
                    </Text>

                    <MaterialIcons name='close' color='white' size={20} />
                </Button>

                <Button className='flex flex-row justify-between' onPress={() => { }} theme={theme} variant='outline'>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        Visita ao Museu: 10:00 - 12:00 - $$
                    </Text>

                    <MaterialIcons name='close' color='white' size={20} />
                </Button>


                <Divider theme={theme} />

                <View className='flex flex-row justify-center gap-4'>
                    {currentStep > 1 && (
                        <Button variant='outline' className='w-[40%] flex self-start' theme={theme} onPress={() => { setCurrentStep(currentStep - 1); }} disabled={currentStep <= 1}>
                            <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                Anterior
                            </Text>
                        </Button>
                    )}

                    <Button className='w-[40%] flex self-end' theme={theme} onPress={() => { onSubmit() }} disabled={currentStep >= 5}>
                        <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-white' : 'text-white'}`}>
                            Próximo
                        </Text>
                    </Button>
                </View>
            </View>

        </ScrollView>


    )
}

export default Step4