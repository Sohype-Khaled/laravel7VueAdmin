<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field label="Email" v-model="email" prepend-icon="person" type="email"/>
                        <v-text-field label="Password" v-model="password" prepend-icon="lock" type="password"/>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <router-link :to="{name:'passwordReset'}"
                        text
                        color="deep-purple accent-4"
                    >
                        Forgot your Password
                    </router-link>
                    <v-spacer/>
                    <v-btn color="primary" @click="handleSubmit">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: ''
            }
        },
        computed: {
            ...mapGetters('auth', [
                'authenticating',
                'authenticationError',
                'authenticationErrorCode'
            ])
        },
        methods: {
            ...mapActions('auth', [
                'login'
            ]),

            handleSubmit() {
                // Perform a simple validation that email and password have been typed in
                if (this.email !== '' && this.password !== '') {
                    this.login({email: this.email, password: this.password});
                    this.password = ""
                }
            }

        }
    }
</script>

<style scoped>

</style>
