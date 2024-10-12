// src/constants/apiEndpoints.js
//const SOCKET_URL = 'https://intern-chat-backend-production-uy3j.onrender.com';
const SOCKET_URL = 'http://localhost:3000';
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
  LOGIN: `${BASE_AUTH}/login`, // ready
  LOGOUT: `${BASE_AUTH}/logout`, // ready

  // Usuarios
  GET_USERS: `${BASE_USER}/users`, // ready
  GET_USER_BY_ID: `${BASE_USER}/find_user/:id`, // not ready
  GET_USER_BY_NAME: `${BASE_USER}/find_user_name/:network_user`, // ready
  CREATE_USER: `${BASE_USER}/create_user`, // ready
  DELETE_USER: `${BASE_USER}/delete_user`, // ready
  UPDATE_USER: `${BASE_USER}/update_user/:id`, // not ready

  // Permisos
  GET_PRIVILEGES: `${BASE_PRIVILEGE}/find_user_permission`, // ready
  ASSIGN_PRIVILEGE: `${BASE_PRIVILEGE}/assign_permission/`, // not ready
  UPDATE_PRIVILEGE: `${BASE_PRIVILEGE}/update_user_permission/:id`, // not ready
  DELETE_PRIVILEGE: `${BASE_PRIVILEGE}/delete_user_permission/`, // not ready

  // Roles Global
  GET_ROLES: `${BASE_URL}/role/roles`, // not ready

  // Permisos	Global
  GET_GLOBAL_PRIVILEGES: `${BASE_URL}/permission/permissions`, // not ready

  // Historial
  MAKE_HISTORY: `${BASE_URL}/history/create_history`, // not ready

  // Mensajes
  GET_CONVERSATIONS: `${BASE_MESSAGE}/conversations`, // ready
  CREATE_CONVERSATION: `${BASE_MESSAGE}/create_conversation`, // ready
  DELETE_CONVERSATION: `${BASE_MESSAGE}/delete_conversation/:id`, // ready
  UPDATE_CONVERSATION: `${BASE_MESSAGE}/update_conversation`, // ready

  // Canales
  GET_CHANNELS: `${BASE_CHANNEL}/channels`, // ready
  GET_USERS_CHANNEL: `${BASE_CHANNEL}/user_channels/:id`, // not ready
  CREATE_CHANNEL: `${BASE_CHANNEL}/create_channel`, // not ready
  INSERT_USERS_CHANNEL: `${BASE_CHANNEL}/insert_users_channel`, // not ready
  DELETE_CHANNEL: `${BASE_CHANNEL}/delete_channel/:id`, // not ready
  UPDATE_CHANNEL: `${BASE_CHANNEL}/update_channel`, // not ready
  SEND_MESSAGE: `${BASE_CHANNEL}/send_message`, // ready
  UPDATE_MESSAGE: `${BASE_CHANNEL}/update_message`, // ready
  DELETE_MESSAGE: `${BASE_CHANNEL}/delete_message`, // ready

  // total endpoints: 28; 
  //total ready: 12; 
  //total not ready: 16
};