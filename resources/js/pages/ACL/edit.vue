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
        name: "edit",
        beforeRouteEnter(to, from, next) {
            next(vm => vm.getRoleInstance());
        },
        beforeRouteUpdate(to, from, next) {
            this.role = {};
            this.form = {
                name: '',
                permissions: [],
                _method: 'PUT'
            };
            this.getRoleInstance().then(() => next())
        },
        components: {
            ValidationProvider, ValidationObserver, permissions
        },
        data() {
            return {
                role: {},
                form: {
                    name: '',
                    permissions: [],
                    _method: 'PUT'
                }
            }
        },
        methods: {
            ...mapActions('roles', ["updateRole", "getRole"]),
            getRoleInstance() {
                this.getRole(this.$route.params.id).then(res => {
                    let response = res.data.data;
                    this.role = response;
                    this.form.name = response.name;
                    this.form.permissions = _.map(response.permissions, permission => permission.name)
                })
            },
            setRole(error, role) {
                let response = role.data.data;
                this.role = response;
                this.form.name = response.name;
                this.form.permissions = _.map(response.permissions, permission => permission.name)
            },
            submit() {
                this.updateRole({id: this.role.id, value: this.form}).then(res => {
                    Snackbar({
                        message: res.data.msg,
                    });
                    this.getRoleInstance()
                }).catch(error => {
                    if (error.response.status === 422) {
                        let errors = handle422Error(error);
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
            })
        },
    }
</script>

<style scoped>

</style>
