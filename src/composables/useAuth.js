// src/composables/useAuth.js
import { ref, reactive } from 'vue'

export function useAuth() {
  const isAuthenticated = ref(false)
  const user = reactive({
    name: '',
    networkUser: '',
    profilePic: '',
    role: ''
  })
  const setUser = (userData) => {
    isAuthenticated.value = true
    Object.assign(user, userData)
  }

  const clearUser = () => {
    isAuthenticated.value = false
    Object.keys(user).forEach(key => {
      user[key] = ''
    })
  }

  const login = (userData) => {
    setUser(userData)
    console.log('DATOS RECIBIDOS', userData);
  }

  const logout = () => {
    clearUser()
    localStorage.removeItem('token')
  }

  return {
    isAuthenticated,
    user,
    login,
    logout
  }
}