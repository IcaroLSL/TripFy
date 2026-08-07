import { View, Text, TouchableOpacity } from 'react-native'
import React, { JSX } from 'react'
import { AppDescription, AppTitle } from '../../../components/ui/TextApp'
import { StepProps } from '../../../interfaces/StepProps'
import { MaterialIcons } from '@expo/vector-icons';

interface Interest {
    name: string;
    icon: JSX.Element;
}

const interests: { name: string, icon: JSX.Element }[] = [
    {name: 'Restaurantes', icon: <Text>🍽</Text>},
    {name: 'Museus', icon: <Text>🏛</Text>},
    {name: 'Praia', icon: <Text>🏖</Text>},
    {name: 'Parques', icon:<Text>🌳</Text>},
    {name: 'Compras', icon: <Text>🛍</Text>},
    {name: 'Vida Noturna', icon: <Text>🌃</Text>},
    {name: 'Ar Livre', icon: <Text>🥾</Text>},
    {name: 'Cultura', icon: <Text>🏺</Text>},
    {name: 'Vida-Selvagem', icon: <Text>🐻</Text>},
    {name: 'Parques de Diversão', icon: <Text> 🎡</Text>},
];

const Step2 = ({ theme, currentStep, setCurrentStep }: StepProps) => {
    const [selectedInterests, setSelectedInterests] = React.useState<Interest[]>(interests);
    return (
        <>
            <AppTitle theme={theme}>O que você curte?</AppTitle>
            <AppDescription theme={theme}>Selecione uma ou mais — isso prioriza as sugestões da Etapa 4</AppDescription>
            <View className="flex flex-row flex-wrap gap-4 mt-4">
                {interests.map((interest) => (
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
                        {interest.icon}
                        <Text className={`mt-2 text-sm font-medium ${selectedInterests.includes(interest) ? 'text-white' : theme === 'light' ? 'text-[#1A1A2E]' : 'text-white'}`}>{interest.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    )
}

export default Step2