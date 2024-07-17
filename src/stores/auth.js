// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: {
      name: '',
      networkUser: '',
      profilePic: '',
      role: ''
    },
    token: null
  }),
  actions: {
    login(userData) {
      this.isAuthenticated = true
      this.user = {
        name: userData.name,
        networkUser: userData.networkUser,
        profilePic: userData.profilePic,
        role: userData.role
      }
      this.token = userData.token
      localStorage.setItem('auth', JSON.stringify({
        isAuthenticated: true,
        user: this.user,
        token: this.token
      }))
    },
    logout() {
      this.isAuthenticated = false
      this.user = {
        name: '',
        networkUser: '',
        profilePic: '',
        role: ''
      }
      this.token = null
      localStorage.removeItem('auth')
      localStorage.removeItem('token')
    },
    checkAuth() {
      const auth = JSON.parse(localStorage.getItem('auth'))
      if (auth) {
        this.isAuthenticated = auth.isAuthenticated
        this.user = auth.user
        this.token = auth.token
      } else {
        this.logout()
      }
    }
  }
})