import { Controller, Control, FieldPath, FieldValues, FieldError } from 'react-hook-form';
import { Text, TextInput, View, Switch } from 'react-native';

type SwitchFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    placeholder: string;
    theme?: 'light' | 'dark';
};

export function SwitchField<T extends FieldValues>({
    control,
    name,
    placeholder,
    theme = 'light',
}: SwitchFieldProps<T>) {
    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value }, fieldState: { error } }) => (

                    <View className='gap-2 w-full flex-row items-center'>
                        <Switch
                            trackColor={{ false: '#767577', true: '#15803d' }}
                            thumbColor={value ? '#fff' : '#f4f3f4'}
                            value={value}
                            onValueChange={onChange}
                        />

                        <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{placeholder}</Text>

                        {error && (
                            <View>
                                <Text className='font-bold text-red-500'>{error.message}</Text>
                            </View>
                        )}
                    </View>
                )}
            />
        </>
    );
}