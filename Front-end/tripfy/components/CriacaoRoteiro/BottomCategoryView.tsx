import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BottomSheetComponent from '../ui/BottomSheet'
import { DefaultProps } from '@/interfaces/DefaultProps'
import { AppDescription, AppText, AppTitle } from '../ui/TextApp'
import { CategoriaAtividade, CATEGORIAS_ATIVIDADE } from '@/constants/ActivitiesTag'
import { Button } from '../ui/Button'
import { set } from 'zod'

interface BottomCategoryViewProps extends DefaultProps {
    onClose: (boolean: boolean) => void
    onCategorySelect: React.Dispatch<React.SetStateAction<CategoriaAtividade[]>>
    selectedCategories: CategoriaAtividade[]
    total: number
    loadingPlaces: boolean
}

const BottomCategoryView = ({ theme, onClose, onCategorySelect, selectedCategories, total, loadingPlaces }: BottomCategoryViewProps) => {
    const [isSelected, setIsSelected] = useState<string>('');

    const selectedCategory = CATEGORIAS_ATIVIDADE.find(c => c.name === isSelected);
    const selectedCategoryState = selectedCategories.find(c => c.name === isSelected);
    const selectedSubcategories = selectedCategoryState?.tags ?? [];
    const totalSubcategories = selectedCategory?.tags?.length ?? 0;

    const handleToggleCategory = (category: CategoriaAtividade) => {
        const isCategorySelected = selectedCategories.some(c => c.name === category.name);

        if (isSelected === category.name) {
            // Se clicar na categoria selecionada, desmarca tudo e fecha
            setIsSelected('');
            onCategorySelect((prev) =>
                prev.filter(c => c.name !== category.name)
            );
        } else {
            // Se clicar em uma nova categoria, abre ela
            setIsSelected(category.name);

            if (!isCategorySelected) {
                onCategorySelect((prev) => [
                    ...prev,
                    { ...category, tags: [...category.tags] }
                ]);
            }
        }
    };

    const handleToggleSubcategory = (tag: string) => {
        if (!selectedCategory) {
            return;
        }

        onCategorySelect((prev) =>
            prev.map((category) => {
                if (category.name !== selectedCategory.name) {
                    return category;
                }

                const hasTag = category.tags.includes(tag);
                const nextTags = hasTag
                    ? category.tags.filter((currentTag) => currentTag !== tag)
                    : [...category.tags, tag];

                return {
                    ...category,
                    tags: nextTags,
                };
            })
        );
    };

    return (
        <BottomSheetComponent index={2} onClose={onClose} theme={theme}>
            <View className='gap-4'>

                <View className='flex flex-row justify-between items-center'>
                    <AppTitle theme={theme}>
                        Categoria
                    </AppTitle>

                    <TouchableOpacity onPress={() => onCategorySelect([])}>
                        <AppDescription className='underline ' theme={theme}>
                            Limpar
                        </AppDescription>
                    </TouchableOpacity>
                </View>

                <View className="flex-row flex-wrap gap-2 ">
                    {CATEGORIAS_ATIVIDADE.map((category, index) => {
                        const isFullWidth = category.name === 'Compras';
                        const isCategorySelected = selectedCategories.some(c => c.name === category.name);

                        return (
                            <TouchableOpacity
                                key={category.name}
                                onPress={() => handleToggleCategory(category)}
                                className={`
                    ${isFullWidth ? 'w-full' : 'w-[48.5%]'} min-h-[42px] px-3 py-2 rounded-[10px] border flex-row items-center justify-between gap-2
                    ${isCategorySelected && (selectedCategories.find(c => c.name === category.name)?.tags?.length ?? 0) > 0
                                        ? 'border-2 border-blue-600'
                                        : theme === 'light'
                                            ? 'border-gray-800 bg-white'
                                            : 'border-gray-600 bg-[#1A1A2E]'
                                    }
                `}
                            >
                                <AppText
                                    theme={theme}
                                    className={`
                        flex-1
                        text-sm
                        ${isCategorySelected ? 'font-semibold' : ''}
                    `}
                                >
                                    {category.icon} {category.name}
                                </AppText>

                                <View className="bg-blue-600 rounded-full px-2 py-1">
                                    <AppText
                                        theme="dark"
                                        className="text-[10px] font-bold text-white"
                                    >
                                        {selectedCategories.find(c => c.name === category.name)?.tags?.length ?? 0}/{category.tags.length}

                                    </AppText>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {isSelected && selectedCategory && (
                    <View className='border-2 rounded-md p-4 border-blue-600'>
                        <View>

                            <View className='flex flex-wrap flex-row justify-between items-center'>
                                <AppTitle theme={theme}>
                                    {isSelected} — subcategorias
                                </AppTitle>

                                <View>
                                    <AppDescription theme={theme}>
                                        {selectedSubcategories.length}/{totalSubcategories}
                                    </AppDescription>

                                    <TouchableOpacity
                                        onPress={() => {
                                            onCategorySelect(prev =>
                                                prev.map(category =>
                                                    category.name === isSelected
                                                        ? { ...category, tags: [] }
                                                        : category
                                                )
                                            );
                                        }}
                                    >
                                        <AppText
                                            theme={theme}
                                            className='text-sm underline'
                                        >
                                            Desmarcar todas
                                        </AppText>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className='flex flex-row flex-wrap gap-2 mt-4'>
                                {selectedCategory.tags.map((tag) => {
                                    const isTagSelected = selectedSubcategories.includes(tag);

                                    return (
                                        <TouchableOpacity
                                            key={tag}
                                            onPress={() => handleToggleSubcategory(tag)}
                                            className={`
                                                min-h-[42px] px-3 py-2 rounded-[10px]  flex-row items-center justify-between gap-2
                                                ${theme === 'light'
                                                    ? 'bg-white'
                                                    : 'bg-[#1A1A2E]'
                                                }
                                                ${isTagSelected ? 'border-2 border-blue-600' : 'border border-gray-400'}
                                            `}
                                        >
                                            <View>

                                                <AppText
                                                    theme={theme}
                                                    className='text-sm'
                                                >
                                                    {tag}
                                                </AppText>
                                            </View>

                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                        </View>
                    </View>
                )}


                <View className='flex-1 flex-row gap-4 items-center justify-center w-full'>
                    <Button theme={theme} className='w-[50%]' variant='outline' onPress={() => { setIsSelected(''); onCategorySelect([]) }}>
                        <AppText theme={theme}>
                            limpar Filtro
                        </AppText>
                    </Button>

                    <Button theme={theme} className='w-[50%]' onPress={() => { onClose(false) }}>
                        <AppText className='text-white' theme={theme}>
                            {loadingPlaces ? 'Carregando...' : `Ver ${total} resultados`}
                        </AppText>
                    </Button>
                </View>

            </View>

        </BottomSheetComponent>
    )
}

export default BottomCategoryView