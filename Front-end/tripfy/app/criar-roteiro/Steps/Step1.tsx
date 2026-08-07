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
import { StepProps } from '../../../interfaces/StepProps';
import { set, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Location from 'expo-location';


const formSchema = z.object({
    destino: z.string().min(1, { message: "Destino é obrigatório" }),
    data: z.object({
        startDate: z.date("Data de início é obrigatória"),
        endDate: z.date("Data de fim é obrigatória"),
    }).refine((data) => data.startDate <= data.endDate, {
        message: "Data de início deve ser menor ou igual à data de fim",
    }),
});

type FormData = z.infer<typeof formSchema>;

const Step1 = ({ theme, currentStep, setCurrentStep }: StepProps) => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorLocation, setErrorLocation] = useState<string | null>(null);
    const { control, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const handleGetLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorLocation('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log('Current location:', location);
        setLocation(location);
        setCurrentStep(currentStep + 1);
    }

    const onSubmit = (data: FormData) => {
        console.log(data);
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

            <WarningCard>
                <AppDescription theme={theme}>
                    Raio padrão de busca: 50km a partir do ponto escolhido (ajustável depois na montagem).
                </AppDescription>
            </WarningCard>

            <Button theme={theme} onPress={handleSubmit(onSubmit)}>
                <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-white' : 'text-white'}`}>
                    Enviar
                </Text>
            </Button>
        </>
    )
}

export default Step1