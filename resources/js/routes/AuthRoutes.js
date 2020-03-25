import Login from "@/js/pages/auth/Login";
import ResetPassword from "@/js/pages/auth/ResetPassword";

export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            public: true,
            onlyWhenLoggedOut: true
        },
        component: Login
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
