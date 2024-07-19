// src/stores/auth.js
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { useChannelStore } from './channels/channelStore'
import { logout as apiLogout } from '@/services/api'

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
        // Intenta hacer logout en el servidor
        await apiLogout()
      } catch (error) {
        console.error('Error durante el logout del servidor:', error)
        // Continuamos con el logout local incluso si falla el logout del servidor
      } finally {
        this.$reset()
        this.clearSessionCookie()
        localStorage.clear()
        
        const channelStore = useChannelStore()
        channelStore.$reset()
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