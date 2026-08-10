import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { DefaultProps } from '../../src/interfaces/DefaultProps'
import { CarrosselRoteirosProps } from '../../src/interfaces/CarrosselRoteiros'
import { AppDescription, AppTitle } from './TextApp'
import CardRoteiro from './CardRoteiro'

const CarrosselRoteiros = ({ className, theme, titulo, descricao, listaRoteiros }: DefaultProps & CarrosselRoteirosProps) => {
    return (
        <View>
            <AppTitle theme={theme} >{titulo}</AppTitle>
            <AppDescription theme={theme}>{descricao}</AppDescription>
            <FlatList
                data={listaRoteiros}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap:16 }}
                renderItem={({ item }) => (
                    <View
                        className='flex flex-row gap-4 py-2 items-center'
                    >
                        <CardRoteiro theme={theme} image={item.image} title={item.title} location={item.location} stars={item.stars} tripDays={item.tripDays} priceLevel={item.priceLevel} liked={item.liked} />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default CarrosselRoteiros