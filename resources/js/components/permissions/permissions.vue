<template>
    <v-row>
        <v-col cols="12">
            <v-checkbox
                v-model="allSelected"
                :hide-details="!hasError"
                :indeterminate="indeterminate"
                :error-messages="errorMessages"
                label="Permissions"/>
        </v-col>
        <permissions-group
            v-for="(items, name, idx) in permissions"
            :key="name+'-'+idx"
            :items="items"
            :name="name"
            :has-error="hasError"
            :all-selected="allSelected"
            :all-indeterminate="indeterminate"
            :selected-permissions="selectedPermissions[name] "
        />
    </v-row>
</template>

<script>
    import permissionsGroup from "@/js/components/permissions/permissionsGroup";
    import {mapGetters} from "vuex";

    export default {
        name: "permissions",
        props: ['value', 'errorMessages'],
        components: {
            permissionsGroup
        },
        computed: {
            ...mapGetters('permissions', ["permissions"]),
            hasError() {
                return this.errorMessages.length > 0;
            },
            selectedPermissions() {
                let permissions = {};
                for (let permission of Object.keys(this.permissions))
                    permissions[permission] = [];
                for (let permission of this.value)
                    permissions[permission.split('.')[0]].push(permission);
                return permissions;
            },
            indeterminate() {
                return this.getFlatPermissions().length > this.value.length && this.value.length > 0;
            },
            allSelected: {
                get() {
                    return this.getFlatPermissions().length === this.value.length;
                },
                set(value) {
                    let permissions = value ? this.getFlatPermissions() : [];
                    eventBus.$emit('permissions:changed', permissions)
                }
            }
        },
        methods: {
            getFlatPermissions(permissions = {...this.permissions}) {
                return _.flatten(_.values(_.map(permissions, (group, name) => _.map(group, permission => name + '.' + permission)
                )));
            }
        },
        mounted() {
            eventBus.$on('permissions:group-changed', (payload) => {
                let permissions = {...this.selectedPermissions};
                permissions[payload.group] = payload.value;
                permissions = [].concat(..._.values(permissions));
                eventBus.$emit('permissions:changed', permissions)
            });
        }
    }
</script>

<style scoped>

</style>
