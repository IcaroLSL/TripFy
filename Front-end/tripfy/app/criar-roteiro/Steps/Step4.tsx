import { View, Text, Pressable, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StepProps } from '@/interfaces/StepProps'
import Divider from '../../../components/ui/Divider'
import { Button } from '../../../components/ui/Button'
import { AppDescription, AppTitle } from '../../../components/ui/TextApp'
import CardAtividade from '../../../components/ui/CardAtividade'
import { MaterialIcons } from '@expo/vector-icons'
import TimeField from '../../../components/ui/FormFields/TimeField'
import { Atividade } from '@/interfaces/Atividade'



interface AtividadesRoteiro {
    activities: Atividade[];
}

const mockedActivities: Record<number, AtividadesRoteiro> = {
    12: {
        activities: [
            {
                id: 1,
                day: 0,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10',
                name: 'Praia do Meio',
                startTime: '10:00',
                endTime: '12:00',
                priceLevel: 3,
                stars: 5,
                description: 'Uma bela praia para relaxar e aproveitar o sol.'
            },
            {
                id: 2,
                day: 0,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10',
                name: 'Praia do Meio',
                startTime: '10:00',
                endTime: '12:00',
                priceLevel: 3,
                stars: 5,
                description: 'Uma bela praia para relaxar e aproveitar o sol.'
            },
            {
                id: 3,
                day: 0,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10',
                name: 'Praia do Meio',
                startTime: '10:00',
                endTime: '12:00',
                priceLevel: 3,
                stars: 5,
                description: 'Uma bela praia para relaxar e aproveitar o sol.'
            },
        ]
    }
};

const Step4 = ({ theme, currentStep, setCurrentStep, setRoteiroData, roteiroData }: StepProps) => {


    const [days, setDays] = useState<number[]>([]);
    const [selectedDay, setSelectedDay] = useState<number>(roteiroData.startDate.getDate() || 1);
    const [morningActivities, setMorningActivities] = useState<Record<number, AtividadesRoteiro>>(mockedActivities);
    const [afterNoonActivities, setAfterNoonActivities] = useState<Record<number, AtividadesRoteiro>>(mockedActivities);
    const [nightActivities, setNightActivities] = useState<Record<number, AtividadesRoteiro>>(mockedActivities);
    const [earlyMorningActivities, setEarlyMorningActivities] = useState<Record<number, AtividadesRoteiro>>(mockedActivities);

    useEffect(() => {
        if (roteiroData.startDate && roteiroData.endDate) {
            const start = roteiroData.startDate.getDate()
            const end = roteiroData.endDate.getDate()
            const daysArray = Array.from({ length: end - start + 1 }, (_, i) => start + i);
            setDays(daysArray);
        }
    }, [roteiroData])

    const handleManagerActivities = (day: number, timeOfDay: 'morning' | 'afternoon' | 'night' | 'earlyMorning', activity: Atividade) => {
        let updatedActivities: Record<number, AtividadesRoteiro> = {};

        switch (timeOfDay) {
            case 'morning':
                updatedActivities = { ...morningActivities };
                break;
            case 'afternoon':
                updatedActivities = { ...afterNoonActivities };
                break;
            case 'night':
                updatedActivities = { ...nightActivities };
                break;
            case 'earlyMorning':
                updatedActivities = { ...earlyMorningActivities };
                break;
        }

        if (!updatedActivities[day]) {
            updatedActivities[day] = { activities: [] };
        }

        const activityIndex = updatedActivities[day].activities.findIndex(a => a.name === activity.name);

        if (activityIndex > -1) {
            updatedActivities[day].activities.splice(activityIndex, 1);
        } else {
            updatedActivities[day].activities.push(activity);
        }

        switch (timeOfDay) {
            case 'morning':
                setMorningActivities(updatedActivities);
                break;
            case 'afternoon':
                setAfterNoonActivities(updatedActivities);
                break;
            case 'night':
                setNightActivities(updatedActivities);
                break;
            case 'earlyMorning':
                setEarlyMorningActivities(updatedActivities);
                break;
        }
    }

    return (
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

            </View>

            <AppTitle theme={theme}>Sugerido para você</AppTitle>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View className='gap-4 flex flex-row'>
                    <CardAtividade theme={theme}
                        atividade={{
                            id: 1,
                            day: selectedDay,
                            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10',
                            name: 'Praia do Meio',
                            startTime: '',
                            endTime: '',
                            priceLevel: 3,
                            stars: 5,
                            description: 'Descrição da atividade exemplo'
                        }}
                        added={true}
                        onAddActivity={handleManagerActivities}
                    />
                    <CardAtividade theme={theme}
                        atividade={{
                            id: 2,
                            day: selectedDay,
                            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHzhGHbChZMwDEMsqT9tv58DsvXqcgqcsYKG0tNXjzFg&s=10',
                            name: 'Bar do Português',
                            startTime: '',
                            endTime: '',
                            priceLevel: 3,
                            stars: 5,
                            description: 'Descrição da atividade exemplo'
                        }}

                        added={false}
                        onAddActivity={handleManagerActivities}
                    />
                    <CardAtividade theme={theme}
                        atividade={{
                            id: 3,
                            day: selectedDay,
                            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE1xwFHEtfu7cCaDBXocSAZUqhyP2YuDuRbjMu5V4sSnJK-kG3L4PpkJEx&s=10',
                            name: 'Parque do Oeste',
                            startTime: '',
                            endTime: '',
                            priceLevel: 3,
                            stars: 5,
                            description: 'Descrição da atividade exemplo'
                        }}
                        onAddActivity={handleManagerActivities}
                        added={false} />
                    <CardAtividade theme={theme}
                        atividade={{
                            id: 4,
                            day: selectedDay,
                            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS-gGIxkpjdfwhWHKTZTIELWLn0NmChPYxRUFnaW-Y7A&s=10',
                            name: 'Pub 8',
                            startTime: '',
                            endTime: '',
                            priceLevel: 3,
                            stars: 5,
                            description: 'Descrição da atividade exemplo'
                        }}
                        added={false}
                        onAddActivity={handleManagerActivities}
                    />
                    <CardAtividade theme={theme}
                        atividade={{
                            id: 5,
                            day: selectedDay,
                            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSFSI00xdY4mh-zeCv1LX_U18aPVGnN3qOSKFqWojggQyy8PlBvj7E82M&s=10',
                            name: 'Biblioteca',
                            startTime: '',
                            endTime: '',
                            priceLevel: 3,
                            stars: 5,
                            description: 'Descrição da atividade exemplo'
                        }}
                        added={false}
                        onAddActivity={handleManagerActivities}
                    />
                    <CardAtividade theme={theme}
                        atividade={{
                            id: 1,
                            day: selectedDay,
                            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsxYS84-qOB8dVRRYvX3Q1n9salZ9zh0yt7DTgtYmZuT3_zlXBvUf1Bq2D&s=10',
                            name: 'Shopping Jaraguá',
                            startTime: '',
                            endTime: '',
                            priceLevel: 3,
                            stars: 5,
                            description: 'Descrição da atividade exemplo'
                        }}
                        added={false}
                        onAddActivity={handleManagerActivities}
                    />
                </View>
            </ScrollView>

            <Button onPress={() => { }} theme={theme} variant='dashed'>
                <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    Adicionar atividade
                </Text>
            </Button>

            {morningActivities[selectedDay] && morningActivities[selectedDay].activities.length > 0 && (
                <AppTitle theme={theme}>Manhã - 05:00 - 12:00</AppTitle>
            )}

            {morningActivities[selectedDay]?.activities.map((activity, index) => (
                <Button key={index} className='flex flex-row justify-between gap-2 items-center' onPress={() => { }} theme={theme} variant='outline'>
                    <Image source={activity.image !== '' ? { uri: activity.image } : require('../../../assets/images/image-placeholder.jpeg')} style={{ width: 40, height: 40, borderRadius: 8 }} />

                    <Text className={`text-base flex-1 ${theme === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={1} ellipsizeMode='tail'>
                        {activity.name}: {activity.startTime} - {activity.endTime}
                    </Text>

                    <MaterialIcons name='close' color='white' size={20} />
                </Button>
            ))}

            {afterNoonActivities[selectedDay] && afterNoonActivities[selectedDay].activities.length > 0 && (
                <AppTitle theme={theme}>Tarde - 12:00 - 18:00</AppTitle>
            )}

            {afterNoonActivities[selectedDay]?.activities.map((activity, index) => (
                <Button key={index} className='flex flex-row justify-between gap-2 items-center' onPress={() => { }} theme={theme} variant='outline'>
                    <Image source={activity.image !== '' ? { uri: activity.image } : require('../../../assets/images/image-placeholder.jpeg')} style={{ width: 40, height: 40, borderRadius: 8 }} />

                    <Text className={`text-base flex-1 ${theme === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={1} ellipsizeMode='tail'>
                        {activity.name}: {activity.startTime} - {activity.endTime}
                    </Text>

                    <MaterialIcons name='close' color='white' size={20} />
                </Button>
            ))}

            {nightActivities[selectedDay] && nightActivities[selectedDay].activities.length > 0 && (
                <AppTitle theme={theme}>Noite - 18:00 - 00:00</AppTitle>
            )}

            {nightActivities[selectedDay]?.activities.map((activity, index) => (
                <Button key={index} className='flex flex-row justify-between gap-2 items-center' onPress={() => { }} theme={theme} variant='outline'>
                    <Image source={activity.image !== '' ? { uri: activity.image } : require('../../../assets/images/image-placeholder.jpeg')} style={{ width: 40, height: 40, borderRadius: 8 }} />

                    <Text className={`text-base flex-1 ${theme === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={1} ellipsizeMode='tail'>
                        {activity.name}: {activity.startTime} - {activity.endTime}
                    </Text>

                    <MaterialIcons name='close' color='white' size={20} />
                </Button>
            ))}

            {earlyMorningActivities[selectedDay] && earlyMorningActivities[selectedDay].activities.length > 0 && (
                <AppTitle theme={theme}>Madrugada - 00:00 - 05:00</AppTitle>
            )}

            {earlyMorningActivities[selectedDay]?.activities.map((activity, index) => (
                <Button key={index} className='flex flex-row justify-between gap-2 items-center' onPress={() => { }} theme={theme} variant='outline'>
                    <Image source={activity.image !== '' ? { uri: activity.image } : require('../../../assets/images/image-placeholder.jpeg')} style={{ width: 40, height: 40, borderRadius: 8 }} />

                    <Text className={`text-base flex-1 ${theme === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={1} ellipsizeMode='tail'>
                        {activity.name}: {activity.startTime} - {activity.endTime}
                    </Text>

                    <MaterialIcons name='close' color='white' size={20} />
                </Button>
            ))}


            <Divider theme={theme} />

            <View className='flex flex-row justify-center gap-4'>
                {currentStep > 1 && (
                    <Button variant='outline' className='w-[40%] flex self-start' theme={theme} onPress={() => { setCurrentStep(currentStep - 1); }} disabled={currentStep <= 1}>
                        <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                            Anterior
                        </Text>
                    </Button>
                )}

                <Button className='w-[40%] flex self-end' theme={theme} onPress={() => { setCurrentStep(currentStep + 1); }} disabled={currentStep >= 5}>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-white' : 'text-white'}`}>
                        Próximo
                    </Text>
                </Button>
            </View>

        </View>

    )
}

export default Step4