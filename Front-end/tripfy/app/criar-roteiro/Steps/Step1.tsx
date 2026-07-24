import { View, Text } from 'react-native'
import React from 'react'
import Divider from '../../../components/ui/Divider';
import { TextField } from '../../../components/ui/FormFields/TextField';
import { AppTitle, AppDescription, AppText } from '../../../components/ui/TextApp';
import WarningCard from '../../../components/ui/WarningCard';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button';
import { DateField } from '../../../components/ui/FormFields/DateField';
import { StepProps } from '../../../interfaces/StepProps';

const Step1 = ({ theme, currentStep, setCurrentStep }: StepProps) => {
    const { control } = useForm({
    });
    return (
        <>
            <AppTitle theme={theme}>Para Onde Vamos?</AppTitle>
            <AppDescription theme={theme}>Vamos usar isso pra sugerir atividades no raio certo</AppDescription>
            <Button variant='outline' theme={theme} onPress={() => { setCurrentStep(currentStep + 1); }} disabled={currentStep >= 5}>
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
                    Raio padrão de busca: 50km a partir do ponto escolhido (ajustável depois na montagem). Nota: se houver permanência mínima recomendada por tipo de destino, exibir aqui só após confirmação da regra (ver aviso no topo).
                </AppDescription>
            </WarningCard>
        </>
    )
}

export default Step1