import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        authToken: null
    }),
    actions: {
        loadUser() {
            // Load user from localStorage when app starts
            this.user = JSON.parse(localStorage.getItem('user')) || null;
            this.authToken = localStorage.getItem('authToken') || null;
        },
        setUser(userData, token) {
            this.user = userData;
            this.authToken = token;
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('authToken', token);
        },
        updateUser(userData) {
            this.user = userData;
            localStorage.setItem('user', JSON.stringify(userData));
        },
        logout() {
            this.user = null;
            this.authToken = null;
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
        }
    }
});
