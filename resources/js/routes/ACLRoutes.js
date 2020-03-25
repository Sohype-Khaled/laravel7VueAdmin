import Empty from "@/js/pages/EmpRouterView";
import Listing from "@/js/pages/ACL/listing";
import Create from "@/js/pages/ACL/create";
import Edit from "@/js/pages/ACL/edit";
import Details from "@/js/pages/ACL/details";

export default [
    {
        path: '/acl',
        component: Empty,
        children:[
            {
                path: '',
                name: 'acl',
                component: Listing
            },
            {
                path: 'create',
                name: 'acl.create',
                component: Create
            },
            {
                path: ':id/edit',
                name: 'acl.edit',
                component: Edit
            },
            {
                path: ':id',
                name: 'acl.details',
                component: Details
            },
        ]
    },
]
