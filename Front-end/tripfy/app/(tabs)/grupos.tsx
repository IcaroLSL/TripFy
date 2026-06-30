import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { MOCK_GRUPOS } from '../../src/constants';
import { Grupo } from '../../src/types';

export default function GruposScreen() {
  const router = useRouter();
  const [grupos] = useState<Grupo[]>(MOCK_GRUPOS);

  const renderGrupo = ({ item }: { item: Grupo }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`/grupos/detalhe?id=${item.id}`)}
      className="rounded-md bg-card border border-border p-md gap-3"
    >
      <View className="flex-row items-start gap-3">
        <View className="w-14 h-14 rounded-md bg-primary/10 items-center justify-center">
          <Text className="text-2xl">👥</Text>
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-heading font-[600] text-text" style={{ fontFamily: 'Inter' }} numberOfLines={1}>
            {item.nome}
          </Text>
          {item.descricao && (
            <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }} numberOfLines={2}>
              {item.descricao}
            </Text>
          )}
          <View className="flex-row items-center gap-2 mt-1">
            <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
              {item.membros.length} {item.membros.length === 1 ? 'membro' : 'membros'}
            </Text>
            <Text className="text-caption text-muted">·</Text>
            <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
              {item.roteiros.length} {item.roteiros.length === 1 ? 'roteiro' : 'roteiros'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <FlatList
        data={grupos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 100 }}
        ListHeaderComponent={
          <View className="flex-row items-center justify-between mb-md mt-lg">
            <Text className="text-display font-[700] text-text" style={{ fontFamily: 'Sora' }}>
              Grupos
            </Text>
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => router.push('/grupos/entrar')}
                className="rounded-md border border-primary px-3 py-1.5"
              >
                <Text className="text-label font-[600] text-primary" style={{ fontFamily: 'Inter' }}>
                  Entrar
                </Text>
              </TouchableOpacity>
              <Button
                variant="primary"
                size="sm"
                iconLeft="+"
                onPress={() => router.push('/grupos/criar')}
              >
                Criar
              </Button>
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icone="👥"
            titulo="Nenhum grupo ainda"
            descricao="Crie um grupo para planejar viagens com amigos."
            acaoLabel="Criar grupo"
            onAcao={() => router.push('/grupos/criar')}
          />
        }
        renderItem={renderGrupo}
      />
    </SafeAreaView>
  );
}