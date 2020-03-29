import {TokenService} from '@/js/services/storage.service';

export default function authMiddleware({to, next}) {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
    const loggedIn = !!TokenService.getToken();

    if (!isPublic && !loggedIn) {
        return next({
            path:'/login',
            query: {redirect: to.fullPath}
        });
    }

    if (loggedIn && onlyWhenLoggedOut) {
        return next('/')
    }
    return next();
}
