<template>
    <v-row justify="center">
        <v-col cols="8">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                <v-form @submit.prevent="submit">
                    <v-card class="elevation-12">
                        <v-toolbar dark flat>
                            <v-toolbar-title>Create Role</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <ValidationProvider v-slot="{ errors }" name="name">
                                <v-text-field v-model="form.name" label="Name" :error-messages="errors"/>
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors }" name="permissions">
                                <permissions v-model="form.permissions" name="permissions" :error-messages="errors"/>
                            </ValidationProvider>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="submit">
                                Submit
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </ValidationObserver>
        </v-col>
    </v-row>
</template>

<script>
    import permissions from "@/js/components/permissions/permissions";
    import {ValidationProvider, ValidationObserver} from 'vee-validate';
    import {mapActions} from 'vuex';
    import {handle422Error} from "@/js/helpers/FormHandlers";
    import {Snackbar} from "@/js/helpers/Messages";

    export default {
        name: "create",
        components: {
            ValidationProvider, ValidationObserver, permissions
        },
        data() {
            return {
                form: {
                    name: '',
                    permissions: []
                }
            }
        },
        methods: {
            ...mapActions('roles', ["createRole"]),
            submit() {
                this.createRole(this.form).then(res => {
                    Snackbar({
                        message: res.data.msg,
                    })
                }).catch(error => {
                    if (error.response.status === 422) {
                        let errors = handle422Error(error)
                        console.log(errors)
                        this.$refs.form.setErrors(errors);
                    } else {
                        Snackbar({
                            message: error.response.data.message
                        });
                    }
                });
            }
        },
        mounted() {
            eventBus.$on('permissions:changed', (payload) => {
                this.form.permissions = payload;
            });
        }
    }
</script>

<style scoped>

</style>
