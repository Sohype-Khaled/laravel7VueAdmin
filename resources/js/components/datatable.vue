<template>
    <v-card raised>
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
                        <v-form ref="filter" @submit.prevent="submitFilters" class="ml-auto">
                            <v-row align="center" justify="end">
                                <v-text-field dense v-model="filtersForm.search" append-icon="search" label="Search"
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
                <v-icon small v-can.disable="'admins.update'" class="mr-2"  @click="updateItem(item)"> mdi-pencil</v-icon>
                <v-icon small v-can.or.disable="'admins.delete'" @click="handleDeleteAdmin(item)"> mdi-delete</v-icon>
            </template>
            <template v-slot:item.is_active="{ item }">
                <v-chip>{{ item.is_active ? 'Active' : 'Inactive'}} {{item.is_active}}</v-chip>
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

            };
        },
    }
</script>

<style scoped>

</style>
