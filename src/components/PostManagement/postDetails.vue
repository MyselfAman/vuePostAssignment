<template>
  <v-main>
    <div>
      <v-card elevation="20" class="pa-10">
        <v-card-title class="text-h6 d-flex">
          <p>Title : {{ getPostDetails.title }}</p>
          <v-spacer></v-spacer>
          <v-btn class="primaryBtn" @click="router.back()"> GO Back </v-btn>
        </v-card-title>
        <v-card-subtitle>
          Description : {{ getPostDetails.body }}
        </v-card-subtitle>
        <v-card-text>
          <p style="font-size: 16px">
            Total Comments : {{ getPostComments.comments?.length }}
          </p>
          <v-divider class="my-1" thickness="2"></v-divider>
          <div v-for="comment in getPostComments.comments" :key="comment.id">
            <v-card class="my-2" elevation="5">
              <v-card-title>
                <p style="font-size: smaller">{{ comment.body }}</p>
              </v-card-title>
              <v-card-subtitle class="mb-2 d-flex align-center mt-n2">
                <p class="px-1" style="font-size: x-small; font-weight: bold">
                  <v-icon size="small">mdi-account-circle</v-icon>
                  {{ comment.user.username }}
                </p>
              </v-card-subtitle>
            </v-card>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePostStore } from "../../stores/postStore";

const router = useRouter();
const store = usePostStore();
const route = useRoute();

// to get post comments
const getPostComments = computed(() => {
  return store.getPostComments();
});

// to get post details
const getPostDetails = computed(() => {
  return store.getPostDetails();
});

onMounted(() => {
  // calling api of store to get post comments 
  store.fetchPostComments(route.params.id);

  // calling api of store to get post details
  store.fetchPostDetails(route.params.id);
});
</script>
