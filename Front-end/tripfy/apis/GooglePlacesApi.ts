import axios from 'axios';

export const googlePlacesApi = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/js?key=',
  params: {
    key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
  },
});