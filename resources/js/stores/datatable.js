export const tableMutations = {
    saveItemsList(state, payload) {
        state.datatable.items = [...payload.data];
        state.datatable.pagination.page = payload.meta['current_page'];
        state.datatable.pagination.rowsPerPage = payload.meta['per_page'];
        state.datatable.totalItems = payload.meta['total'];
    },
};

export const tableState = {
    items: [],
    pagination: {
        page: 1,
        rowsPerPage: 10,
    },
    totalItems: 0
};

export const tableActions = {
    prepareQueryString(filters = null) {
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
        return query
    }
};

export const tableGetters = {
    listing(state) {
        return state.datatable
    },
};
