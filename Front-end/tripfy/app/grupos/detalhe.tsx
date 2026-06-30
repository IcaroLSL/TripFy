import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { InviteCode } from '../../components/ui/InviteCode';
import { ConflictModal } from '../../components/ui/ConflictModal';
import { Toast } from '../../components/ui/Toast';
import { MembroLista } from '../../components/grupo/MembroLista';
import { EmptyState } from '../../components/ui/EmptyState';
import { MOCK_GRUPOS, LIMITES } from '../../src/constants';
import { Grupo, PapelGrupo, MembroGrupo } from '../../src/types';

export default function DetalheGrupoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [grupo] = useState<Grupo>(
    MOCK_GRUPOS.find((g) => g.id === id) || MOCK_GRUPOS[0],
  );
  const [aba, setAba] = useState<'roteiros' | 'membros' | 'historico'>('roteiros');
  const [showSairModal, setShowSairModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showConvite, setShowConvite] = useState(false);
  const [toast, setToast] = useState({ visible: false, mensagem: '', variant: 'success' as const });

  // Simula o usuario atual como admin
  const papelAtual = PapelGrupo.ADMINISTRADOR;
  const isAdmin = papelAtual === PapelGrupo.ADMINISTRADOR;
  const unicoAdmin = grupo.membros.filter((m) => m.papel === PapelGrupo.ADMINISTRADOR).length === 1;

  const handleSair = () => {
    if (isAdmin && unicoAdmin) {
      setShowSairModal(false);
      setShowAdminModal(true);
      return;
    }
    setShowSairModal(false);
    setToast({ visible: true, mensagem: 'Voce saiu do grupo.', variant: 'info' });
    setTimeout(() => router.back(), 1500);
  };

  const handleAlterarPapel = (membro: MembroGrupo) => {
    setToast({
      visible: true,
      mensagem: `Papel de ${membro.usuario.nome} alterado.`,
      variant: 'success',
    });
  };

  const handleRemover = (membro: MembroGrupo) => {
    setToast({
      visible: true,
      mensagem: `${membro.usuario.nome} foi removido do grupo.`,
      variant: 'info',
    });
  };

  const tabs = [
    { key: 'roteiros' as const, label: 'Roteiros' },
    { key: 'membros' as const, label: `Membros (${grupo.membros.length})` },
    { key: 'historico' as const, label: 'Historico' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <Toast
        visible={toast.visible}
        mensagem={toast.mensagem}
        variant={toast.variant}
        onDismiss={() => setToast({ ...toast, visible: false })}
      />

      <ConflictModal
        visible={showSairModal}
        titulo="Sair do grupo"
        mensagem="Tem certeza que deseja sair deste grupo?"
        onConfirm={handleSair}
        onCancel={() => setShowSairModal(false)}
        confirmLabel="Sair"
        cancelLabel="Ficar"
        variant="danger"
      />

      <ConflictModal
        visible={showAdminModal}
        titulo="Acao bloqueada"
        mensagem="Transfira a administracao antes de sair do grupo."
        onConfirm={() => setShowAdminModal(false)}
        onCancel={() => setShowAdminModal(false)}
        confirmLabel="Entendi"
        variant="warning"
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-md py-3 border-b border-border bg-card">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-body text-primary font-[600]" style={{ fontFamily: 'Inter' }}>Voltar</Text>
        </TouchableOpacity>
        <Text className="text-label font-[600] text-text" style={{ fontFamily: 'Inter' }}>
          Grupo
        </Text>
        {isAdmin && (
          <TouchableOpacity>
            <Text className="text-lg">⚙️</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Capa + Info */}
        <View className="h-40 bg-primary/10 items-center justify-center">
          <Text className="text-[64px]">👥</Text>
        </View>

        <View className="px-md pt-lg gap-md">
          <View>
            <Text className="text-display font-[700] text-text" style={{ fontFamily: 'Sora' }}>
              {grupo.nome}
            </Text>
            {grupo.descricao && (
              <Text className="text-body text-muted mt-1" style={{ fontFamily: 'Inter' }}>
                {grupo.descricao}
              </Text>
            )}
            <Text className="text-caption text-muted mt-2" style={{ fontFamily: 'Inter' }}>
              Criado em {new Date(grupo.criadoEm).toLocaleDateString('pt-BR')}
            </Text>
          </View>

          {/* Botoes */}
          <View className="flex-row gap-3">
            {isAdmin && (
              <View className="flex-1">
                <Button
                  variant="primary"
                  size="sm"
                  onPress={() => setShowConvite(!showConvite)}
                >
                  Convidar
                </Button>
              </View>
            )}
            <View className="flex-1">
              <Button
                variant="outline"
                size="sm"
                onPress={() => setShowSairModal(true)}
              >
                Sair do grupo
              </Button>
            </View>
          </View>

          {/* Convite */}
          {showConvite && (
            <InviteCode
              codigo="A3xK9mZ"
              diasRestantes={5}
              onCopy={() => setToast({ visible: true, mensagem: 'Codigo copiado!', variant: 'success' })}
            />
          )}

          {/* Tabs */}
          <View className="flex-row border-b border-border">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setAba(tab.key)}
                className={`flex-1 py-3 items-center ${
                  aba === tab.key ? 'border-b-2 border-primary' : ''
                }`}
              >
                <Text
                  className={`text-label font-[600] ${
                    aba === tab.key ? 'text-primary' : 'text-muted'
                  }`}
                  style={{ fontFamily: 'Inter' }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Conteudo da aba */}
          {aba === 'roteiros' && (
            <EmptyState
              icone="📋"
              titulo="Nenhum roteiro no grupo"
              descricao="Adicione roteiros ao grupo para planejar juntos."
              acaoLabel="Adicionar roteiro"
            />
          )}

          {aba === 'membros' && (
            <View className="gap-md">
              <MembroLista
                membros={grupo.membros}
                papelAtual={papelAtual}
                onAlterarPapel={handleAlterarPapel}
                onRemover={handleRemover}
              />
              {grupo.membros.length >= LIMITES.AVISO_MEMBROS_GRUPO && (
                <View className="rounded-md bg-secondary/10 border border-secondary/20 p-3">
                  <Text className="text-caption text-text" style={{ fontFamily: 'Inter' }}>
                    {grupo.membros.length >= LIMITES.MEMBROS_GRUPO
                      ? `Limite de ${LIMITES.MEMBROS_GRUPO} membros atingido.`
                      : `Atencao: restam ${LIMITES.MEMBROS_GRUPO - grupo.membros.length} vagas.`}
                  </Text>
                </View>
              )}
            </View>
          )}

          {aba === 'historico' && (
            <View className="gap-3">
              <View className="flex-row gap-3 items-start">
                <View className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <View className="flex-1">
                  <Text className="text-label text-text font-[500]" style={{ fontFamily: 'Inter' }}>
                    Grupo criado
                  </Text>
                  <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
                    Por Maria Silva · 10/01/2026
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-3 items-start">
                <View className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <View className="flex-1">
                  <Text className="text-label text-text font-[500]" style={{ fontFamily: 'Inter' }}>
                    Joao Costa entrou no grupo
                  </Text>
                  <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
                    12/01/2026
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-3 items-start">
                <View className="w-2 h-2 rounded-full bg-muted mt-1.5" />
                <View className="flex-1">
                  <Text className="text-label text-text font-[500]" style={{ fontFamily: 'Inter' }}>
                    Ana Lima entrou no grupo
                  </Text>
                  <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
                    05/02/2026
                  </Text>
                </View>
              </View>
              <Text className="text-caption text-muted text-center mt-4" style={{ fontFamily: 'Inter' }}>
                Historico retido por ate {LIMITES.RETENCAO_HISTORICO_DIAS} dias
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}