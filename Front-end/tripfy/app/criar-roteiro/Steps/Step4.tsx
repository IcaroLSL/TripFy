import { View, Text, Pressable, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StepProps } from '@/interfaces/StepProps'
import Divider from '../../../components/ui/Divider'
import { Button } from '../../../components/ui/Button'
import { AppDescription, AppTitle } from '../../../components/ui/TextApp'
import CardAtividade from '../../../components/CriacaoRoteiro/CardAtividade'
import { MaterialIcons } from '@expo/vector-icons'
import { Atividade } from '@/interfaces/Atividade'
import { useGetPlaces } from '../../../hooks/useGetPlaces'
import { router, useLocalSearchParams } from 'expo-router'
import Card from '../../../components/ui/Card'
import ModalAtividade from '../../../components/CriacaoRoteiro/ModalAtividade'

interface AtividadesRoteiro {
    activities: Atividade[];
}

const Step4 = ({ theme, currentStep, setCurrentStep, setRoteiroData, roteiroData }: StepProps) => {
    const { getPlaces, loading, error } = useGetPlaces()
    const [places, setPlaces] = useState<Atividade[]>([]);
    const [days, setDays] = useState<number[]>([]);
    const [selectedDay, setSelectedDay] = useState<number>(Number(roteiroData?.startDate ? roteiroData.startDate.getDate() : 1));
    const [morningActivities, setMorningActivities] = useState<Record<number, AtividadesRoteiro>>(roteiroData.morningActivities ? roteiroData.morningActivities : {});
    const [afterNoonActivities, setAfterNoonActivities] = useState<Record<number, AtividadesRoteiro>>(roteiroData.afternoonActivities ? roteiroData.afternoonActivities : {});
    const [nightActivities, setNightActivities] = useState<Record<number, AtividadesRoteiro>>(roteiroData.nightActivities ? roteiroData.nightActivities : {});
    const [earlyMorningActivities, setEarlyMorningActivities] = useState<Record<number, AtividadesRoteiro>>(roteiroData.earlyMorningActivities ? roteiroData.earlyMorningActivities : {});
    const [placeId, setPlaceId] = useState<string>('')
    const [showPlaceDetails, setShowPlaceDetails] = useState<boolean>(false)

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const fetchedPlaces = await getPlaces({
                    destino: roteiroData.destino,
                    tags: roteiroData.tags,
                    priceLevels: [roteiroData.orcamento],
                    minRating: roteiroData.avaliacaoMinima
                }, 1);
                setPlaces(fetchedPlaces);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };
        fetchPlaces()
    }, [])

    useEffect(() => {
        if (roteiroData.startDate && roteiroData.endDate) {
            const start = roteiroData.startDate.getDate()
            const end = roteiroData.endDate.getDate()
            const daysArray = Array.from({ length: end - start + 1 }, (_, i) => start + i);
            setDays(daysArray);
        }
    }, [roteiroData])

    // useEffect(() => {
    //     if (!params.addedActivity) return

    //     try {
    //         const parsedActivity = JSON.parse(params.addedActivity) as Atividade
    //         const day = Number(params.selectedDay ?? selectedDay)
    //         const timeBucket: 'morning' | 'afternoon' | 'night' | 'earlyMorning' = (() => {
    //             if (!parsedActivity.startTime) return 'morning'
    //             const [hours] = parsedActivity.startTime.split(':').map(Number)
    //             if (hours < 5) return 'earlyMorning'
    //             if (hours < 12) return 'morning'
    //             if (hours < 18) return 'afternoon'
    //             return 'night'
    //         })()

    //         handleManagerActivities(day, timeBucket, parsedActivity)
    //     } catch (error) {
    //         console.error('Erro ao adicionar atividade retornada:', error)
    //     }
    // }, [params.addedActivity, params.selectedDay])

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

    const handleViewPlaceDetails = (placeId: string) => {
        setPlaceId(placeId);
        setShowPlaceDetails(true);
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
            {places.length >= 0 ? (

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View className='gap-4 flex flex-row'>

                        {loading && (
                            <Text className={`text-base ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                Carregando atividades...
                            </Text>
                        )}

                        {places.length > 0 && !loading && !error &&
                            places.map((activity) => (
                                <CardAtividade
                                    key={activity.id}
                                    atividade={{
                                        id: activity.id,
                                        day: selectedDay,
                                        imageUris: activity.imageUris,
                                        name: activity.name,
                                        startTime: activity.startTime,
                                        endTime: activity.endTime,
                                        priceLevel: activity.priceLevel,
                                        rating: activity.rating,
                                        address: activity.address,
                                        hours: activity.hours,
                                        phoneNumber: activity.phoneNumber,
                                        priceRangeStart: activity.priceRangeStart,
                                        priceRangeEnd: activity.priceRangeEnd,
                                        allowsDogs: activity.allowsDogs
                                    }}
                                    theme={theme}
                                    onViewDetails={handleViewPlaceDetails}
                                    onAddActivity={(day, timeOfDay, activity) => handleManagerActivities(day, timeOfDay, activity)}
                                    added={
                                        Boolean(morningActivities[selectedDay]?.activities.some(a => a.name === activity.name) ||
                                            afterNoonActivities[selectedDay]?.activities.some(a => a.name === activity.name) ||
                                            nightActivities[selectedDay]?.activities.some(a => a.name === activity.name) ||
                                            earlyMorningActivities[selectedDay]?.activities.some(a => a.name === activity.name)
                                        )
                                    }
                                />
                            ))}
                    </View>
                </ScrollView>
            ) : (
                <View>
                    <Text className={`text-base ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        Nenhuma atividade encontrada para o destino selecionado.
                    </Text>
                </View>
            )
            }
            {error && (
                <Text className={`text-base ${theme === 'light' ? 'text-red-500' : 'text-red-500'}`}>
                    Ocorreu um erro ao buscar as atividades. Por favor, tente novamente.
                </Text>
            )}

            <Button onPress={() => router.push({ pathname: '/criar-roteiro/Steps/AdicionarAtividade', params: { selectedDay } })} theme={theme} variant='dashed'>
                <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    Adicionar atividade
                </Text>
            </Button>

            {morningActivities[selectedDay] && morningActivities[selectedDay].activities.length > 0 && (
                <AppTitle theme={theme}>Manhã - 05:00 - 12:00</AppTitle>
            )}

            {morningActivities[selectedDay]?.activities.map((activity, index) => (
                <Card key={index} className={`flex flex-row justify-between items-center p-4 gap-2 rounded-md`} theme={theme}>
                    <Image source={activity.imageUris.length > 0 ? { uri: activity.imageUris[0] } : require('../../../assets/images/image-placeholder.jpeg')} style={{ width: 40, height: 40, borderRadius: 8 }} />

                    <Text className={`text-base flex-1 ${theme === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={1} ellipsizeMode='tail'>
                        {activity.name}: {activity.startTime} - {activity.endTime}
                    </Text>

                    <Pressable onPress={() => handleManagerActivities(activity.day, 'morning', activity)}>
                        <MaterialIcons name='close' color='white' size={20} />
                    </Pressable>
                </Card>
            ))}

            {afterNoonActivities[selectedDay] && afterNoonActivities[selectedDay].activities.length > 0 && (
                <AppTitle theme={theme}>Tarde - 12:00 - 18:00</AppTitle>
            )}

            {afterNoonActivities[selectedDay]?.activities.map((activity, index) => (
                <Card key={index} className={`flex flex-row justify-between items-center p-4 gap-2 rounded-md`} theme={theme}>
                    <Image source={activity.imageUris.length > 0 ? { uri: activity.imageUris[0] } : require('../../../assets/images/image-placeholder.jpeg')} style={{ width: 40, height: 40, borderRadius: 8 }} />

                    <Text className={`text-base flex-1 ${theme === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={1} ellipsizeMode='tail'>
                        {activity.name}: {activity.startTime} - {activity.endTime}
                    </Text>

                    <Pressable onPress={() => handleManagerActivities(activity.day, 'afternoon', activity)}>
                        <MaterialIcons name='close' color='white' size={20} />
                    </Pressable>
                </Card>
            ))}

            {nightActivities[selectedDay] && nightActivities[selectedDay].activities.length > 0 && (
                <AppTitle theme={theme}>Noite - 18:00 - 00:00</AppTitle>
            )}

            {nightActivities[selectedDay]?.activities.map((activity, index) => (
                <Card key={index} className={`flex flex-row justify-between items-center p-4 gap-2 rounded-md`} theme={theme}>
                    <Image source={activity.imageUris.length > 0 ? { uri: activity.imageUris[0] } : require('../../../assets/images/image-placeholder.jpeg')} style={{ width: 40, height: 40, borderRadius: 8 }} />

                    <Text className={`text-base flex-1 ${theme === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={1} ellipsizeMode='tail'>
                        {activity.name}: {activity.startTime} - {activity.endTime}
                    </Text>


                    <Pressable onPress={() => handleManagerActivities(activity.day, 'night', activity)}>
                        <MaterialIcons name='close' color='white' size={20} />
                    </Pressable>
                </Card>
            ))}

            {earlyMorningActivities[selectedDay] && earlyMorningActivities[selectedDay].activities.length > 0 && (
                <AppTitle theme={theme}>Madrugada - 00:00 - 05:00</AppTitle>
            )}

            {earlyMorningActivities[selectedDay]?.activities.map((activity, index) => (
                <Card key={index} className={`flex flex-row justify-between items-center p-4 gap-2 rounded-md`} theme={theme}>
                    <Image source={activity.imageUris.length > 0 ? { uri: activity.imageUris[0] } : require('../../../assets/images/image-placeholder.jpeg')} style={{ width: 40, height: 40, borderRadius: 8 }} />

                    <Text className={`text-base flex-1 ${theme === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={1} ellipsizeMode='tail'>
                        {activity.name}: {activity.startTime} - {activity.endTime}
                    </Text>


                    <Pressable onPress={() => handleManagerActivities(activity.day, 'earlyMorning', activity)}>
                        <MaterialIcons name='close' color='white' size={20} />
                    </Pressable>
                </Card>
            ))}

            {
                showPlaceDetails === true && (
                    <ModalAtividade
                        title='Detalhes da Atividade'
                        theme={theme}
                        placeId={placeId}
                        onClose={() => setShowPlaceDetails(false)}
                    />
                )
            }

            <Divider theme={theme} />

            <View className='flex flex-row justify-center gap-4'>
                {currentStep > 1 && (
                    <Button variant='outline' className='w-[40%] flex self-start' theme={theme} onPress={() => { setCurrentStep(currentStep - 1); }} disabled={currentStep <= 1}>
                        <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                            Voltar
                        </Text>
                    </Button>
                )}

                <Button className='w-[40%] flex self-end' theme={theme} onPress={() => { setCurrentStep(currentStep + 1); }} disabled={currentStep >= 5}>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-white' : 'text-white'}`}>
                        Continuar
                    </Text>
                </Button>
            </View>

        </View>

    )
}

export default Step4