import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Toast } from '../../components/ui/Toast';
import { LIMITES } from '../../src/constants';

export default function CriarGrupoScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [toast, setToast] = useState({ visible: false, mensagem: '', variant: 'success' as const });

  const nomeValido = nome.trim().length >= LIMITES.NOME_GRUPO_MIN && nome.trim().length <= LIMITES.NOME_GRUPO_MAX;
  const nomeErro = nome.trim().length > 0 && !nomeValido
    ? `Minimo de ${LIMITES.NOME_GRUPO_MIN} e maximo de ${LIMITES.NOME_GRUPO_MAX} caracteres.`
    : undefined;

  const criar = () => {
    if (!nomeValido) return;
    setToast({ visible: true, mensagem: 'Grupo criado com sucesso!', variant: 'success' });
    setTimeout(() => router.back(), 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <Toast
        visible={toast.visible}
        mensagem={toast.mensagem}
        variant={toast.variant}
        onDismiss={() => setToast({ ...toast, visible: false })}
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-md py-3 border-b border-border bg-card">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-body text-primary font-[600]" style={{ fontFamily: 'Inter' }}>Cancelar</Text>
        </TouchableOpacity>
        <Text className="text-label font-[600] text-text" style={{ fontFamily: 'Inter' }}>
          Criar grupo
        </Text>
        <View className="w-16" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 24 }}>
        <Text className="text-display font-[700] text-text mt-lg" style={{ fontFamily: 'Sora' }}>
          Novo grupo de viagem
        </Text>

        <Input
          label="Nome do grupo"
          placeholder="Ex: Viagem Europa 2026"
          value={nome}
          onChangeText={setNome}
          error={nomeErro}
          contador={{ atual: nome.trim().length, max: LIMITES.NOME_GRUPO_MAX }}
        />

        <Input
          label="Descricao (opcional)"
          placeholder="Conte sobre o grupo..."
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={4}
          contador={{ atual: descricao.length, max: LIMITES.DESCRICAO_GRUPO_MAX }}
        />

        {/* Imagem de capa */}
        <TouchableOpacity className="h-40 rounded-md border-2 border-dashed border-border items-center justify-center gap-2">
          <Text className="text-[32px]">🖼️</Text>
          <Text className="text-body text-muted" style={{ fontFamily: 'Inter' }}>
            Adicionar foto de capa (opcional)
          </Text>
        </TouchableOpacity>

        {/* Info */}
        <View className="rounded-md bg-surface border border-border p-md">
          <Text className="text-label font-[600] text-text mb-2" style={{ fontFamily: 'Inter' }}>
            Voce sera o Administrador
          </Text>
          <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
            Como criador, voce podera gerenciar membros, convidar participantes e editar as
            configuracoes do grupo.
          </Text>
        </View>
      </ScrollView>

      {/* Botao */}
      <View className="px-md py-3 border-t border-border bg-card">
        <Button
          variant="primary"
          size="lg"
          disabled={!nomeValido}
          onPress={criar}
        >
          Criar grupo
        </Button>
      </View>
    </SafeAreaView>
  );
}