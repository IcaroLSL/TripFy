import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { RoteiroCard } from '../../components/roteiro/RoteiroCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { MOCK_ROTEIROS } from '../../src/constants';
import { Roteiro, TipoRoteiro } from '../../src/types';

export default function MeusRoteirosScreen() {
  const router = useRouter();
  const [roteiros] = useState<Roteiro[]>([
    { ...MOCK_ROTEIROS[0], tipo: TipoRoteiro.PUBLICO, id: 'meu-1' },
    { ...MOCK_ROTEIROS[1], tipo: TipoRoteiro.COLABORATIVO, id: 'meu-2' },
    { ...MOCK_ROTEIROS[2], tipo: TipoRoteiro.PRIVADO, id: 'meu-3' },
  ]);
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());

  const toggleFavorite = (r: Roteiro) => {
    setFavoritos((prev) => {
      const next = new Set(prev);
      next.has(r.id) ? next.delete(r.id) : next.add(r.id);
      return next;
    });
  };

  const roteirosComFav = roteiros.map((r) => ({
    ...r,
    favoritado: favoritos.has(r.id),
  }));

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <FlatList
        data={roteirosComFav}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 100 }}
        ListHeaderComponent={
          <View className="flex-row items-center justify-between mb-md mt-lg">
            <Text className="text-display font-[700] text-text" style={{ fontFamily: 'Sora' }}>
              Meus Roteiros
            </Text>
            <Button
              variant="primary"
              size="sm"
              iconLeft="+"
              onPress={() => router.push('/roteiros/criar')}
            >
              Criar
            </Button>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icone="📋"
            titulo="Nenhum roteiro ainda"
            descricao="Que tal criar o primeiro?"
            acaoLabel="Criar roteiro"
            onAcao={() => router.push('/roteiros/criar')}
          />
        }
        renderItem={({ item }) => (
          <RoteiroCard
            roteiro={item}
            onPress={(r) => router.push(`/explorar/detalhe?id=${r.id}`)}
            onFavorite={toggleFavorite}
          />
        )}
      />
    </SafeAreaView>
  );
}