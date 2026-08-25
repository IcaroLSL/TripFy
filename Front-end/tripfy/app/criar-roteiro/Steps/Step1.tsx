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
import { de } from 'zod/v4/locales';
import { useConvertLocation } from '../../../hooks/useConvertLocation';


const formSchema = z.object({
    destino: z.string().min(1, { message: "Destino é obrigatório" }),
    data: z.object({
        startDate: z.date({ message: "Data de Início é obrigatória" }),
        endDate: z.date({ message: "Data de Fim é obrigatória" }).nullable(),
    }).refine((data) => data.startDate <= data.endDate!, {
        message: "Data de início deve ser menor ou igual à data de fim",
        path: ["endDate"],
    }),
})

type FormData = z.infer<typeof formSchema>;

const Step1 = ({ theme, currentStep, setCurrentStep, setRoteiroData, roteiroData }: StepProps) => {
    const {convertLocation, error, loading} = useConvertLocation()
    const [errorLocation, setErrorLocation] = useState<string | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const { control, handleSubmit, setValue, watch, setError } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            destino: '',
            data: {
                startDate: new Date(),
                endDate: null,
            },
        },
        mode: 'onBlur',
    });

    const handleGetLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorLocation('Permission to access location was denied');
            return;
        }
        try{
            const location = await Location.getCurrentPositionAsync({});
            console.log('Current location:', location);
            const locationName = await convertLocation(location.coords.latitude, location.coords.longitude);
            if(locationName){
                setValue('destino', locationName);
            } else {
                setValue('destino', location.coords.latitude + ', ' + location.coords.longitude);
            }
        } catch (error) {
            console.error('Error getting current location:', error);
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
                        Usar minha localização atual
                    </Text>
                </View>
            </Button>
            <Divider theme={theme} message="ou" />
            <View className="gap-2">
                <AppText theme={theme}>Destino</AppText>
                <TextField theme={theme} control={control} name="destino" placeholder="Digite o endereço do destino" />
            </View>
            <View className="gap-2">
                <AppText theme={theme}>Quando?</AppText>
                <DateField mode='range' theme={theme} control={control} name="data" placeholder="Selecione a data de início e fim" />
            </View>

            <Divider theme={theme} />

            <View className='flex flex-row justify-center gap-4'>
                <Button className='w-[40%] flex self-end' theme={theme} onPress={handleSubmit(onSubmit)} disabled={currentStep >= 5}>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-white' : 'text-white'}`}>
                        Continuar
                    </Text>
                </Button>
            </View>
        </>
    )
}

export default Step1