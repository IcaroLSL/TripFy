import {
    View,
    ActivityIndicator,
    ScrollView,
    Image,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalComponent from '../ui/Modal';
import { useGetPlaceDetails } from '../../hooks/useGetPlace';
import { AppText, AppTitle } from '../ui/TextApp';
import { Button } from '../ui/Button';

interface ModalAtividadeProps {
    title?: string;
    onClose: () => void;
    placeId: string;
    theme: 'light' | 'dark';

}

const WEEKDAY_LABELS: Record<string, string> = {
    Monday: 'Segunda',
    Tuesday: 'Terça',
    Wednesday: 'Quarta',
    Thursday: 'Quinta',
    Friday: 'Sexta',
    Saturday: 'Sábado',
    Sunday: 'Domingo',
};

const ModalAtividade = ({ onClose, placeId, theme }: ModalAtividadeProps) => {
    const { getPlace, loading, error, place } = useGetPlaceDetails();
    const [activeImage, setActiveImage] = useState(0);
    const [showAllHours, setShowAllHours] = useState(false);

    const isDark = theme === 'dark';
    const c = {
        bg: isDark ? '#161B22' : '#FFFFFF',
        cardBg: isDark ? 'bg-yellow-100' : 'bg-gray-100',
        border: isDark ? '#2A323F' : '#E7E9EC',
        accent: isDark ? '#60A5FA' : '#60A5FA',
        textMuted: isDark ? '#9AA4B2' : '#6B7280',
    };

    useEffect(() => {
        if (placeId) getPlace(placeId);
    }, [placeId]);

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(
            e.nativeEvent.contentOffset.x / (240 + 12)
        );
        setActiveImage(index);
    };



    const todayIndex = new Date().getDay();
    const orderedDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const todayKey = orderedDays[todayIndex];

    const parsedHours =
        place?.hours?.map((h) => {
            const [day, ...rest] = h.split(':');
            return { day: day.trim(), schedule: rest.join(':').trim() };
        }) || [];

    const todayHours = parsedHours.find((h) => h.day === todayKey);

    return (
        <ModalComponent
            theme={theme}
            title={place?.name || 'Detalhes da Atividade'}
            onClose={onClose}
            visible={true}
            className='w-5/5'
        >
            {loading && (
                <View style={{ paddingVertical: 48 }}>
                    <ActivityIndicator
                        size="large"
                        color={isDark ? '#FFFFFF' : '#1E6B5E'}
                    />
                </View>
            )}

            {error && !loading && (
                <View style={{ padding: 24, alignItems: 'center' }}>
                    <MaterialIcons
                        name="error-outline"
                        size={28}
                        color={c.textMuted}
                    />
                    <AppText theme={theme}>
                        Não foi possível carregar os detalhes deste local.
                    </AppText>
                </View>
            )}

            {!loading && !error && (
                <>
                    {place?.imageUris && place.imageUris.length > 0 && (
                        <View style={{ marginBottom: 20 }}>
                            <ScrollView
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                snapToInterval={240 + 12}
                                decelerationRate="fast"
                                onMomentumScrollEnd={handleScroll}
                            >
                                {place.imageUris.map((imageUri, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: imageUri }}
                                        className='w-[240px] h-[180px] rounded-md mr-4 bg-gray-500/10'
                                    />
                                ))}
                            </ScrollView>

                            {place.imageUris.length > 1 && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        gap: 6,
                                        marginTop: 10,
                                    }}
                                >
                                    {place.imageUris.map((_, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                width: index === activeImage ? 16 : 6,
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor:
                                                    index === activeImage ? c.accent : c.border,
                                            }}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>
                    )}

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, marginBottom: 20 }}>
                        <View className='gap-4 flex flex-row'>

                            {place?.rating && (
                                <View
                                    className={`flex flex-row items-center gap-2 p-2 rounded-full ${isDark ? 'bg-[#2563eb26]' : 'bg-[#1E6B5E1A]'}`}>
                                    <MaterialIcons name="star" size={16} color="#F4A623" />
                                    <AppText
                                        theme={theme}
                                    >
                                        {place.rating.toFixed ? place.rating.toFixed(1) : place.rating} / 5
                                    </AppText>
                                </View>
                            )}

                            {place?.priceLevel && (
                                <View
                                    className='flex flex-row items-center bg-yellow-300/50 px-6  rounded-full'
                                >
                                    <AppText
                                        className='text-black'
                                        theme={theme}
                                    >
                                        {place.priceLevel === 0 ? 'Grátis' : place.priceLevel === 1 ? '$' : place.priceLevel === 2 ? '$$' : place.priceLevel === 3 ? '$$$' : place.priceLevel === 4 ? '$$$+' : ''}
                                    </AppText>
                                </View>
                            )}

                            {todayHours && (
                                <View
                                    className='flex flex-row items-center gap-2 bg-[#22C55E]/20 px-4 py-2 rounded-full'
                                >
                                    <View
                                        className='w-2 h-2 rounded-md bg-[#22C55E]'
                                    />
                                    <AppText
                                        theme={theme}
                                    >
                                        Aberto hoje
                                    </AppText>
                                </View>
                            )}

                            {place?.allowsDogs && (
                                <View
                                    className={`flex flex-row items-center gap-2 p-2 rounded-full ${isDark ? 'bg-[#2563eb26]' : 'bg-[#1E6B5E1A]'}`}>
                                    <MaterialIcons name="pets" size={18} color={c.accent} />
                                    <AppText
                                        theme={theme}
                                    >
                                        Aceita cachorros
                                    </AppText>
                                </View>
                            )}
                        </View>
                    </ScrollView>

                    <ScrollView
                        style={{ flex: 1, padding: 0, maxHeight: Dimensions.get('window').height * 0.42 }}
                        contentContainerStyle={{ paddingBottom: 16 }}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled
                    >
                        <View className='gap-4'>

                            {/* Endereço */}
                            <View
                                className='flex flex-row gap-2 items-start'
                            >
                                <View
                                    className={`items-center rounded-sm p-2 ${isDark ? 'bg-[#2563eb26]' : 'bg-[#1E6B5E1A]'}`}
                                >
                                    <MaterialIcons name="place" size={18} color={c.accent} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <AppTitle theme={theme} >
                                        Endereço
                                    </AppTitle>
                                    <AppText theme={theme} >
                                        {place?.address || 'Sem endereço disponível.'}
                                    </AppText>
                                </View>
                            </View>

                            {/* Horário de funcionamento */}
                            <View
                                className={`p-4 rounded-md ${isDark ? 'bg-gray-100/10' : 'bg-gray-100'}`}
                            >
                                <Pressable
                                    onPress={() => setShowAllHours((v) => !v)}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>

                                        <MaterialIcons name="schedule" size={18} color={c.accent} />
                                        <View>
                                            <AppTitle theme={theme} >
                                                Horário de funcionamento
                                            </AppTitle>
                                            {todayHours && !showAllHours && (
                                                <AppText theme={theme} >
                                                    Hoje: {todayHours.schedule}
                                                </AppText>
                                            )}
                                        </View>
                                    </View>
                                    <MaterialIcons
                                        name={showAllHours ? 'expand-less' : 'expand-more'}
                                        size={22}
                                        color={c.textMuted}
                                    />
                                </Pressable>

                                {showAllHours && (
                                    <View style={{ marginTop: 12, gap: 6 }}>
                                        {parsedHours.length > 0 ? (
                                            parsedHours.map((h, index) => {
                                                const isToday = h.day === todayKey;
                                                return (
                                                    <View
                                                        key={index}
                                                        style={{
                                                            flexDirection: 'row',
                                                            paddingVertical: 3,
                                                            gap: 4
                                                        }}
                                                    >
                                                        <AppText theme={theme} >
                                                            {WEEKDAY_LABELS[h.day] || h.day}:
                                                        </AppText>
                                                        <AppText
                                                            theme={theme}
                                                        >
                                                            {h.schedule}
                                                        </AppText>
                                                    </View>
                                                );
                                            })
                                        ) : (
                                            <AppText theme={theme}>
                                                Sem informações de horário disponíveis.
                                            </AppText>
                                        )}
                                    </View>
                                )}
                            </View>

                            <Button
                                variant='custom'
                                className='bg-blue-600 py-4 rounded-full flex flex-row items-center justify-center active:bg-blue-600/80'
                                theme={theme}
                                onPress={() => { }}
                            >
                                <MaterialIcons name="add" size={20} color="#FFFFFF" />
                                <AppText theme={theme} className='text-white text-base font-semibold ml-2'>
                                    Adicionar ao roteiro
                                </AppText>
                            </Button>
                        </View>

                    </ScrollView>
                </>
            )}
        </ModalComponent>
    );
};

export default ModalAtividade;