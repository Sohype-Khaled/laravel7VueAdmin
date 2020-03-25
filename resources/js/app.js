import Vue from 'vue';
import router from '@/js/routes/routes.js';
import '@/js/directives';
import ApiService from '@/js/services/api.service';
import {TokenService} from '@/js/services/storage.service';
import store from '@/js/stores/index';
import vuetify from '@/js/vuetify';

import Default from '@/js/layouts/Default';

window._ = require('lodash');
window.eventBus = new Vue();

Vue.component('default-layout', Default);

Vue.config.productionTip = false;

ApiService.init('/'); // Set the base URL of the API

if (TokenService.getToken()) {
    ApiService.setHeader();
}

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify,
});

