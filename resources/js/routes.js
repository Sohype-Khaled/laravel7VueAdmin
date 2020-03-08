import Vue from 'vue';
import Router from 'vue-router';
import { TokenService } from '@/js/services/storage.service';

Vue.use(Router);

const router = new Router({
    base: '/admin',
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            meta: {
                layout: 'login',
                public: true,
                onlyWhenLoggedOut: true
            },
            component: require('@/js/pages/auth/Login').default
        },
        {
            path: '/password/reset',
            name: 'passwordReset',
            meta: {
                layout: 'login',
                public: true,
                onlyWhenLoggedOut: true
            },
            component: require('@/js/pages/auth/ResetPassword').default
        },
        {
            path: '/',
            name: 'home',
            component: require('@/js/pages/Home')
        },
        {
            path: '/about',
            name: 'about',
            component: require('@/js/pages/About')
        },
        {
            path: '*',
            name: '404',
            component: require('@/js/pages/404.vue')
        }
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

    next();
});

export default router;
