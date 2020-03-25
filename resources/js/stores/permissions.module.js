export const permissions = {
    namespaced: true,
    state: {
        permissionsList:  {
            'admins': ['index', 'show', 'store', 'update', 'bulkDelete', 'export', 'delete', 'activate', 'deactivate'],
            'roles': ['index', 'show', 'store', 'update', 'bulkDelete', 'delete'],
        },
    },
    getters: {
        permissions(state) {
            return state.permissionsList
        },
    },
    mutations: {},
    actions: {}
};
