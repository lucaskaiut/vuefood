<template>
    <div>
        <!-- About Tenant and Categories -->
        <h1 class="my-4 title-tenant text-center">{{ company.name }}</h1>
        <div class="row">
            <div class="list-categories">
                <a href="#" class="list-categories__item"
                   @click.prevent="filterByCategory('')">
                    <div class="icon">
                        <i class="fas fa-pizza-slice"></i>
                    </div>
                    <span style="text-align: center;"> Todas </span>
                </a>
                <a href="#" class="list-categories__item"
                   v-for="(category, index) in company.categories.data" :key="index"
                   @click.prevent="filterByCategory(category)">
                    <div class="icon">
                        <i class="fas fa-pizza-slice"></i>
                    </div>
                    <span style="text-align: center;"> {{ category.name }} </span>
                </a>
            </div>
        </div>
        <!-- Cards Produtos -->
        <div class="row my-4">

            <div v-if="company.products.data.length === 0">
                Nenhum produto disponível para a categoria selecionada.
            </div>

            <div class="col-lg-4 col-md-6 mb-4" v-for="(product, index) in company.products.data" :key="index">
                <div class="card--flat h-100">
                    <a href="#">
                        <div class="card-image">
                            <img class="card-img-top" :src="product.image" :alt="product.name">
                        </div>
                    </a>
                    <div class="card-body">
                        <h4 class="card-title">
                            <a href="#">{{ product.name }}</a>
                        </h4>
                        <h5>{{ product.price }}</h5>
                        <p class="card-text">{{ product.description }}</p>
                    </div>
                    <div class="card-footer card-footer-custom">
                        <a href="" class="card-footer card-footer-custom"
                        @click.prevent="addProductInCart(product)">
                            Adicionar no Carrinho <i class="fas fa-cart-plus"></i>
                        </a>
                    </div>
                </div>
            </div>



        </div>
        <!-- /.row -->
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'

    export default {
        created() {
            if(this.company.name == '') {
                return this.$router.push({name: 'home'});
            }

            this.getCategoriesByCompany(this.company.uuid).catch(response => this.$vToastify.error('Algo deu errado, tente novamente mais tarde'));

            this.loadProducts();

        },

        data (){
            return {
                filters: {
                    category: ''
                }
            }
        },

        computed: {
            ...mapState({
                company: state => state.companies.companySelected,
                productsCart: state => state.cart.products,
            })
        },

        methods: {
            ...mapActions([
                'getCategoriesByCompany',
                'getProductsByCompany'
            ]),

            ...mapMutations({
                addProductCart: 'ADD_PRODUCT_CART',
                incrementQuantity: 'INCREMENT_QUANTITY'
            }),

            addProductInCart(product) {
                let inCart = this.isProductInCart(product);

                if(inCart){
                    this.incrementQuantity(product)
                } else {
                    this.addProductCart(product);
                }

                this.$vToastify.success('Produto adicionado com sucesso', 'Sucesso');
            },

            isProductInCart(product) {
                let inCart = false;

                this.productsCart.map((cartProduct, index) => {
                    if(cartProduct.identify === product.uuid){
                        inCart = true;
                    }
                });

                return inCart;
            },

            loadProducts() {
                const params = {
                    company_token: this.company.uuid
                };

                if(this.filters.category){
                    params.categories = [
                        this.filters.category
                    ]
                }

                this.getProductsByCompany(params).catch(response => this.$vToastify.error('Algo deu errado, tente novamente mais tarde'));
            },

            filterByCategory(category) {
                this.filters.category = category.url;

                this.loadProducts();
            },
        }
    }
</script>