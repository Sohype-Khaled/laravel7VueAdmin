import {ACLService} from "@/js/services/storage.service";

export default function CanMiddleware({to, next}) {
    let value = true,
        permissions = Array.isArray(to.meta.permission) ? to.meta.permission : [to.meta.permission];
    for (let permission of permissions) {
            value = value && ACLService.getPermissions().indexOf(permission) !== -1;
    }
    if (!value)
        return next('/403');
    return next();
}
