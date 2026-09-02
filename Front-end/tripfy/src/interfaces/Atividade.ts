export interface Atividade {
    id: string;
    day: number;
    name: string;
    address: string;
    phoneNumber: string;
    rating: number;
    priceLevel: number;
    hours: string[];
    imageUris: string[];
    allowsDogs: boolean;
    priceRangeStart: string;
    priceRangeEnd: string;
    startTime: string;
    endTime: string;
}
