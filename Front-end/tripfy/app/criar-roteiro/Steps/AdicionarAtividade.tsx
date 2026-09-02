import { View, Text, useColorScheme, TouchableOpacity, ScrollView, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenContent } from '../../../components/ScreenContent'
import { AppDescription, AppText, AppTitle } from '../../../components/ui/TextApp'
import { Button } from '../../../components/ui/Button'
import { MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import Search from '../../../components/ui/Search'
import { useForm } from 'react-hook-form'
import { TextField } from '../../../components/ui/FormFields/TextField'
import BottomSheetComponent from '../../../components/ui/BottomSheet'
import BottomCategoryView from '../../../components/CriacaoRoteiro/BottomCategoryView'
import BottomRatingPriceView from '../../../components/CriacaoRoteiro/BottomRatingPriceView'
import { CategoriaAtividade, CATEGORIAS_ATIVIDADE } from '@/constants/ActivitiesTag'
import { useRoteiroStore } from '@/store/roteiroStore'
import ModalAtividadeTime from '../../../components/CriacaoRoteiro/ModalAtividadeTime'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import z, { set } from 'zod'
import { Atividade } from '@/interfaces/Atividade'
import { useGetPlaces } from '../../../hooks/useGetPlaces'
import Card from '../../../components/ui/Card'

const formDateSchema = z.object({
    startTime: z.string().min(1, { message: "Horário de início é obrigatório" }),
    endTime: z.string().min(1, { message: "Horário de fim é obrigatório" }),
}).refine((data) => {
    const [startHour, startMinute] = data.startTime.split(':').map(Number);
    const [endHour, endMinute] = data.endTime.split(':').map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    return endTotalMinutes > startTotalMinutes;
}, {
    'path': ['endTime'],
    'message': "Horário de fim deve ser maior que o horário de início",
});

type FormDateData = z.infer<typeof formDateSchema>;

const formSearchSchema = z.object({
    placeName: z.string().max(255, { message: "Nome do local deve ter no máximo 255 caracteres" }),
})

type FormSearchData = z.infer<typeof formSearchSchema>;

const getPriceLabel = (priceLevel: string): string => {
    switch (priceLevel) {
        case '0':
            return 'Grátis';
        case '1':
            return '$';
        case '2':
            return '$$';
        case '3':
            return '$$$';
        case '4':
            return '$$$$';
        default:
            return '';
    }
};

const formatPriceRange = (prices: string[]): string => {
    if (prices.length === 0) return 'Sem filtro';
    if (prices.length === 1) return getPriceLabel(prices[0]);
    return `${getPriceLabel(prices[0])} - ${getPriceLabel(prices[prices.length - 1])}`;
};

const AdicionarAtividade = () => {
    const { roteiroData, setRoteiroData, theme } = useRoteiroStore()
    const { selectedDay } = useLocalSearchParams()
    const { getPlaces, loading, error, total } = useGetPlaces()
    const [places, setPlaces] = useState<Atividade[]>([]);
    const [showBottomCategoriesView, setShowBottomCategoriesView] = useState<boolean>(false)
    const [showBottomRatingPriceView, setShowBottomRatingPriceView] = useState<boolean>(false)
    const [showModalTime, setShowModalTime] = useState<boolean>(false)
    const [selectedActivity, setSelectedActivity] = useState<Atividade | null>(null)
    const [activityList, setActivityList] = useState<Atividade[]>([])
    const [selectedCategories, setSelectedCategories] = React.useState<CategoriaAtividade[]>(roteiroData.tags ? CATEGORIAS_ATIVIDADE.filter((cat) => cat.tags.some((tag) => roteiroData.tags.includes(tag))) : [])
    const [selectedPrice, setSelectedPrice] = React.useState<string[]>(roteiroData.orcamento ? [roteiroData.orcamento] : [])
    const [selectedRatings, setSelectedRatings] = React.useState<string[]>(roteiroData.avaliacaoMinima ? [roteiroData.avaliacaoMinima] : ['Sem filtro'])
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormDateData>({
        resolver: zodResolver(formDateSchema),
        defaultValues: {
            startTime: '',
            endTime: '',
        },
    });

    const { control: searchControl, watch } = useForm<FormSearchData>({
        resolver: zodResolver(formSearchSchema),
        defaultValues: {
            placeName: '',
        },
    });

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const placeName = watch('placeName');
                console.log('Fetching places with selectedCategories:', selectedCategories, 'selectedPrice:', selectedPrice, 'selectedRatings:', selectedRatings);
                const fetchedPlaces = await getPlaces({
                    destino: roteiroData.destino,
                    tags: selectedCategories.flatMap((cat) => cat.tags),
                    priceLevels: selectedPrice,
                    minRating: roteiroData.avaliacaoMinima || '0',
                    specificPlace: placeName || '',
                }, 1);
                setPlaces(fetchedPlaces);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };
        fetchPlaces()
    }, [selectedPrice, selectedRatings, selectedCategories, roteiroData.destino, roteiroData.avaliacaoMinima]);


    const handleManagerActivities = (day: number, timeOfDay: 'morning' | 'afternoon' | 'night' | 'earlyMorning', activity: Atividade) => {
        let updatedActivities: Record<number, { activities: Atividade[] }> = {};

        switch (timeOfDay) {
            case 'morning':
                updatedActivities = { ...roteiroData.morningActivities };
                break;
            case 'afternoon':
                updatedActivities = { ...roteiroData.afternoonActivities };
                break;
            case 'night':
                updatedActivities = { ...roteiroData.nightActivities };
                break;
            case 'earlyMorning':
                updatedActivities = { ...roteiroData.earlyMorningActivities };
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
                setRoteiroData({ ...roteiroData, morningActivities: updatedActivities });
                break;
            case 'afternoon':
                setRoteiroData({ ...roteiroData, afternoonActivities: updatedActivities });
                break;
            case 'night':
                setRoteiroData({ ...roteiroData, nightActivities: updatedActivities });
                break;
            case 'earlyMorning':
                setRoteiroData({ ...roteiroData, earlyMorningActivities: updatedActivities });
                break;
        }

        setActivityList((prevList) => [...prevList, {
            id: '',
            name: activity.name,
            day: Number(selectedDay),
            startTime: '',
            endTime: '',
            priceLevel: activity.priceLevel !== null ? activity.priceLevel : 0,
            rating: activity.rating !== null ? activity.rating : 0,
            imageUris: [],
            allowsDogs: false,
            phoneNumber: '',
            'priceRangeEnd': '',
            priceRangeStart: '',
            address: '',
            hours: []
        }]);
    }

    const handleSelectActivity = (place: Atividade) => {
        if (activityList.some((activity) => activity.name === place.name)) {
            const updatedActivityList = activityList.filter((activity) => activity.name !== place.name);
            setActivityList(updatedActivityList);
            return;
        }
        setSelectedActivity({
            id: '',
            name: place.name,
            imageUris: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10',],
            day: Number(selectedDay),
            startTime: '',
            endTime: '',
            priceLevel: place.priceLevel !== null ? place.priceLevel : 0,
            rating: place.rating !== null ? place.rating : 0,
            allowsDogs: false,
            phoneNumber: '',
            'priceRangeEnd': '',
            priceRangeStart: '',
            address: '',
            hours: []
        });
        setShowModalTime(true);
    }

    return (
        <>
            <ScreenContent>
                <View className='relative flex-row w-full items-center justify-end'>
                    <View className='absolute left-0 right-0 items-center'>
                        <AppTitle theme={theme}>Adicionar Atividade</AppTitle>
                    </View>

                    <TouchableOpacity className='rounded-full border border-blue-500 p-1' onPress={() => router.back()}>
                        <MaterialIcons name="close" size={20} color={`${theme === 'light' ? 'black' : 'white'}`} />
                    </TouchableOpacity>
                </View>
                <View className='flex self-center'>
                    <AppDescription theme={theme}>
                        Dia {selectedDay}
                    </AppDescription>
                </View>
                <View>
                    <TextField icon='search' theme={theme} control={searchControl} name='placeName' placeholder='Buscar por nome (ex: Museu Nacional)' />
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flexGrow: 0 }}
                    contentContainerStyle={{
                        gap: 16,
                        alignItems: 'center',
                    }}
                >
                    <Button onPress={() => setShowBottomCategoriesView(true)} theme={theme} className='flex-row justify-between items-center rounded-md'>
                        <AppText className='text-white' theme={theme}>
                            Categorias · {selectedCategories.length}
                        </AppText>

                        <MaterialIcons
                            name="arrow-drop-down"
                            size={20}
                            color={theme === 'light' ? 'white' : 'white'}
                        />
                    </Button>

                    <Button onPress={() => setShowBottomRatingPriceView(true)} theme={theme} className='flex-row justify-between items-center rounded-md'>
                        <AppText className='text-white' theme={theme}>
                            Preço · {formatPriceRange(selectedPrice)}
                        </AppText>

                        <MaterialIcons
                            name="arrow-drop-down"
                            size={20}
                            color={theme === 'light' ? 'white' : 'white'}
                        />
                    </Button>

                    <Button onPress={() => setShowBottomRatingPriceView(true)} theme={theme} className='flex-row  justify-between items-center rounded-md'>
                        <AppText className='text-white' theme={theme}>
                            Avaliação · 4<Text className='text-yellow-500'>★</Text>+
                        </AppText>

                        <MaterialIcons
                            name="arrow-drop-down"
                            size={20}
                            color={theme === 'light' ? 'white' : 'white'}
                        />
                    </Button>
                </ScrollView>

                <View className='flex-row justify-between items-center mt-6'>
                    <AppText theme={theme}>
                        {loading ? 'Atividades encontradas: carregando...' : `Atividades encontradas ${total}`}
                    </AppText>

                    <TouchableOpacity>
                        <AppText
                            theme={theme}
                            className='text-blue-500'
                        >
                            Ver todas
                        </AppText>
                    </TouchableOpacity>
                </View>

                {
                    loading ? (
                        <Card theme={theme} className='flex flex-row justify-between gap-2 px-2 py-4 items-center'>
                            <Text className={`text-base flex-1 ${theme === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={2} ellipsizeMode='tail'>
                                Carregando atividades...
                            </Text>
                        </Card>
                    ) : (
                        <ScrollView>

                            <View className='gap-4'>

                                {
                                    places.length > 0 ? (

                                        places.map((place, index) => (
                                            <Card key={index} className='flex flex-row justify-between gap-2 px-2 py-4 items-center' theme={theme}>
                                                <View className='flex flex-row gap-4'>

                                                    <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10' }} style={{ width: 40, height: 40, borderRadius: 8 }} />

                                                    <View>
                                                        <Text className={`text-base flex-1 ${theme === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={1} ellipsizeMode='tail'>
                                                            {place.name}
                                                        </Text>

                                                        <View className={`flex flex-row gap-2`} >
                                                            <Text className='text-green-500'>
                                                                {place.priceLevel === 0 ? 'Gratuito' : place.priceLevel === 1 ? '$' : place.priceLevel === 2 ? '$$' : place.priceLevel === 3 ? '$$$' : '$$$+'}
                                                            </Text>
                                                            <AppText theme={theme}>·</AppText>
                                                            <View className='flex flex-row'>
                                                                <AppText theme={theme}>
                                                                    {place.rating}
                                                                </AppText>
                                                                <Text className='text-yellow-500'>★</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>

                                                <Pressable onPress={() => handleSelectActivity(place)} className={`${activityList.some((activity) => activity.name === place.name) ? 'bg-red-500' : 'bg-blue-600'} rounded-full p-0.5`}>
                                                    {
                                                        activityList.some((activity) => activity.name === place.name) ? (
                                                            <MaterialIcons name='close' color={`${theme === 'light' ? 'white' : 'white'}`} size={20} />
                                                        ) : (
                                                            <MaterialIcons name='add' color={`${theme === 'light' ? 'white' : 'white'}`} size={20} />
                                                        )
                                                    }
                                                </Pressable>
                                            </Card>
                                        )
                                        )) : (
                                        <Card theme={theme} className='flex flex-row justify-between gap-2 px-2 py-4 items-center'>
                                            <Text className={`text-base flex-1 ${theme === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={2} ellipsizeMode='tail'>
                                                Nenhuma atividade encontrada.
                                            </Text>
                                        </Card>
                                    )}
                            </View>

                        </ScrollView>
                    )
                }

            </ScreenContent>

            {showModalTime && selectedActivity && (
                <ModalAtividadeTime errors={errors} control={control} startTime='startTime' endTime='endTime' handleSubmit={handleSubmit} reset={reset} onClose={() => { setShowModalTime(false); }} theme={theme} activity={selectedActivity} setAddedActivity={() => setShowModalTime(false)} onConfirm={handleManagerActivities} />
            )}

            {showBottomCategoriesView &&
                <BottomCategoryView loadingPlaces={loading} total={total} onCategorySelect={setSelectedCategories} selectedCategories={selectedCategories} theme={theme} onClose={setShowBottomCategoriesView} />
            }

            {showBottomRatingPriceView &&
                <BottomRatingPriceView loadingPlaces={loading} total={total} onPriceSelect={setSelectedPrice} onRatingSelect={setSelectedRatings} selectedPrice={selectedPrice} selectedRatings={selectedRatings} theme={theme} onClose={setShowBottomRatingPriceView} />
            }

        </>
    )
}

export default AdicionarAtividade