<template>
    <v-dialog
        v-model="getDialog.show"
        max-width="290"
    >
        <v-card>
            <v-card-title class="headline" v-text="getDialog.title"/>

            <v-card-text v-text="getDialog.message"/>

            <v-card-actions>
                <v-spacer/>

                <v-btn
                    color="error darken-1"
                    text
                    @click="closeDialog"
                >
                    Disagree
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    @click="onSubmit"
                >
                    Agree
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters,mapMutations} from "vuex";

    export default {
        name: "DeleteDialog",
        computed: mapGetters("messages", ["getDialog"]),
        methods:{
            ...mapMutations("messages", ["closeDialog"]),
            onSubmit() {
                this.getDialog.onSubmit();
                this.closeDialog();
            }
        }
    }
</script>

<style scoped>

</style>
