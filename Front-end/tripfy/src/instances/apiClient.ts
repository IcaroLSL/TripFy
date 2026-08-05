import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL, // Substitua pelo URL do seu backend
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000
});