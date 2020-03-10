<template>
    <v-navigation-drawer
        v-model="primaryDrawer.model"
        clipped
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
</template>

<script>
    export default {
        name: "Sidebar",
        props: [
            'right',
        ]
    }
</script>

<style scoped>

</style>
