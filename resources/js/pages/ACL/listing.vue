<template>
    <v-row>
        <v-col cols="12">
            <v-data-table
                :loading="loading"
                loading-text="Loading... Please wait"
                :headers="listing.headers"
                :items="listing.items"
                :server-items-length="listing.totalItems"
                :options.sync="options"
                class="elevation-1"
                multi-sort
                show-select
                v-model="selected"
                :footer-props="footerProps"
                v-can="'admins.index'"
            >
                <template v-slot:top>
                    <v-toolbar flat class="accent">
                        <v-toolbar-title>Roles</v-toolbar-title>
                        <v-spacer/>
                        <template v-if="mainToolBar">
                            <v-btn class="ma-1" icon @click="toggleFilters">
                                <v-icon dark>filter_list</v-icon>
                            </v-btn>
                            <v-btn class="ma-1" icon :to="{name: 'acl.create'}">
                                <v-icon dark>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <template v-if="bulkActions">
                            <v-btn class="ma-1" icon>
                                <v-icon dark>mdi-delete</v-icon>
                            </v-btn>
                        </template>

                        <template v-if="filters.active">
                            <v-form ref="filter" @submit.prevent="submitFilters" class="ml-auto">
                                <v-row align="center" justify="end">
                                    <v-text-field dense v-model="filters.search" append-icon="search" label="Search"
                                                  single-line
                                    />
                                    <v-btn icon @click="toggleFilters">
                                        <v-icon dark>cancel</v-icon>
                                    </v-btn>
                                </v-row>
                            </v-form>
                        </template>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn v-can.disable="'roles.update'" class="ma-1" icon
                           :to="{name: 'acl.edit', params:{id: item.id}}">
                        <v-icon small dark>mdi-pencil</v-icon>
                    </v-btn>
                    <v-icon small v-can.or.disable="'admins.delete'" @click="handleDeleteAdmin(item)"> mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
    import datatable from "@/js/mixins/datatable";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "ACL",
        mixins: [datatable],
        components: {
            datatable
        },
        data() {
            return {
                filters: {
                    active: false,
                    search: ''
                }
            }
        },
        computed: {
            ...mapGetters('roles', ['listing']),
        },
        methods: {
            ...mapActions('roles', [
                'fetchItemsList'
            ]),
            getListing(filters) {
                this.loading = true;
                this.fetchItemsList(filters).then(res => {
                    this.loading = false;
                }).catch(err => console.log(err));
            },
        },
        created() {
            this.getListing()
        }
    }
</script>

<style scoped>

</style>
