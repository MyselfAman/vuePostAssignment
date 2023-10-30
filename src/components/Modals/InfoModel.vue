<template>
    <v-dialog width="500" v-model="props.dialog">

    <v-card >
        <v-card-title>{{ props.title }}</v-card-title>
      <v-card-text>
       {{ props.message }} <span style="font-weight: 600;"> {{ props.info }}</span> ? 
      </v-card-text>

      <v-card-actions class="d-flex flex-row-reverse">
        <v-btn :class="props.btnClass" @click="$emit(props.event)">{{ props.btnTitle }}</v-btn>
        <v-btn class="primaryBtn mr-2" @click="$emit('close')">Close</v-btn>

      </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script setup>
  const props = defineProps(["dialog" , "title" , "message" , "btnTitle" , "btnClass" , "event", "info"])
  const emit = defineEmits(['close','logout', 'delete'])
</script>