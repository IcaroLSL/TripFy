import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from './Button';

interface ConflictModalProps {
  visible: boolean;
  titulo: string;
  mensagem: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'info' | 'warning';
}

export const ConflictModal: React.FC<ConflictModalProps> = ({
  visible,
  titulo,
  mensagem,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'warning',
}) => {
  const confirmVariant = variant === 'danger' ? 'danger' : 'primary';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 items-center justify-center bg-black/50 px-lg">
        <View className="w-full max-w-md rounded-lg bg-card p-lg shadow-modal">
          <View className="items-center mb-md">
            <Text className="text-[32px]">
              {variant === 'danger' ? '⚠️' : variant === 'warning' ? '⚡' : 'ℹ️'}
            </Text>
          </View>
          <Text
            className="text-heading font-[600] text-text text-center mb-2"
            style={{ fontFamily: 'Inter' }}
          >
            {titulo}
          </Text>
          <ScrollView className="max-h-32 mb-lg">
            <Text
              className="text-body text-muted text-center"
              style={{ fontFamily: 'Inter' }}
            >
              {mensagem}
            </Text>
          </ScrollView>
          <View className="gap-3">
            <Button
              variant={confirmVariant as any}
              size="md"
              onPress={onConfirm}
            >
              {confirmLabel}
            </Button>
            <Button variant="ghost" size="md" onPress={onCancel}>
              {cancelLabel}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Modal comparativo para conflitos de edicao
interface EditConflictModalProps {
  visible: boolean;
  onKeepMine: () => void;
  onKeepTheirs: () => void;
  onMerge: () => void;
  onCancel: () => void;
}

export const EditConflictModal: React.FC<EditConflictModalProps> = ({
  visible,
  onKeepMine,
  onKeepTheirs,
  onMerge,
  onCancel,
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
    <View className="flex-1 items-center justify-center bg-black/50 px-lg">
      <View className="w-full max-w-md rounded-lg bg-card p-lg shadow-modal">
        <Text className="text-[32px] text-center mb-3">⚡</Text>
        <Text
          className="text-heading font-[600] text-text text-center mb-2"
          style={{ fontFamily: 'Inter' }}
        >
          Conflito de edicao
        </Text>
        <Text
          className="text-body text-muted text-center mb-lg"
          style={{ fontFamily: 'Inter' }}
        >
          Outro membro editou este roteiro. Como deseja resolver?
        </Text>
        <View className="gap-3">
          <Button variant="primary" size="md" onPress={onKeepMine}>
            Manter minha versao
          </Button>
          <Button variant="outline" size="md" onPress={onKeepTheirs}>
            Usar versao do grupo
          </Button>
          <Button variant="secondary" size="md" onPress={onMerge}>
            Mesclar versoes
          </Button>
          <Button variant="ghost" size="md" onPress={onCancel}>
            Cancelar
          </Button>
        </View>
      </View>
    </View>
  </Modal>
);