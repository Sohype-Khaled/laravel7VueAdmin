import AdminService from '@/js/services/admins.service';
import {tableMutations, tableState, tableActions, tableGetters} from "@/js/stores/datatable";

export const admins = {
    namespaced: true,
    state: {
        datatable: {
            headers: [
                {text: 'Id', value: 'id', sortable: true},
                {text: 'Name', value: 'name', sortable: true},
                {text: 'Email', value: 'email', sortable: true},
                {text: 'Is Active', value: 'is_active', sortable: true},
                {text: 'Created At', value: 'created_at', sortable: true},
                {text: 'Actions', value: 'actions', sortable: false},
            ],
            ...tableState,
        }
    },
    getters: {
        ...tableGetters
    },
    actions: {
        async fetchAdminsList({commit}, filters = null) {
            let query = tableActions.prepareQueryString(filters);
            let admins = await AdminService.getAdmins(query);
            commit('saveItemsList', admins.data)
        },
        deleteAdmin({commit}, item) {
            return AdminService.deleteAdmin(item);
        }
    },
    mutations: {
        ...tableMutations,
    }
};
