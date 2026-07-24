import { View, Text } from 'react-native'
import React from 'react'
import { AppDescription, AppTitle } from '../../../components/ui/TextApp'
import { StepProps } from '../../../interfaces/StepProps'

const Step2 = ({ theme, currentStep, setCurrentStep }: StepProps) => {
    const [ selectedInterests, setSelectedInterests ] = React.useState<string[]>([]);
    return (
        <>
            <AppTitle theme={theme}>O que você curte?</AppTitle>
            <AppDescription theme={theme}>Selecione uma ou mais — isso prioriza as sugestões da Etapa 4</AppDescription>

            <View className='flex flex-row flex-wrap gap-2'>
                {['Praia', 'Montanha', 'Cultura', 'Aventura', 'Gastronomia', 'Esportes'].map((interest) => (
                    <Text
                        key={interest}
                        className={`px-4 py-2 rounded-full border ${selectedInterests.includes(interest) ? 'bg-blue-600 text-white' : theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-gray-800 text-white border-gray-700'}`}
                        onPress={() => {
                            if (selectedInterests.includes(interest)) {
                                setSelectedInterests(selectedInterests.filter(i => i !== interest));
                            } else {
                                setSelectedInterests([...selectedInterests, interest]);
                            }
                        }}
                    >
                        {interest}
                    </Text>
                ))}
            </View>
        </>
    )
}

export default Step2