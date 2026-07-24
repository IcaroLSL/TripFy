import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  placeholder: string;
  options: SelectOption[];
  multiple?: boolean;
};

export function SelectField<T extends FieldValues>({
  control,
  name,
  placeholder,
  options,
  multiple = false,
}: SelectFieldProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const currentValue = value as string | string[] | undefined;
        const selectedValues: string[] = Array.isArray(currentValue)
          ? currentValue
          : typeof currentValue === 'string' && currentValue.length > 0
            ? [currentValue]
            : [];
        const selectedLabels = options
          .filter((option) => selectedValues.includes(option.value))
          .map((option) => option.label);
        const selectedText = selectedLabels.join(', ');

        return (
          <View className="gap-2 w-full">
            <Pressable
              className={`border min-w-full max-w-full py-4 px-4 rounded-md flex-row items-center justify-between ${error ? 'border-red-500' : 'border-gray-300'}`}
              onPress={() => setIsOpen(true)}
            >
              <Text
                className={`flex-1 mr-2 ${selectedText ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-400'}`}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {selectedText || placeholder}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" style={{ flexShrink: 0 }} />
            </Pressable>

            {error && <Text className="text-red-500">{error.message}</Text>}

            <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
              <Pressable className="flex-1 justify-center bg-black/40 px-6" onPress={() => setIsOpen(false)}>
                <Pressable className="max-h-[60%] rounded-lg bg-white dark:bg-gray-800 py-2" onPress={() => {}}>
                  <View className="px-2 pb-1 flex-row justify-end">
                    <Pressable
                      className="h-8 w-8 items-center justify-center rounded-full"
                      onPress={() => setIsOpen(false)}
                    >
                      <MaterialIcons name="close" size={20} color="gray" />
                    </Pressable>
                  </View>
                  <ScrollView>
                    {options.map((option) => {
                      const isSelected = selectedValues.includes(option.value);

                      return (
                        <Pressable
                          key={option.value}
                          className={`px-4 py-4 flex-row items-center justify-between ${isSelected ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                          onPress={() => {
                            if (multiple) {
                              const nextValues = isSelected
                                ? selectedValues.filter((selectedValue) => selectedValue !== option.value)
                                : [...selectedValues, option.value];

                              onChange(nextValues);
                              return;
                            }

                            onChange(option.value);
                            setIsOpen(false);
                          }}
                        >
                          <Text className="text-black dark:text-white">{option.label}</Text>
                          {isSelected && <MaterialIcons name="check" size={20} color="gray" />}
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </Pressable>
              </Pressable>
            </Modal>
          </View>
        );
      }}
    />
  );
}