import { defineStore } from 'pinia';

export const useCurrentChannelStore = defineStore('currentChannel', {
  state: () => ({
    currentChannelId: null,
    currentChannelName: '',
  }),
  actions: {
    updateCurrentChannel(id, name) {
      this.currentChannelId = id;
      this.currentChannelName = name;
    },
    clearCurrentChannel() {
      this.currentChannelId = null;
      this.currentChannelName = null;
    }
  },
});
