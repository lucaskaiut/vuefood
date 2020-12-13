import axios from 'axios'

const RESOURCE = 'tenants';

const actions = {
    getCompanies ({ commit }) {
        commit('SET_PRELOADER', true);
        return axios.get(`${RESOURCE}`)
            .then(response => commit('SET_COMPANIES', response.data))
            .finally(() => commit('SET_PRELOADER', false));
    },
    getCategoriesByCompany ({ commit }, company_token) {
        commit('SET_PRELOADER', true);

        const params = { company_token };

        return axios.get(`${RESOURCE}/categories`, { params })
            .then(response => commit('SET_COMPANY_SELECTED_CATEGORIES', response.data))
            .finally(() => commit('SET_PRELOADER', false));
    },

    getProductsByCompany ({ commit }, params) {
        commit('SET_PRELOADER', true);

        return axios.get(`${RESOURCE}/products`, { params })
            .then(response => commit('SET_COMPANY_SELECTED_PRODUCTS', response.data))
            .finally(() => commit('SET_PRELOADER', false));
    }
};

export default actions