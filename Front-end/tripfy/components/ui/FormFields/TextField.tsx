import { MaterialIcons } from '@expo/vector-icons';
import { Controller, Control, FieldPath, FieldValues, FieldError } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

type TextFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    placeholder: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
    theme?: 'light' | 'dark';
};

export function TextField<T extends FieldValues>({
    control,
    name,
    placeholder,
    icon,
    theme = 'light',
}: TextFieldProps<T>) {
    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <View className={`flex-row items-center justify-start border min-w-full gap-2 w-full max-w-full py-2 px-4 rounded-md ${theme === 'dark' ? ' border-blue-500 text-white placeholder:text-white' : 'bg-white border-gray-300 text-black'} ${error && 'border-red-500'}`}>
                            {icon && (
                                <MaterialIcons name={icon} size={20} color={theme === 'dark' ? 'white' : 'black'} />
                            )}
                            <TextInput
                                className='text-white placeholder:text-white'
                                placeholder={placeholder}
                                onChangeText={onChange}
                                value={value}
                            />


                        </View>
                        {error && (
                            <View>
                                <Text className='font-bold text-red-500'>{error.message}</Text>
                            </View>
                        )}
                    </>
                )}
            />
        </>
    );
}