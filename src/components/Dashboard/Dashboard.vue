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

                        <template  #item-firstName="{ firstName , id }">
                            <p @click="router.push(id)" style="cursor:pointer; color:#1A237E; font-weight:600;">{{ firstName}} </p>
                        </template>
                        
                        </Table>
                    </v-card-text>
                </div>
                <div v-else class="d-flex flex-column  justify-center align-center" style="height:52rem">
                    <p class="text-h4">No User Found</p>
                    <v-btn class="primaryBtn mt-4" size="large" @click="dialog=true">Register User</v-btn>
                </div>
            </v-card>
            <createModals :dialog="dialog" @close="closeModal" @create="createUser"/>

        </div>

    </v-main>
</template>


<script setup>
import {ref , onMounted , computed } from 'vue'
import Table from 'vue3-easy-data-table'
import {useUserStore} from "../../stores/userStore"
import createModals from '../Modals/createModals.vue';
import router from '../../router';

const store = useUserStore();
const dialog = ref(false);
const loading = ref(true)
let userList  = computed(()=> {
    loading.value = false;
    return store.getallUser();

})

const headers = ref([
  { text: "ID", value: "id" },
  { text: "Firstname", value: "firstName"},
  { text: "Lastname", value: "lastName"},
  { text: "Email", value: "email"},
  { text: "Company", value: "company.name"},
  { text: "DOB", value: "birthDate"},
  { text: "address", value: "address.address"},
])

function closeModal(){
    dialog.value = false;
}
function createUser(data){
    console.log("data==>",data);
    dialog.value = false;
}

onMounted(() => {
    store.fetchUsers();
})

</script>
