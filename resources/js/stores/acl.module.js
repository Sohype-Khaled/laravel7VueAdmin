import UserService from "@/js/services/user.service";
export const acl = {
    namespaced: true,
    state: {
        permissions: []
    },
    getters: {
        checkPermission: state => permission => {
            return state.permissions.includes(permission)
        },
        getPermissionsLength(state) {
            return state.permissions.length;
        }
    },
    mutations: {
        setPermissions(state, permissions) {
            state.permissions = permissions;
        }
    },
    actions: {
        fetchPermissions({ commit }) {
            UserService.getPermissions(). then(res => {
                commit('setPermissions', res.data);
            });
        }
    }
};
