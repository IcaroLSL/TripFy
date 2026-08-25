import { Roteiro } from "@/interfaces/Roteiro";
import { StepProps } from "@/interfaces/StepProps";
import { useColorScheme } from "react-native";
import { create } from "zustand";

const theme = useColorScheme() || 'light'

export const useRoteiroStore = create<StepProps>((set) => ({
    theme: theme,
    setDisabledNext: (disabled: boolean) => set((state) => ({ ...state, disabledNext: disabled })),
    currentStep: 1,
    setCurrentStep: (step: number) => set((state) => ({ ...state, currentStep: step })),
    roteiroData: {
        name: '',
        privicyType: 'PRIVADO',
        destino: '',
        startDate: null,
        endDate: null,
        morningActivities: {
            24: {
                activities: [
                    {
                        day: 1,
                        id: 0,
                        name: 'teste',
                        description: 'teste',
                        'image':'',
                        'startTime': '08:00',
                        'endTime': '12:00',
                        'priceLevel': 0,
                        'stars': 0,
                    }
                ]
            }
        },
        afternoonActivities: {},
        nightActivities: {},
        earlyMorningActivities: {},
        tags: [],
        orcamento: '',
        avaliacaoMinima: ''
    },
    setRoteiroData: (roteiro: Roteiro) => set((state) => ({ ...state, roteiroData: roteiro }))

}))