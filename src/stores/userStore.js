import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        authToken: localStorage.getItem('authToken') || null
    }),
    actions: {
        setUser(userData, token) {
            this.user = userData;
            this.authToken = token;
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('authToken', token);
        },
        logout() {
            this.user = null;
            this.authToken = null;
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
        }
    }
});
