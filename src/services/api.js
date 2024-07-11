// src/services/api.js
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

const apiClient = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Funciones de API
export const login = (credentials) => {
  return apiClient.post(API_ENDPOINTS.LOGIN, credentials);
};

export const logout = () => {
  return apiClient.post(API_ENDPOINTS.LOGOUT);
};

export default apiClient;