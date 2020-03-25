<template>
    <v-app>
        <sidebar :logged-in="loggedIn" :open="sidebar"/>

        <v-app-bar v-if="loggedIn" clipped-left clipped-right app class="primary white--text">
            <v-app-bar-nav-icon @click.stop="sidebar = !sidebar"/>
            <v-toolbar-title>Dashboard</v-toolbar-title>
            <v-spacer/>
            <v-menu bottom left close-on-click offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>settings</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>person</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Profile Settings
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>brightness_4</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Enable Dark Theme</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-switch v-model="$vuetify.theme.dark"/>
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item @click.stop="logout">
                        <v-list-item-icon>
                            <v-icon>power_settings_new</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-content>
            <v-container :class="[!loggedIn ? 'fill-height' : '']" fluid>
                <router-view/>
            </v-container>
        </v-content>

        <v-snackbar
            v-model="$store.state.snackbar.show"
            :color="$store.state.snackbar.color"
            bottom
            left
            :timeout="2000"
        >
            {{ $store.state.snackbar.message }}
        </v-snackbar>

        <v-footer absolute :inset="true" app>
            <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    import Sidebar from "@/js/layouts/Sidebar";

    export default {
        name: "Default",
        components: {
            Sidebar
        },
        data: () => ({
            sidebar: true,
            drawers: ['Default (no property)', 'Permanent', 'Temporary'],
        }),
        computed: {
            ...mapGetters('auth', ['loggedIn']),

        },
        methods: {
            ...mapActions('auth', ['logout'])
        },
    }
</script>

<style scoped>

</style>
