import React, { useState } from 'react';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { TimerPickerModal } from "react-native-timer-picker";
import { View, Pressable, TextInput, Text } from "react-native";

type TimeFieldProps<T extends FieldValues> = {
  control: Control<T>;
  startName: FieldPath<T>;
  endName: FieldPath<T>;
  theme?: 'light' | 'dark';
};

const TimeField = <T extends FieldValues>({
  control,
  startName,
  endName,
  theme = 'light',
}: TimeFieldProps<T>) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<'inicio' | 'fim' | null>(null);
  const [activeOnChange, setActiveOnChange] = useState<((value: string) => void) | null>(null);

  const formatTime = ({ hours, minutes }: { hours?: number; minutes?: number }) => {
    const timeParts = [];
    if (hours !== undefined) timeParts.push(hours.toString().padStart(2, "0"));
    if (minutes !== undefined) timeParts.push(minutes.toString().padStart(2, "0"));
    return timeParts.join(":");
  };

  return (
    <>
      <View className="flex flex-row w-full gap-4 flex-1">
        <Controller
          control={control}
          name={startName}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View className="flex-1 gap-2">
              <Pressable
                className="flex-1"
                onPress={() => {
                  setShowPicker(true);
                  setSelectedTime('inicio');
                  setActiveOnChange(() => onChange);
                }}
              >
                <TextInput
                  className={`border py-4 px-4 rounded-md ${theme === 'dark' ? 'border-blue-500 text-white' : 'bg-white border-gray-300 text-black'} ${error ? 'border-red-500' : ''}`}
                  placeholder="HH:MM"
                  value={value ? String(value) : ''}
                  editable={false}
                  pointerEvents="none"
                />
              </Pressable>

            </View>
          )}
        />

        <Controller
          control={control}
          name={endName}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View className="flex-1 gap-2">
              <Pressable
                className="flex-1"
                onPress={() => {
                  setShowPicker(true);
                  setSelectedTime('fim');
                  setActiveOnChange(() => onChange);
                }}
              >
                <TextInput
                  className={`border py-4 px-4 rounded-md ${theme === 'dark' ? 'border-blue-500 text-white' : 'bg-white border-gray-300 text-black'} ${error ? 'border-red-500' : ''}`}
                  placeholder="HH:MM"
                  value={value ? String(value) : ''}
                  editable={false}
                  pointerEvents="none"
                />
              </Pressable>

            </View>
          )}
        />
      </View>

      <TimerPickerModal
        closeOnOverlayPress
        modalTitle="Selecione o horário"
        modalProps={{ overlayOpacity: 0.2}}
        onCancel={() => {
          setShowPicker(false);
          setSelectedTime(null);
          setActiveOnChange(null);
        }}
        onConfirm={(pickedDuration) => {
          activeOnChange?.(formatTime(pickedDuration));
          setShowPicker(false);
          setSelectedTime(null);
          setActiveOnChange(null);
        }}
        setIsVisible={setShowPicker}
        hideSeconds
        styles={{
          theme: "dark",
          contentContainer: {
            width: "90%",
            // borderColor: "#3b82f6",
            // borderWidth: 1,
            // borderRadius: 8,
          },
          pickerItem:{
            color: "#9ca3af",
          },
          selectedPickerItem:{
            color: "white",
          },
          pickerColumnWidth: {
            hours: 80,
            minutes: 80,
          },
          buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            gap: 12,
          },
          confirmButton: { color: "#FFFFFF", backgroundColor: "#2563eb" },
          cancelButton: { color: "#FFFFFF", backgroundColor: "transparent", borderColor: "#d1d5db" },
        }}
        visible={showPicker}
      />
    </>
  )
}

export default TimeField