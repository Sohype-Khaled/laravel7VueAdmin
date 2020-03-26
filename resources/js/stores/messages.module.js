export const messages = {
    namespaced: true,
    state: {
        snackbar: {
            show: false,
            alignX: 'right',
            alignY: 'bottom',
            mode: '',
            absolute: false,
            color: '',
            message: '',
            timeout: 2000,
        },
        dialog: {
            show: false,
            title: '',
            message: '',
            onSubmit: ''
        }
    },
    getters: {
        getSnackbar: (state) => state.snackbar,
        getDialog: (state) => state.dialog
    },
    mutations: {
        fireSnackbar(state, options) {
            state.snackbar.show = true;
            for (let option in options)
                if (options.hasOwnProperty(option))
                    state.snackbar[option] = options[option];
        },
        fireDialog(state, options) {
            state.dialog.show = true;
            for (let option in options)
                if (options.hasOwnProperty(option))
                    state.dialog[option] = options[option];
        },
        closeDialog(state) {
            state.dialog.show = false;
            state.dialog.title= '';
            state.dialog.message= '';
            state.dialog.onSubmit= '';
        }
    },
    actions: {}
};
