<template>
    <div>
        <a href="" class="cart-finalizar" @click.prevent="openModal('checkout')">Finalizar</a>

        <modal name="checkout" draggable>
            <div class="px-md-5 my-4">
                <div class="col-12" v-if="me.name !== ''">
                    <p><strong>Total de Produtos:</strong> {{ products.length }}</p>
                    <p><strong>Total:</strong> R${{ cartTotal | formatprice }}</p>
                    <div class="form-group">
                        <label>Comentário</label>
                        <textarea name="comment" cols="30" rows="3" class="form-control" placeholder="Ex: Sem cebola, molho adicional, etc." v-model="comment"></textarea>
                    </div>
                    <button :class="['btn', 'btn-outline-success', {'disabled': sendCheckout}]" :disabled="sendCheckout" @click.prevent="createNewOrder">
                        <span v-if="sendCheckout"><i class="fas fa-spinner fa-spin"></i></span>
                        <span v-else>Finalizar <i class="fas fa-cash-register"></i></span>
                    </button>
                </div>
                <div v-else class="row">
                    <div class="col-6">
                        <p><strong>Total de Produtos:</strong> {{ products.length }}</p>
                        <p><strong>Total:</strong> R${{ cartTotal | formatprice }}</p>
                        <div class="form-group">
                            <label>Comentário</label>
                            <textarea name="comment" cols="30" rows="3" class="form-control" placeholder="Ex: Sem cebola, molho adicional, etc." v-model="comment"></textarea>
                        </div>
                        <button :class="['btn', 'btn-outline-success', {'disabled': sendCheckout}]" :disabled="sendCheckout" @click.prevent="createNewOrder">
                            <span v-if="sendCheckout"><i class="fas fa-spinner fa-spin"></i></span>
                            <span v-else>Finalizar como Visitante <i class="fas fa-cash-register"></i></span>
                        </button>
                    </div>
                    <div class="col-6 d-flex justify-content-center align-items-center">
                        <router-link :to="{name: 'login'}" class="btn btn-outline-primary">Fazer Login <i class="fa fa-user"></i></router-link>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapState({
                products: state => state.cart.products,
                me: state => state.auth.me,
                companySelected: state => state.companies.companySelected
            }),

            cartTotal() {
                let total = 0;

                this.products.map((item, index) => {
                    total += item.quantity * item.product.price;
                });

                return total;
            },
        },

        data() {
            return {
                sendCheckout: false,
                comment: ''
            }
        },

        methods: {
            ...mapActions([
                'createAuthOrder',
                'createOrder'
            ]),

            openModal(modalName){
                this.$modal.show(modalName);
            },
            closeModal(modalName){
                this.$modal.hide(modalName);
            },

            createNewOrder(){
                this.sendCheckout = true;

                const action = this.me.name === '' ? 'createOrder' : 'createAuthOrder';

                let params = {
                    company_token: this.companySelected.uuid,
                    comment: this.comment,
                    products: [
                        ...this.products
                    ]
                };

                this.$store.dispatch(action, params)
                    .then(response => {
                        this.$router.push({name: 'my.order', params: {identify: response.data.identify}});

                        this.$vToastify.success(`Pedido ${response.data.identify} criado com sucesso`, 'Parabéns!')
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.sendCheckout = false;

                        this.closeModal('checkout');
                    })
            }
        }
    }
</script>