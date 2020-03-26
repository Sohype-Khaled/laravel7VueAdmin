import UserService from "@/js/services/user.service";
import {ACLService} from "@/js/services/storage.service";

export const acl = {
    namespaced: true,
    state: {
        permissions: [],
        user: {},
    },
    getters: {
        checkPermission: state => permission => {
            return state.permissions.includes(permission)
        },
        getPermissionsLength(state) {
            return state.permissions.length;
        },
        getUser(state) {
            return state.user;
        }
    },
    mutations: {
        setPermissions(state, permissions) {
            state.permissions = permissions;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        fetchPermissions({commit}) {
            UserService.getPermissions().then(res => {
                commit('setPermissions', res.data);
                ACLService.savePermissions(res.data);
                ACLService.getPermissionsLength();
            });
        },
        fetchUser({commit}) {
            UserService.getUserData().then(res => {
                commit('setUser', res.data.data);
            })
        }
    }
};
