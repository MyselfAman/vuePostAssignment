<template>
    <v-main>
        <div>

          <v-card height="830" elevation="20" class="pa-10">
            <v-card-title class="text-h3 " style="">
              {{ getUserInfo.firstName }} {{ getUserInfo.maidenName }} {{ getUserInfo.lastName }}
            </v-card-title>
            <v-card-subtitle >
                {{ getUserInfo.email }}
            </v-card-subtitle>
            <v-card-text>
                <p>DOB : {{ getUserInfo.birthDate }}</p>
            </v-card-text>
            <v-card-actions>
               <v-btn class="primaryBtn" @click="router.back()">
                GO Back
               </v-btn>
            </v-card-actions>
            <div class="d-flex flex-row-reverse">
                <img :src="getUserInfo.image" alt="user photo" height="500">
            </div>
          </v-card>
        </div>
    </v-main>
</template>

<script setup>
import { onMounted , ref , computed} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import {useUserStore} from '../../stores/userStore'

const router = useRouter();
const store = useUserStore();

const getUserInfo = computed(()=>{
    return store.getUserDetails();
})


onMounted(()=>{
    store.fetchUserDetails(route.params.id)
})

const route = useRoute();

</script>