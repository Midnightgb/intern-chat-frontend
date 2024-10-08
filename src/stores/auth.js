// src/stores/auth.js
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { logout as apiLogout } from '@/services/api'
import { cleanupSession } from '@/utils/sessionCleanup'
import { apiClient } from '@/services/api'
import { socketService } from '@/services/socketService'

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
        id: userData.id_user,
        name: userData.full_name,
        networkUser: userData.network_user,
        photo_url: userData.photo_url,
        role: userData.role
      }
      this.token = token
      this.setSessionCookie(token)

      // Reconectar el socket con el nuevo token
      socketService.disconnect()
      socketService.connect()

      this.checkTokenExpiration(token)
    },
    async logout() {
      try {
        // Realizar el logout en el servidor
        await apiLogout(this.token)
      } catch (error) {
        console.error('Error durante el logout del servidor:', error)
        cleanupSession()
        throw error // Propagar el error para manejarlo en el componente
      } finally {
        cleanupSession()
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
        this.isAuthenticated = false
        this.user = null
        this.token = null
      }
    },
    setSessionCookie(token) {
      console.log("Seteando token auth.js ", token);
      document.cookie = `session=${token}; path=/; secure; samesite=strict`
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
      this.token = token
      this.checkAuth()
      this.checkTokenExpiration(token)
    },
    getSessionCookie() {
      const cookies = document.cookie.split(';')
      const sessionCookie = cookies.find((cookie) => cookie.trim().startsWith('session='))
      return sessionCookie ? sessionCookie.split('=')[1] : null
    },
    clearSessionCookie() {
      document.cookie =
        'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict'
    },
    checkTokenExpiration(token) {
      try {
        const decodedToken = jwtDecode(token)
        const expiration = new Date(decodedToken.exp * 1000)
        if (expiration < new Date()) {
          console.warn('Token expirado:', expiration)
          this.logout()
        } else if (expiration < new Date(Date.now() + 1000 * 60 * 5)) {
          console.warn('Token expirará en menos de 5 minutos:', expiration)
        }else{
          console.log('Token válido hasta:', expiration)
        }
      } catch (error) {
        console.error('Error decoding token:', error)
      }
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
