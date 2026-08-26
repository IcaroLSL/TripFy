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
import z from 'zod'
import { Atividade } from '@/interfaces/Atividade'
import { useGetPlaces } from '../../../hooks/useGetPlaces'

const formSchema = z.object({
    startTime: z.string().min(1, { message: "Horário de início é obrigatório" }),
    endTime: z.string().min(1, { message: "Horário de fim é obrigatório" }),
})

type FormData = z.infer<typeof formSchema>;

const AdicionarAtividade = () => {
    const { roteiroData, setRoteiroData, theme } = useRoteiroStore()
    const { selectedDay } = useLocalSearchParams()
    const { getPlaces, loading, error } = useGetPlaces()
    const [places, setPlaces] = useState<Atividade[]>([]);
    const [showBottomCategoriesView, setShowBottomCategoriesView] = useState<boolean>(false)
    const [showBottomRatingPriceView, setShowBottomRatingPriceView] = useState<boolean>(false)
    const [showModalTime, setShowModalTime] = useState<boolean>(false)
    const [selectedActivity, setSelectedActivity] = useState<Atividade | null>(null)
    const [selectedCategories, setSelectedCategories] = React.useState<CategoriaAtividade[]>(roteiroData.tags ? CATEGORIAS_ATIVIDADE.filter((cat) => cat.tags.some((tag) => roteiroData.tags.includes(tag))) : [])
    const [selectedPrice, setSelectedPrice] = React.useState<string[]>(roteiroData.orcamento ? [roteiroData.orcamento] : [])
    const [selectedRatings, setSelectedRatings] = React.useState<string[]>(roteiroData.avaliacaoMinima ? [roteiroData.avaliacaoMinima] : ['Sem filtro'])
    const { control, handleSubmit, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startTime: '',
            endTime: '',
        },
    });

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const convertedPriceLevels = selectedPrice.map(price => convertPriceRangeToNumber(price));
                const convertedMinRatings = selectedRatings.map(rating => convertRatingToNumber(rating));
                console.log('Converted Price Levels:', convertedPriceLevels);
                console.log('Converted Min Ratings:', convertedMinRatings);
                const fetchedPlaces = await getPlaces({
                    destino: roteiroData.destino,
                    tags: selectedCategories.flatMap((cat) => cat.tags),
                    priceLevels: convertedPriceLevels,
                    minRating: roteiroData.avaliacaoMinima || '0',
                }, 1);
                setPlaces(fetchedPlaces);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };
        fetchPlaces()
    }, [])

    useEffect(() => {
        console.log('selectedCategories', selectedCategories)
        console.log(selectedPrice.sort((a, b) => a.length - b.length))
        console.log('selectedRatings', selectedRatings)
    }, [selectedCategories, selectedPrice, selectedRatings])


    const convertPriceRangeToNumber = (priceRange: string | null): string => {
        switch (priceRange) {
            case 'Grátis':
                return '0';
            case '$':
                return '1';
            case '$$':
                return '2';
            case '$$$':
                return '3';
            case '$$$$':
                return '4';
            default:
                return '0';
        }
    };

    const convertRatingToNumber = (rating: string | null): string => {
        switch (rating) {
            case 'Sem filtro':
                return '0';
            case '1★+':
                return '1';
            case '2★+':
                return '2';
            case '3★+':
                return '3';
            case '4★+':
                return '4';
            case '5★+':
                return '5';
            default:
                return '0';
        }
    };

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
                    {/* <TextField icon='search' theme={theme} control={control} name='atividade' placeholder='Buscar por nome (ex: Museu Nacional)' /> */}
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
                            Preço · {selectedPrice.length === 1 ? (
                                selectedPrice[0]
                            ) :
                                (
                                    `${selectedPrice.includes('Grátis') ? 'Grátis' : `${selectedPrice[0]}`} - ${selectedPrice[selectedPrice.length - 2]}`
                                )
                            }
                        </AppText>

                        <MaterialIcons
                            name="arrow-drop-down"
                            size={20}
                            color={theme === 'light' ? 'white' : 'white'}
                        />
                    </Button>

                    <Button onPress={() => setShowBottomRatingPriceView(true)} theme={theme} className='flex-row  justify-between items-center rounded-md'>
                        <AppText className='text-white' theme={theme}>
                            Avaliação · 4★+
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
                        Atividades encontradas
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

                <ScrollView>

                    {places.map((place) => (
                        <Button className='flex flex-row justify-between gap-2 items-center' onPress={() => { }} theme={theme} variant='outline'>
                            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10' }} style={{ width: 40, height: 40, borderRadius: 8 }} />

                            <Text className={`text-base flex-1 ${theme === 'light' ? 'text-black' : 'text-white'}`} numberOfLines={2} ellipsizeMode='tail'>
                                {place.name} — {place.priceLevel} · {place.stars}★ · 
                            </Text>

                            <Pressable onPress={() => {
                                setSelectedActivity({
                                    id: 0,
                                    name: place.name,
                                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_1CBjai2QFMFUqtsB9nsVZwVlG7J0aFcPYfRS0ibqgF3I8ypKNAAgyI&s=10',
                                    day: Number(selectedDay),
                                    startTime: '',
                                    endTime: '',
                                    priceLevel: place.priceLevel !== null ? place.priceLevel : 0,
                                    stars: place.stars !== null ? place.stars : 0,
                                    description: 'Complexo esportivo com quadras, campos e áreas de lazer para atividades físicas e recreação.',
                                });
                                setShowModalTime(true);
                            }} className='border border-blue-700 rounded-full p-0.5'>
                                <MaterialIcons name='add' color={`${theme === 'light' ? 'black' : 'white'}`} size={20} />
                            </Pressable>
                        </Button>
                    ))}

                </ScrollView>

            </ScreenContent>

            {showModalTime && selectedActivity && (
                <ModalAtividadeTime control={control} startTime='startTime' endTime='endTime' handleSubmit={handleSubmit} reset={reset} onClose={() => setShowModalTime(false)} theme={theme} activity={selectedActivity} setAddedActivity={() => setShowModalTime(false)} onConfirm={handleManagerActivities} />
            )}

            {showBottomCategoriesView &&
                <BottomCategoryView onCategorySelect={setSelectedCategories} selectedCategories={selectedCategories} theme={theme} onClose={setShowBottomCategoriesView} />
            }

            {showBottomRatingPriceView &&
                <BottomRatingPriceView onPriceSelect={setSelectedPrice} onRatingSelect={setSelectedRatings} selectedPrice={selectedPrice} selectedRatings={selectedRatings} theme={theme} onClose={setShowBottomRatingPriceView} />
            }

        </>
    )
}

export default AdicionarAtividade