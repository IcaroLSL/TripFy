import { apiClient } from "@/instances/apiClient";
import { Atividade } from "@/interfaces/Atividade";
import { secureAuthStorage } from "@/services/secureAuthStorage";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { useCallback, useState } from "react";

interface useGetPlaceReturn {
    loading: boolean;
    error: string | null;
    place: Atividade | null;
    getPlace: (placeId: string) => Promise<ApiReturn | null>;
}

interface ApiReturn {
    'publicId': string,
    "name": string,
    "address": string,
    "phoneNumber": string,
    "rating": number,
    "priceLevel": number | null,
    "hours": string[],
    "imageUris": string[],
    "allowsDogs": boolean,
    "priceRangeStart": string,
    "priceRangeEnd": string,
}


export const useGetPlaceDetails = (): useGetPlaceReturn => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [place, setPlace] = useState<Atividade | null>(null);

    const getPlace = useCallback(async (placeId: string): Promise<ApiReturn | null> => {
        try {
            setLoading(true);
            setError(null);
            const token = await secureAuthStorage.getAccessToken()

            const response = await apiClient.get<ApiReturn>(`/v1/place/${placeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status !== 200) {
                throw new Error(`Error fetching place: ${response.statusText}`);
            }

            setPlace({
                id: response.data.publicId,
                name: response.data.name,
                address: response.data.address,
                phoneNumber: response.data.phoneNumber,
                rating: response.data.rating,
                priceLevel: response.data.priceLevel || 0,
                hours: response.data.hours,
                imageUris: response.data.imageUris,
                allowsDogs: response.data.allowsDogs,
                priceRangeStart: response.data.priceRangeStart,
                priceRangeEnd: response.data.priceRangeEnd,
                day: 1,
                startTime: "",
                endTime: "",
            });
            return response.data;
        } catch (err: any) {
            setError(err.message || "An unknown error occurred");
            return null;
        } finally {
            setLoading(false);
        }
    }, [])

    return { loading, error, place, getPlace };
}