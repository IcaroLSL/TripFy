import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';
import { ErrorBanner } from '../../components/ui/ErrorBanner';
import { ConflictModal } from '../../components/ui/ConflictModal';
import { RoteiroTimeline } from '../../components/roteiro/RoteiroTimeline';
import { PRIVACIDADE } from '../../src/constants';
import { TipoRoteiro } from '../../src/types';

// Mock de roteiro completo com timeline
const MOCK_DETALHE = {
  id: 'rot-1',
  nome: 'Fim de Semana em Paris',
  descricao: 'Roteiro perfeito para aproveitar Paris em 3 dias',
  tipo: TipoRoteiro.PUBLICO,
  destinos: ['Paris', 'Versalhes'],
  autor: { id: 'user-2', nome: 'Joao Costa' },
  favoritado: true,
  totalFavoritos: 234,
  dias: [
    {
      index: 0,
      data: '2026-03-10',
      atividades: [
        {
          id: 'a1', nome: 'Torre Eiffel', categoria: 'HISTORICO' as any,
          faixaPreco: '$$', avaliacao: 4.7, totalAvaliacoes: 8234,
          endereco: 'Champ de Mars, Paris', latitude: 0, longitude: 0,
          duracaoMinutos: 120, horarioInicio: '09:00', horarioFim: '11:00',
        },
        {
          id: 'a2', nome: 'Le Marais Bistro', categoria: 'RESTAURANTE' as any,
          faixaPreco: '$$$', avaliacao: 4.5, totalAvaliacoes: 1230,
          endereco: 'Le Marais, Paris', latitude: 0, longitude: 0,
          duracaoMinutos: 90, horarioInicio: '12:00', horarioFim: '13:30',
        },
        {
          id: 'a3', nome: 'Louvre', categoria: 'MUSEU' as any,
          faixaPreco: '$$', avaliacao: 4.8, totalAvaliacoes: 12450,
          endereco: 'Rue de Rivoli, Paris', latitude: 0, longitude: 0,
          duracaoMinutos: 180, horarioInicio: '14:00', horarioFim: '17:00',
        },
      ],
    },
    {
      index: 1,
      data: '2026-03-11',
      atividades: [
        {
          id: 'a4', nome: 'Jardim de Luxemburgo', categoria: 'PARQUE' as any,
          faixaPreco: 'GRATUITO', avaliacao: 4.6, totalAvaliacoes: 5600,
          endereco: '6e Arrondissement', latitude: 0, longitude: 0,
          duracaoMinutos: 60, horarioInicio: '09:00', horarioFim: '10:00',
        },
        {
          id: 'a5', nome: 'Galeries Lafayette', categoria: 'COMPRAS' as any,
          faixaPreco: '$$$', avaliacao: 4.4, totalAvaliacoes: 2100,
          endereco: 'Boulevard Haussmann', latitude: 0, longitude: 0,
          duracaoMinutos: 120, horarioInicio: '11:00', horarioFim: '13:00',
        },
        {
          id: 'a6', nome: 'Moulin Rouge', categoria: 'VIDA_NOTURNA' as any,
          faixaPreco: '$$$$', avaliacao: 4.3, totalAvaliacoes: 3400,
          endereco: 'Boulevard de Clichy', latitude: 0, longitude: 0,
          duracaoMinutos: 150, horarioInicio: '20:00', horarioFim: '22:30',
        },
      ],
    },
    {
      index: 2,
      data: '2026-03-12',
      atividades: [
        {
          id: 'a7', nome: 'Palacio de Versalhes', categoria: 'HISTORICO' as any,
          faixaPreco: '$$$', avaliacao: 4.9, totalAvaliacoes: 15600,
          endereco: 'Versalhes, Franca', latitude: 0, longitude: 0,
          duracaoMinutos: 240, horarioInicio: '09:00', horarioFim: '13:00',
        },
      ],
    },
  ],
};

export default function DetalheRoteiroScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [favoritado, setFavoritado] = useState(MOCK_DETALHE.favoritado);
  const [toast, setToast] = useState({ visible: false, mensagem: '', variant: 'success' as const });
  const [erro, setErro] = useState<string | null>(null);
  const [showCloneModal, setShowCloneModal] = useState(false);

  // Simulacao: se id for 'rot-999', roteiro nao existe
  const roteiroNaoExiste = id === 'rot-999';
  // Simulacao: se id for 'rot-888', permissao negada
  const permissaoNegada = id === 'rot-888';

  const priv = PRIVACIDADE[MOCK_DETALHE.tipo];

  const handleClone = () => {
    setShowCloneModal(false);
    setToast({ visible: true, mensagem: 'Roteiro clonado com sucesso!', variant: 'success' });
  };

  const handleFavorite = () => {
    setFavoritado(!favoritado);
    setToast({
      visible: true,
      mensagem: favoritado ? 'Removido dos favoritos.' : 'Adicionado aos favoritos!',
      variant: favoritado ? 'info' : 'success',
    });
  };

  if (roteiroNaoExiste) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <View className="flex-row items-center px-md py-3 border-b border-border bg-card">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-body text-primary font-[600]" style={{ fontFamily: 'Inter' }}>Voltar</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center justify-center gap-md px-xl">
          <Text className="text-[64px]">🗺️</Text>
          <Text className="text-heading font-[600] text-text text-center" style={{ fontFamily: 'Inter' }}>
            Este roteiro nao existe ou foi removido.
          </Text>
          <Button variant="primary" onPress={() => router.push('/explorar')}>
            Explorar roteiros publicos
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (permissaoNegada) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <View className="flex-row items-center px-md py-3 border-b border-border bg-card">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-body text-primary font-[600]" style={{ fontFamily: 'Inter' }}>Voltar</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center justify-center gap-md px-xl">
          <Text className="text-[64px]">🔒</Text>
          <Text className="text-heading font-[600] text-text text-center" style={{ fontFamily: 'Inter' }}>
            Este roteiro e privado.
          </Text>
          <Text className="text-body text-muted text-center" style={{ fontFamily: 'Inter' }}>
            Peca ao criador para compartilha-lo com voce.
          </Text>
          <Button variant="outline" onPress={() => router.back()}>
            Voltar
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <Toast
        visible={toast.visible}
        mensagem={toast.mensagem}
        variant={toast.variant}
        onDismiss={() => setToast({ ...toast, visible: false })}
        actionLabel={toast.mensagem.includes('clonado') ? 'Ver meu roteiro' : undefined}
        onAction={() => toast.mensagem.includes('clonado') && router.push('/roteiros')}
      />

      <ConflictModal
        visible={showCloneModal}
        titulo="Clonar roteiro"
        mensagem="Uma copia deste roteiro sera adicionada aos seus roteiros. Deseja continuar?"
        onConfirm={handleClone}
        onCancel={() => setShowCloneModal(false)}
        confirmLabel="Clonar"
        variant="info"
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-md py-3 border-b border-border bg-card">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-body text-primary font-[600]" style={{ fontFamily: 'Inter' }}>Voltar</Text>
        </TouchableOpacity>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={handleFavorite}>
            <Text className="text-2xl">{favoritado ? '♥' : '♡'}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-xl">↗</Text>
          </TouchableOpacity>
        </View>
      </View>

      {erro && <ErrorBanner codigo="ERRO_500" onRetry={() => setErro(null)} />}

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Foto capa */}
        <View className="h-56 bg-primary/10 items-center justify-center">
          <Text className="text-[64px]">🗺️</Text>
        </View>

        {/* Info */}
        <View className="px-md pt-lg gap-md">
          <View>
            <Text className="text-display font-[700] text-text" style={{ fontFamily: 'Sora' }}>
              {MOCK_DETALHE.nome}
            </Text>
            <Text className="text-body text-muted mt-1" style={{ fontFamily: 'Inter' }}>
              {MOCK_DETALHE.descricao}
            </Text>
          </View>

          {/* Metadados */}
          <View className="flex-row flex-wrap items-center gap-3">
            <View className="flex-row items-center gap-1 rounded-pill bg-surface border border-border px-3 py-1">
              <Text className="text-sm">{priv.icone}</Text>
              <Text className="text-caption text-text font-[500]" style={{ fontFamily: 'Inter' }}>
                {priv.label}
              </Text>
            </View>
            <View className="flex-row items-center gap-1 rounded-pill bg-surface border border-border px-3 py-1">
              <Text className="text-sm">♥</Text>
              <Text className="text-caption text-text" style={{ fontFamily: 'Inter' }}>
                {MOCK_DETALHE.totalFavoritos}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <View className="w-6 h-6 rounded-full bg-surface items-center justify-center">
                <Text className="text-xs">👤</Text>
              </View>
              <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
                {MOCK_DETALHE.autor.nome}
              </Text>
            </View>
          </View>

          {/* Destinos */}
          <View className="flex-row flex-wrap gap-1.5">
            {MOCK_DETALHE.destinos.map((d) => (
              <View key={d} className="rounded-pill bg-primary/10 px-3 py-1">
                <Text className="text-caption text-primary font-[600] uppercase" style={{ fontFamily: 'Inter' }}>
                  {d}
                </Text>
              </View>
            ))}
          </View>

          {/* Botoes de acao */}
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Button variant="primary" size="md" onPress={() => setShowCloneModal(true)}>
                Clonar roteiro
              </Button>
            </View>
            <View className="flex-1">
              <Button variant="outline" size="md" onPress={handleFavorite}>
                {favoritado ? 'Desfavoritar' : 'Favoritar'}
              </Button>
            </View>
          </View>

          {/* Timeline */}
          <View className="mt-lg">
            <Text className="text-heading font-[600] text-text mb-md" style={{ fontFamily: 'Inter' }}>
              Roteiro dia a dia
            </Text>
            <RoteiroTimeline
              dias={MOCK_DETALHE.dias}
              conflitos={[]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}