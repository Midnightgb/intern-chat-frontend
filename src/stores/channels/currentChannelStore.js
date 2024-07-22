// src/stores/currentChannelStore.js
import { defineStore } from 'pinia';

export const useCurrentChannelStore = defineStore('currentChannel', {
  state: () => ({
    currentChannelId: null,
  }),
  actions: {
    setCurrentChannelId(id) {
      this.currentChannelId = id;
    },
  },
});
