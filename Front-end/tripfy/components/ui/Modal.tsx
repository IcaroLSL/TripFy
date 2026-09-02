import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ModalProps {
    visible: boolean;
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
    theme?: 'light' | 'dark';
    className?: string;
}

export default function ModalComponent({
    visible,
    title,
    onClose,
    children,
    theme = 'light',
    className = '',
}: ModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onDismiss={onClose}
            onRequestClose={onClose}
        >
            <View className="flex-1 items-center bg-black/50">
                <View className={`bg-white dark:bg-gray-800 absolute rounded-lg ${ className ? className : 'w-4/5'} max-w-sm p-6 mt-[20vh] shadow-lg overflow-hidden`} style={{ maxHeight: '70%' }}>
                    <View className='flex justify-between items-center flex-row'>
                        {title && (
                            <Text className="text-lg font-bold text-black dark:text-white mb-4">
                                {title}
                            </Text>
                        )}

                        <TouchableOpacity
                            onPress={onClose}
                            className="absolute top-2 right-2 p-2"
                        >
                            <MaterialIcons name="close" size={18} color={theme === 'dark' ? '#FFFFFF' : '#000000'} />
                        </TouchableOpacity>
                    </View>

                    <View className="mb-4 flex-1">{children}</View>
                </View>
            </View>
        </Modal>
    );
}