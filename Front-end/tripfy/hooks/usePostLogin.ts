import { apiClient } from "@/instances/apiClient"
import { secureAuthStorage } from "@/services/secureAuthStorage"
import { useAuthStore } from "@/store/authStore"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import axios from "axios"
import { useCallback, useState } from "react"

interface PostLoginResponse {
    loading: boolean
    error: string | null
    oAuthLogin: (provider: 'GOOGLE' | 'APPLE') => Promise<boolean>
    signInLogin: (data: {username: string; password: string}) => Promise<boolean>
}

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

export function usePostLogin(): PostLoginResponse {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { setUser } = useAuthStore()

    const oAuthLogin = useCallback(async (provider: 'GOOGLE' | 'APPLE'): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const responseGoogleOauth = await GoogleSignin.signIn();
            const tokenOauth = responseGoogleOauth.data?.idToken;
            console.log("Google OAuth token:", tokenOauth);
            const { data } = await apiClient.post('/v1/auth/oauth/login', { provider, token: tokenOauth });
            console.log("OAuth login response:", data);
            await secureAuthStorage.saveTokens(data.accessToken, data.refreshToken);
            setUser(data.user);
            return true;
        } catch (err) {
            console.log("OAuth login error:", err);
            setError('Failed to login with OAuth');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const signInLogin = useCallback(async (data: {username: string; password: string}): Promise<boolean> => {
        setLoading(true)
        setError(null)
        try {
            const response = await apiClient.post("/v1/auth/login", data)
            console.log("Login response:", response.data)
            setUser(response.data)
            await secureAuthStorage.saveTokens(response.data.accessToken, response.data.refreshToken);
            return true
        } catch (err) {
            console.log(err)
            setError("Failed to login with sign in")
            return false
        } finally {
            setLoading(false)
        }
    }, [])

    return { loading, error, oAuthLogin, signInLogin }
}