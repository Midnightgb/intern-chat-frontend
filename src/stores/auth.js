// src/stores/auth.js
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { logout as apiLogout } from '@/services/api'
import { useChannelStore } from './channels/channelStore'
import { useMessageStore } from './messages/messageStore'
import { useCurrentChannelStore } from './channels/currentChannelStore'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null
  }),
  actions: {
    login(userData, token) {
      this.isAuthenticated = true
      this.user = {
        name: userData.full_name,
        networkUser: userData.network_user,
        profilePic: userData.photo_url,
        role: userData.role
      }
      this.token = token
      this.setSessionCookie(token)
      
      try {
        const decodedToken = jwtDecode(token)
        // usar decodedToken para verificar la expiración, por ejemplo
        console.log('Token decoded:', decodedToken)
      } catch (error) {
        console.error('Error decoding token:', error)
        // Manejar el error según sea necesario
      }
    },
    async logout() {
      try {
        console.log('Logout en proceso...');
        // Guardar el token actual antes de hacer la solicitud de logout
        const currentToken = this.token;
        
        // Realizar el logout en el servidor
        await apiLogout(currentToken);
        
        console.log('Logout exitoso');
      } catch (error) {
        console.error('Error durante el logout del servidor:', error);
        throw error; // Propagar el error para manejarlo en el componente
      } finally {
        // Limpiar el estado local después de intentar el logout en el servidor
        this.clearSessionCookie();
        this.$reset();
        
        useChannelStore().$reset();
        useMessageStore().$reset();
        useCurrentChannelStore().$reset();
        localStorage.clear();
      }
    },
    checkAuth() {
      const token = this.getSessionCookie()
      if (token) {
        // Aquí verificar el token con el backend
        // Por ahora, solo estableceremos isAuthenticated a true
        this.isAuthenticated = true
        this.token = token
      } else {
        this.logout()
      }
    },
    setSessionCookie(token) {
      document.cookie = `session=${token}; path=/; secure; samesite=strict`
    },
    getSessionCookie() {
      const cookies = document.cookie.split(';')
      const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session='))
      return sessionCookie ? sessionCookie.split('=')[1] : null
    },
    clearSessionCookie() {
      document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict'
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth_store',
        storage: localStorage,
        paths: ['isAuthenticated', 'user']
      }
    ]
  }
})