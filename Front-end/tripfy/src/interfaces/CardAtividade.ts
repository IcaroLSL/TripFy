import { Atividade } from "./Atividade";

export interface CardAtividadeProps {
    atividade: Atividade;
    theme: 'light' | 'dark';
    added: boolean;
    onAddActivity: (day: number, timeOfDay: 'morning' | 'afternoon' | 'night' | 'earlyMorning', activity: Atividade) => void;
    onViewDetails: (placeId: string) => void;
}