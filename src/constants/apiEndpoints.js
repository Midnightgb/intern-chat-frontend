// src/constants/apiEndpoints.js
/* root_router.use('/user',user_routes)
root_router.use('/role',role_routes)
root_router.use('/user_permission',user_permi)
root_router.use('/direct_message',direct_message_routes)
root_router.use('/channel',channel_routes)
root_router.use('/permission',permission_routes)
root_router.use('/history',history)
root_router.use('/auth',auth) */
const BASE_URL = 'https://intern-chat-backend-production.onrender.com/collaborative_chat';
const BASE_USER = `${BASE_URL}/user`;
const BASE_AUTH = `${BASE_URL}/auth`;
const BASE_PRIVILEGE = `${BASE_URL}/user_permission`;

export const API_ENDPOINTS = {

  // Autenticación
  LOGIN: `${BASE_AUTH}/login`,
  LOGOUT: `${BASE_AUTH}/logout`,
  REGISTER: `${BASE_AUTH}/create_user`,

  // Usuarios
  GET_USERS: `${BASE_USER}/users`,
  GET_USER_BY_ID: `${BASE_USER}/find_user/:id`,
  GET_USER_BY_NAME: `${BASE_USER}/find_user_name/:network_user`,
  DELETE_USER: `${BASE_USER}/delete_user/:id`,
  UPDATE_USER: `${BASE_USER}/update_user/:id`,

  // Permisos
  GET_PRIVILEGES: `${BASE_PRIVILEGE}/find_user_permission`,
  ASSIGN_PRIVILEGE: `${BASE_PRIVILEGE}/assign_permission/`,
  UPDATE_PRIVILEGE: `${BASE_PRIVILEGE}/update_user_permission/:id`,
  DELETE_PRIVILEGE: `${BASE_PRIVILEGE}/delete_user_permission/`,

  // Roles Global
  GET_ROLES: `${BASE_URL}/role/roles`,

  // Permisos	Global
  GET_GLOBAL_PRIVILEGES: `${BASE_URL}/permission/permissions`,
};