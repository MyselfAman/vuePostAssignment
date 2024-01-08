<template>
    <v-main>
        <div>
            <v-card elevation="10">
                <div v-if="postList?.length !== 0">
                    <v-card-title class="d-flex">
                        <p>Total Posts ({{ postList?.length }})</p>
                        <v-spacer></v-spacer>
                        <v-btn elevation="5" class="primaryBtn" @click="dialog=true">Register Post</v-btn>

                    </v-card-title>
                    <v-card-text>
                        <Table 
                            :headers="headers" 
                            :items="postList" 
                            table-class-name="customize-table" 
                            header-text-direction="center"
                            body-text-direction="center"
                        >

                        <template  #item-title="{  title , id}">
                            <p @click="router.push(`/posts/${id}/comments`)" style="cursor:pointer; color:#1A237E; font-weight:600;">{{ title}} </p>
                        </template>
                        <template  #item-operation="{ title,  id }" >
                           <div class="d-flex">
                            <v-tooltip text="See Comments"  location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" small @click="router.push(`/posts/${id}/comments`)" class="editIcon">mdi-file-document</v-icon>
                            </template>
                            </v-tooltip>
                            <p class="px-1"> | </p>

                            <v-tooltip text="Delete Comments"  location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" small @click="deleteDialog = true , dialogInfo = `${title}`" class="deleteIcon">mdi-delete-circle</v-icon>
                            </template>
                            </v-tooltip>
                                
                           </div>
                        </template>
                        
                        </Table>
                    </v-card-text>
                </div>
                <div v-else class="d-flex flex-column  justify-center align-center" style="height:52rem">
                    <p class="text-h4">No Posts Found</p>
                </div>
            </v-card>
            <InfoModel 
            :dialog="deleteDialog" 
            :title="'Delete'" 
            :message="'Are you sure you want to delete '" 
            :btnClass="'secoundaryBtn'"
            :btnTitle="'Delete'" 
            :event="'delete'"
            :info="dialogInfo"
            @close="closeModal" 
            @delete ="deleteUser"/>
            <createModals :dialog="dialog" @close="closeModal" @create="createUser"/>

        </div>

    </v-main>
</template>


<script setup>
import {ref , onMounted , computed } from 'vue'
import Table from 'vue3-easy-data-table'
import {usePostStore} from "../../stores/postStore"
import createModals from '../Modals/createModals.vue';
import InfoModel from "../Modals/InfoModel.vue"
import router from '../../router';

const store = usePostStore();
const dialog = ref(false);
const deleteDialog = ref(false);
const dialogInfo = ref('');
let postList  = computed(()=> {
    return store.getallPost();

})

const headers = ref([
  { text: "ID", value: "id" },
  { text: "Title", value: "title"},
  { text: "Reactions", value: "reactions"},
  { text: "User ID", value: "userId"},
  { text: "Actions", value: "operation"},
])

function closeModal(){
    dialog.value = false;
    deleteDialog.value = false;
}

function deleteUser(){
    deleteDialog.value = false;
}

function createPost(data){
    dialog.value = false;
}

onMounted(() => {
    store.fetchPosts();
})

</script>
