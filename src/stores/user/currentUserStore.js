// src/stores/user/currentUserStore.js

import { defineStore } from 'pinia';

export const useCurrentUserStore = defineStore('currentUserStore', {
  state: () => ({
    currentUserId: null,
  }),
  actions: {
    updateCurrentUser(id) {
      this.currentUserId = id;
    },
    clearCurrentUser() {
      this.currentUserId = null;
    }
  },
});
