import { apiClient } from "@/instances/apiClient";
import { secureAuthStorage } from "@/services/secureAuthStorage";


export const getPlaceImage = async (placeImageReferences: string, dummyMode: boolean): Promise<string | null> => {
    try {
        const token = await secureAuthStorage.getAccessToken()

        const response = await apiClient.get<{imageUrl: string}>(`/v1/places/image?photoReference=${placeImageReferences}&dummy=${dummyMode}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status !== 200) {
            throw new Error(`Error fetching place images: ${response.statusText}`);
        }
        return response.data.imageUrl;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
    }
}