import Vue from 'vue';
import store from '@/js/stores/index';

Vue.directive('can', {
    inserted(el, binding, vnode) {
        console.log(binding)
        const behaviour = binding.modifiers.disable ? 'disable' : 'hide';
        let can = store.getters['acl/checkPermission'](binding.value);
        if (!can) {
            if (behaviour === 'hide') {
                console.log(vnode, )
                vnode.elm.parentElement.removeChild(vnode.elm)
            } else if (behaviour === 'disable') {
                el.disabled = 'disabled';
                el.classList.add('v-icon--disabled')
            }
        }
    }
});


