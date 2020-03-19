import Vue from 'vue';
import store from '@/js/stores/index';

const {util, FragmentFactory} = Vue
const isArray = Array.isArray
const isProduction = process.env.NODE_ENV !== 'production'

import {ACLService} from "@/js/services/storage.service";

Vue.directive('can', {
    inserted(el, binding, vnode) {
        let can = checkPermissions(binding.value, binding.modifiers.or ? 'or' : 'and');
        if (!can) {
            const behaviour = binding.modifiers.disable ? 'disable' : 'hide';
            if (behaviour === 'hide') {
                vnode.elm.parentElement.removeChild(vnode.elm)
            } else if (behaviour === 'disable') {
                el.disabled = 'disabled';
                el.classList.add('v-icon--disabled')
            }
        }
    }
});

function checkPermissions(permissions, operator = 'and') {
    let value = true;
    permissions = Array.isArray(permissions) ? permissions : [permissions];
    for (let permission of permissions) {
        if (operator === 'or') {
            value = value || ACLService.getPermissions().indexOf(permission) !== -1;
        } else {
            value = value && ACLService.getPermissions().indexOf(permission) !== -1;
        }
    }
    return value
};
