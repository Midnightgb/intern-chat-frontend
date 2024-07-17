// src/stores/channels/channelStore.js
import { defineStore } from 'pinia';
import { getChannels } from '@/services/api';

export const useChannelStore = defineStore('channel', {
  state: () => ({
    channels: [],
    loading: true,
    error: null,
  }),
  actions: {
    async fetchChannels() {
      try {
        const response = await getChannels();
        this.channels = response.data;
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
    },
  },
});
