<template>
    <v-app>
        <v-content>
            <v-container class="fill-height" fluid>
                <slot></slot>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "Login",
        props: {
            source: String,
        },
    }
</script>

<style scoped>

</style>
