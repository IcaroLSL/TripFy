import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Divider from '../../../components/ui/Divider';
import { TextField } from '../../../components/ui/FormFields/TextField';
import { AppTitle, AppDescription, AppText } from '../../../components/ui/TextApp';
import WarningCard from '../../../components/ui/WarningCard';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button';
import { DateField } from '../../../components/ui/FormFields/DateField';
import { StepProps } from '../../../src/interfaces/StepProps';
import { set, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Location from 'expo-location';
import { useConvertLocation } from '../../../hooks/useConvertLocation';
import { useAutocompleteLocation } from '../../../hooks/useAutocompleteLocation';
import Card from '../../../components/ui/Card';


const formSchema = z.object({
    destino: z.string().min(1, { message: "Destino é obrigatório" }),
    data: z.object({
        startDate: z.date({ message: "Data de Início é obrigatória" }).nullable(),
        endDate: z.date({ message: "Data de Fim é obrigatória" }).nullable(),
    }).refine((data) => data.startDate! <= data.endDate!, {
        message: "Data de início deve ser menor ou igual à data de fim",
        path: ["endDate"],
    }),
})

type FormData = z.infer<typeof formSchema>;

const Step1 = ({ theme, currentStep, setCurrentStep, setRoteiroData, roteiroData }: StepProps) => {
    const { convertLocation, error, loading, location } = useConvertLocation()
    const { getLocationSuggestions, error: autocompleteError, loading: autocompleteLoading, locationSuggestions } = useAutocompleteLocation()
    const [errorLocation, setErrorLocation] = useState<string | null>(null);
    const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
    const { control, handleSubmit, setValue, watch, setError } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            destino: '',
            data: {
                startDate: null,
                endDate: null,
            },
        },
        mode: 'onBlur',
    });
    const watchDestino = watch('destino');

    useEffect(() => {

        const fetchLocationSuggestions = setTimeout(async () => {
            try {

                if (watchDestino && watchDestino.length > 0) {
                    const suggestions = await getLocationSuggestions(watchDestino);
                    if (suggestions) {
                        console.log('Location suggestions:', suggestions);
                    } else {
                        console.log('No location suggestions found');
                    }
                }
            } catch (error) {
                console.error('Error fetching location suggestions:', error);
            }
        }, 1000)

        return () => clearTimeout(fetchLocationSuggestions);
    }, [watchDestino])

    const handleGetLocation = async () => {
        try {
            setLoadingLocation(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorLocation('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            console.log('Current location:', location);
            const locationName = await convertLocation(location.coords.latitude, location.coords.longitude);
            if (locationName) {
                setLoadingLocation(false);
                setErrorLocation(null);
                setValue('destino', locationName);
            } else {
                setLoadingLocation(false);
                setErrorLocation('Could not convert location to address');
                setValue('destino', location.coords.latitude + ', ' + location.coords.longitude);
            }
        } catch (error) {
            console.error('Error getting current location:', error);
            setLoadingLocation(false);
            setErrorLocation('Error getting current location');
        }
    }

    const onSubmit = (data: FormData) => {
        setCurrentStep(currentStep + 1);
        setRoteiroData({
            ...roteiroData,
            destino: data.destino,
            startDate: data.data.startDate,
            endDate: data.data.endDate,
        });
    }

    return (
        <>
            <AppTitle theme={theme}>Para Onde Vamos?</AppTitle>
            <AppDescription theme={theme}>Vamos usar isso pra sugerir atividades no raio certo</AppDescription>
            <Button variant='outline' theme={theme} onPress={() => handleGetLocation()} disabled={currentStep >= 5}>
                <View className="flex-row gap-2 items-center justify-center">
                    <MaterialIcon name='location-on' size={16} color="red" />

                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        {loading || loadingLocation ? 'Pegando a localização...' : 'Usar minha localização atual'}
                    </Text>
                </View>
            </Button>
            <Divider theme={theme} message="ou" />
            <View className="gap-2">
                <AppText theme={theme}>Destino</AppText>
                <TextField theme={theme} control={control} name="destino" placeholder="Digite o endereço do destino" />
            </View>

            {locationSuggestions && locationSuggestions.length > 0 && (
                <Card theme={theme} className='absolute top-[30vh] left-0 right-0 p-4 items-center gap-2'>
                    <AppText theme={theme}>Sugestões de Localização:</AppText>
                    {locationSuggestions.map((suggestion, index) => (
                        <Text key={index} className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                            {suggestion}
                        </Text>
                    ))}
                </Card>
            )}

            <View className="gap-2">
                <AppText theme={theme}>Quando?</AppText>
                <DateField mode='range' theme={theme} control={control} name="data" placeholder="Selecione a data de início e fim" />
            </View>

            <View>
                <AppText theme={theme}> {errorLocation || error}</AppText>
            </View>

            <Divider theme={theme} />

            <View className='flex flex-row justify-center gap-4'>
                <Button className='w-[40%] flex self-end' theme={theme} onPress={handleSubmit(onSubmit)} disabled={loading || loadingLocation || currentStep >= 5}>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-white' : 'text-white'}`}>
                        Continuar
                    </Text>
                </Button>
            </View>
        </>
    )
}

export default Step1