<template>
    <v-navigation-drawer
        v-if="loggedIn"
        v-model="open"
        clipped
        app
        overflow
        class="secondary"
    >
        <v-list dense nav>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title white--text">
                        Application
                    </v-list-item-title>
                    <v-list-item-subtitle class="white--text">
                        subtext
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider/>
            <router-link tag="v-list-item" link v-for="item in list" :key="item.text"
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
    export default {
        name: "Sidebar",
        props: [
            'right', 'loggedIn', 'open'
        ],
        data() {
            return {
                list: [
                    {
                        text: 'Admins',
                        to: {name: 'admins'},
                        icon: 'person'
                    },
                    {
                        text: 'Access Control List',
                        to: {name: 'acl'},
                        icon: 'no_encryption'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
