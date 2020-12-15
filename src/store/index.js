import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate";
import { state, mutations } from './default'
import companies from './modules/companies'
import cart from './modules/cart'
import auth from './modules/auth'
import orders from './modules/orders'

const persistedData = createPersistedState({
    paths: ['cart', 'companies']
});

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        companies,
        cart,
        auth,
        orders,
    },
    plugins: [persistedData],
    state,
    mutations
});

export default store;