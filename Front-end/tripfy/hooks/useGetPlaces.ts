import { apiClient } from "@/instances/apiClient";
import { Roteiro } from "@/interfaces/Roteiro";
import { secureAuthStorage } from "@/services/secureAuthStorage";
import { useCallback, useState } from "react";

export interface useGetPlacesReturn {
    loading: boolean;
    error: string | null;
    getPlaces: (placesPayload: Roteiro, page: number) => Promise<void>;
}

export function useGetPlaces(limit: number = 10) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const [places, setPlaces] = useState<Place[]>([]);

    const getPlaces = useCallback(async (placesPayload: Roteiro, page: number) => {
        try{
            const accessToken = await secureAuthStorage.getAccessToken();
            if (!accessToken) {
                setError("Access token not found");
                return;
            }

            setLoading(true);
            const response = await apiClient.get("http://10.179.126.225:8080/v1/places", {
                params: {
                    location: placesPayload.destino,
                    page: page,
                    limit: limit,
                    type: placesPayload.atividades,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        
        } catch (error) {
            setError("Error fetching places");
        } finally {
            setLoading(false);
        }
    }, [])

    return { loading, error, getPlaces };

}