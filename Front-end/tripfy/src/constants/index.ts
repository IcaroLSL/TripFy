import { CategoriaAtividade, FaixaPreco, PapelGrupo, TipoRoteiro } from '../types';

// ========== Categorias ==========

export const CATEGORIAS: Record<
  CategoriaAtividade,
  { icone: string; label: string; cor: string }
> = {
  [CategoriaAtividade.RESTAURANTE]: { icone: '🍽️', label: 'Restaurante', cor: '#E85D3A' },
  [CategoriaAtividade.MUSEU]: { icone: '🏛️', label: 'Museu', cor: '#8E6CBE' },
  [CategoriaAtividade.PRAIA]: { icone: '🏖️', label: 'Praia', cor: '#3BA4D9' },
  [CategoriaAtividade.PARQUE]: { icone: '🌿', label: 'Parque', cor: '#5D9B4C' },
  [CategoriaAtividade.VIDA_NOTURNA]: { icone: '🌙', label: 'Vida Noturna', cor: '#2D2D5E' },
  [CategoriaAtividade.COMPRAS]: { icone: '🛍️', label: 'Compras', cor: '#D94F8C' },
  [CategoriaAtividade.HISTORICO]: { icone: '🏰', label: 'Historico', cor: '#B8860B' },
  [CategoriaAtividade.ATIVIDADE_AR_LIVRE]: { icone: '🧗', label: 'Ar Livre', cor: '#6B8E5A' },
};

export const LISTA_CATEGORIAS = Object.entries(CATEGORIAS).map(([key, val]) => ({
  key: key as CategoriaAtividade,
  ...val,
}));

// ========== Privacidade ==========

export const PRIVACIDADE: Record<
  TipoRoteiro,
  { icone: string; label: string }
> = {
  [TipoRoteiro.PUBLICO]: { icone: '🌐', label: 'Publico' },
  [TipoRoteiro.PRIVADO]: { icone: '🔒', label: 'Privado' },
  [TipoRoteiro.COLABORATIVO]: { icone: '👥', label: 'Colaborativo' },
};

// ========== Papeis de Grupo ==========

export const PAPEIS_GRUPO: Record<
  PapelGrupo,
  { label: string; bg: string; textColor: string }
> = {
  [PapelGrupo.ADMINISTRADOR]: { label: 'Admin', bg: '#1E6B5E', textColor: '#FFFFFF' },
  [PapelGrupo.EDITOR]: { label: 'Editor', bg: '#3B82F6', textColor: '#FFFFFF' },
  [PapelGrupo.MEMBRO]: { label: 'Membro', bg: '#6B7280', textColor: '#FFFFFF' },
  [PapelGrupo.CONVIDADO]: { label: 'Convidado', bg: '#E5E7EB', textColor: '#1A1A2E' },
};

// ========== Limites de Negocio ==========

export const LIMITES = {
  MEMBROS_GRUPO: 50,
  AVISO_MEMBROS_GRUPO: 45,
  ROTEIROS_GRUPO: 20,
  AVISO_ROTEIROS_GRUPO: 18,
  GRUPOS_ADMIN: 10,
  AVISO_GRUPOS_ADMIN: 9,
  CONVITES_PENDENTES: 20,
  AVISO_CONVITES_PENDENTES: 18,
  ATIVIDADES_DIA: 10,
  DURACAO_MIN_ATIVIDADE: 30,
  DURACAO_MAX_ATIVIDADE: 480, // minutos
  INTERVALO_MIN_ATIVIDADES: 15,
  NOME_GRUPO_MIN: 3,
  NOME_GRUPO_MAX: 50,
  DESCRICAO_GRUPO_MAX: 500,
  VALIDADE_CONVITE_DIAS: 7,
  RETENCAO_HISTORICO_DIAS: 90,
  COOLDOWN_CONVITE_RECUSADO_DIAS: 30,
  REENVIO_CONVITE_MAX: 3,
} as const;

// ========== Erros mapeados ==========

export const MENSAGENS_ERRO: Record<string, string> = {
  CONFLITO_HORARIO: 'Duas atividades se sobrepoem. Ajuste os horarios.',
  DURACAO_MINIMA_NAO_ATENDIDA: 'Este tipo de destino exige pelo menos o minimo de dias.',
  LOCALIZACAO_NAO_ENCONTRADA: 'Nao encontramos esse lugar. Tente outro endereco.',
  PERMISSAO_NEGADA: 'Voce nao tem permissao para isso.',
  ROTEIRO_NAO_ENCONTRADO: 'Este roteiro nao existe ou foi removido.',
  CONVITE_EXPIRADO: 'Este convite expirou. Peca um novo ao administrador.',
  CONVITE_INVALIDO: 'Codigo invalido. Verifique e tente novamente.',
  ADMIN_OBRIGATORIO: 'Transfira a administracao antes de sair do grupo.',
  CONFLITO_EDICAO: 'Outro membro editou este roteiro. Veja as diferencas.',
  LIMITE_MEMBROS_EXCEDIDO: 'O grupo atingiu o limite de 50 membros.',
  MEMBRO_JA_EXISTE: 'Esse usuario ja faz parte do grupo.',
  LIMITE_CONVITES_PENDENTES: 'Limite de 20 convites pendentes atingido. Cancele alguns antigos.',
  USUARIO_BLOQUEADO: 'Nao e possivel entrar neste grupo.',
  ERRO_401: 'Sua sessao expirou. Faca login novamente.',
  ERRO_500: 'Algo deu errado. Tente novamente em instantes.',
  SEM_INTERNET: 'Sem conexao. Verifique sua internet e tente novamente.',
};

// ========== Periodos do Dia ==========

export const PERIODOS_DIA = [
  { key: 'MANHA', label: 'Manha', icone: '🌅' },
  { key: 'TARDE', label: 'Tarde', icone: '☀️' },
  { key: 'NOITE', label: 'Noite', icone: '🌙' },
];

// ========== Raio de Busca Padrao (km) ==========

export const RAIO_BUSCA_PADRAO = 50;

// ========== Dados Mock para Desenvolvimento ==========

export const MOCK_USUARIO = {
  id: 'user-1',
  nome: 'Maria Silva',
  avatarUrl: undefined,
  email: 'maria@email.com',
  biografia: 'Viajante apaixonada por descobrir novos lugares',
  roteirosPublicos: 12,
  grupos: 5,
};

export const MOCK_ROTEIROS: Roteiro[] = [
  {
    id: 'rot-1',
    nome: 'Fim de Semana em Paris',
    descricao: 'Roteiro perfeito para aproveitar Paris em 3 dias',
    tipo: TipoRoteiro.PUBLICO,
    destinos: ['Paris', 'Versalhes'],
    fotoCapa: undefined,
    dias: [],
    autor: { id: 'user-2', nome: 'Joao Costa' },
    favoritado: true,
    criadoEm: '2026-06-10T10:00:00Z',
    atualizadoEm: '2026-06-15T14:30:00Z',
    totalFavoritos: 234,
  },
  {
    id: 'rot-2',
    nome: 'Praias do Nordeste',
    descricao: '7 dias pelas melhores praias do nordeste brasileiro',
    tipo: TipoRoteiro.COLABORATIVO,
    destinos: ['Porto de Galinhas', 'Maragogi', 'Fernando de Noronha'],
    fotoCapa: undefined,
    dias: [],
    autor: { id: 'user-3', nome: 'Ana Lima' },
    favoritado: false,
    criadoEm: '2026-05-20T08:00:00Z',
    atualizadoEm: '2026-06-12T09:00:00Z',
    totalFavoritos: 567,
  },
  {
    id: 'rot-3',
    nome: 'Roteiro Cultural em Roma',
    descricao: 'Museus, ruinas e historia em 4 dias',
    tipo: TipoRoteiro.PRIVADO,
    destinos: ['Roma', 'Vaticano'],
    fotoCapa: undefined,
    dias: [],
    autor: { id: 'user-1', nome: 'Maria Silva' },
    favoritado: false,
    criadoEm: '2026-06-01T12:00:00Z',
    atualizadoEm: '2026-06-18T16:00:00Z',
    totalFavoritos: 89,
  },
];

export const MOCK_GRUPOS: Grupo[] = [
  {
    id: 'grp-1',
    nome: 'Viagem Europa 2026',
    descricao: 'Planejamento da viagem de ferias para Europa',
    membros: [
      { usuario: { id: 'user-1', nome: 'Maria Silva' }, papel: PapelGrupo.ADMINISTRADOR, entrouEm: '2026-01-10' },
      { usuario: { id: 'user-2', nome: 'Joao Costa' }, papel: PapelGrupo.EDITOR, entrouEm: '2026-01-12' },
      { usuario: { id: 'user-3', nome: 'Ana Lima' }, papel: PapelGrupo.MEMBRO, entrouEm: '2026-02-05' },
    ],
    roteiros: [],
    convites: [],
    criadoEm: '2026-01-10T10:00:00Z',
  },
  {
    id: 'grp-2',
    nome: 'Reveillon Copacabana',
    descricao: 'Grupo para planejar o Reveillon no Rio',
    membros: [
      { usuario: { id: 'user-1', nome: 'Maria Silva' }, papel: PapelGrupo.ADMINISTRADOR, entrouEm: '2026-03-15' },
    ],
    roteiros: [],
    convites: [],
    criadoEm: '2026-03-15T18:00:00Z',
  },
];