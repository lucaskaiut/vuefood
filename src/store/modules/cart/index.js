export default {

    state: {
        products: []
    },

    mutations: {
        ADD_PRODUCT_CART(state, product) {
            state.products.push({
                quantity: 1,
                identify: product.uuid,
                product,
            });
        },

        REMOVE_PRODUCT(state, product) {
            state.products = state.products.filter((cartProduct, index) => {
                return cartProduct.identify !== product.uuid
            })
        },


        INCREMENT_QUANTITY(state, product) {
            state.products = state.products.map((cartProduct, index) => {
                if(cartProduct.identify === product.uuid){
                    state.products[index].quantity++
                }

                return state.products[index]
            })
        },

        DECREMENT_QUANTITY(state, product) {
            state.products = state.products.filter((cartProduct, index) => {
                if(cartProduct.identify === product.uuid){
                    if(state.products[index].quantity > 1){
                        state.products[index].quantity--
                    }
                }

                return state.products[index]

            })
        },

        CLEAR_CART(state) {
            state.products = []
        }
    },

}