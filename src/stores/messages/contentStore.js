// src/stores/user/currentContentStore.js

import { defineStore } from 'pinia';
import { getUsersChannels } from '@services/api';

export const useCurrentContentStore = defineStore('currentContentStore', {
    state: () => ({
        currentContentChannelId: null,
        currentContentType: null,
        currentContentName: null,
        currentContentPhoto: null,
        currentContentMessage: null,
        currentContentUsers: [],
        loading: false, // Nuevo estado para la carga
    }),
    actions: {
        async getUsersChannel(channelId) {
            this.loading = true; // Activa el estado de carga
            try {
                const response = await getUsersChannels(channelId);
                console.log('Response from API:', response); // Aquí puedes verificar lo que devuelve tu API
                if (response.data && response.data.length > 0) {
                    this.updateCurrentContentMessage(response.data.length);
                    this.clearCurrentContentUsers();
                    this.updateCurrentContentUsers(response.data);
                    console.log("usuarios actuales", this.currentContentUsers);
                    
                } else {
                    console.warn('No users found for this channel.'); // Mensaje de advertencia si no se encuentran usuarios
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                this.loading = false; // Desactiva el estado de carga
            }
        },
        updateCurrentContentChannelId(channelId) {
            this.currentContentChannelId = channelId;
        },
        updateCurrentContent(name, photo, type) {
            this.currentContentName = name;
            this.currentContentPhoto = photo;
            this.currentContentType = type;
        },
        updateCurrentContentMessage(message) {
            this.currentContentMessage = message;
        },
        updateCurrentContentUsers(users) {
            this.currentContentUsers = users;
        },
        clearCurrentContent() {
            this.currentContentName = null;
            this.currentContentPhoto = null;
        },
        clearCurrentContentUsers() {
            this.currentContentUsers = [];
        },
        clearCurrentContentMessage() {
            this.currentContentMessage = null;
        },
        clearCurrentContentChannelId() {
            this.currentContentChannelId = null;
        }
    },
});
