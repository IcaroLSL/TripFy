import { View, Text, TouchableOpacity } from 'react-native'
import React, { JSX } from 'react'
import { AppDescription, AppTitle } from '../../../components/ui/TextApp'
import { StepProps } from '../../../src/interfaces/StepProps'
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../../../components/ui/Button';
import Divider from '../../../components/ui/Divider';
import { CategoriaAtividade, CATEGORIAS_ATIVIDADE } from '@/constants/ActivitiesTag';



const Step2 = ({ theme, currentStep, setCurrentStep, setRoteiroData, roteiroData }: StepProps) => {
    const [selectedInterests, setSelectedInterests] = React.useState<CategoriaAtividade[]>([]);

    const onSubmit = () => {
        setCurrentStep(currentStep + 1);
        setRoteiroData({
            ...roteiroData,
            atividades: selectedInterests.map(interest => interest.tags).flat(),
        });
    }
    return (
        <>
            <AppTitle theme={theme}>O que você curte?</AppTitle>
            <AppDescription theme={theme}>Selecione uma ou mais — isso prioriza as sugestões da Etapa 4</AppDescription>
            <View className="flex flex-row flex-wrap gap-4 mt-4">
                {CATEGORIAS_ATIVIDADE.map((interest) => (
                    <TouchableOpacity
                        key={interest.name}
                        className={`w-[48%] flex flex-col items-center justify-center p-4 rounded-lg border ${selectedInterests.includes(interest) ? 'bg-blue-500 ' : theme === 'light' ? 'bg-white border-[#E5E7EB]' : 'bg-[#1A1A2E] border-gray-700'}`}
                        onPress={() => {
                            if (selectedInterests.includes(interest)) {
                                setSelectedInterests(selectedInterests.filter(i => i !== interest));
                            } else {
                                setSelectedInterests([...selectedInterests, interest]);
                            }
                        }}
                    >
                        <Text className={`text-4xl ${selectedInterests.includes(interest) ? 'text-white' : theme === 'light' ? 'text-[#1A1A2E]' : 'text-white'}`}>
                            {interest.icon}
                        </Text>
                        <Text className={`mt-2 text-sm font-medium ${selectedInterests.includes(interest) ? 'text-white' : theme === 'light' ? 'text-[#1A1A2E]' : 'text-white'}`}>{interest.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Divider theme={theme} />

            <View className='flex flex-row justify-center gap-4'>
                {currentStep > 1 && (
                    <Button variant='outline' className='w-[40%] flex self-start' theme={theme} onPress={() => { setCurrentStep(currentStep - 1); }} disabled={currentStep <= 1}>
                        <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                            Anterior
                        </Text>
                    </Button>
                )}

                <Button className='w-[40%] flex self-end' theme={theme} onPress={() => { onSubmit() }} disabled={selectedInterests.length <= 0 || currentStep >= 5}>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-white' : 'text-white'}`}>
                        Próximo
                    </Text>
                </Button>
            </View>
        </>
    )
}

export default Step2