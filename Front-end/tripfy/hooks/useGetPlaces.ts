import { apiClient } from "@/instances/apiClient";
import { Atividade } from "@/interfaces/Atividade";
import { Roteiro } from "@/interfaces/Roteiro";
import { secureAuthStorage } from "@/services/secureAuthStorage";
import { useCallback, useState } from "react";

interface Place {
    'publicId': string,
    "name": string,
    "address": string,
    "types": string[],
    "phoneNumber": string,
    "websiteUri": string,
    "rating": number,
    "priceLevel": number | null,
    "latitude": number,
    "longitude": number,
    'imageReferences': string[],
}
interface PlaceApiResponse {
    places: Place[];
    page: number;
    limit: number;
    hasNextPage: boolean;
}


interface PlacesParams {
    tags: string[];
    destino: string;
    priceLevels: string[];
    minRating: string,
    specificPlace?: string
}
export interface useGetPlacesReturn {
    loading: boolean;
    error: string | null;
    getPlaces: (placesPayload: PlacesParams, page: number) => Promise<Atividade[]>;
    total: number
}

export function useGetPlaces(limit: number = 10): useGetPlacesReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);
    const getPlaces = useCallback(async (placesPayload: PlacesParams, page: number): Promise<Atividade[]> => {
        try {
            const accessToken = await secureAuthStorage.getAccessToken();
            if (!accessToken) {
                setError("Access token not found");
                return [];
            }

            console.log("Fetching places with payload:", placesPayload, "Page:", page, "Limit:", limit);
            setLoading(true);
            const response = await apiClient.get<PlaceApiResponse>("/v1/places", {
                params: {
                    location: placesPayload.destino,
                    page: page,
                    limit: limit,
                    types: placesPayload.tags,
                    priceLevels: Number(placesPayload.priceLevels),
                    minRating: Number(placesPayload.minRating),
                    name: placesPayload.specificPlace || '',
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setTotal(response.data.places.length);
            const places: Atividade[] = response.data.places.map(place => ({
                id: place.publicId,
                day: 0,
                name: place.name,
                address: place.address,
                phoneNumber: place.phoneNumber,
                rating: place.rating,
                priceLevel: place.priceLevel !== null ? place.priceLevel : 0,
                hours: [],
                imageUris: place.imageReferences,
                priceRangeEnd:'',
                priceRangeStart:'',
                allowsDogs: false,
                startTime: '',
                endTime: '',
            }));

            return places;

        } catch (error) {
            setError("Error fetching places");
            return [];
        } finally {
            setLoading(false);
        }
    }, [])

    return { loading, error, getPlaces, total };

}

