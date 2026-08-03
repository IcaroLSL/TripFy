import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
type PasswordFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    placeholder: string;
    theme?: 'light' | 'dark';
};

export function PasswordField<T extends FieldValues>({ control, name, placeholder, theme = 'light' }: PasswordFieldProps<T>) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (

        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value }, fieldState: { error } }) => (

                    <View className='gap-2  w-full' >
                        <View className='items-center w-full'>
                            <TextInput
                                className={`border min-w-full max-w-full py-4 px-4 rounded-md ${theme === 'dark' ? ' border-blue-500 text-white placeholder:text-white' : 'bg-white border-gray-300 text-black'} ${error && 'border-red-500'}`}
                                placeholder={placeholder}
                                secureTextEntry={!isPasswordVisible}
                                onChangeText={onChange}
                                value={value}
                            />
                            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute right-4 top-1/2 -translate-y-1/2">
                                <MaterialIcons name={isPasswordVisible ? "visibility" : "visibility-off"} size={24} color="gray" />
                            </Pressable>
                        </View>

                        {error && (
                            <View>
                                <Text className='text-red-500 font-bold'>{error.message}</Text>
                            </View>
                        )}

                    </View>

                )}
            />
        </>
    );
}