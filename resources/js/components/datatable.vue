<template>
    <v-card raised>
        <v-data-table
            :loading="loading"
            loading-text="Loading... Please wait"
            :headers="table.headers"
            :items="table.items"
            :server-items-length="table.totalItems"
            :footer-props.pagination="table.pagination"
            class="elevation-1"

            :options.sync="options"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn v-model="dialog" v-on="on" small icon>
                                <v-icon>filter_list</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-text>
                                <v-container>
                                    <slot name="filters"/>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer/>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text>Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="console.log('grgrgrgrg')"> mdi-pencil</v-icon>
                <v-icon small @click="console.log('jere')"> mdi-delete</v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>

    export default {
        name: "datatable",
        props: ['table'],
        data() {
            return {
                loading: false,
                dialog: false,
                options: {},
                footer: {

                },
            };
        },
        computed: {
            pagination: {
                get() {
                    return this.table.pagination;
                },
                set(value) {
                    console.log(value)
                }
            }
        },
        created() {
            // this.getData();
        },
        watch: {
            options: {
                handler(val) {
                    // this.getData(val.page)
                },
                deep: true,
            },
        },
        methods: {
            close() {
                this.dialog = false;
            },
        }
    }
</script>

<style scoped>

</style>
