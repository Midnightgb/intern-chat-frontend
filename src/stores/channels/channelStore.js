// src/stores/channelStore.js
import { defineStore } from 'pinia';
import { getChannels } from '@/services/api';

export const useChannelStore = defineStore('channel', {
  state: () => ({
    channels: [],
    loading: true,
    error: null,
    initialized: false, // Flag para saber si los canales ya han sido cargados
  }),
  actions: {
    async fetchChannelsIfNeeded() {
      if (!this.initialized) {
        try {
          const response = await getChannels();
          this.channels = response.data;
          this.initialized = true; // Marcamos que los canales han sido cargados
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
      }
    },
  },
});
