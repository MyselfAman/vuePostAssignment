<template>
    <div>
        <v-app-bar class="px-4">
            <v-app-bar-title>
                Dashboard
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <div class="d-flex">
                <v-icon>mdi-account</v-icon>
                <p class="pl-2 ">AMANA</p>
                <p class="px-2"> | </p>
                <v-icon style="cursor:pointer" @click="dialog=true">mdi-logout</v-icon>
            </div>
        </v-app-bar>
        <InfoModel 
            :dialog="dialog" 
            :title="'Logout'" 
            :message="'Are you sure you want to logout '" 
            :btnClass="'secoundaryBtn'"
            :btnTitle="'Logout'" 
            :event="'logout'"
            @close="closeModal" 
            @logout ="logout"/>

    </div>
</template>

<script setup>
import { ref , computed , onBeforeMount} from 'vue';
import { useRouter } from 'vue-router';
import InfoModel from '../modals/InfoModel.vue'
import {useAuthStore} from "../../stores/authStore"
const auth = useAuthStore();

const dialog = ref(false);
const router= useRouter();
const userInfo = ref({})

function logout(){
    auth.logout(false);
    localStorage.clear();
    sessionStorage.clear()
    dialog.value = false;
    router.push('/login');

}

function closeModal(){
    dialog.value = false;
}

onBeforeMount(()=>{
    userInfo.value =  JSON.stringify(sessionStorage.getItem('logedInUser'))
    console.log(userInfo.value);
    
})

</script>