import Empty from "@/js/pages/EmpRouterView";
import Listing from '@/js/pages/users/listing';

import Middleware from "@/js/routes/middleware/index";

export default [
    {
        path: '/admins',
        component: Empty,
        children: [
            {
                path: '',
                name: 'admins',
                component: Listing,
                meta: {
                    permission: 'admins.index',
                    middleware: [
                        Middleware.AuthMiddleware,
                        Middleware.ACLMiddleware,
                        Middleware.CanMiddleware
                    ]
                }
            }
        ]
    },
]
