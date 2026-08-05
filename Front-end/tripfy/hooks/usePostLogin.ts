import { apiClient } from "@/instances/apiClient"
import { useAuthStore } from "@/store/authStore"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import axios from "axios"
import { useCallback, useState } from "react"

interface PostLoginResponse {
loading: boolean
error: string | null
oAuthLogin: (provider: 'GOOGLE' | 'APPLE') => Promise<boolean>
signInLogin: () => Promise<boolean>
}

GoogleSignin.configure({
webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

export function usePostLogin(): PostLoginResponse {
const [loading, setLoading] = useState<boolean>(false)
const [error, setError] = useState<string | null>(null)
const { setUser } = useAuthStore()

const oAuthLogin = useCallback(async (provider: 'GOOGLE' | 'APPLE'): Promise<boolean> => {
setLoading(true)
setError(null)
try {
await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

const responseGoogleOauth = await GoogleSignin.signIn();
const tokenOauth = responseGoogleOauth.data?.idToken;
const responseTripfy = await apiClient.post("/v1/auth/oauth/login", { provider: provider, token: tokenOauth })
setUser(responseTripfy.data)
return true
        } catch (err) {
setError("Failed to login with OAuth")
return false
        } finally {
setLoading(false)
        }
    }, [])

const signInLogin = useCallback(async (): Promise<boolean> => {
setLoading(true)
setError(null)
try {
const response = await apiClient.post("/v1/auth/login")
setUser(response.data)
return true
        } catch (err) {
setError("Failed to login with sign in")
return false
        } finally {
setLoading(false)
        }
    }, [])

return { loading, error, oAuthLogin, signInLogin }
}