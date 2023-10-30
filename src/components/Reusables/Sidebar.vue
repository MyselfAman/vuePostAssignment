<template>
    <div>
        <v-navigation-drawer width="300" class="px-2 ">
            <v-list density="compact">

                <v-list-item
                    v-for="item in routes"
                    :key="item.name"
                    :value="item"
                    :to="item.path"
                    class="rounded-lg mt-1"
                    color="blue-grey-lighten-5"
                >
                    <template v-slot:prepend>
                    <v-icon color="#fff" :icon="item.icon"></v-icon>
                    </template>

                    <v-list-item-title class="text-white"  :to="item.to" >{{ item.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const routes = ref([
  { path: '/users',  name: 'User Management', icon:'mdi-account' },
  { path: '/products',  name: 'Product Management' ,icon:"mdi-shopping"},
])
// v-for="route in routes" :key="route.name" :to="route.path" router


const items = ref([
        { text: 'User Management', icon: 'mdi-account', to: '/users'  },
        { text: 'Products', icon: 'mdi-shopping', to: '/products'  },
        { text: 'App Management', icon: 'mdi-alarm', },

        { text: 'Mapping User', icon: 'mdi-link' },
      ])

</script>