import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { AppDescription, AppTitle } from '../../../components/ui/TextApp'
import { StepProps } from '../../../src/interfaces/StepProps'
import { Button } from '../../../components/ui/Button'
import Divider from '../../../components/ui/Divider'
import { CategoriaAtividade, CATEGORIAS_ATIVIDADE } from '@/constants/ActivitiesTag'

const Step2 = ({ theme, currentStep, setCurrentStep, setRoteiroData, roteiroData }: StepProps) => {
    const [selectedInterests, setSelectedInterests] = React.useState<CategoriaAtividade[]>(roteiroData.tags ? CATEGORIAS_ATIVIDADE.filter((cat) => cat.tags.some((tag) => roteiroData.tags.includes(tag))) : [])

    const onSubmit = () => {
        setCurrentStep(currentStep + 1)
        setRoteiroData({
            ...roteiroData,
            tags: selectedInterests.map(interest => interest.tags).flat(),
        })
    }

    return (
        <View className='flex-1'>
            <AppTitle theme={theme}>O que você curte?</AppTitle>
            <AppDescription theme={theme}>Selecione uma ou mais — isso prioriza as sugestões da Etapa 4</AppDescription>

            <ScrollView
                style={{ flex: 1, maxHeight: 520 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 24, flexGrow: 1 }}
            >
                <View className='flex flex-row flex-wrap gap-4'>
                    {CATEGORIAS_ATIVIDADE.map((interest) => (
                        <TouchableOpacity
                            key={interest.name}
                            className={`w-[48%] flex flex-col items-center justify-center p-4 rounded-lg border ${selectedInterests.includes(interest) ? 'bg-blue-600 ' : theme === 'light' ? 'bg-white border-[#E5E7EB]' : 'bg-[#1A1A2E] border-gray-700'}`}
                            onPress={() => {
                                if (selectedInterests.includes(interest)) {
                                    setSelectedInterests(selectedInterests.filter(i => i !== interest))
                                } else {
                                    setSelectedInterests([...selectedInterests, interest])
                                }
                            }}
                        >
                            <Text className={`text-4xl ${selectedInterests.includes(interest) ? 'text-white' : theme === 'light' ? 'text-[#1A1A2E]' : 'text-white'}`}>
                                {interest.icon}
                            </Text>
                            <Text className={`mt-2 text-sm font-medium ${selectedInterests.includes(interest) ? 'text-white' : theme === 'light' ? 'text-[#1A1A2E]' : 'text-white'}`}>
                                {interest.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <Divider theme={theme} />

            <View className='flex flex-row justify-center gap-4'>
                {currentStep > 1 && (
                    <Button variant='outline' className='w-[40%] flex self-start' theme={theme} onPress={() => { setCurrentStep(currentStep - 1) }} disabled={currentStep <= 1}>
                        <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                            Voltar
                        </Text>
                    </Button>
                )}

                <Button className='w-[40%] flex self-end' theme={theme} onPress={() => { onSubmit() }} disabled={selectedInterests.length <= 0 || currentStep >= 5}>
                    <Text className='text-base text-center items-center text-white'>
                        Continuar
                    </Text>
                </Button>
            </View>
        </View>
    )
}

export default Step2