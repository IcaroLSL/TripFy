import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Modal, Pressable, Text, View } from 'react-native';
import DateTimePicker, { DateType, useDefaultClassNames } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

type DateFieldMode = 'single' | 'range' | 'multiple';

type DateFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    placeholder: string;
    mode?: DateFieldMode;
    theme?: 'light' | 'dark';
    minDate?: DateType;
    maxDate?: DateType;
    timePicker?: boolean;
    use12Hours?: boolean;
    label?: string;
};

/**
 * Formata a data para exibição
 */
function formatDateDisplay(date: DateType, format: string = 'DD/MM/YYYY'): string {
    if (!date) return '';
    return dayjs(date).format(format);
}

/**
 * Formata múltiplas datas para exibição
 */
function formatMultipleDates(dates: DateType[]): string {
    if (!dates || dates.length === 0) return '';
    return dates.map((date) => formatDateDisplay(date)).join(', ');
}

/**
 * Formata intervalo de datas para exibição
 */
function formatDateRange(
    startDate: DateType,
    endDate: DateType,
): string {
    if (!startDate && !endDate) return '';
    if (startDate && !endDate) return formatDateDisplay(startDate);
    if (startDate && endDate) {
        const start = formatDateDisplay(startDate);
        const end = formatDateDisplay(endDate);
        return `${start} - ${end}`;
    }
    return '';
}

export function DateField<T extends FieldValues>({
    control,
    name,
    placeholder,
    mode = 'single',
    theme = 'light',
    minDate,
    maxDate,
    timePicker = false,
    use12Hours = false,
    label,
}: DateFieldProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const customClassNames = {
      // Calendar grid
      days: `${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`,
      day: `${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} rounded-lg`,
      day_label: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs font-medium`,
      
      // Selected/Today states (matching image: teal primary color)
      today: `bg-blue-600 text-white rounded-full font-semibold`,
      selected: `bg-blue-600 text-white rounded-full font-semibold`,
      selected_label: `text-white font-semibold`,
      
      // Range fill (for range mode)
      range_today: `${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`,
      range_fill: `${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`,
      range_fill_weekstart: `${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'} `,
      range_fill_weekend: `${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'} `,
      
      // Disabled dates
      disabled: `${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'} opacity-50 rounded-lg`,
      disabled_label: `${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'} opacity-50`,
      
      // Header & naviga{error && <Text className="text-red-500 text-sm font-medium">{error.message}</Text>}tion
      button_prev: `text-blue-600 font-bold text-xl`,
      button_next: `text-blue-600 font-bold text-xl`,
      button_prev_image: `text-blue-600`,
      button_next_image: `text-blue-600`,
      
      // Month/Year selectors
      months: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`,
      month: `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg`,
      month_label: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`,
      month_selector: `${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`,
      month_selector_label: `${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold`,
      
      years: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`,
      year: `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg`,
      year_label: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`,
      year_selector: `${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`,
      year_selector_label: `${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold`,
      
      // Weekdays
      weekday: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-semibold text-sm`,
      weekday_label: `${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} text-xs uppercase`,
      
      // Time picker (if enabled)
      time_selector: `${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`,
      time_selector_label: `${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm font-medium`,
      time_label: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs`,
      time_selector_button: `text-blue-600 font-semibold rounded-lg`,
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                let displayText = '';

                if (mode === 'single') {
                    displayText = formatDateDisplay(value) || placeholder;
                } else if (mode === 'range') {
                    const startDate = value?.startDate || null;
                    const endDate = value?.endDate || null;
                    displayText = formatDateRange(startDate, endDate) || placeholder;
                } else if (mode === 'multiple') {
                    displayText = formatMultipleDates(value || []) || placeholder;
                }

                return (
                    <View className="gap-2 w-full">
                        {label && (
                            <Text
                                className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                {label}
                            </Text>
                        )}

                        <Pressable
                            className={`border min-w-full max-w-full py-4 px-4 rounded-md flex-row items-center justify-between ${theme === 'dark'
                                    ? 'border-blue-500 '
                                    : `bg-white ${error ? 'border-red-500' : 'border-gray-300'}`
                                }`}
                            onPress={() => setIsOpen(true)}
                        >
                            <Text
                                className={`flex-1 mr-2 ${displayText === placeholder
                                        ? theme === 'dark'
                                            ? 'text-gray-400'
                                            : 'text-gray-400'
                                        : theme === 'dark'
                                            ? 'text-white'
                                            : 'text-black'
                                    }`}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {displayText}
                            </Text>
                            <MaterialIcons
                                name="event"
                                size={24}
                                color={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                                style={{ flexShrink: 0 }}
                            />
                        </Pressable>

                        {error && (
                            <Text className="text-red-500 text-sm font-medium">
                                {typeof error === 'object' && error?.message ? error.message : 'Data inválida'}
                            </Text>
                        )}

                        <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
                            <Pressable
                                className="flex-1 justify-center items-center bg-black/40 px-4"
                                onPress={() => setIsOpen(false)}
                            >
                                <Pressable
                                    className={`w-full rounded-lg py-4 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
                                    onPress={() => { }}
                                >
                                    {/* Header */}
                                    <View className="flex-row justify-between items-center mb-4">
                                        <Text
                                            className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                                        >
                                            Selecionar Data
                                        </Text>
                                        <Pressable
                                            className="h-8 w-8 items-center justify-center rounded-full"
                                            onPress={() => setIsOpen(false)}
                                        >
                                            <MaterialIcons
                                                name="close"
                                                size={20}
                                                color={theme === 'dark' ? '#E5E7EB' : '#6B7280'}
                                            />
                                        </Pressable>
                                    </View>

                                    {/* DateTimePicker */}
                                    <View className="mb-4">
                                        {mode === 'single' && (
                                            <DateTimePicker
                                                mode="single"
                                                date={value || new Date()}
                                                onChange={({ date }) => {
                                                    onChange(date);
                                                    setIsOpen(false);
                                                }}
                                                minDate={minDate}
                                                maxDate={maxDate}
                                                timePicker={timePicker}
                                                use12Hours={use12Hours}
                                                classNames={customClassNames}
                                                containerHeight={300}
                                            />
                                        )}

                                        {mode === 'range' && (
                                            <DateTimePicker
                                                mode="range"
                                                startDate={value?.startDate || new Date()}
                                                endDate={value?.endDate || undefined}
                                                onChange={({ startDate, endDate }) => {
                                                    onChange({ startDate, endDate });
                                                    if (startDate && endDate) {
                                                        setIsOpen(false);
                                                    }
                                                }}
                                                minDate={minDate}
                                                maxDate={maxDate}
                                                classNames={customClassNames}
                                                containerHeight={300}
                                            />
                                        )}

                                        {mode === 'multiple' && (
                                            <DateTimePicker
                                                mode="multiple"
                                                dates={value || []}
                                                onChange={({ dates }) => {
                                                    onChange(dates);
                                                }}
                                                minDate={minDate}
                                                maxDate={maxDate}
                                                classNames={customClassNames}
                                                containerHeight={300}
                                            />
                                        )}
                                    </View>

                                    {/* Action Buttons */}
                                    <View className="flex-row gap-2 justify-end">
                                        <Pressable
                                            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700"
                                            onPress={() => setIsOpen(false)}
                                        >
                                            <Text className="text-gray-900 dark:text-white font-medium">Cancelar</Text>
                                        </Pressable>

                                        {mode !== 'range' && (
                                            <Pressable
                                                className="px-4 py-2 rounded-md bg-teal-600"
                                                onPress={() => setIsOpen(false)}
                                            >
                                                <Text className="text-white font-medium">Confirmar</Text>
                                            </Pressable>
                                        )}
                                    </View>
                                </Pressable>
                            </Pressable>
                        </Modal>
                    </View>
                );
            }}
        />
    );
}