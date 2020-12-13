import axios from 'axios'

const RESOURCE = 'tenants';

const actions = {
    getCompanies ({ commit }) {
        commit('SET_PRELOADER', true);
        return axios.get(`${RESOURCE}`).then(response => commit('SET_COMPANY', response.data)).finally(() => commit('SET_PRELOADER', false));
    }
};

export default actions