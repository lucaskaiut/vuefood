<template>
    <div>
        <!-- login -->
        <div class="d-flex justify-content-center h-100 my-5">
            <div class="user_card">
                <div class="d-flex justify-content-center">
                    <div class="brand_logo_container">
                        <img src="@/assets/imgs/vue-food.png" class="brand_logo" alt="Logo">
                    </div>
                </div>
                <div class="d-flex justify-content-center form_container">
                    <form @submit.prevent="loginClient">
                        <div class="text-danger" v-if="errors.email != ''">
                            {{ errors.email[0] || '' }}
                        </div>
                        <div class="input-group">
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                            </div>
                            <input type="email" v-model="formData.email" name="email" class="form-control input_user" value="" placeholder="E-mail">
                        </div>
                        <div class="text-danger" v-if="errors.password != ''">
                            {{ errors.password[0] || '' }}
                        </div>
                        <div class="input-group">
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" v-model="formData.password" name="password" class="form-control input_pass" value="" placeholder="Senha">
                        </div>
                        <div class="d-flex justify-content-center mt-3 login_container">
                            <button type="submit" name="button" class="btn login_btn" :disabled="loading">
                                <span v-if="loading">Cadastrando...</span>
                                <span v-else>Cadastrar</span>
                            </button>
                        </div>
                    </form>
                </div>

                <div class="mt-4">
                    <div class="d-flex justify-content-center links">
                        Não tem uma conta? <router-link class="ml-2" :to="{name: 'register'}">Cadastre-se!</router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- login-->
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';

    export default {
        computed: {
            deviceName() {
                return navigator.appCodeName + '-' + navigator.appName + '-' + navigator.platForm + '-' + this.formData.email
            }
        },

        data() {
            return {
                loading: false,
                formData: {
                    email: '',
                    password: '',
                },
                errors: {
                    email: '',
                    password: ''
                }
            }
        },

        methods: {
            ...mapActions([
                'login'
            ]),

            loginClient() {
                this.resetErrorMessages();

                this.loading = true;

                const params = {
                    device_name: this.deviceName,
                    ...this.formData
                };

                this.login(params)
                    .then(response => {
                        this.$vToastify.success('Autenticação realizada com sucesso', 'Sucesso!');

                        this.$router.push({ name: 'home' });
                    })
                    .catch(error => {
                        const errorResponse = error.response;

                        if(errorResponse.status === 422){
                            this.errors = Object.assign(this.errors, errorResponse.data.errors);

                            this.$vToastify.error('Dados inválidos', 'Erro');

                            setTimeout(() => this.resetErrorMessages(), 4000);

                            return;
                        }

                        this.$vToastify.error('Problema ao efetuar o login. Tente novamente mais tarde');
                    })
                    .finally(() => this.loading = false)
            },

            resetErrorMessages() {
                this.errors = {
                    email: '',
                    password: ''
                }
            }
        }
    }
</script>