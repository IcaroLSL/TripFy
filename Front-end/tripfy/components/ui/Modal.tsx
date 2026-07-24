import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ModalProps {
    visible: boolean;
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
}

export default function ModalComponent({
    visible,
    title,
    onClose,
    children,
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
                <View className="bg-white dark:bg-gray-800 absolute rounded-lg w-4/5 max-w-sm p-6 mt-[20vh] shadow-lg">
                    {title && (
                            <Text className="text-lg font-bold text-black dark:text-white mb-4">
                                {title}
                            </Text>
                    )}

                    <View className="mb-4">{children}</View>
                </View>
            </View>
        </Modal>
    );
}