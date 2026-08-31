import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import BottomSheetComponent from '../ui/BottomSheet'
import { DefaultProps } from '@/interfaces/DefaultProps'
import { AppDescription, AppText, AppTitle } from '../ui/TextApp'
import App from '../../app'
import { Button } from '../ui/Button'

interface BottomRatingPriceViewProps extends DefaultProps {
    onClose: (boolean: boolean) => void
    onPriceSelect: (price: string[]) => void
    onRatingSelect: (ratings: string[]) => void
    selectedPrice: string[]
    selectedRatings: string[]
    total: number
    loadingPlaces: boolean
}

const listPrices: string[] = ['0', '1', '2', '3', '4']

const listRatings: string[] = ['0', '1', '2', '3', '4', '5']

const BottomRatingPriceView = ({ theme, onClose, onPriceSelect, onRatingSelect, selectedPrice, selectedRatings, total, loadingPlaces }: BottomRatingPriceViewProps) => {

    const handleSelectPrice = (price: string) => {
        onPriceSelect(selectedPrice.includes(price) ? selectedPrice.filter(p => p !== price) : [...selectedPrice, price].sort((a, b) => a.length - b.length))
    }

    const handleSelectRating = (rating: string) => {
        if (selectedRatings.includes(rating) && rating !== 'Sem filtro') {
            onRatingSelect(selectedRatings.filter(r => r !== rating))
        } else {
            onRatingSelect(rating === 'Sem filtro' ? ['Sem filtro'] : [...selectedRatings.filter(r => r !== 'Sem filtro'), rating])
        }
    }

    return (
        <BottomSheetComponent index={2} onClose={onClose} theme={theme}>
            <View className='gap-4'>

                <View className='flex flex-row justify-between items-center'>
                    <AppTitle theme={theme}>
                        Preço e Avaliação
                    </AppTitle>

                    <TouchableOpacity onPress={() => { onPriceSelect([]); onRatingSelect(['Sem filtro']) }}>
                        <AppDescription className='underline' theme={theme}>
                            Limpar
                        </AppDescription>
                    </TouchableOpacity>
                </View>


                <View className='gap-4'>
                    <AppTitle theme={theme}>
                        Faixa de Preço (Múltipla escolha)
                    </AppTitle>

                    <View className='flex flex-row gap-4'>
                        {listPrices.map((price, index) => (
                            <View key={index} className={`border border-blue-500 py-2 px-4 rounded-full items-center ${selectedPrice.includes(price) ? 'bg-blue-500' : ''}`} onTouchEnd={() => handleSelectPrice(price)}>
                                <AppText className={`${selectedPrice.includes(price) ? 'text-white' : 'text-black'}`} theme={theme}>
                                    {price === '0' ? 'Grátis' : 
                                    price === '1' ? '$' :
                                    price === '2' ? '$$' :
                                    price === '3' ? '$$$' :
                                    price === '4' ? '$$$+' : ''}
                                </AppText>
                            </View>
                        ))}
                    </View>
                </View>

                <View className='gap-4'>
                    <AppTitle theme={theme}>
                        Avaliação Mínima
                    </AppTitle>

                    <View className='flex flex-row gap-4 flex-wrap items-center'>
                        {listRatings.map((rating, index) => (
                            <View key={index} className={`border border-blue-500 py-2 px-4 rounded-full items-center ${selectedRatings.includes(rating) ? 'bg-blue-500' : ''}`} onTouchEnd={() => handleSelectRating(rating)}>
                                <AppText theme={theme} className={`${selectedRatings.includes(rating) ? 'text-white' : 'text-black'}`}>
                                    {rating === '0' ? 'Sem filtro' : rating === '1' ? '1★+' : rating === '2' ? '2★+' : rating === '3' ? '3★+' : rating === '4' ? '4★+' : '5★'}
                                </AppText>
                            </View>
                        ))}
                    </View>
                </View>

                <View className='flex-1 flex-row gap-4 items-center justify-center w-full'>
                    <Button theme={theme} className='w-[50%]' variant='outline' onPress={() => { selectedPrice.length > 0 && onPriceSelect([]); selectedRatings.length > 0 && onRatingSelect(['Sem filtro']) }}>
                        <AppText theme={theme}>
                            Limpar filtro
                        </AppText>
                    </Button>

                    <Button disabled={selectedRatings.length === 0 || selectedPrice.length === 0} theme={theme} className='w-[50%]' onPress={() => onClose(false)}>
                        <AppText className='text-white' theme={theme}>
                            { loadingPlaces ? 'Carregando...' : `Ver ${total} resultados` }
                        </AppText>
                    </Button>
                </View>
            </View>

        </BottomSheetComponent>
    )
}

export default BottomRatingPriceView