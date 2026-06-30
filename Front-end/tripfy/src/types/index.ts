// ========== Enums ==========

export enum CategoriaAtividade {
  RESTAURANTE = 'RESTAURANTE',
  MUSEU = 'MUSEU',
  PRAIA = 'PRAIA',
  PARQUE = 'PARQUE',
  VIDA_NOTURNA = 'VIDA_NOTURNA',
  COMPRAS = 'COMPRAS',
  HISTORICO = 'HISTORICO',
  ATIVIDADE_AR_LIVRE = 'ATIVIDADE_AR_LIVRE',
}

export enum FaixaPreco {
  GRATUITO = 'GRATUITO',
  UM = '$',
  DOIS = '$$',
  TRES = '$$$',
  QUATRO = '$$$$',
}

export enum TipoRoteiro {
  PUBLICO = 'PUBLICO',
  PRIVADO = 'PRIVADO',
  COLABORATIVO = 'COLABORATIVO',
}

export enum PapelGrupo {
  ADMINISTRADOR = 'ADMINISTRADOR',
  EDITOR = 'EDITOR',
  MEMBRO = 'MEMBRO',
  CONVIDADO = 'CONVIDADO',
}

export enum StatusConvite {
  PENDENTE = 'PENDENTE',
  ACEITO = 'ACEITO',
  RECUSADO = 'RECUSADO',
  EXPIRADO = 'EXPIRADO',
}

export enum PeriodoDia {
  MANHA = 'MANHA',
  TARDE = 'TARDE',
  NOITE = 'NOITE',
}

// ========== Modelos de Domínio ==========

export interface Atividade {
  id: string;
  nome: string;
  categoria: CategoriaAtividade;
  faixaPreco: FaixaPreco;
  avaliacao: number;
  totalAvaliacoes: number;
  endereco: string;
  latitude: number;
  longitude: number;
  fotoUrl?: string;
  duracaoMinutos: number;
  horarioInicio?: string; // HH:mm
  horarioFim?: string;    // HH:mm
  diaIndex?: number;      // índice do dia no roteiro (0-based)
}

export interface DiaRoteiro {
  index: number;
  data: string; // ISO date
  atividades: Atividade[];
}

export interface Roteiro {
  id: string;
  nome: string;
  descricao: string;
  tipo: TipoRoteiro;
  destinos: string[];
  fotoCapa?: string;
  dias: DiaRoteiro[];
  autor: UsuarioResumo;
  favoritado: boolean;
  criadoEm: string;
  atualizadoEm: string;
  totalFavoritos: number;
}

export interface UsuarioResumo {
  id: string;
  nome: string;
  avatarUrl?: string;
}

export interface Usuario extends UsuarioResumo {
  email: string;
  biografia?: string;
  roteirosPublicos: number;
  grupos: number;
}

export interface Grupo {
  id: string;
  nome: string;
  descricao?: string;
  fotoCapa?: string;
  membros: MembroGrupo[];
  roteiros: Roteiro[];
  convites: Convite[];
  criadoEm: string;
}

export interface MembroGrupo {
  usuario: UsuarioResumo;
  papel: PapelGrupo;
  entrouEm: string;
}

export interface Convite {
  id: string;
  codigo: string; // Base62, 7 dígitos
  grupoId: string;
  grupoNome: string;
  adminAvatar?: string;
  status: StatusConvite;
  criadoEm: string;
  expiraEm: string;
  reenvios: number;
}

export interface HistoricoAlteracao {
  id: string;
  grupoId: string;
  usuario: UsuarioResumo;
  acao: string;
  descricao: string;
  data: string;
}

// ========== Erros de Negócio ==========

export type CodigoErro =
  | 'CONFLITO_HORARIO'
  | 'DURACAO_MINIMA_NAO_ATENDIDA'
  | 'LOCALIZACAO_NAO_ENCONTRADA'
  | 'PERMISSAO_NEGADA'
  | 'ROTEIRO_NAO_ENCONTRADO'
  | 'CONVITE_EXPIRADO'
  | 'CONVITE_INVALIDO'
  | 'ADMIN_OBRIGATORIO'
  | 'CONFLITO_EDICAO'
  | 'LIMITE_MEMBROS_EXCEDIDO'
  | 'MEMBRO_JA_EXISTE'
  | 'LIMITE_CONVITES_PENDENTES'
  | 'USUARIO_BLOQUEADO';

export interface ErroNegocio {
  codigo: CodigoErro;
  mensagem: string;
  httpStatus: 400 | 401 | 403 | 404 | 409 | 410 | 500;
}

// ========== Navegação ==========

declare global {
  namespace Tripfy {
    interface RootParamList {
      index: undefined;
      '(tabs)': undefined;
      'explorar/index': undefined;
      'explorar/busca': undefined;
      'explorar/detalhe': { roteiroId: string };
      'roteiros/index': undefined;
      'roteiros/criar': undefined;
      'roteiros/editar': { roteiroId: string };
      'grupos/index': undefined;
      'grupos/criar': undefined;
      'grupos/detalhe': { grupoId: string };
      'grupos/entrar': undefined;
      'favoritos/index': undefined;
      'perfil/index': undefined;
      'perfil/configuracoes': undefined;
    }
  }
}