import { apiClient } from "@/instances/apiClient";
import { Atividade } from "@/interfaces/Atividade";
import { secureAuthStorage } from "@/services/secureAuthStorage";
import { useCallback, useState } from "react";
import { getPlaceImage } from "./useGetPlaceImage";

interface useGetPlaceReturn {
    loading: boolean;
    error: string | null;
    place: Atividade | null;
    getPlace: (placeId: string) => Promise<Atividade | null>;
}

interface ApiReturn {
    publicId: string;
    name: string;
    address: string;
    phoneNumber: string;
    rating: number;
    priceLevel: number | null;
    hours: string[];
    imageReferences: string[];
    allowsDogs: boolean;
    priceRangeStart: string;
    priceRangeEnd: string;
}

export const useGetPlaceDetails = (): useGetPlaceReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [place, setPlace] = useState<Atividade | null>(null);

    const getPlace = useCallback(
        async (placeId: string): Promise<Atividade | null> => {
            try {
                setLoading(true);
                setError(null);

                const token = await secureAuthStorage.getAccessToken();

                const response = await apiClient.get<ApiReturn>(
                    `/v1/place/${placeId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status !== 200) {
                    throw new Error(
                        `Error fetching place: ${response.statusText}`
                    );
                }

                const data = response.data;

                // Carrega TODAS as imagens em paralelo
                const imageUris = await Promise.all(
                    data.imageReferences
                        .filter((imageReference) => imageReference?.length > 0)
                        .map((imageReference) =>
                            getPlaceImage(imageReference, true)
                        )
                );

                const validImageUris = imageUris.filter(
                    (imageUri): imageUri is string =>
                        Boolean(imageUri && imageUri.length > 0)
                );

                const placeData: Atividade = {
                    id: data.publicId,
                    name: data.name,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    rating: data.rating,
                    priceLevel: data.priceLevel ?? 0,
                    hours: data.hours,

                    // Todas as fotos carregadas
                    imageUris: validImageUris,

                    allowsDogs: data.allowsDogs,
                    priceRangeStart: data.priceRangeStart,
                    priceRangeEnd: data.priceRangeEnd,

                    day: 1,
                    startTime: "",
                    endTime: "",
                };

                console.log("Fetched place details:", placeData);

                setPlace(placeData);

                return placeData;
            } catch (err: any) {
                setError(
                    err?.message || "An unknown error occurred"
                );

                return null;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { loading, error, place, getPlace };
};