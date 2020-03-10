import Vue from 'vue';
import Vuex from 'vuex';
import {auth} from '@/js/stores/auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
    },
    getters: {},
    mutations: {
        toggleLoading(state) {
            state.loading = !state.loading;
        }
    },
    actions: {},
    modules: {
        auth: auth
    }
})
