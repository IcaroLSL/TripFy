import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { ScreenContent } from '../../../components/ScreenContent'
import { AppDescription, AppTitle } from '../../../components/ui/TextApp'
import { StepProps } from '../../../interfaces/StepProps'
import WarningCard from '../../../components/ui/WarningCard'

const Step3 = ({ theme }: StepProps) => {
    const [selectedPriceRange, setSelectedPriceRange] = React.useState<string | null>(null);
    const [selectedRating, setSelectedRating] = React.useState<string | null>(null);
   
    return (
        <>
            <AppTitle theme={theme}>Qual seu orçamento?</AppTitle>
            <AppDescription theme={theme}>Por atividade — dá pra ajustar depois</AppDescription>

            <AppTitle theme={theme}>Faixa de preço</AppTitle>

            <View
                className={`rounded-2xl border ${theme === "light"
                        ? "border-gray-200 bg-white"
                        : "border-blue-600 bg-[#1D2235]"
                    }`}
            >
                <View className="flex-row">
                    {["Grátis", "$", "$$", "$$$", "$$$$"].map((item, index) => (
                        <Pressable 
                            key={item}
                            className={`flex-1 ${
                                selectedPriceRange === item ? "bg-blue-600" : theme === "light" ? "bg-white" : "bg-[#1D2235]"
                            } ${
                                index === 0 ? "rounded-l-md" : index === 4 ? "rounded-r-md" : ""
                            } items-center justify-center py-4 ${
                                index !== 0
                                    ? theme === "light"
                                        ? "border-l border-gray-200"
                                        : "border-l border-blue-600"
                                    : ""
                            }`}
                            onPress={() => setSelectedPriceRange(item)}
                        >
                            <Text
                                className={`font-semibold ${
                                    selectedPriceRange === item
                                        ? "text-white"
                                        : theme === "light"
                                        ? "text-black"
                                        : "text-white"
                                }`}
                            >
                                {item}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            <AppTitle theme={theme}>Avaliação mínima</AppTitle>

            <View
                className={`rounded-2xl border ${theme === "light"
                        ? "border-gray-200 bg-white"
                        : "border-blue-600 bg-[#1D2235]"
                    }`}
            >
                <View className="flex-row">
                    {["Sem filtro", "3+", "4+", "4.5+"].map((item, index) => (
                        <Pressable
                            key={item}
                            className={`flex-1 ${
                                selectedRating === item ? "bg-blue-600" : theme === "light" ? "bg-white" : "bg-[#1D2235]"
                            } ${
                                index === 0 ? "rounded-l-md" : index === 3 ? "rounded-r-md" : ""
                            } items-center justify-center py-4 ${
                                index !== 0
                                    ? theme === "light"
                                        ? "border-l border-gray-200"
                                        : "border-l border-blue-600"
                                    : ""
                            }`}
                            onPress={() => setSelectedRating(item)}
                        >
                            <Text
                                className={`font-semibold ${
                                    selectedPriceRange === item
                                        ? "text-white"
                                        : theme === "light"
                                        ? "text-black"
                                        : "text-white"
                                }`}
                            >
                                {item}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>


            <WarningCard>
                <AppDescription theme={theme}>
                    Atividades com menos de 10 avaliações não entram no ranking de destaque.
                </AppDescription>
            </WarningCard>
        </>
    )
}

export default Step3