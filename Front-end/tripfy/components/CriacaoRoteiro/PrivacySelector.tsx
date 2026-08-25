import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { DefaultProps } from '@/interfaces/DefaultProps'
import { AppDescription, AppText } from '../ui/TextApp'

type PrivacyType = 'PRIVADO' | 'PUBLICO' | 'COLABORATIVO'

interface PrivacySelectorProps extends DefaultProps {
    selectedPrivacy?: PrivacyType
    setSelectedPrivacy?: (privacy: PrivacyType) => void
}

const PrivacySelector = ({ theme, selectedPrivacy, setSelectedPrivacy }: PrivacySelectorProps) => {
    const privacyOptions: Array<{
        id: PrivacyType
        label: string
        description: string
        icon: string
    }> = [
        {
            id: 'PRIVADO',
            label: 'Privado',
            description: 'Só você vê. Pode compartilhar depois com pessoas específicas ou por link.',
            icon: 'lock',
        },
        {
            id: 'PUBLICO',
            label: 'Público',
            description: 'Qualquer pessoa pode ver e clonar este roteiro.',
            icon: 'public',
        },
        {
            id: 'COLABORATIVO',
            label: 'Colaborativo',
            description: 'Pessoas convidadas podem ver e editar junto.',
            icon: 'group',
        },
    ]

    return (
        <View className='gap-3'>
            {privacyOptions.map((option) => (
                <TouchableOpacity
                    key={option.id}
                    activeOpacity={0.7}
                    className={`rounded-xl border-2 p-4 ${
                        selectedPrivacy === option.id
                            ? `border-blue-600 ${theme === 'light' ? 'bg-blue-50' : 'bg-[#1A1A2E]'}`
                            : theme === 'light'
                                ? 'border-gray-200 bg-white'
                                : 'border-gray-700 bg-[#1A1A2E]'
                    }`}
                    onPress={() => setSelectedPrivacy && setSelectedPrivacy(option.id)}
                >
                    <View className='flex-row items-start gap-3'>
                        {/* Radio Button */}
                        <View
                            className={`h-6 w-6 rounded-full border-2 items-center justify-center flex-shrink-0 mt-0.5 ${
                                selectedPrivacy === option.id
                                    ? 'border-blue-600 bg-blue-600'
                                    : theme === 'light'
                                        ? 'border-gray-300'
                                        : 'border-gray-600'
                            }`}
                        >
                            {selectedPrivacy === option.id && (
                                <MaterialIcons name='check' size={14} color='white' />
                            )}
                        </View>

                        {/* Icon & Text */}
                        <View className='flex-1'>
                            <View className='flex-row items-center gap-2 mb-1'>
                                <MaterialIcons
                                    name={option.icon as any}
                                    size={18}
                                    color={selectedPrivacy === option.id ? '#2563eb' : theme === 'light' ? '#1A1A2E' : '#ffffff'}
                                />
                                <AppText
                                    theme={theme}
                                    className={`font-semibold ${
                                        selectedPrivacy === option.id ? 'text-blue-600' : ''
                                    }`}
                                >
                                    {option.label}
                                </AppText>
                            </View>

                            <AppDescription
                                theme={theme}
                                className={`text-xs leading-relaxed `}
                            >
                                {option.description}
                            </AppDescription>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default PrivacySelector
