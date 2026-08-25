import { apiClient } from "@/instances/apiClient";
import { secureAuthStorage } from "@/services/secureAuthStorage";
import { useAuthStore } from "@/store/authStore";
import React from "react";

interface ConvertLocationResponse {
    name: string;
}

interface UseConvertLocationResult {
    convertLocation: (latitude: number, longitude: number) => Promise<string | null>;
    loading: boolean;
    error: string | null;
    location: string | null;
}

export function useConvertLocation(): UseConvertLocationResult {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [location, setLocation] = React.useState<string | null>(null);

    const convertLocation = async (latitude: number, longitude: number): Promise<string | null> => {
        setLoading(true);
        setError(null);
        try {
            const token = await secureAuthStorage.getAccessToken();
            if (!token) {
                setError("Access token not found");
                return null;
            }

            const response = await apiClient.get<ConvertLocationResponse>(`/v1/places/position?latitude=${latitude}&longitude=${longitude}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setLocation(response.data.name);

            return response.data.name;
        } catch (error) {
            setError("Error occurred while converting location");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { convertLocation, loading, error, location };
}