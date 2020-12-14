import axios from 'axios';

import { TOKEN_NAME } from "@/config/api";

export default {
    state: {
        me: {
            uuid: '',
            name: '',
            email: ''
        },
        authenticated: false,
    },

    mutations: {
        SET_ME (state, me) {
            state.me = me;

            state.authenticated = true;
        },

        SET_AUTHENTICATED (state, status) {
            state.authenticated = status;
        },

        LOGOUT (state) {
            state.me = {
                uuid: '',
                name: '',
                email: ''
            };

            state.authenticated = false;
        }
    },

    actions: {
        register ({ commit }, params) {
            return axios.post('client/create', params);
        },

        login ({ commit, dispatch }, params) {
            return axios.post('sanctum/token', params)
                .then(response => {
                    const token = response.data.token;

                    localStorage.setItem(TOKEN_NAME, token);

                    dispatch('getMe')
                });
        },

        getMe ({ commit }){
            const token = localStorage.getItem(TOKEN_NAME);

            if(!token) return;

            return axios.get('me', {
                headers: {
                    Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            })
            .then(response => {
                commit('SET_ME', response.data.data);
            })
            .catch(error => localStorage.removeItem(TOKEN_NAME))
        }
    }
}