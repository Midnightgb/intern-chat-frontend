// src/services/api.js
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { useAuthStore } from '@/stores/auth';

const publicApi = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const apiClient = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer`
  },
});

// obtener el token actual
const getToken = () => {
  const authStore = useAuthStore();
  return authStore.getSessionCookie();
};

// actualizar el token
const updateToken = (newToken) => {
  const authStore = useAuthStore();
  authStore.setSessionCookie(newToken);
  console.log('Nuevo token actualizado:', newToken);
};

// Interceptor para agregar el token a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      console.log('Token en la solicitud:', token);
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar la respuesta y renovar el token si es necesario
apiClient.interceptors.response.use(
  (response) => {
    const newToken = response.headers['new-token'];
    if (newToken) {
      console.log('Nuevo token en la respuesta:', newToken);
      updateToken(newToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log('Error en la respuesta:', error);
    // Comprueba si la respuesta contiene un nuevo token
    if (error.response && error.response.data && error.response.data.token_new) {
      const newToken = error.response.data.token_new;
      updateToken(newToken);
      
      // Actualiza el token en la solicitud original y la reintenta
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      console.log('Reintentando solicitud:', originalRequest);
      return apiClient(originalRequest);
    }
    
    // Manejo de token expirado
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const authStore = useAuthStore();
      console.log('Token expirado, cerrando sesión...');
      try {
        authStore.logout();
        // Aquí podría implementar una lógica para obtener un nuevo token si es necesario
        // Por ejemplo, hacer una llamada a un endpoint de refresh token
        // const newToken = await authStore.refreshToken();
        // updateToken(newToken);
        // originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        // return apiClient(originalRequest);
      } catch (refreshError) {
        authStore.logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Funciones de API
export const login = (credentials) => {
  return publicApi.post(API_ENDPOINTS.LOGIN, credentials);
};

export const logout = () => {
  return apiClient.get(API_ENDPOINTS.LOGOUT);
};

export const getChannels = () => {
  return apiClient.get(API_ENDPOINTS.GET_CHANNELS);
};

export const postMessage = (content) => {
  return apiClient.post(API_ENDPOINTS.SEND_MESSAGE, content);
};

export const updateMessage = (message) => {
  return apiClient.post(API_ENDPOINTS.UPDATE_MESSAGE, {
    id_message: message.id_message,
    content: message.content
  });
};

export const getUserByName = (network_user) => {
  return apiClient.get(API_ENDPOINTS.GET_USER_BY_NAME.replace(':network_user', network_user));
};

export default apiClient;
