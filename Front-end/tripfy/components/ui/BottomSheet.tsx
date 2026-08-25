import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

interface BottomSheetComponentProps {
    theme: 'light' | 'dark';
    children: React.ReactNode;
    index?: number;
    onClose: (boolean: boolean) => void;
}

const BottomSheetComponent = ({ theme, children, onClose, index }: BottomSheetComponentProps) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [sheetIndex, setSheetIndex] = useState(index ?? 3);
    const snapPoints = [100, 300, '90%'];
    const isDark = theme === 'dark';

    const handleSheetChanges = useCallback((index: number) => {
        setSheetIndex(index);
        if (index === -1) {
            onClose(false)
        }
    }, []);

    return (
        <GestureHandlerRootView pointerEvents={sheetIndex === -1 ? 'none' : 'box-none'} style={sheetIndex === -1 ? {} : styles.overlay}>
            <BottomSheet
                ref={bottomSheetRef}
                index={sheetIndex}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
                backgroundStyle={{ backgroundColor: isDark ? '#192236' : '#FFFFFF' }}
                handleIndicatorStyle={{ backgroundColor: isDark ? '#6B7280' : '#D1D5DB' }}
            >
                <BottomSheetScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </BottomSheetScrollView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 999,
        elevation: 999,
    },
    scroll: {
        flex: 1,
    },
    content: {
        padding: 24,
        paddingBottom: 40,
    },
});

export default BottomSheetComponent;