<template>
    <v-dialog width="500" v-model="dialogBox">

    <v-card title="Create Post">
      <v-card-text>
        <form @submit.prevent="submit">
                        <v-text-field
                            v-model="title.value.value"
                            :error-messages="title.errorMessage.value"
                            label="Title"
                            variant="underlined"
                            placeholder="Please enter title"
                        ></v-text-field>
                        <v-text-field
                            v-model="body.value.value"
                            :error-messages="body.errorMessage.value"
                            label="Body"
                            variant="underlined"
                            placeholder="Please enter body"
                        ></v-text-field>
                 
                       <div class="d-flex flex-row-reverse mt-2">
                            <v-btn
                                class="ml-2 primaryBtn"
                                type="submit"
                            >
                                Create
                            </v-btn>
                            <v-btn
                                class="ml-2 primaryBtn"
                                @click="$emit('close')"
                            >
                                Close
                            </v-btn>
                           
                        
                           
                       </div>
                    </form>
      </v-card-text>

   
    </v-card>
</v-dialog>
</template>

<script setup>
import {computed} from 'vue'
const props = defineProps(["dialog"])
const emit = defineEmits(['close', 'create'])
import { useField, useForm } from 'vee-validate'

const dialogBox = computed(()=> {
  return props.dialog
})

const { handleSubmit } = useForm({
  validationSchema: {
    title (value) {
      if (value !== '') return true

      return 'Enter your title.'
    },
    body (value) {
      if (value !== '') return true

      return 'Enter your body.'
    },
   
  },
})

const title = useField('title')
const body = useField('body')

const submit = handleSubmit(values => {
  emit('create' , values)
  alert(JSON.stringify(values));
})

</script>