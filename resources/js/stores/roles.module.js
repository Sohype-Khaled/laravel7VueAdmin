import RoleService from '@/js/services/roles.service';
import {tableMutations, tableState, tableActions, tableGetters} from "@/js/stores/datatable";

export const roles = {
    namespaced: true,
    state: {
        datatable: {
            headers: [
                {text: 'Id', value: 'id', sortable: true},
                {text: 'Name', value: 'name', sortable: true},
                {text: 'Created At', value: 'created_at', sortable: true},
                {text: 'Actions', value: 'actions', sortable: false},
            ],
            ...tableState
        }
    },
    getters: {
        ...tableGetters
    },
    mutations: {
        ...tableMutations,
    },
    actions: {
        async fetchItemsList({commit}, filters = null) {
            let query = tableActions.prepareQueryString(filters);
            let items = await RoleService.getRoles(query);
            commit('saveItemsList', items.data)
        },
    }
};
