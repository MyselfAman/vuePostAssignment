<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <main>
    <div
      class="d-flex align-center justify-center bg-indigo"
      style="height: calc(100vh)"
    >
      <div class="d-flex flex-column">
        <h1>Hi There , This is home page click on below button to see posts</h1>
        <div class="d-flex justify-center">
          <v-btn class="mt-6" @click="router.push('/posts')">View Posts</v-btn>
        </div>
      </div>
    </div>
  </main>
</template>
