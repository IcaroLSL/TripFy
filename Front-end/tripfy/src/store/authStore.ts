import { create } from 'zustand';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { apiClient } from '@/instances/apiClient';
import { secureAuthStorage } from '@/services/secureAuthStorage';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isHydrated: boolean; // <- novo: já checou o storage?
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  hydrate: () => Promise<void>;   // <- novo
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isHydrated: false,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  hydrate: async () => {
    try {
      const token = await secureAuthStorage.getAccessToken();
      if (!token) {
        set({ isHydrated: true });
        return;
      }
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
      const { data } = await apiClient.get('/v1/auth/me');
      set({ user: data, isHydrated: true });
    } catch {
      await secureAuthStorage.clear();
      set({ user: null, isHydrated: true });
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await GoogleSignin.signOut().catch(() => {}); // não trava se não tiver sessão google
      await secureAuthStorage.clear();
      delete apiClient.defaults.headers.common.Authorization;
      set({ user: null, isLoading: false });
      router.push('/');
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));