import AdminService from '@/js/services/admins.service';

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
            items: [],
            pagination: {
                page: 1,
                rowsPerPage: 10,
            },
            totalItems: 0
        }
    },
    getters: {
        listing(state) {
            return state.datatable
        },
    },
    actions: {
        async fetchAdminsList({commit}, filters = null) {
            let query;
            if (filters) {
                query = "page=" + filters.page + "&per_page=" + filters.itemsPerPage;
                if (filters.sortBy.length > 0) {
                    let sort = "";
                    for (let i = 0; i < filters.sortBy.length; i++) {
                        sort += i < filters.sortBy.length ? "&" : "";
                        sort += "sort[]=" + (filters.sortDesc[i] ? '' : '-') + filters.sortBy[i];
                    }
                    query += sort
                }
                if (filters.search.length > 0)
                    query += '&search=' + filters.search
            } else
                query = "page=1&per_page=10";
            let admins = await AdminService.getAdmins(query);
            commit('saveItemsList', admins.data)
        },
        deleteAdmin({commit}, item) {
            return AdminService.deleteAdmin(item);
        }
    },
    mutations: {
        saveItemsList(state, payload) {
            state.datatable.items = [...payload.data];
            state.datatable.pagination.page = payload.meta['current_page'];
            state.datatable.pagination.rowsPerPage = payload.meta['per_page'];
            state.datatable.totalItems = payload.meta['total'];
        },
    }
};
