// src/stores/auth.js
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { logout as apiLogout } from '@services/api'
import { cleanupSession } from '@utils/sessionCleanup'
import { apiClient } from '@services/api'
import { socketService } from '@services/socketService'
import { useCurrentUserStore } from '@stores/user/currentUserStore'

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
        id: userData.data.id_user,
        name: userData.data.full_name,
        networkUser: userData.data.network_user,
        photo_url: userData.data.photo_url,
        role: userData.role
      }
      this.token = token
      this.setSessionCookie(token)

      // Guardar el usuario en el almacenamiento local
      localStorage.setItem('user', JSON.stringify(this.user))

      // Reconectar el socket con el nuevo token
      socketService.disconnect()
      socketService.connect()

      this.checkTokenExpiration(token)
    },
    async logout() {
      if (!this.isAuthenticated) {
        return
      }
      const currentUserStore = useCurrentUserStore()
      try {
        await apiLogout()
      } catch (error) {
        console.error('Error during server logout:', error)
      } finally {
        // Clean up session regardless of API result
        cleanupSession()
        socketService.disconnect()
        currentUserStore.clearCurrentUser()

        // Reset auth store state
        this.isAuthenticated = false
        this.user = null
        this.token = null

        // Eliminar el usuario del almacenamiento local
        localStorage.removeItem('user')
      }
    },
    checkAuth() {
      const token = this.getSessionCookie()
      if (token) {
        this.isAuthenticated = true
        this.token = token
        
        // Recuperar el usuario del almacenamiento local
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          this.user = JSON.parse(storedUser)
        }
      } else {
        this.isAuthenticated = false
        this.user = null
        this.token = null
      }
    },
    setSessionCookie(token) {
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
          this.logout()
        } else if (expiration < new Date(Date.now() + 1000 * 60 * 5)) {
          console.warn('Token expirará en menos de 5 minutos:', expiration)
        }else{
          console.log('Token válido');
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
