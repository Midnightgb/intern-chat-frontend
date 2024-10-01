// src/constants/apiEndpoints.js
const SOCKET_URL = 'https://intern-chat-backend-production-uy3j.onrender.com';
//const SOCKET_URL = 'http://localhost:3000';
const BASE_URL = `${SOCKET_URL}/collaborative_chat`;
const BASE_USER = `${BASE_URL}/user`;
const BASE_AUTH = `${BASE_URL}/auth`;
const BASE_PRIVILEGE = `${BASE_URL}/user_permission`;
const BASE_MESSAGE = `${BASE_URL}/direct_message`;
const BASE_CHANNEL = `${BASE_URL}/channel`;

export const API_ENDPOINTS = {

  // Socket
  SOCKET_URL,
  
  // Autenticación
  LOGIN: `${BASE_AUTH}/login`,
  LOGOUT: `${BASE_AUTH}/logout`,

  // Usuarios
  GET_USERS: `${BASE_USER}/users`,
  GET_USER_BY_ID: `${BASE_USER}/find_user/:id`,
  GET_USER_BY_NAME: `${BASE_USER}/find_user_name/:network_user`,
  CREATE_USER: `${BASE_USER}/create_user`,
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

  // Historial
  MAKE_HISTORY: `${BASE_URL}/history/create_history`,

  // Mensajes
  GET_CONVERSATIONS: `${BASE_MESSAGE}/conversations`,
  CREATE_CONVERSATION: `${BASE_MESSAGE}/create_conversation`,
  GET_MESSAGES_CONVERSATION: `${BASE_MESSAGE}/message_conversation`,
  DELETE_CONVERSATION: `${BASE_MESSAGE}/delete_conversation/:id`,
  UPDATE_CONVERSATION: `${BASE_MESSAGE}/update_conversation`,

  // Canales
  GET_CHANNELS: `${BASE_CHANNEL}/channels`,
  GET_USERS_CHANNEL: `${BASE_CHANNEL}/user_channels/:id`,
  GET_MESSAGES_CHANNEL: `${BASE_CHANNEL}/messages_channel/:id`,
  CREATE_CHANNEL: `${BASE_CHANNEL}/create_channel`,
  INSERT_USERS_CHANNEL: `${BASE_CHANNEL}/insert_users_channel`,
  DELETE_CHANNEL: `${BASE_CHANNEL}/delete_channel/:id`,
  UPDATE_CHANNEL: `${BASE_CHANNEL}/update_channel`,
  SEND_MESSAGE: `${BASE_CHANNEL}/send_message`,
  UPDATE_MESSAGE: `${BASE_CHANNEL}/update_message`,
  DELETE_MESSAGE: `${BASE_CHANNEL}/delete_message`,
};