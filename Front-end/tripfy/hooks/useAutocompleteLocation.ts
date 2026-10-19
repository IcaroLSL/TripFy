import { apiClient } from "@/instances/apiClient";
import { secureAuthStorage } from "@/services/secureAuthStorage";
import { AxiosError } from "axios";
import React from "react";

interface AutocompleteLocationResponse {
    placeNames: string[];
}

interface UseConvertLocationResult {
    getLocationSuggestions: (input: string) => Promise<string[] | null>;
    loading: boolean;
    error: string | null;
    locationSuggestions: string[] | null;
}

export function useAutocompleteLocation(): UseConvertLocationResult {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [locationSuggestions, setLocationSuggestions] = React.useState<string[] | null>(null);

    const getLocationSuggestions = async (input: string): Promise<string[] | null> => {
        setLoading(true);
        setError(null);
        try {
            const token = await secureAuthStorage.getAccessToken();
            if (!token) {
                setError("Access token not found");
                return null;
            }

            const response = await apiClient.get<AutocompleteLocationResponse>(`/v1/places/autocomplete?input=${input}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setLocationSuggestions(response.data.placeNames);

            return response.data.placeNames|| null;
        } catch (error: AxiosError | any) {
            const errorMessage = error.response?.data?.error || "Erro desconhecido";

            setError(errorMessage || "Error occurred while fetching location suggestions");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { getLocationSuggestions, loading, error, locationSuggestions };
}