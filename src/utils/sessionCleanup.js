// src/utils/sessionCleanup.js

import { useAuthStore } from '@/stores/auth'
import { useChannelStore } from '@/stores/channels/channelStore'
import { useMessageStore } from '@/stores/messages/messageStore'
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore'

export function cleanupSession() {
  const authStore = useAuthStore()
  const channelStore = useChannelStore()
  const messageStore = useMessageStore()
  const currentChannelStore = useCurrentChannelStore()

  // Limpiar la cookie de sesión
  authStore.clearSessionCookie()

  // Restablecer todos los stores
  authStore.$reset()
  channelStore.$reset()
  messageStore.$reset()
  currentChannelStore.$reset()

  // Limpiar el localStorage
  localStorage.clear()
}