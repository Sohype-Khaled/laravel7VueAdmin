import Vue from 'vue';
import Vuetify from 'vuetify';
import router from '@/js/routes.js';

import Default from '@/js/layouts/Default';
import Login from '@/js/layouts/Login';
import App from '@/js/App';
import ApiService from '@/js/services/api.service';
import {TokenService} from '@/js/services/storage.service';
import store from '@/js/stores/index';

const vuetifyOpts = {
    rtl: false,
    theme: {
        // dark: true,
        themes: {
            dark: {
                primary: '#21CFF3',
                accent: '#FF4081',
                secondary: '#ffe18d',
                success: '#4CAF50',
                info: '#2196F3',
                warning: '#FB8C00',
                error: '#FF5252'
            },
            light: {
                primary: '#3f51b5',
                secondary: '#607d8b',
                accent: '#009688',
                error: '#f44336',
                warning: '#ff5722',
                info: '#03a9f4',
                success: '#4caf50'
            }
        }
    }
};

Vue.use(Vuetify, {
    theme: {
        primary: '#3f51b5',
        secondary: '#607d8b',
        accent: '#009688',
        error: '#f44336',
        warning: '#ff5722',
        info: '#03a9f4',
        success: '#4caf50'

    }
});

Vue.component('default-layout', Default);
Vue.component('login-layout', Login);
Vue.component('App', App);

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
    vuetify: new Vuetify(vuetifyOpts),
});
/*
* {
    theme: {
        primary: '#3f51b5',
        secondary: '#607d8b',
        accent: '#009688',
        error: '#f44336',
        warning: '#ff5722',
        info: '#03a9f4',
        success: '#4caf50'
    },
}
* */
