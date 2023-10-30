<template>
    <v-main>
        <div>
            <v-card elevation="10">
                <div v-if="userList.length !== 0">
                    <v-card-title class="d-flex">
                        <p>Total Users ({{ userList.length }})</p>
                        <v-spacer></v-spacer>
                        <v-btn elevation="5" class="primaryBtn" @click="dialog=true">Register User</v-btn>

                    </v-card-title>
                    <v-card-text>
                        <Table 
                            :headers="headers" 
                            :items="userList" 
                            table-class-name="customize-table" 
                            header-text-direction="center"
                            body-text-direction="center"
                        >

                        <template  #item-firstName="{ firstName , lastName , id }">
                            <p @click="router.push(`/users/${id}`)" style="cursor:pointer; color:#1A237E; font-weight:600;">{{ firstName}} </p>
                        </template>
                        <template  #item-operation="{ firstName , lastName, id }" >
                           <div class="d-flex">
                                <v-icon small @click="editUser(id)" class="editIcon">mdi-account-edit</v-icon>
                                <p class="px-1"> | </p>
                                <v-icon small @click="deleteDialog = true , dialogInfo = `${firstName} ${lastName}`" class="deleteIcon">mdi-delete-circle</v-icon>
                           </div>
                        </template>
                        
                        </Table>
                    </v-card-text>
                </div>
                <div v-else class="d-flex flex-column  justify-center align-center" style="height:52rem">
                    <p class="text-h4">No User Found</p>
                    <v-btn class="primaryBtn mt-4" size="large" @click="dialog=true">Register User</v-btn>
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
import {useUserStore} from "../../stores/userStore"
import createModals from '../Modals/createModals.vue';
import InfoModel from "../Modals/InfoModel.vue"
import router from '../../router';

const store = useUserStore();
const dialog = ref(false);
const deleteDialog = ref(false);
const dialogInfo = ref('');
const loading = ref(true)
let userList  = computed(()=> {
    return store.getallUser();

})

const headers = ref([
  { text: "ID", value: "id" },
  { text: "Firstname", value: "firstName"},
  { text: "Lastname", value: "lastName"},
  { text: "Email", value: "email"},
  { text: "Company", value: "company.name"},
  { text: "DOB", value: "birthDate"},
  { text: "Address", value: "address.address"},
  { text: "Actions", value: "operation"},
])

function closeModal(){
    dialog.value = false;
    deleteDialog.value = false;
}

function deleteUser(){
    deleteDialog.value = false;
}

function createUser(data){
    dialog.value = false;
}

onMounted(() => {
    store.fetchUsers();
})

</script>
