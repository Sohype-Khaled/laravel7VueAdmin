import store from '@/js/stores/index';

export function Snackbar (options) {
    store.commit('fireSnackbar', options)
}
