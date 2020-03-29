import Login from "@/js/pages/auth/Login";
import ResetPassword from "@/js/pages/auth/ResetPassword";

export default [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            public: true,
            onlyWhenLoggedOut: true,
        }
    },
    {
        path: '/password/reset',
        name: 'passwordReset',
        meta: {
            public: true,
            onlyWhenLoggedOut: true
        },
        component: ResetPassword
    },
]
