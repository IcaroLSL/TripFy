import { apiClient } from "@/instances/apiClient";
import { Atividade } from "@/interfaces/Atividade";
import { Roteiro } from "@/interfaces/Roteiro";
import { secureAuthStorage } from "@/services/secureAuthStorage";
import { useCallback, useState } from "react";

interface Place {
    "name": string,
    "address": string,
    "types": string[],
    "phoneNumber": string,
    "websiteUri": string,
    "rating": number,
    "priceLevel": number | null,
    "latitude": number,
    "longitude": number
}
interface PlaceApiResponse {
    places: Place[];
    page: number;
    limit: number;
    hasNextPage: boolean;
}

export interface useGetPlacesReturn {
    loading: boolean;
    error: string | null;
    getPlaces: (placesPayload: Roteiro, page: number) => Promise<Atividade[]>;
}

export function useGetPlaces(limit: number = 10) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getPlaces = useCallback(async (placesPayload: Omit<Roteiro, 'startDate' | 'endDate' | 'orcamento' | 'avaliacaoMinima' | 'distanciaMaxima' | 'morningActivities' | 'afternoonActivities' | 'nightActivities' | 'earlyMorningActivities'>, page: number): Promise<Atividade[]> => {
        try {
            const accessToken = await secureAuthStorage.getAccessToken();
            if (!accessToken) {
                setError("Access token not found");
                return [];
            }

            console.log("Fetching places with payload:", placesPayload, "Page:", page, "Limit:", limit);
            setLoading(true);
            const response = await apiClient.get<PlaceApiResponse>("http://10.179.126.225:8080/v1/places", {
                params: {
                    location: placesPayload.destino,
                    page: page,
                    limit: limit,
                    tags: placesPayload.tags,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("Places API response:", response.data);
            const places: Atividade[] = response.data.places.map(place => ({
                id: Math.floor(Math.random() * 1000000),
                day: 0,
                image: '',
                name: place.name,
                startTime: '',
                endTime: '',
                priceLevel: place.priceLevel !== null ? place.priceLevel : 0,
                stars: place.rating,
                description: `${place.address}\nPhone: ${place.phoneNumber}\nWebsite: ${place.websiteUri}`,
            }));

            return places;

        } catch (error) {
            setError("Error fetching places");
            return [];
        } finally {
            setLoading(false);
        }
    }, [])

    return { loading, error, getPlaces };

}

