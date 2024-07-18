  // src/stores/channelStore.js
  import { defineStore } from 'pinia';
  import { getChannels } from '@/services/api';

  const CACHE_KEY = 'channels_cache';
  const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutos en milisegundos

  export const useChannelStore = defineStore('channel', {
    state: () => ({
      channels: [],
      loading: false,
      error: null,
      lastFetchTime: null,
    }),
    getters: {
      isInitialized: (state) => state.channels.length > 0 || state.error !== null,
    },
    actions: {
      async fetchChannelsIfNeeded() {
        if (this.shouldFetchChannels()) {
          await this.fetchChannels();
        }
      },
      shouldFetchChannels() {
        if (!this.lastFetchTime) return true;
        const now = new Date().getTime();
        return now - this.lastFetchTime > CACHE_EXPIRATION;
      },
      async fetchChannels() {
        this.loading = true;
        this.error = null;
        try {
          console.log('Fetching channels');
          const response = await getChannels();
          this.channels = response.data;
          this.lastFetchTime = new Date().getTime();
          this.saveToLocalStorage();
        } catch (err) {
          if (err.response && err.response.status === 403) {
            this.error = 'Acceso denegado. Verifica tus credenciales.';
          } else {
            this.error = 'Ocurrió un error al obtener los canales.';
          }
          console.error('Error fetching channels:', err);
        } finally {
          this.loading = false;
        }
      },
      saveToLocalStorage() {
        const dataToSave = {
          channels: this.channels,
          lastFetchTime: this.lastFetchTime,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(dataToSave));
      },
      loadFromLocalStorage() {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { channels, lastFetchTime } = JSON.parse(cachedData);
          this.channels = channels;
          this.lastFetchTime = lastFetchTime;
        }
      },
      initializeStore() {
        this.loadFromLocalStorage();
        if (this.shouldFetchChannels()) {
          this.fetchChannels();
        }
      },
    },
  });