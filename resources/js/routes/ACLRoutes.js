import Empty from "@/js/pages/EmpRouterView";
import Listing from "@/js/pages/ACL/listing";
import Create from "@/js/pages/ACL/create";
import Edit from "@/js/pages/ACL/edit";
import Details from "@/js/pages/ACL/details";

import Middleware from "@/js/routes/middleware/index";

export default [
    {
        path: '/acl',
        component: Empty,
        children: [
            {
                path: '',
                name: 'acl',
                component: Listing,
                meta: {
                    permission: 'roles.index',
                    middleware: [
                        Middleware.AuthMiddleware,
                        Middleware.ACLMiddleware,
                        Middleware.CanMiddleware
                    ]
                },
            },
            {
                path: 'create',
                name: 'acl.create',
                component: Create,
                meta: {
                    permission: 'roles.store',
                    middleware: [
                        Middleware.AuthMiddleware,
                        Middleware.ACLMiddleware,
                        Middleware.CanMiddleware
                    ]
                },
            },
            {
                path: ':id/edit',
                name: 'acl.edit',
                component: Edit,
                meta: {
                    permission: 'roles.update',
                    middleware: [
                        Middleware.AuthMiddleware,
                        Middleware.ACLMiddleware,
                        Middleware.CanMiddleware
                    ]
                },
            },
            {
                path: ':id',
                name: 'acl.details',
                component: Details,
                meta: {
                    permission: 'roles.show',
                    middleware: [
                        Middleware.AuthMiddleware,
                        Middleware.ACLMiddleware,
                        Middleware.CanMiddleware
                    ]
                },
            },
        ]
    },
]
