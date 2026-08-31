import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
type PasswordFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    placeholder: string;
    theme?: 'light' | 'dark';
    icon?: keyof typeof MaterialIcons.glyphMap;
};

export function PasswordField<T extends FieldValues>({ control, name, placeholder, theme = 'light', icon }: PasswordFieldProps<T>) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (

        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value }, fieldState: { error } }) => (

                    <View className='gap-2  w-full' >
                        <View className={`flex-row items-center justify-start border min-w-full gap-2 w-full max-w-full py-2 px-4 rounded-md ${theme === 'dark' ? ' border-blue-600 text-white placeholder:text-white' : 'bg-white border-gray-300 text-black'} ${error && 'border-red-500'}`}>

                            {icon && (
                                <MaterialIcons name={icon} size={20} color={theme === 'dark' ? 'white' : 'black'} />
                            )}

                            <TextInput
                                className={`w-full ${theme === 'dark' ? 'text-white placeholder:text-white' : 'text-black placeholder:text-gray-500'}`}
                                placeholder={placeholder}
                                secureTextEntry={!isPasswordVisible}
                                onChangeText={onChange}
                                value={value}
                            />
                            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute right-4 top-8 -translate-y-1/2">
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