export default {
    data() {
        return {
            loading: false,
            options: {
                search: ''
            },
            selected: [],
            mainToolBar: true,
            bulkActions: false,
            footerProps: {
                itemsPerPageOptions: [5, 10, 15]
            }
        }
    },
    methods: {
        submitFilters() {
            this.options.search = this.filters.search;
        },
        toggleMainToolbar() {
            this.mainToolBar = !this.mainToolBar;
        },
        toggleFilters() {
            this.toggleMainToolbar();
            if (this.filters.active)
                this.$refs.filter.reset();
            this.filters.active = !this.filters.active;
            this.options.search = '';
        },
    }
}
