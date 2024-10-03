// src/stores/channelStore.js
import { defineStore } from 'pinia'
import { getChannels } from '@services/api'

const CACHE_EXPIRATION = 5 * 60 * 1000 // 5 minutos en milisegundos

export const useChannelStore = defineStore('channel', {
  state: () => ({
    channels: [],
    loading: false,
    error: null,
    lastFetchTime: null
  }),
  getters: {
    isInitialized: (state) => state.channels.length > 0 || state.error !== null
  },
  actions: {
    async fetchChannelsIfNeeded() {
      if (this.shouldFetchChannels()) {
        const showLoading = false
        await this.fetchChannels(showLoading)
      }
    },
    shouldFetchChannels() {
      if (!this.lastFetchTime) return true
      const now = new Date().getTime()
      return now - this.lastFetchTime > CACHE_EXPIRATION
    },
    async fetchChannels(showLoading) {
      this.loading = showLoading
      this.error = null
      try {
        const response = await getChannels()
        this.channels = response.data
        this.lastFetchTime = new Date().getTime()
      } catch (err) {
        if (err.response && err.response.status === 403) {
          this.error = 'Acceso denegado. Verifica tus credenciales.'
        } else {
          this.error = 'Ocurrió un error al obtener los canales.'
        }
        console.error('Error fetching channels:', err)
      } finally {
        this.loading = false
      }
    },
    initializeStore() {
      if (this.shouldFetchChannels()) {
        const showLoading = true
        this.fetchChannels(showLoading)
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'channel_store',
        storage: localStorage
      }
    ]
  }
})
