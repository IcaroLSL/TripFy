import { Pressable, View, Text } from "react-native";

interface ButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    variant?: 'default' | 'outline' | 'dashed' | 'custom';
    className?: string;
    disabled?: boolean;
    theme: 'light' | 'dark';
}

export function Button({ children, onPress, variant = 'default', className = '', disabled, theme }: ButtonProps) {

    const buttonVariants: Record<'default' | 'outline' | 'dashed' | 'custom', string> = {
        default: `bg-blue-600 active:opacity-75 font-bold text-white rounded-md p-[1em] ${disabled ? 'opacity-50' : ''}`,
        outline: `border border-blue-600 text-blue-500 font-bold p-[1em] rounded-md active:bg-blue-500/10 active:opacity-75 ${disabled ? 'opacity-50' : ''}`,
        dashed: `border border-dashed border-blue-600 text-blue-500 p-[1em] rounded-md font-bold active:bg-blue-500/10 active:opacity-75 ${disabled ? 'opacity-50' : ''}`,
        custom: ``
    };

    return (
        <Pressable
            className={`${buttonVariants[variant]} items-center  ${className}`}
            onPress={onPress}
            disabled={disabled}
        >
            {children}
        </Pressable>
    );
}