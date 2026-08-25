import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AppDescription, AppText, AppTitle } from '../../../components/ui/TextApp'
import { StepProps } from '@/interfaces/StepProps'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '../../../components/ui/FormFields/TextField'
import Card from '../../../components/ui/Card'
import WarningCard from '../../../components/ui/WarningCard'
import { CATEGORIAS_ATIVIDADE } from '@/constants/ActivitiesTag'
import PrivacySelector from '../../../components/CriacaoRoteiro/PrivacySelector'
import Divider from '../../../components/ui/Divider'
import { Button } from '../../../components/ui/Button'

const formSchema = z.object({
    nome: z.string().min(1, { message: 'O nome do roteiro é obrigatório' }).max(50, { message: 'O nome do roteiro deve ter no máximo 50 caracteres' }),
})

type FormData = z.infer<typeof formSchema>

const Step5 = ({ theme, roteiroData, setRoteiroData, currentStep, setCurrentStep }: StepProps) => {
    const [selectedPrivacy, setSelectedPrivacy] = useState<'PRIVADO' | 'PUBLICO' | 'COLABORATIVO'>('PRIVADO')
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: '',
        },
    })

    return (
        <View className='gap-4'>
            <AppTitle theme={theme}>Revise e salve</AppTitle>
            <AppDescription theme={theme}>Confira antes de publicar seu roteiro</AppDescription>

            <ScrollView
                style={{ flex: 1, maxHeight: 475, gap: 4 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 24, flexGrow: 1 }}
            >

                <View className='gap-4'>

                    <View className='flex flex-col gap-2'>
                        <AppText theme={theme}>Nome do roteiro</AppText>
                        <TextField control={control} name='nome' placeholder='Digite o nome do roteiro' theme={theme} />
                    </View>

                    <View className='flex flex-col gap-2'>
                        <AppText theme={theme}>Resumo do roteiro</AppText>

                        <WarningCard >
                            <AppText theme={theme}>
                                Destino: {roteiroData.destino} {'\n'}
                                Periodo: {roteiroData.startDate?.toLocaleDateString()} - {roteiroData.endDate?.toLocaleDateString()} {'\n'}
                                Categorias: {CATEGORIAS_ATIVIDADE.find(cat => cat.tags.some(tag => roteiroData.tags.includes(tag)))?.name || 'Nenhuma'}
                            </AppText>
                        </WarningCard>
                    </View>

                    <View className='flex flex-col gap-2'>
                        <AppText theme={theme}>Quem pode ver este roteiro?</AppText>

                        <PrivacySelector theme={theme} selectedPrivacy={selectedPrivacy} setSelectedPrivacy={setSelectedPrivacy} />

                    </View>

                </View>

            </ScrollView>

            <Divider theme={theme} />

            <View className='flex flex-row justify-center gap-4'>
                {currentStep > 1 && (
                    <Button variant='outline' className='w-[40%] flex self-start' theme={theme} onPress={() => { setCurrentStep(currentStep - 1); }} disabled={currentStep <= 1}>
                        <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                            Anterior
                        </Text>
                    </Button>
                )}

                <Button className='w-[40%] flex self-end' theme={theme} onPress={() => { }} disabled={currentStep > 5}>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-white' : 'text-white'}`}>
                        Salvar Roteiro
                    </Text>
                </Button>
            </View>
        </View>
    )
}

export default Step5