<template>
    <v-app id="sandbox">
        <v-navigation-drawer
            v-model="primaryDrawer.model"
            :clipped="primaryDrawer.clipped"
            :permanent="primaryDrawer.type === 'permanent'"
            :temporary="primaryDrawer.type === 'temporary'"
            app
            overflow
        />

        <v-app-bar
            :clipped-left="primaryDrawer.clipped"
            app
        >
            <v-app-bar-nav-icon
                v-if="primaryDrawer.type !== 'permanent'"
                @click.stop="primaryDrawer.model = !primaryDrawer.model"
            />
            <v-toolbar-title>Vuetify</v-toolbar-title>
            <v-spacer/>
            <v-btn icon @click.stop="right = !right">
                <v-icon>settings</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <v-container fluid>
                <!--                <slot/>-->
            </v-container>
        </v-content>

        <v-navigation-drawer
            v-model="right"
            app
            clipped
            right
            temporary
            overflow>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon>person</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    Profile Settings
                </v-list-item-title>
            </v-list-item>
            <v-list-item @click.stop="$vuetify.theme.dark =  !$vuetify.theme.dark">
                <v-list-item-icon>
                    <v-icon>brightness_4</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Enable Dark Theme</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="logout">
                <v-list-item-icon>
                    <v-icon>power_settings_new</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-navigation-drawer>

        <v-footer :inset="true" app>
            <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "Default",
        data: () => ({
            drawers: ['Default (no property)', 'Permanent', 'Temporary'],
            primaryDrawer: {
                model: null,
                type: 'default (no property)',
                clipped: true,
            },
            right: false
        }),
        methods: {
            ...mapActions('auth', [
                'logout'
            ])
        }
    }
</script>

<style scoped>

</style>
