export const layout = {
    namespaced: true,
    state: {
        sidebar: {
            status: true,
            list: [
                {
                    text: 'Admins',
                    to: {name: 'admins'},
                    icon: 'person'
                },
                {
                    text: 'Access Control List',
                    to: {name: 'acl'},
                    icon: 'lock'
                },
            ]
        }
    },
    getters: {
        isSidebarOpen(state) {
            return state.sidebar.status;
        },
        getSidebar(state) {
            return state.sidebar.list;
        }
    },
    actions: {
        toggleSidebar({state}) {

            state.sidebar.status = !state.sidebar.status;
        }
    },
    mutations: {}
};
