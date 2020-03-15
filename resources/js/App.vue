<template>
    <!--    <component :is="(this.$route.meta.layout || 'default') + '-layout'">-->
    <component :is="'default-layout'">
        <router-view/>
    </component>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped>

</style>
