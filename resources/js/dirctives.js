import Vue from 'vue';

Vue.directive('can', {
    bind(el, binding, vnode) {
        console.log(vnode.context.$store.state.auth.permissions)
    },
    inserted (el, binding, vnode) {
        console.log(vnode.context.$store.state.auth.permissions)
    }
});
