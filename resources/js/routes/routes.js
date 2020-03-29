import Vue from 'vue';
import Router from 'vue-router';
import AuthMiddleware from "@/js/routes/middleware/AuthMiddleware";


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
            component: require('@/js/pages/Home').default,
            meta: {
                middleware: [AuthMiddleware]
            }
        },
        ...AdminsRoutes,
        ...ACLRoutes,
        {
            path: '/unauthorized',
            name: '403',
            component: require('@/js/pages/404.vue').default,
            meta: {
                middleware: [AuthMiddleware]
            }
        },
        {
            path: '*',
            name: '404',
            component: require('@/js/pages/404.vue').default,
            meta: {
                middleware: [AuthMiddleware]
            }
        },
    ]
});

function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    if (!subsequentMiddleware) {
        return context.next;
    }
    return (...parameters) => {
        context.next(...parameters);
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({...context, next: nextMiddleware})
    }
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware],
            context = {from, next, router, to},
            nextMiddleware = nextFactory(context, middleware, 1);
        return  middleware[0]({...context, next: nextMiddleware})
    }
    next();
});

export default router;
