<template>
    <div>
        <div class="my-4">
            <h1 class="title-tenant">Meus Pedidos</h1>
        </div>

        <div class="my-orders my-4">
            <div class="my-table-header mb-4">
                <div class="text-center"><b>Nª Pedido</b></div>
                <div class="text-center"><b>Data</b></div>
                <div class="text-center"><b>Valor Total</b></div>
                <div class="text-center"><b>Detalhes</b></div>
            </div>

            <div class="my-table" v-for="(order, index) in myOrders.data" :key="index">
                <div class="text-center">{{ order.identify }}</div>
                <div class="text-center">{{ order.date_added | formatdate }}</div>
                <div class="text-center">R${{ order.total | formatprice }} </div>
                <div class="text-center"><router-link :to="{name: 'my.order', params: { identify: order.identify }}" class="btn btn-danger">Detalhes</router-link></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        created(){
            if(this.me.name === ''){
                this.$vToastify.error('Você precisa estar logado para visualizar essa página', 'Erro');

                return this.$router.push({name: 'home'});
            }

            this.getMyOrders().catch(_=> this.$vToastify.error('Não foi possível carregar os pedidos, tente novamente mais tarde', 'Erro'));
        },

        computed: {
            ...mapState({
                myOrders: state => state.orders.myOrders,
                me: state => state.auth.me
            })
        },

        methods: {
            ...mapActions([
                'getMyOrders'
            ])
        }
    }
</script>