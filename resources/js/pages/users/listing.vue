<template>
    <datatable></datatable>
</template>

<script>
    import datatable from "@/js/components/datatable";
    import axios from 'axios';

    export default {
        name: "listing",
        components: {
            datatable
        },
        created() {
            axios.get('/api/v1/admin/admins').then(res => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>
