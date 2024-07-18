// src/stores/auth.js
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { useChannelStore } from './channels/channelStore'
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
      
      // Opcionalmente, puedes verificar el token aquí
      try {
        const decodedToken = jwtDecode(token)
        // Podrías usar decodedToken para verificar la expiración, por ejemplo
        console.log('Token decoded:', decodedToken)
      } catch (error) {
        console.error('Error decoding token:', error)
        // Manejar el error según sea necesario
      }
    },
    logout() {
      this.$reset()
      this.clearSessionCookie()

      localStorage.clear()

      const channelStore = useChannelStore()
      channelStore.$reset()
    },
    checkAuth() {
      const token = this.getSessionCookie()
      if (token) {
        // Aquí deberías verificar el token con el backend
        // Por ahora, solo estableceremos isAuthenticated a true
        this.isAuthenticated = true
        this.token = token
        // Idealmente, también deberías obtener la información del usuario del backend
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
        paths: ['isAuthenticated', 'user'] // No almacenamos el token por seguridad
      }
    ]
  }
})