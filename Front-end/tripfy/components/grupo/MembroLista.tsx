import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MembroGrupo, PapelGrupo } from '../../src/types';
import { RoleBadge } from '../ui/RoleBadge';

interface MembroListaProps {
  membros: MembroGrupo[];
  papelAtual?: PapelGrupo;
  onAlterarPapel?: (membro: MembroGrupo) => void;
  onRemover?: (membro: MembroGrupo) => void;
}

export const MembroLista: React.FC<MembroListaProps> = ({
  membros,
  papelAtual,
  onAlterarPapel,
  onRemover,
}) => {
  const isAdmin = papelAtual === PapelGrupo.ADMINISTRADOR;

  return (
    <View className="gap-1">
      {membros.map((membro) => (
        <View
          key={membro.usuario.id}
          className="flex-row items-center justify-between rounded-md bg-card border border-border px-md py-3"
        >
          <View className="flex-row items-center gap-3 flex-1">
            <View className="w-9 h-9 rounded-full bg-surface items-center justify-center">
              <Text className="text-base">👤</Text>
            </View>
            <View className="flex-1">
              <Text
                className="text-body font-[500] text-text"
                style={{ fontFamily: 'Inter' }}
                numberOfLines={1}
              >
                {membro.usuario.nome}
              </Text>
              <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
                Desde {new Date(membro.entrouEm).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <RoleBadge papel={membro.papel} size="sm" />
            {isAdmin && membro.papel !== PapelGrupo.ADMINISTRADOR && (
              <View className="flex-row gap-1 ml-2">
                {onAlterarPapel && (
                  <TouchableOpacity
                    onPress={() => onAlterarPapel(membro)}
                    className="rounded-sm bg-primary/10 px-2 py-1"
                  >
                    <Text className="text-caption text-primary font-[600]" style={{ fontFamily: 'Inter' }}>
                      Alterar
                    </Text>
                  </TouchableOpacity>
                )}
                {onRemover && (
                  <TouchableOpacity
                    onPress={() => onRemover(membro)}
                    className="rounded-sm bg-error/10 px-2 py-1"
                  >
                    <Text className="text-caption text-error font-[600]" style={{ fontFamily: 'Inter' }}>
                      Remover
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};