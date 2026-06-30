import React, { useState } from 'react';
import { View, Text, TextInput as RNTextInput, type TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  contador?: { atual: number; max: number };
  iconLeft?: string;
  iconRight?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  contador,
  iconLeft,
  iconRight,
  style,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View className="gap-1">
      {label && (
        <Text className="text-label font-[500] text-text" style={{ fontFamily: 'Inter' }}>
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center rounded-md border bg-card px-3 ${
          error
            ? 'border-error'
            : focused
              ? 'border-primary'
              : 'border-border'
        }`}
      >
        {iconLeft && <Text className="mr-2">{iconLeft}</Text>}
        <RNTextInput
          className={`flex-1 py-2.5 text-body text-text`}
          style={{ fontFamily: 'Inter' }}
          placeholderTextColor="#6B7280"
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {iconRight && <Text className="ml-2">{iconRight}</Text>}
      </View>
      <View className="flex-row justify-between">
        {error ? (
          <Text className="text-caption text-error" style={{ fontFamily: 'Inter' }}>
            {error}
          </Text>
        ) : hint ? (
          <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
            {hint}
          </Text>
        ) : (
          <View />
        )}
        {contador && (
          <Text
            className={`text-caption ${contador.atual >= contador.max ? 'text-error' : 'text-muted'}`}
            style={{ fontFamily: 'Inter' }}
          >
            {contador.atual}/{contador.max}
          </Text>
        )}
      </View>
    </View>
  );
};