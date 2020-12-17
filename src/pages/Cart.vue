<template>
    <div>
        <!-- cart -->
        <div class="card shopping-cart my-4 ">
            <div class="card-header text-light">
                <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>
                Carrinho de Compras
                <router-link class="btn bnt-sm btn-comprando" :to="{ name: 'home' }">Continuar Comprando</router-link>
                <a href="" @click.prevent="clear()" class="btn bnt-sm btn-comprando">Limpar Carrinho</a>
                <div class="clearfix"></div>
            </div>
            <div class="card-body">
                <!-- PRODUCT -->
                <div v-for="(product, index) in this.products" :key="index">
                    <div class="row align-items-center py-2">
                        <div class="col-4 text-center">
                            <div class="img-circle">
                                <img class="img-responsive" :src="product.product.image" :alt="product.product.name" width="120" height="80">
                            </div>
                        </div>
                        <div class="col-8 text-left">
                            <h4 class="product-name"><strong>{{ product.product.name }}</strong></h4>
                            <h5 class="h6">{{ product.product.description }}</h5>
                            <div class="d-flex py-4 justify-content-between align-items-center">
                                <div class="col-10 d-flex align-items-center p-0 ">
                                    <h6><strong>R$ {{ product.product.price | formatprice }} <span class="text-muted">x</span></strong></h6>
                                    <div class="quantity ml-4">
                                        <input type="button" value="+" class="plus" @click.prevent="increment(product.product)">
                                        <input type="number" step="1" max="99" min="1" :value="product.quantity" title="Qty" class="qty"
                                               size="4">
                                        <input type="button" value="-" class="minus" @click.prevent="decrement(product.product)">
                                    </div>
                                </div>
                                <div class="col-2 col-sm-2 col-md-2 text-right">
                                    <button @click.prevent="removeProduct(product.product)"
                                            type="button" class="btn btn-outline-danger btn-xs">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="cart-price text-red">
                    Preço Total: <b>R$ {{ this.cartTotal | formatprice }}</b>
                </div>
            </div>
            <!-- end card body -->
                <Checkout />
        </div>
        <!-- cart-->
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import Checkout from "./_partials/Checkout";

    export default {
        mounted() {
            this.redirectIfEmpty()
        },

        computed: {
            ...mapState({
                products: state => state.cart.products,
            }),

            cartTotal() {
                let total = 0;

                this.products.map((item, index) => {
                     total += item.quantity * item.product.price;
                });

                return total;
            }
        },

        methods: {
            ...mapMutations({
                removeProductCart: 'REMOVE_PRODUCT',
                incrementProduct: 'INCREMENT_QUANTITY',
                decrementProduct: 'DECREMENT_QUANTITY',
                clearCart: 'CLEAR_CART'
            }),

            removeProduct(product) {
               this.removeProductCart(product);

                this.redirectIfEmpty();
            },

            increment(product){
                this.incrementProduct(product);
            },

            decrement(product){
                this.decrementProduct(product);

                this.redirectIfEmpty();
            },

            clear(){
                this.clearCart();

                this.$router.push('/');

                this.$vToastify.error('Carrinho vazio', 'Seu carrinho está vazio!');
            },

            isCartEmpty(){
                if(this.products.length === 0){
                    return true;
                } else {
                    return false;
                }
            },

            redirectIfEmpty(){
                if(this.isCartEmpty()){
                    this.$router.push('/');

                    this.$vToastify.error('Carrinho vazio', 'Seu carrinho está vazio!');
                }
            }
        },

        components: {
            Checkout
        }
    }
</script>