// src/constants/routes.js

export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Rutas autenticadas
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  // Rutas de funcionalidades específicas
  MESSAGES: '/messages',

  // Rutas anidadas
  USER_DETAILS: '/users/:id',
  MESSAGE_THREAD: '/messages/:threadId',

};