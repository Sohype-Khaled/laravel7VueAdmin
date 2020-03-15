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
            >
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" > mdi-pencil</v-icon>
                    <v-icon small @click="deleteAdmin(item)"> mdi-delete</v-icon>
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
                options: {},
                selected: [],
            }
        },
        components: {
            datatable
        },
        watch:{
            options: {
                handler (value) {
                    this.getListing(value)
                },
                deep: true,
            },
        },
        computed: {
            ...mapGetters('admins', ['listing']),
        },
        methods: {
            ...mapActions('admins', [
                'fetchAdminsList'
            ]),
            getListing(filters) {
                this.loading = true;
                this.fetchAdminsList(filters).then(res => {
                    this.loading = false;
                });

            },
            deleteAdmin(admin) {
                console.log('delete Admin', admin);
            }
        },
        created() {
            this.getListing()
        }
    }
</script>

<style scoped>

</style>
