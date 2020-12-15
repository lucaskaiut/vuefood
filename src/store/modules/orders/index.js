import axios from 'axios'
import { TOKEN_NAME } from "@/config/api";

export default {
    state: {
        myOrders: {
            data: []
        }
    },

    mutations: {
        SET_ORDERS (state, orders) {
            state.myOrders = orders
        },

        SET_ORDER (state, order) {
            state.myOrders.data = order;
        }
    },

    actions: {
        getMyOrders ({ commit }) {
            const token = localStorage.getItem(TOKEN_NAME);

            if(!token) Promise.reject();

            commit('SET_PRELOADER', true);
            commit('SET_TEXT_PRELOADER', 'Carregando pedidos, por favor aguarde.');

            return axios.get('auth/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                commit('SET_ORDERS', response.data)
            })
            .finally(() => commit('SET_PRELOADER', false))
        },

        getOrderByIdentify({ commit }, identify) {
            commit('SET_PRELOADER', true);
            commit('SET_TEXT_PRELOADER', 'Carregando os dados do pedido, por favor aguarde');

            return axios.get(`order?identify=${identify}`).finally(() => commit('SET_PRELOADER', false))
        }
    },
}