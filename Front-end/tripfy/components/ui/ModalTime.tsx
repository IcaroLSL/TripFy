import { View, Text } from 'react-native'
import React from 'react'
import ModalComponent from './Modal'
import TimeField from './FormFields/TimeField'
import { Control, FieldPath, FieldValues, UseFormHandleSubmit, UseFormReset } from 'react-hook-form'
import { Button } from './Button'
import { Atividade } from '@/interfaces/Atividade'
import { set } from 'zod'



type ModalTimeProps<T extends FieldValues> = {
    control: Control<T>;
    startTime: FieldPath<T>;
    endTime: FieldPath<T>;
    handleSubmit: UseFormHandleSubmit<T>;
    reset: UseFormReset<T>;
    theme: 'light' | 'dark';
    onClose: () => void;
    activity: Atividade;
    setAddedActivity: (added: boolean) => void;
    onConfirm: (day: number, timeOfDay: 'morning' | 'afternoon' | 'night' | 'earlyMorning', activity: Atividade) => void;
};

function ModalTime<T extends FieldValues>({ control, startTime, endTime, theme, handleSubmit, onClose, reset, onConfirm, activity, setAddedActivity }: ModalTimeProps<T>) {

    const checkTimeOfDay = (time: string): 'morning' | 'afternoon' | 'night' | 'earlyMorning' => {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;

        if (totalMinutes >= 0 && totalMinutes < 360) {
            return 'earlyMorning';
        } else if (totalMinutes >= 360 && totalMinutes < 720) {
            return 'morning';
        } else if (totalMinutes >= 720 && totalMinutes < 1080) {
            return 'afternoon';
        } else {
            return 'night';
        }
    }

    const onSubmit = (data: T) => {
        setAddedActivity(true);
        const timeOfDay = checkTimeOfDay(data[startTime] as string);
        console.log('Time of Day:', timeOfDay);
        if (onConfirm) {
            const newActivity: Atividade = {
                ...activity,
                startTime: data[startTime] as string,
                endTime: data[endTime] as string,
            };
            onConfirm(activity.day, timeOfDay, newActivity);
        }
        onClose();
        reset();
    }

    return (
        <ModalComponent title='Selecione um horário' onClose={onClose} visible={true}>
            <View className='gap-4'>
                <View className='flex flex-row w-full gap-4 flex-1'>
                    <View className='flex-1 gap-2'>
                        <Text className={theme === 'light' ? 'text-black' : 'text-white'}>
                            Início e fim
                        </Text>
                        <TimeField startName={startTime} endName={endTime} theme={theme} control={control} />
                    </View>
                </View>
                <Button className='w-[40%] flex self-center' theme={theme} onPress={handleSubmit(onSubmit)}>
                    <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-white' : 'text-white'}`}>
                        Salvar
                    </Text>
                </Button>
            </View>
        </ModalComponent>
    )
}

export default ModalTime