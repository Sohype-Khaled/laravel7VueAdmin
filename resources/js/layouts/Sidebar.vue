<template>
    <v-navigation-drawer v-if="loggedIn" v-model="open" clipped app overflow class="secondary">
        <v-list dense nav>
            <v-list-item>
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="">
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="title white--text">
                        {{ getUser.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="white--text" v-if="getUser.roles && getUser.roles.length > 0">
                        {{ getUser.roles.join(', ')}}
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-btn color="white" icon @click.stop="toggleSidebar" v-if="$vuetify.breakpoint.xsOnly">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>

            <v-divider/>
            <router-link tag="v-list-item" link v-for="item in getSidebar" :key="item.text"
                         :to="item.to">
                <v-list-item-icon>
                    <v-icon color="white" v-text="item.icon"/>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="white--text" v-text="item.text"/>
                </v-list-item-content>
            </router-link>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Sidebar",
        props: [
            'loggedIn',
        ],
        computed: {
            ...mapGetters("layout", ["isSidebarOpen", "getSidebar"]),
            ...mapGetters("acl", ["getUser"]),
            open: {
                get() {
                    return this.isSidebarOpen
                },
                set(value) {

                }
            }
        },
        methods: {
            ...mapActions("layout", ["toggleSidebar"])
        }
    }
</script>

<style scoped>

</style>
