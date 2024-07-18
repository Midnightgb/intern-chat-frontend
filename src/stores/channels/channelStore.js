// src/stores/channelStore.js
import { defineStore } from 'pinia';
import { getChannels } from '@/services/api';

export const useChannelStore = defineStore('channel', {
  state: () => ({
    channels: [],
    loading: true,
    error: null,
    initialized: false,   
  }),
  actions: { 
    async fetchChannelsIfNeeded() {
      if (!this.initialized) {
        try {
          console.log('Fetching channels');
          const response = await getChannels();
          this.channels = response.data;
          this.initialized = true; 
        } catch (err) {
          if (err.response && err.response.status === 403) {
            this.error = 'Acceso denegado. Verifica tus credenciales.';
          } else {
            this.error = 'Ocurrió un error al obtener los servidores.';
          }
          console.error('Error fetching channels:', err);
        } finally {
          this.loading = false;
        }
      } else {
        console.log('Channels already fetched');
        this.loading = false;
      }
    },
  },
});
