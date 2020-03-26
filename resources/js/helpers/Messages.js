import store from '@/js/stores/index';

export function Snackbar(options) {
    store.commit('messages/fireSnackbar', options)
}

export function Dialog(options) {
    store.commit('messages/fireDialog', options)
}

