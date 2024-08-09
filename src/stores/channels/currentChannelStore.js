// src/stores/currentChannelStore.js
import { defineStore } from 'pinia';

export const useCurrentChannelStore = defineStore('currentChannelStore', {
  state: () => ({
    currentChannelId: null,
    currentChannelName: '',
  }),
  actions: {
    setCurrentChannelId(id) {
      this.currentChannelId = id;
    },
    setCurrentChannelName(name) {
      this.currentChannelName = name;
    },
  },
});
