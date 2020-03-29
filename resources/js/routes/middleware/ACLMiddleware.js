import store from '@/js/stores/index';

export default function ACLMiddleware({next}) {
    if (store.getters['acl/getPermissionsLength'] <= 0)
        store.dispatch('acl/fetchPermissions');

    if (_.isEmpty(store.getters['acl/getUser']))
        store.dispatch('acl/fetchUser');

    return next();
}
