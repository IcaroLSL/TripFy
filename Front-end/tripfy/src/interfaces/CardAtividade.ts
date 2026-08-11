export interface CardAtividadeProps {
    image: string;
    title: string;
    stars: number;
    priceLevel: number | null;
    theme: 'light' | 'dark';
    added: boolean;
}