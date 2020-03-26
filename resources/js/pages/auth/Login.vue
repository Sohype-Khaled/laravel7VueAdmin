<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="4">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                <v-form @submit.prevent="handleSubmit(onSubmit)">
                    <v-card class="elevation-12">
                        <v-toolbar flat class="d-flex justify-center">
                            <v-toolbar-title>Login</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <ValidationProvider v-slot="{ errors }" name="username" rules="required">
                                <v-text-field label="username" v-model="email" placeholder="E-mail Address" outlined
                                              prepend-icon="person" type="email" :error-messages="errors"/>
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors }" name="password" rules="required">
                                <v-text-field label="Password" v-model="password" placeholder="Password" outlined
                                              prepend-icon="lock" type="password" :error-messages="errors"/>
                            </ValidationProvider>
                        </v-card-text>
                        <v-card-actions>
                            <router-link :to="{name:'passwordReset'}"
                                         text
                                         color="deep-purple accent-4"
                            >
                                Forgot your Password
                            </router-link>
                            <v-spacer/>
                            <v-btn type="submit" color="primary">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </ValidationObserver>
        </v-col>
    </v-row>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    import {ValidationProvider, ValidationObserver} from 'vee-validate';
    import "@/js/helpers/ValidationRules"

    export default {
        name: "Login",
        components: {
            ValidationProvider, ValidationObserver
        },
        data() {
            return {
                email: '',
                password: ''
            }
        },
        computed: {
            ...mapGetters('auth', ['authenticating', 'authenticationError', 'authenticationErrorCode'])
        },
        methods: {
            ...mapActions("auth", ["login"]),
            onSubmit() {
                if (this.email !== '' && this.password !== '') {
                    this.login({email: this.email, password: this.password});
                    this.password = "";
                }
            }

        }
    }
</script>

<style scoped>

</style>
