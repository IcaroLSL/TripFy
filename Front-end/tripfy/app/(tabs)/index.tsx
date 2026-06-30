import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { RoteiroCard } from '../../components/roteiro/RoteiroCard';
import { CategoryChip } from '../../components/ui/CategoryChip';
import { EmptyState } from '../../components/ui/EmptyState';
import { RoteiroCardSkeleton } from '../../components/ui/Skeleton';
import { ErrorBanner } from '../../components/ui/ErrorBanner';
import { MOCK_ROTEIROS, LISTA_CATEGORIAS } from '../../src/constants';
import { CategoriaAtividade, Roteiro } from '../../src/types';

export default function ExplorarScreen() {
  const router = useRouter();
  const [busca, setBusca] = useState('');
  const [roteiros] = useState<Roteiro[]>(MOCK_ROTEIROS);
  const [loading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<Set<CategoriaAtividade>>(new Set());
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set(['rot-1']));

  const toggleCategoria = (cat: CategoriaAtividade) => {
    setCategoriasSelecionadas((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const toggleFavorite = (roteiro: Roteiro) => {
    setFavoritos((prev) => {
      const next = new Set(prev);
      if (next.has(roteiro.id)) next.delete(roteiro.id);
      else next.add(roteiro.id);
      return next;
    });
  };

  const roteirosFiltrados = roteiros.map((r) => ({
    ...r,
    favoritado: favoritos.has(r.id),
  }));

  const renderHeader = () => (
    <View className="gap-md mb-md">
      <Text className="text-display font-[700] text-text mt-lg" style={{ fontFamily: 'Sora' }}>
        Explorar
      </Text>

      {/* Campo de busca */}
      <View className="flex-row items-center gap-2">
        <View className="flex-row items-center flex-1 rounded-md border border-border bg-card px-3">
          <Text className="text-lg mr-2">🔍</Text>
          <TextInput
            className="flex-1 py-2.5 text-body text-text"
            style={{ fontFamily: 'Inter' }}
            placeholder="Buscar por destino..."
            placeholderTextColor="#6B7280"
            value={busca}
            onChangeText={setBusca}
          />
        </View>
        <TouchableOpacity className="rounded-md bg-primary p-3">
          <Text className="text-lg">📍</Text>
        </TouchableOpacity>
      </View>

      {/* Filtros de categoria */}
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={LISTA_CATEGORIAS}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <CategoryChip
              categoria={item.key}
              selected={categoriasSelecionadas.has(item.key)}
              onPress={toggleCategoria}
            />
          )}
        />
      </View>

      {/* Filtros rapidos */}
      <View className="flex-row gap-2">
        <TouchableOpacity className="flex-row items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5">
          <Text className="text-sm">💰</Text>
          <Text className="text-label text-text font-[500]" style={{ fontFamily: 'Inter' }}>
            Preco
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5">
          <Text className="text-sm">⭐</Text>
          <Text className="text-label text-text font-[500]" style={{ fontFamily: 'Inter' }}>
            Avaliacao
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5">
          <Text className="text-sm">📅</Text>
          <Text className="text-label text-text font-[500]" style={{ fontFamily: 'Inter' }}>
            Datas
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (erro) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        {renderHeader()}
        <ErrorBanner codigo="ERRO_500" onRetry={() => setErro(null)} />
        <EmptyState
          icone="☁️"
          titulo="Algo deu errado"
          descricao="Nao foi possivel carregar os roteiros."
          acaoLabel="Tentar novamente"
          onAcao={() => setErro(null)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <FlatList
        data={roteirosFiltrados}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 100 }}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          loading ? (
            <View className="flex-row gap-3 px-md">
              <View className="flex-1">
                <RoteiroCardSkeleton />
              </View>
              <View className="flex-1">
                <RoteiroCardSkeleton />
              </View>
            </View>
          ) : (
            <EmptyState
              icone="🔍"
              titulo="Nenhum roteiro encontrado"
              descricao="Tente expandir os filtros ou mudar a localizacao."
            />
          )
        }
        renderItem={({ item }) => (
          <View className="flex-1">
            <RoteiroCard
              roteiro={item}
              onPress={(r) => router.push(`/explorar/detalhe?id=${r.id}`)}
              onFavorite={toggleFavorite}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}