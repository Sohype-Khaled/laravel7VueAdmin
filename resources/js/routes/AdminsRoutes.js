import Empty from "@/js/pages/EmpRouterView";
import Listing from '@/js/pages/users/listing';

export default [
    {
        path: '/admins',
        component: Empty,
        children:[
            {
                path: '',
                name: 'admins',
                component: Listing
            }
        ]
    },
]
