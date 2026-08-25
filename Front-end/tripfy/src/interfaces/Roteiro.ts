import { Atividade } from "./Atividade";

export interface Roteiro {
  destino: string;
  startDate: Date | null;
  endDate: Date | null;
  morningActivities: Record<number, { activities: Atividade[] }>;
  afternoonActivities: Record<number, { activities: Atividade[] }>;
  nightActivities: Record<number, { activities: Atividade[] }>;
  earlyMorningActivities: Record<number, { activities: Atividade[] }>;
  tags: string[];
  orcamento: string;
  avaliacaoMinima: string;
}
