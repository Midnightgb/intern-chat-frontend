// src/utils/sessionCleanup.js

import { useAuthStore } from '@stores/auth'
import { useChannelStore } from '@stores/channels/channelStore'
import { useMessageStore } from '@stores/messages/messageStore'
import { useCurrentChannelStore } from '@stores/channels/currentChannelStore'

export function cleanupSession() {
  const authStore = useAuthStore()
  const channelStore = useChannelStore()
  const messageStore = useMessageStore()
  const currentChannelStore = useCurrentChannelStore()

  // Retrieve the current theme
  const currentTheme = localStorage.getItem('userTheme')

  // Clear the session cookie
  authStore.clearSessionCookie()

  // Reset all stores
  authStore.$reset()
  channelStore.$reset()
  messageStore.$reset()
  currentChannelStore.$reset()

  // Clear the localStorage
  localStorage.clear()

  // Set the theme back to localStorage
  if (currentTheme) {
    localStorage.setItem('userTheme', currentTheme)
  }
}
