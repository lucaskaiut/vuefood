const mutations = {
    SET_COMPANIES (state, companies) {
        state.items = companies
    },
    SET_COMPANY_SELECTED (state, company) {
        state.companySelected = Object.assign(state.companySelected, company);
    },
    SET_COMPANY_SELECTED_CATEGORIES (state, categories) {
        state.companySelected.categories = categories;
    },
    SET_COMPANY_SELECTED_PRODUCTS (state, products) {
        state.companySelected.products = products;
    }
};

export default mutations