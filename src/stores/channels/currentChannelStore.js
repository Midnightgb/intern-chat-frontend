// src/stores/currentChannelStore.js
import { defineStore } from 'pinia';

export const useCurrentChannelStore = defineStore('currentChannel', {
  state: () => ({
    currentChannelId: null,
    currentChannelName: null,
  }),
  actions: {
    setCurrentChannelId(id) {
      this.currentChannelId = id;
    },
    setCurrentChannelName(name) {
      this.currentChannelName = name
    }
  },
});
