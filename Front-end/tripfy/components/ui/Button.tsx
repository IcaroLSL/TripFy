import { Pressable, View, Text } from "react-native";

interface ButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    variant?: 'default' | 'outline' | 'dashed';
    className?: string;
    disabled?: boolean;
    theme: 'light' | 'dark';
}

export function Button({ children, onPress, variant = 'default', className = '', disabled, theme }: ButtonProps) {

    const buttonVariants: Record<'default' | 'outline' | 'dashed', string> = {
        default: `bg-blue-600 active:opacity-75 font-bold text-white ${disabled ? 'opacity-50' : ''}`,
        outline: `border border-blue-600 text-blue-500 font-bold active:bg-blue-500/10 active:opacity-75 ${disabled ? 'opacity-50' : ''}`,
        dashed: `border border-dashed border-blue-600 text-blue-500 font-bold active:bg-blue-500/10 active:opacity-75 ${disabled ? 'opacity-50' : ''}`,
    };

    return (
        <Pressable
            className={`${buttonVariants[variant]} p-[1em] items-center rounded-md ${className}`}
            onPress={onPress}
            disabled={disabled}
        >
            {children}
        </Pressable>
    );
}