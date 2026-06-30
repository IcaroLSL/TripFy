import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { CategoryChip } from '../../components/ui/CategoryChip';
import { EmptyState } from '../../components/ui/EmptyState';
import { Toast } from '../../components/ui/Toast';
import { LISTA_CATEGORIAS, PERIODOS_DIA, MOCK_ROTEIROS } from '../../src/constants';
import { CategoriaAtividade, TipoRoteiro, Atividade } from '../../src/types';

// Mock de atividades para busca
const MOCK_ATIVIDADES: Atividade[] = [
  {
    id: 'atv-1', nome: 'Torre Eiffel', categoria: CategoriaAtividade.HISTORICO,
    faixaPreco: '$$',
    avaliacao: 4.7, totalAvaliacoes: 8234,
    endereco: 'Champ de Mars, Paris',
    latitude: 48.8584, longitude: 2.2945,
    duracaoMinutos: 120,
  },
  {
    id: 'atv-2', nome: 'Louvre', categoria: CategoriaAtividade.MUSEU,
    faixaPreco: '$$',
    avaliacao: 4.8, totalAvaliacoes: 12450,
    endereco: 'Rue de Rivoli, Paris',
    latitude: 48.8606, longitude: 2.3376,
    duracaoMinutos: 180,
  },
  {
    id: 'atv-3', nome: 'Le Marais Bistro', categoria: CategoriaAtividade.RESTAURANTE,
    faixaPreco: '$$$',
    avaliacao: 4.5, totalAvaliacoes: 1230,
    endereco: 'Le Marais, Paris',
    latitude: 48.8594, longitude: 2.3618,
    duracaoMinutos: 90,
  },
  {
    id: 'atv-4', nome: 'Jardim de Luxemburgo', categoria: CategoriaAtividade.PARQUE,
    faixaPreco: 'GRATUITO',
    avaliacao: 4.6, totalAvaliacoes: 5600,
    endereco: '6e Arrondissement, Paris',
    latitude: 48.8462, longitude: 2.3372,
    duracaoMinutos: 60,
  },
  {
    id: 'atv-5', nome: 'Moulin Rouge', categoria: CategoriaAtividade.VIDA_NOTURNA,
    faixaPreco: '$$$$',
    avaliacao: 4.3, totalAvaliacoes: 3400,
    endereco: 'Boulevard de Clichy, Paris',
    latitude: 48.8841, longitude: 2.3322,
    duracaoMinutos: 150,
  },
  {
    id: 'atv-6', nome: 'Galeries Lafayette', categoria: CategoriaAtividade.COMPRAS,
    faixaPreco: '$$$',
    avaliacao: 4.4, totalAvaliacoes: 2100,
    endereco: 'Boulevard Haussmann, Paris',
    latitude: 48.8737, longitude: 2.3321,
    duracaoMinutos: 120,
  },
];

type Etapa = 'busca' | 'categorias' | 'filtros' | 'atividades' | 'timeline' | 'publicar';

export default function CriarRoteiroScreen() {
  const router = useRouter();
  const [etapa, setEtapa] = useState<Etapa>('busca');
  const [destino, setDestino] = useState('');
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<Set<CategoriaAtividade>>(new Set());
  const [faixaPreco, setFaixaPreco] = useState<string[]>([]);
  const [avaliacaoMinima, setAvaliacaoMinima] = useState(0);
  const [periodoDia, setPeriodoDia] = useState<string[]>([]);
  const [atividadesSelecionadas, setAtividadesSelecionadas] = useState<Atividade[]>([]);
  const [nomeRoteiro, setNomeRoteiro] = useState('');
  const [tipoRoteiro, setTipoRoteiro] = useState<TipoRoteiro>(TipoRoteiro.PUBLICO);
  const [toast, setToast] = useState({ visible: false, mensagem: '', variant: 'success' as const });

  const toggleCategoria = (cat: CategoriaAtividade) => {
    setCategoriasSelecionadas((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const toggleAtividade = (atv: Atividade) => {
    setAtividadesSelecionadas((prev) =>
      prev.find((a) => a.id === atv.id)
        ? prev.filter((a) => a.id !== atv.id)
        : [...prev, atv],
    );
  };

  const toggleFaixa = (f: string) => {
    setFaixaPreco((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
  };

  const togglePeriodo = (p: string) => {
    setPeriodoDia((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  };

  const podeAvancar = () => {
    switch (etapa) {
      case 'busca': return destino.trim().length > 0;
      case 'categorias': return categoriasSelecionadas.size > 0;
      case 'filtros': return true;
      case 'atividades': return atividadesSelecionadas.length > 0;
      case 'timeline': return true;
      case 'publicar': return nomeRoteiro.trim().length > 0;
    }
  };

  const publicar = () => {
    setToast({ visible: true, mensagem: 'Roteiro publicado com sucesso!', variant: 'success' });
    setTimeout(() => router.back(), 1500);
  };

  // ----- Render por etapa -----

  const renderEtapa = () => {
    switch (etapa) {
      case 'busca':
        return (
          <View className="gap-lg">
            <Text className="text-heading font-[600] text-text" style={{ fontFamily: 'Inter' }}>
              Para onde voce vai?
            </Text>
            <Input
              label="Destino"
              placeholder="Ex: Paris, Rio de Janeiro..."
              value={destino}
              onChangeText={setDestino}
              iconLeft="📍"
            />
            <TouchableOpacity className="flex-row items-center gap-2 rounded-md border border-primary bg-primary/5 px-md py-4">
              <Text className="text-xl">📍</Text>
              <View className="flex-1">
                <Text className="text-label font-[600] text-primary" style={{ fontFamily: 'Inter' }}>
                  Usar minha localizacao
                </Text>
                <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
                  Buscar atracoes em um raio de 50 km
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );

      case 'categorias':
        return (
          <View className="gap-lg">
            <Text className="text-heading font-[600] text-text" style={{ fontFamily: 'Inter' }}>
              O que te interessa?
            </Text>
            <Text className="text-body text-muted" style={{ fontFamily: 'Inter' }}>
              Selecione pelo menos uma categoria
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {LISTA_CATEGORIAS.map((cat) => (
                <CategoryChip
                  key={cat.key}
                  categoria={cat.key}
                  selected={categoriasSelecionadas.has(cat.key)}
                  onPress={toggleCategoria}
                />
              ))}
            </View>
          </View>
        );

      case 'filtros':
        return (
          <View className="gap-lg">
            <Text className="text-heading font-[600] text-text" style={{ fontFamily: 'Inter' }}>
              Refine sua busca
            </Text>

            {/* Faixa de preco */}
            <View className="gap-2">
              <Text className="text-label font-[500] text-text" style={{ fontFamily: 'Inter' }}>
                Faixa de preco
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {['$', '$$', '$$$', '$$$$', 'GRATUITO'].map((f) => (
                  <TouchableOpacity
                    key={f}
                    onPress={() => toggleFaixa(f)}
                    className={`rounded-pill border px-4 py-2 ${
                      faixaPreco.includes(f) ? 'border-primary bg-primary' : 'border-border bg-card'
                    }`}
                  >
                    <Text
                      className={`text-label font-[500] ${faixaPreco.includes(f) ? 'text-white' : 'text-text'}`}
                      style={{ fontFamily: 'Inter' }}
                    >
                      {f === 'GRATUITO' ? 'Gratis' : f}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Avaliacao minima */}
            <View className="gap-2">
              <Text className="text-label font-[500] text-text" style={{ fontFamily: 'Inter' }}>
                Avaliacao minima: {avaliacaoMinima > 0 ? `${avaliacaoMinima}⭐` : 'Qualquer'}
              </Text>
              <View className="flex-row gap-2">
                {[3, 3.5, 4, 4.5].map((n) => (
                  <TouchableOpacity
                    key={n}
                    onPress={() => setAvaliacaoMinima(avaliacaoMinima === n ? 0 : n)}
                    className={`rounded-pill border px-4 py-2 ${
                      avaliacaoMinima === n ? 'border-primary bg-primary' : 'border-border bg-card'
                    }`}
                  >
                    <Text
                      className={`text-label font-[500] ${avaliacaoMinima === n ? 'text-white' : 'text-text'}`}
                      style={{ fontFamily: 'Inter' }}
                    >
                      {n}⭐+
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Periodo do dia */}
            <View className="gap-2">
              <Text className="text-label font-[500] text-text" style={{ fontFamily: 'Inter' }}>
                Periodo do dia
              </Text>
              <View className="flex-row gap-2">
                {PERIODOS_DIA.map((p) => (
                  <TouchableOpacity
                    key={p.key}
                    onPress={() => togglePeriodo(p.key)}
                    className={`rounded-pill border px-4 py-2 flex-row items-center gap-1 ${
                      periodoDia.includes(p.key) ? 'border-primary bg-primary' : 'border-border bg-card'
                    }`}
                  >
                    <Text className="text-sm">{p.icone}</Text>
                    <Text
                      className={`text-label font-[500] ${periodoDia.includes(p.key) ? 'text-white' : 'text-text'}`}
                      style={{ fontFamily: 'Inter' }}
                    >
                      {p.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      case 'atividades':
        return (
          <View className="gap-lg">
            <View className="flex-row items-center justify-between">
              <Text className="text-heading font-[600] text-text" style={{ fontFamily: 'Inter' }}>
                Atividades encontradas
              </Text>
              <Text className="text-label text-muted" style={{ fontFamily: 'Inter' }}>
                {atividadesSelecionadas.length} selecionadas
              </Text>
            </View>
            <View className="gap-2">
              {MOCK_ATIVIDADES.map((atv) => {
                const sel = !!atividadesSelecionadas.find((a) => a.id === atv.id);
                return (
                  <TouchableOpacity
                    key={atv.id}
                    activeOpacity={0.7}
                    onPress={() => toggleAtividade(atv)}
                    className={`flex-row items-center gap-3 rounded-md border p-3 ${
                      sel ? 'border-primary bg-primary/5' : 'border-border bg-card'
                    }`}
                  >
                    <View className={`w-6 h-6 rounded border-2 items-center justify-center ${
                      sel ? 'border-primary bg-primary' : 'border-border'
                    }`}>
                      {sel && <Text className="text-white text-sm">✓</Text>}
                    </View>
                    <View className="flex-1 gap-1">
                      <Text className="text-body font-[600] text-text" style={{ fontFamily: 'Inter' }}>
                        {atv.nome}
                      </Text>
                      <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
                        {atv.endereco} · {atv.duracaoMinutos}min · ⭐{atv.avaliacao}
                      </Text>
                    </View>
                    <Text className="text-lg">
                      {atv.categoria === CategoriaAtividade.RESTAURANTE ? '🍽️' :
                       atv.categoria === CategoriaAtividade.MUSEU ? '🏛️' :
                       atv.categoria === CategoriaAtividade.HISTORICO ? '🏰' :
                       atv.categoria === CategoriaAtividade.PARQUE ? '🌿' :
                       atv.categoria === CategoriaAtividade.VIDA_NOTURNA ? '🌙' :
                       atv.categoria === CategoriaAtividade.COMPRAS ? '🛍️' : '🧗'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );

      case 'timeline':
        return (
          <View className="gap-lg">
            <Text className="text-heading font-[600] text-text" style={{ fontFamily: 'Inter' }}>
              Organize seu roteiro
            </Text>
            <Text className="text-body text-muted" style={{ fontFamily: 'Inter' }}>
              As atividades selecionadas serao distribuidas por dia. Arraste para reorganizar.
            </Text>
            {/* Timeline simplificada */}
            {[1, 2, 3].map((dia) => (
              <View key={dia} className="gap-2">
                <View className="flex-row items-center gap-2">
                  <Text className="text-lg">▶</Text>
                  <Text className="text-label font-[600] text-text" style={{ fontFamily: 'Inter' }}>
                    Dia {dia} — {['Seg, 10 Mar', 'Ter, 11 Mar', 'Qua, 12 Mar'][dia - 1]}
                  </Text>
                  <Text className="text-caption text-muted ml-auto" style={{ fontFamily: 'Inter' }}>
                    0/10
                  </Text>
                </View>
                {dia === 1 && (
                  <View className="ml-lg gap-2">
                    {atividadesSelecionadas.slice(0, 3).map((atv, i) => (
                      <View key={i} className="flex-row items-center gap-2 rounded-md bg-card border border-border p-2">
                        <Text className="text-muted">⠿</Text>
                        <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
                          {String(9 + i).padStart(2, '0')}:00
                        </Text>
                        <Text className="text-body text-text flex-1" style={{ fontFamily: 'Inter' }} numberOfLines={1}>
                          {atv.nome}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
            {atividadesSelecionadas.length === 0 && (
              <EmptyState
                icone="📅"
                titulo="Nenhuma atividade selecionada"
                descricao="Volte a etapa anterior e selecione atividades."
              />
            )}
          </View>
        );

      case 'publicar':
        return (
          <View className="gap-lg">
            <Text className="text-heading font-[600] text-text" style={{ fontFamily: 'Inter' }}>
              Quase la!
            </Text>
            <Input
              label="Nome do roteiro"
              placeholder="Ex: Fim de Semana em Paris"
              value={nomeRoteiro}
              onChangeText={setNomeRoteiro}
            />
            <Input
              label="Descricao (opcional)"
              placeholder="Descreva seu roteiro..."
              value=""
              onChangeText={() => {}}
              multiline
              numberOfLines={3}
            />

            {/* Privacidade */}
            <View className="gap-2">
              <Text className="text-label font-[500] text-text" style={{ fontFamily: 'Inter' }}>
                Privacidade
              </Text>
              <View className="gap-2">
                {[
                  { tipo: TipoRoteiro.PUBLICO, icone: '🌐', label: 'Publico', desc: 'Visivel para todos' },
                  { tipo: TipoRoteiro.PRIVADO, icone: '🔒', label: 'Privado', desc: 'Apenas voce e convidados' },
                  { tipo: TipoRoteiro.COLABORATIVO, icone: '👥', label: 'Colaborativo', desc: 'Convidados podem editar' },
                ].map((opt) => (
                  <TouchableOpacity
                    key={opt.tipo}
                    onPress={() => setTipoRoteiro(opt.tipo)}
                    className={`flex-row items-center gap-3 rounded-md border p-3 ${
                      tipoRoteiro === opt.tipo ? 'border-primary bg-primary/5' : 'border-border bg-card'
                    }`}
                  >
                    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                      tipoRoteiro === opt.tipo ? 'border-primary' : 'border-border'
                    }`}>
                      {tipoRoteiro === opt.tipo && <View className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </View>
                    <Text className="text-lg">{opt.icone}</Text>
                    <View>
                      <Text className="text-body font-[600] text-text" style={{ fontFamily: 'Inter' }}>
                        {opt.label}
                      </Text>
                      <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
                        {opt.desc}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Resumo */}
            <View className="rounded-md bg-primary/5 border border-primary/20 p-md">
              <Text className="text-label font-[600] text-primary mb-2" style={{ fontFamily: 'Inter' }}>
                Resumo
              </Text>
              <Text className="text-caption text-text" style={{ fontFamily: 'Inter' }}>
                Destino: {destino}{'\n'}
                Atividades: {atividadesSelecionadas.length}{'\n'}
                Dias: 3{'\n'}
                Categorias: {categoriasSelecionadas.size}
              </Text>
            </View>
          </View>
        );
    }
  };

  const tituloEtapa = {
    busca: 'Buscar destino',
    categorias: 'Categorias',
    filtros: 'Filtros',
    atividades: 'Atividades',
    timeline: 'Timeline',
    publicar: 'Publicar',
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <Toast
        visible={toast.visible}
        mensagem={toast.mensagem}
        variant={toast.variant}
        onDismiss={() => setToast({ ...toast, visible: false })}
        actionLabel={etapa === 'publicar' ? 'Ver meu roteiro' : undefined}
        onAction={() => router.back()}
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-md py-3 border-b border-border bg-card">
        <TouchableOpacity onPress={() => {
          if (etapa === 'busca') router.back();
          else {
            const ordem: Etapa[] = ['busca', 'categorias', 'filtros', 'atividades', 'timeline', 'publicar'];
            setEtapa(ordem[ordem.indexOf(etapa) - 1]);
          }
        }}>
          <Text className="text-body text-primary font-[600]" style={{ fontFamily: 'Inter' }}>
            {etapa === 'busca' ? 'Cancelar' : 'Voltar'}
          </Text>
        </TouchableOpacity>

        <Text className="text-label font-[600] text-text" style={{ fontFamily: 'Inter' }}>
          {tituloEtapa[etapa]}
        </Text>

        <View className="flex-row items-center gap-1">
          {['busca', 'categorias', 'filtros', 'atividades', 'timeline', 'publicar'].map((e, i) => (
            <View
              key={e}
              className={`h-1.5 rounded-full ${i <= ['busca', 'categorias', 'filtros', 'atividades', 'timeline', 'publicar'].indexOf(etapa) ? 'w-6 bg-primary' : 'w-1.5 bg-border'}`}
            />
          ))}
        </View>
      </View>

      {/* Conteudo */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} className="flex-1">
        {renderEtapa()}
      </ScrollView>

      {/* Botao de avanco */}
      <View className="px-md py-3 border-t border-border bg-card">
        <Button
          variant="primary"
          size="lg"
          disabled={!podeAvancar()}
          onPress={() => {
            if (etapa === 'publicar') publicar();
            else {
              const ordem: Etapa[] = ['busca', 'categorias', 'filtros', 'atividades', 'timeline', 'publicar'];
              setEtapa(ordem[ordem.indexOf(etapa) + 1]);
            }
          }}
        >
          {etapa === 'publicar' ? 'Publicar roteiro' : 'Continuar'}
        </Button>
      </View>
    </SafeAreaView>
  );
}