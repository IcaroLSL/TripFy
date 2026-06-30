import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Atividade, DiaRoteiro } from '../../src/types';
import { CATEGORIAS } from '../../src/constants';
import { PriceIndicator } from '../ui/PriceIndicator';
import { StarRating } from '../ui/StarRating';

interface RoteiroTimelineProps {
  dias: DiaRoteiro[];
  onAtividadePress?: (atividade: Atividade) => void;
  conflitos?: string[]; // IDs de atividades em conflito
}

const formatarData = (isoDate: string): string => {
  const date = new Date(isoDate);
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const diaSemana = diasSemana[date.getDay()];
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${diaSemana}, ${String(dia).padStart(2, '0')} ${meses[date.getMonth()]}`;
};

const AtividadeCard: React.FC<{
  atividade: Atividade;
  emConflito: boolean;
  onPress?: (atividade: Atividade) => void;
}> = ({ atividade, emConflito, onPress }) => {
  const cat = CATEGORIAS[atividade.categoria];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress?.(atividade)}
      className={`ml-lg flex-row items-start gap-3 rounded-md border bg-card p-3 ${
        emConflito ? 'border-error' : 'border-border'
      }`}
    >
      <View className="w-9 h-9 rounded-full bg-surface items-center justify-center">
        <Text className="text-lg">{cat.icone}</Text>
      </View>
      <View className="flex-1 gap-1">
        <View className="flex-row items-center justify-between">
          <Text
            className="text-label font-[600] text-text flex-1"
            style={{ fontFamily: 'Inter' }}
            numberOfLines={1}
          >
            {atividade.nome}
          </Text>
          <PriceIndicator faixa={atividade.faixaPreco} size="sm" />
        </View>
        {atividade.horarioInicio && (
          <View className="flex-row items-center gap-2">
            <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
              🕐 {atividade.horarioInicio}
              {atividade.horarioFim ? ` - ${atividade.horarioFim}` : ''}
            </Text>
            <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
              · {atividade.duracaoMinutos}min
            </Text>
          </View>
        )}
        <StarRating
          avaliacao={atividade.avaliacao}
          totalAvaliacoes={atividade.totalAvaliacoes}
          size="sm"
        />
      </View>
      {emConflito && (
        <View className="bg-error/10 rounded-sm px-1.5 py-0.5">
          <Text className="text-caption font-[600] text-error" style={{ fontFamily: 'Inter' }}>
            ⚠️ Conflito
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const RoteiroTimeline: React.FC<RoteiroTimelineProps> = ({
  dias,
  onAtividadePress,
  conflitos = [],
}) => {
  const [diasAbertos, setDiasAbertos] = useState<Set<number>>(new Set([0]));

  const toggleDia = (index: number) => {
    setDiasAbertos((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <View className="gap-md">
      {dias.map((dia) => {
        const aberto = diasAbertos.has(dia.index);
        const countAtividades = dia.atividades.length;
        const limiteRestante = 10 - countAtividades;

        return (
          <View key={dia.index}>
            {/* Cabecalho do dia */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => toggleDia(dia.index)}
              className="flex-row items-center justify-between py-2"
            >
              <View className="flex-row items-center gap-2">
                <Text
                  className={`text-lg transition-transform ${aberto ? 'rotate-90' : ''}`}
                  style={{ transform: [{ rotate: aberto ? '90deg' : '0deg' }] }}
                >
                  ▶
                </Text>
                <Text className="text-heading font-[600] text-text" style={{ fontFamily: 'Inter' }}>
                  Dia {dia.index + 1} — {formatarData(dia.data)}
                </Text>
              </View>
              <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
                {countAtividades}/10
              </Text>
            </TouchableOpacity>

            {/* Atividades */}
            {aberto && (
              <View className="gap-2 mt-2">
                {dia.atividades.map((atv) => (
                  <AtividadeCard
                    key={atv.id}
                    atividade={atv}
                    emConflito={conflitos.includes(atv.id)}
                    onPress={onAtividadePress}
                  />
                ))}
                {countAtividades === 0 && (
                  <Text
                    className="text-body text-muted ml-lg py-4 text-center"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Nenhuma atividade neste dia
                  </Text>
                )}
                {limiteRestante > 0 && (
                  <Text
                    className="text-caption text-muted ml-lg"
                    style={{ fontFamily: 'Inter' }}
                  >
                    {limiteRestante} {limiteRestante === 1 ? 'vaga restante' : 'vagas restantes'}
                  </Text>
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};