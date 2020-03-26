<template>
    <v-snackbar
        v-model="getSnackbar.show"
        :color="getSnackbar.color"
        :bottom="getSnackbar.alignY === 'bottom'"
        :top="getSnackbar.alignY === 'top'"
        :left="getSnackbar.alignX === 'left'"
        :right="getSnackbar.alignX === 'right'"
        :vertical="getSnackbar.mode === 'vertical'"
        :multiLine="getSnackbar.mode === 'multi-line'"
        :absolute="getSnackbar.absolute"
        :timeout="2000"
    >
        {{ getSnackbar.message }}
    </v-snackbar>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "snackbar",
        computed: mapGetters("messages", ["getSnackbar"])
    }
</script>

<style scoped>

</style>
