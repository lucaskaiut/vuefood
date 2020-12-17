<template>
    <div>
        <div class="row my-4 mx-0 details">
            <div class="col-12 mb-2">
                <h1 class="title-tenant h2">Detalhes do Pedido <strong>{{ identify }}</strong></h1>
            </div>
            <div class="col-sm-6">
                <ul class="p-0">
                    <li><b>Número:</b> {{ identify }}</li>
                    <li><b>Total:</b> R$ {{ order.total | formatprice }}</li>
                    <li><b>Data:</b> {{ order.date_added | formatdate }}</li>
                    <li><b>Status:</b> <span class="badge bg-success text-light p-2">{{ order.status }}</span></li>
                </ul>
            </div>
            <div class="col-sm-6">
                <ul class="p-0">
                    <li v-if="order.table.name">
                        <span>Mesa</span>
                        <ul class="p-0">
                            <li><b>Identificador:</b> {{ order.table.name }}</li>
                            <li><b>Descrição:</b> {{ order.table.description }}</li>
                        </ul>
                    </li>
                    <li v-if="order.client.name">
                        <span>Cliente</span>
                        <ul class="p-0">
                            <li><b>Nome:</b> {{ order.client.name }}</li>
                            <li><b>E-mail:</b> {{ order.client.email }}</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div> <!-- details order -->

        <hr>

        <div class="row my-4">
            <div class="col-12">
                <h4>Produtos</h4>
            </div>

            <div class="col-12 col-md-6 col-lg-4 my-1" v-for="(product, index) in order.products" :key="index">
                <div class="details-card">
                    <a href="#"><img class="card-img-top" :src="product.image" :alt="product.name"></a>
                    <div class="details-card-body">
                        <h5>{{ product.name }}</h5>
                        <p><b>R${{ product.price | formatprice }}</b></p>
                    </div>
                </div>
            </div>

        </div>
        <!-- products order -->

        <!-- Evaluations -->
        <button class="btn btn-outline-success" @click.prevent="openModal('order-evaluation')" v-if="order.evaluations.length === 0">
            Avaliar o pedido
        </button>

        <div class="col-12" v-if="order.evaluations.length > 0">
            <h3>Avaliações</h3>
            <div v-for="(evaluation, index) in order.evaluations" :key="index">
                <vue-stars
                        name="evaluation"
                        :active-color="'#ffdd00'"
                        :inactive-color="'#999999'"
                        :shadow-color="'#ffff00'"
                        :hover-color="'#dddd00'"
                        :max="5"
                        :readonly="true"
                        :value="evaluation.stars"
                        :char="'★'"
                />
                <p>{{ evaluation.comment }}</p>
                <hr/>
            </div>
        </div>

        <modal name="order-evaluation" :height="350" draggable>
            <div class="px-md-5 my-4">
                <h1>Avaliar o Pedido {{ identify }}</h1>
                <strong>Nota: </strong>
                <vue-stars
                        name="evaluation"
                        :active-color="'#ffdd00'"
                        :inactive-color="'#999999'"
                        :shadow-color="'#ffff00'"
                        :hover-color="'#dddd00'"
                        :max="5"
                        :char="'★'"
                        v-model="evaluation.stars"
                />
                <div class="form-group">
                    <label>Comentário</label>
                    <textarea class="form-control" name="comment" cols="30" rows="3" placeholder="Comentário (opcional)" v-model="evaluation.comment"></textarea>
                </div>
            <button class="btn btn-outline-success float-right"
                    @click.prevent="sendEvaluation"
                    :disabled="loadEvaluation">
                <i v-if="loadEvaluation" class="fas fa-spinner fa-spin"></i>
                <i v-else class="far fa-save"></i>
            </button>
            </div>
        </modal>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        props: ['identify'],

        created(){
            if(this.me.name === ''){
                return this.$router.push({name: 'home'});
            }

            this.getOrderByIdentify(this.identify)
                .then(response => {
                    this.order = Object.assign(this.order, response.data.data);

                    if(this.order.client.email !== this.me.email){
                        this.$vToastify.error('Erro ao recuperar dados do pedido.', 'Erro');

                        this.$router.push({name: 'home'})
                    }
                })
                .catch(error => {
                    this.$vToastify.error('Erro ao recuperar dados do pedido.', 'Erro');

                    this.$router.push({name: 'home'})
                });
        },

        computed: {
            ...mapState({
                me: state => state.auth.me
            })
        },

        data() {
            return {
                order: {
                    identify: '',
                    date_added: '',
                    status: '',
                    total: '',
                    client: {
                        email: '',
                        name: '',
                        uuid: '',
                    },
                    table: {
                        uuid: '',
                        name: '',
                        description: '',
                    },
                    company: {
                        email: '',
                        logo: '',
                        name: '',
                        url: '',
                        uuid: '',
                    },
                    products: [],
                    evaluations: [],
                },
                evaluation: {
                    stars: 1,
                    comment: ''
                },
                loadEvaluation: false
            }
        },

        methods: {
            ...mapActions([
                'getOrderByIdentify',
                'orderEvaluation'
            ]),

            openModal(modalName){
                this.$modal.show(modalName);
            },

            closeModal(modalName){
                this.$modal.hide(modalName)
            },

            sendEvaluation(){
                this.loadEvaluation = true;

                const params = {
                    identify: this.identify,
                    ...this.evaluation
                };

                this.orderEvaluation(params)
                    .then(response => {
                        this.$vToastify.success('Avaliação enviada com sucesso', 'Parabéns!');
                        this.order.evaluations.push(response.data.data);
                        this.closeModal('order-evaluation')
                    })
                    .catch(error => this.$vToastify.error('Erro ao enviar os dados. Tente novamente mais tarde.', 'Erro'))
                    .finally(() => this.loadEvaluation = false)
            }
        }
    }
</script>