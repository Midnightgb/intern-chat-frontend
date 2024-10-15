// src/stores/user/currentUserStore.js

import { defineStore } from 'pinia';

export const useCurrentUserStore = defineStore('currentUserStore', {
  state: () => ({
    currentUserId: null,
    currentUserRole: null,
  }),
  actions: {
    updateCurrentUser(id) {
      this.currentUserId = id;
    },
    clearCurrentUser() {
      this.currentUserId = null;
      this.currentUserRole = null;
    },
    updateCurrentUserRole(role) {
      this.currentUserRole = role; 
    },
    initializeFromAuth(user) {
      if (user) {
        this.currentUserId = user.id;
        this.currentUserRole = user.role;
      }
    }
  },
});
