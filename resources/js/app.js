import Vue from 'vue';
import Vuetify from 'vuetify';
import router from '@/js/routes.js';

import Default from '@/js/layouts/Default';
import Login from '@/js/layouts/Login';
import ApiService from '@/js/services/api.service';
import { TokenService } from '@/js/services/storage.service';
import store from '@/js/stores/index';
Vue.use(Vuetify);

Vue.component('default-layout', Default);
Vue.component('login-layout', Login);

Vue.config.productionTip = false;

// Set the base URL of the API
ApiService.init('/');

// If token exists set header
if (TokenService.getToken()) {
    ApiService.setHeader();
}

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify: new Vuetify(),
});
