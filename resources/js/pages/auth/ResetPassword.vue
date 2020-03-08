<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Reset Password</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form @submit.prevent="">
                        <v-text-field label="Email" v-model="email" prepend-icon="person" type="email"/>
                    </v-form>
                </v-card-text>
                <v-card-actions>

                    <v-spacer/>
                    <v-btn color="primary" @click="handleSubmit">Send Reset Email</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "ResetPassword",
        data() {
            return {
                email: ''
            }
        },
        methods:{
            ...mapActions('auth', [
                'sendResetEmail'
            ]),

            handleSubmit () {
                this.sendResetEmail(this.email);
            }
        }
    }
</script>

<style scoped>

</style>
