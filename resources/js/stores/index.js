import Vue from 'vue';
import Vuex from 'vuex';
import {auth} from '@/js/stores/auth.module';
import {admins} from '@/js/stores/admins.module';

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
        admins
    }
})