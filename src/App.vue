<script setup>
import Header from './components/Reusables/Header.vue';
import Sidebar from './components/Reusables/Sidebar.vue';
import Footer from './components/Reusables/Footer.vue';
import { onMounted, ref , computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {useAuthStore} from "./stores/authStore"
const auth = useAuthStore();

const route = useRoute();

const authentication = sessionStorage.getItem("authApiKey");

</script>

<template>
  <v-app id="inspire">
    <Header v-if="route.path !=='/login' && authentication || auth.isAuthenticated "/>
    <Sidebar v-if="route.path !=='/login' && authentication || auth.isAuthenticated"/>
     <router-view ></router-view>
    <Footer v-if="route.path !=='/login' && authentication || auth.isAuthenticated"/>
  </v-app>

  
</template>
