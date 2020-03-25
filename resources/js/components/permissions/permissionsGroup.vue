<template>
    <v-col cols="12">
        <v-checkbox class="pb-0 mt-0 subtitle-1 font-weight-medium"
                    hide-details
                    :error="hasError"
                    v-model="isGroupSelected"
                    :indeterminate="indeterminate"
                    :label="name"/>
        <v-row justify="start">
            <v-col cols="12" sm="4" md="3" class="py-0" v-for="item in items"
                   :key="name+'-'+item">
                <v-checkbox class="mt-1"
                            hide-details
                            ripple
                            :error="hasError"
                            v-model="selected"
                            :label="item"
                            :value="name+ '.' + item"/>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
    export default {
        name: "permissionsGroup",
        props: ['items', 'name', 'allSelected', 'allIndeterminate', 'hasError', 'selectedPermissions'],
        computed: {
            selected: {
                get() {
                    return this.selectedPermissions
                },
                set(value) {
                    eventBus.$emit('permissions:group-changed', {group: this.name, value});
                }
            },
            indeterminate() {
                return this.selected.length < this.items.length && this.selected.length > 0;
            },
            isGroupSelected: {
                get() {
                    return this.selected.length === this.items.length
                },
                set(val) {
                    if (val)
                        this.selected = _.map(this.items, item => {
                            return this.name + '.' + item
                        });
                    else
                        this.selected = [];
                }
            }
        },
        watch: {
            allSelected(value) {
                if (value && this.allIndeterminate === false)
                    this.isGroupSelected = value;
                else if (!value && this.allIndeterminate === false)
                    this.selected = [];
                else if (value && this.allIndeterminate)
                    this.isGroupSelected = value;
            },
        },
        /*mounted() {
            eventBus.on('permissions:allSelected', payload => {
                if (payload)
                    this.isGroupSelected = value;
                else
                    this.selected = []
            });
        }*/
    }
</script>

<style scoped>

</style>
