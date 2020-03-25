import Vue from 'vue';
import Router from 'vue-router';
import store from '@/js/stores/index';
import {TokenService} from '@/js/services/storage.service';

import ACLRoutes from "@/js/routes/ACLRoutes";
import AdminsRoutes from "@/js/routes/AdminsRoutes";
import AuthRoutes from "@/js/routes/AuthRoutes";

Vue.use(Router);

const router = new Router({
    base: '/admin',
    mode: 'history',
    routes: [
        ...AuthRoutes,
        {
            path: '/',
            name: 'home',
            component: require('@/js/pages/Home').default
        },
        ...AdminsRoutes,
        ...ACLRoutes,
        {
            path: '/unauthorized',
            name: '403',
            component: require('@/js/pages/404.vue').default
        },
        {
            path: '*',
            name: '404',
            component: require('@/js/pages/404.vue').default
        },
    ]
});


router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
    const loggedIn = !!TokenService.getToken();

    if (!isPublic && !loggedIn) {
        return next({
            path:'/login',
            query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
        });
    }

    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next('/')
    }

    if (store.getters['acl/getPermissionsLength'] <= 0)
        store.dispatch('acl/fetchPermissions');

    next();
});

export default router;
