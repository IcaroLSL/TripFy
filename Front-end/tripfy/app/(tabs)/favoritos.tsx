import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { RoteiroCard } from '../../components/roteiro/RoteiroCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { Toast } from '../../components/ui/Toast';
import { MOCK_ROTEIROS } from '../../src/constants';
import { Roteiro } from '../../src/types';

export default function FavoritosScreen() {
  const router = useRouter();
  const [favoritos, setFavoritos] = useState<Roteiro[]>([
    { ...MOCK_ROTEIROS[0], favoritado: true },
    { ...MOCK_ROTEIROS[1], favoritado: true, tipo: 'PRIVADO' as any }, // tornou-se privado -> indisponivel
  ]);
  const [toast, setToast] = useState<{ visible: boolean; mensagem: string }>({
    visible: false,
    mensagem: '',
  });

  const handleFavorite = (roteiro: Roteiro) => {
    setFavoritos((prev) => prev.filter((r) => r.id !== roteiro.id));
    setToast({
      visible: true,
      mensagem: 'Roteiro removido dos favoritos.',
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <Toast
        visible={toast.visible}
        mensagem={toast.mensagem}
        variant="info"
        onDismiss={() => setToast({ visible: false, mensagem: '' })}
      />

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 100 }}
        ListHeaderComponent={
          <Text className="text-display font-[700] text-text mb-md mt-lg" style={{ fontFamily: 'Sora' }}>
            Favoritos
          </Text>
        }
        ListEmptyComponent={
          <EmptyState
            icone="♡"
            titulo="Nenhum favorito"
            descricao="Explore roteiros publicos e favorite os que mais gostar."
            acaoLabel="Explorar roteiros"
            onAcao={() => router.push('/explorar')}
          />
        }
        renderItem={({ item }) => (
          <RoteiroCard
            roteiro={item}
            indisponivel={item.tipo === 'PRIVADO'}
            onPress={(r) => router.push(`/explorar/detalhe?id=${r.id}`)}
            onFavorite={handleFavorite}
          />
        )}
      />
    </SafeAreaView>
  );
}