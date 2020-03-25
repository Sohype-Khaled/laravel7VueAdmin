import Vue from 'vue';
import Vuex from 'vuex';
import {auth} from '@/js/stores/auth.module';
import {acl} from '@/js/stores/acl.module';
import {admins} from '@/js/stores/admins.module';
import {roles} from '@/js/stores/roles.module';
import {permissions} from '@/js/stores/permissions.module';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        snackbar: {
            show: false,
            color: '',
            message: '',
            timeout: 2000
        }
    },
    getters: {},
    mutations: {
        toggleLoading(state) {
            state.loading = !state.loading;
        },
        fireSnackbar(state, options) {
            state.snackbar.show = true;
            for (let option in options)
                if (options.hasOwnProperty(option))
                    state.snackbar[option] = options[option];
        }
    },
    actions: {},
    modules: {
        auth,
        acl,
        admins,
        roles,
        permissions
    }
})
