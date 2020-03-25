import RoleService from '@/js/services/roles.service';
import {tableActions, tableGetters, tableMutations, tableState} from "@/js/stores/datatable";

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
        createRole({commit}, payload) {
            return RoleService.createRole(payload);
        },
        getRole(context, id) {
            return RoleService.getRole(id);
        },
        updateRole(context, payload) {
            return RoleService.updateRole(payload.id, payload.value);
        }
    }
};
