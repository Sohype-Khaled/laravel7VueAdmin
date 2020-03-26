import Vue from 'vue';
import Vuex from 'vuex';
import {layout} from '@/js/stores/layout.module';
import {auth} from '@/js/stores/auth.module';
import {acl} from '@/js/stores/acl.module';
import {admins} from '@/js/stores/admins.module';
import {roles} from '@/js/stores/roles.module';
import {permissions} from '@/js/stores/permissions.module';
import {messages} from '@/js/stores/messages.module';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        layout,
        messages,
        auth,
        acl,
        admins,
        roles,
        permissions
    }
})
