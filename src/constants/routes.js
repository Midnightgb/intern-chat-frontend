// src/constants/routes.js

export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  LOGIN: '/inicio-sesion',
  LOGOUT: '/cerrar-sesion',

  // Rutas privadas
  DASHBOARD: '/panel',

  // Rutas usuario
  USERS: '/usuarios',
  USER: '/usuarios/:id',
  USER_ADD: '/usuarios/agregar',
  USER_EDIT: '/usuarios/editar/:id',
  USER_DELETE: '/usuarios/eliminar/:id',


  // Rutas roles
  ROLES: '/roles',

  // Rutas permisos
  PERMISSIONS: '/permisos',

  // Rutas historial
  HISTORY: '/historial',

  // Rutas mensajes
  CONVERSATIONS: '/mensajes',
  CONVERSATION: '/mensajes/:id',
  CONVERSATION_ADD: '/mensajes/agregar',
  CONVERSATION_EDIT: '/mensajes/editar/:id',
  CONVERSATION_DELETE: '/mensajes/eliminar/:id',

  // Rutas canales
  CHANNELS: '/canales',
  CHANNEL: '/canales/:id',
  CHANNEL_ADD: '/canales/agregar',
  CHANNEL_EDIT: '/canales/editar/:id',
  CHANNEL_DELETE: '/canales/eliminar/:id',
};