import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: {
      name: '',
      networkUser: '',
      profilePic: '',
      role: ''
    }
  }),
  actions: {
    login(userData) {
      this.isAuthenticated = true
      this.user = { ...userData }
      console.log('DATOS ACTUALIZADOS EN AUTH:', this.user)
    },
    logout() {
      this.isAuthenticated = false
      this.user = {
        name: '',
        networkUser: '',
        profilePic: '',
        role: ''
      }
      localStorage.removeItem('token')
    }
  }
})