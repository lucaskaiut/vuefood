export default {

    state: {
        products: []
    },

    mutations: {
        ADD_PRODUCT_CART(state, product) {
            state.products.push({
                quantity: 1,
                productUuid: product.uuid,
                product,
            });
        },

        REMOVE_PRODUCT(state, product) {
            state.products = state.products.filter((cartProduct, index) => {
                return cartProduct.uuid !== product.uuid
            })
        },


        INCREMENT_QUANTITY(state, product) {
            state.products = state.products.map((cartProduct, index) => {
                if(cartProduct.productUuid === product.uuid){
                    state.products[index].quantity++
                }

                return state.products[index]
            })
        },

        DECREMENT_QUANTITY(state, product) {
            state.products = state.products.filter((cartProduct, index) => {
                if(cartProduct.uuid === product.uuid){
                    state.products[index].quantity--
                }

                if(state.products[index].quantity > 0){
                    return state.products[index]
                }
            })
        },

        CLEAR_CART(state) {
            state.products = []
        }
    },

}