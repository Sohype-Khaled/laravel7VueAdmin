<template>
    <v-app>
        <v-navigation-drawer
            v-if="loggedIn"
            v-model="primaryDrawer.model"
            :clipped="primaryDrawer.clipped"
            :permanent="primaryDrawer.type === 'permanent'"
            :temporary="primaryDrawer.type === 'temporary'"
            app
            overflow
        >
            <v-list dense nav>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title">
                            Application
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            subtext
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>
                <router-link tag="v-list-item" :to="{name: 'admins'}" link>
                    <v-list-item-icon>
                        <v-icon>person</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Admins</v-list-item-title>
                    </v-list-item-content>
                </router-link>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar v-if="loggedIn" clipped-left app>
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
           <!-- <v-progress-linear
                v-if="$store.state.loading"
                class="ma-0"
                :indeterminate="true"/>-->
            <v-container :class="!loggedIn?'fill-height': ''" fluid>
                <slot></slot>
            </v-container>
        </v-content>

        <v-navigation-drawer
            v-if="loggedIn"
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
            dark: false,
            drawers: ['Default (no property)', 'Permanent', 'Temporary'],
            primaryDrawer: {
                model: null,
                type: 'default (no property)',
                clipped: true,
            },
            right: false
        }),
        computed: {
            ...mapGetters('auth', [
                'loggedIn'
            ]),
            isLoggedIn() {
                return this.loggedIn();
            }
        },
        methods: {
            ...mapActions('auth', [
                'logout'
            ])
        },
    }
</script>

<style scoped>

</style>
