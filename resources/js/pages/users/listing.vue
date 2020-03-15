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
                @update:options=""
                class="elevation-1"
                multi-sort
                show-select
                v-model="selected"
                :footer-props="footerProps"
            >
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Admins</v-toolbar-title>
                        <v-spacer/>
                        <template v-if="mainToolBar">
                            <v-btn class="ma-1" icon @click="toggleFilters">
                                <v-icon dark>filter_list</v-icon>
                            </v-btn>
                            <v-btn class="ma-1" icon>
                                <v-icon dark>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <template v-if="bulkActions">
                            <v-btn class="ma-1" icon>
                                <v-icon dark>mdi-delete</v-icon>
                            </v-btn>
                        </template>

                        <template v-if="filtersForm.active">
                            <v-form @submit.prevent="submitFilters" class="ml-auto">
                                <v-text-field dense v-model="filtersForm.search" append-icon="search" label="Search"
                                              single-line
                                />
                            </v-form>
                            <v-btn class="ma-1" icon @click="toggleFilters">
                                <v-icon dark>cancel</v-icon>
                            </v-btn>
                        </template>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2"> mdi-pencil</v-icon>
                    <v-icon small @click="handleDeleteAdmin(item)"> mdi-delete</v-icon>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
    import datatable from "@/js/components/datatable";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "listing",
        data() {
            return {
                loading: false,
                options: {
                    search: ''
                },
                selected: [],
                mainToolBar: true,
                bulkActions: false,
                filtersForm: {
                    active: false,
                    search: '',
                },
                footerProps: {
                    itemsPerPageOptions: [5, 10, 15]
                }
            }
        },
        components: {
            datatable
        },
        watch: {
            options: {
                handler(value) {
                    this.getListing(value)
                },
                deep: true,
            },
            selected(val) {
                if (val.length > 0) {
                    this.bulkActions = true;
                    this.mainToolBar = false;
                    this.filtersForm.active = false;
                } else {
                    this.mainToolBar = true;
                    this.bulkActions = false;
                    this.filtersForm.active = false;
                }
            }
        },
        computed: {
            ...mapGetters('admins', ['listing']),
        },
        methods: {
            ...mapActions('admins', [
                'fetchAdminsList', 'deleteAdmin'
            ]),
            submitFilters() {
                this.options.search = this.filtersForm.search;
            },
            getListing(filters) {
                this.loading = true;
                this.fetchAdminsList(filters).then(res => {
                    this.loading = false;
                });

            },
            toggleMainToolbar() {
                this.mainToolBar = !this.mainToolBar;
            },
            toggleFilters() {
                this.toggleMainToolbar();
                this.filtersForm.active = !this.filtersForm.active;
            },
            handleDeleteAdmin(admin) {
                this.loading = true;
                this.deleteAdmin(admin.id).then(res => {
                    this.loading = false;
                    // alert here
                    this.getListing(this.options);
                });
            }
        },
        created() {
            this.getListing()
        }
    }
</script>

<style scoped>

</style>
