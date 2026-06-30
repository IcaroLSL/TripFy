import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_USUARIO } from '../../src/constants';

export default function PerfilScreen() {
  const router = useRouter();
  const usuario = MOCK_USUARIO;

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Text className="text-display font-[700] text-text mt-lg mb-lg" style={{ fontFamily: 'Sora' }}>
          Perfil
        </Text>

        {/* Avatar + Info */}
        <View className="items-center gap-md mb-xl">
          <View className="w-24 h-24 rounded-full bg-primary/20 items-center justify-center">
            <Text className="text-4xl">👤</Text>
          </View>
          <View className="items-center gap-1">
            <Text className="text-heading font-[600] text-text" style={{ fontFamily: 'Inter' }}>
              {usuario.nome}
            </Text>
            <Text className="text-body text-muted" style={{ fontFamily: 'Inter' }}>
              {usuario.email}
            </Text>
            {usuario.biografia && (
              <Text className="text-label text-muted text-center mt-1 max-w-xs" style={{ fontFamily: 'Inter' }}>
                {usuario.biografia}
              </Text>
            )}
          </View>

          {/* Stats */}
          <View className="flex-row gap-xl mt-md">
            <View className="items-center">
              <Text className="text-heading font-[700] text-primary" style={{ fontFamily: 'Inter' }}>
                {usuario.roteirosPublicos}
              </Text>
              <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
                Roteiros
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-heading font-[700] text-primary" style={{ fontFamily: 'Inter' }}>
                {usuario.grupos}
              </Text>
              <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
                Grupos
              </Text>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View className="rounded-md bg-card border border-border overflow-hidden">
          <MenuItem label="Editar perfil" icone="✏️" />
          <MenuItem label="Notificacoes" icone="🔔" />
          <MenuItem
            label="Configuracoes"
            icone="⚙️"
            onPress={() => router.push('/perfil/configuracoes')}
            borderTop
          />
          <MenuItem label="Ajuda" icone="❓" borderTop />
          <MenuItem label="Sobre o Tripfy" icone="ℹ️" borderTop />
        </View>

        <TouchableOpacity className="mt-xl items-center py-3">
          <Text className="text-body font-[600] text-error" style={{ fontFamily: 'Inter' }}>
            Sair da conta
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const MenuItem: React.FC<{
  label: string;
  icone: string;
  onPress?: () => void;
  borderTop?: boolean;
}> = ({ label, icone, onPress, borderTop }) => (
  <TouchableOpacity
    activeOpacity={0.6}
    onPress={onPress}
    className={`flex-row items-center gap-3 px-md py-4 ${borderTop ? 'border-t border-border' : ''}`}
  >
    <Text className="text-lg">{icone}</Text>
    <Text className="text-body text-text flex-1" style={{ fontFamily: 'Inter' }}>
      {label}
    </Text>
    <Text className="text-muted">›</Text>
  </TouchableOpacity>
);