import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate";
import { state, mutations } from './default'
import companies from './modules/companies'
import cart from './modules/cart'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        companies,
        cart
    },
    plugins: [createPersistedState()],
    state,
    mutations
});

export default store;