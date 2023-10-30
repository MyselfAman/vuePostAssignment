<template>
    <v-dialog width="500" v-model="dialogBox">

    <v-card title="Create User">
      <v-card-text>
        <form @submit.prevent="submit">
                        <v-text-field
                            v-model="firstname.value.value"
                            :error-messages="firstname.errorMessage.value"
                            label="Firstname"
                            variant="underlined"
                            placeholder="Please enter firstname"
                        ></v-text-field>
                        <v-text-field
                            v-model="lastname.value.value"
                            :error-messages="lastname.errorMessage.value"
                            label="Lastname"
                            variant="underlined"
                            placeholder="Please enter lastname"
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
const props = defineProps(["dialog", "userinfo"])
const emit = defineEmits(['close', 'create'])
import { useField, useForm } from 'vee-validate'

const dialogBox = computed(()=> {
  return props.dialog
})

const { handleSubmit } = useForm({
  validationSchema: {
    firstname (value) {
      if (value !== '') return true

      return 'Enter your firstname.'
    },
    lastname (value) {
      if (value !== '') return true

      return 'Enter your lastname.'
    },
   
  },
})

const firstname = useField('firstname')
const lastname = useField('lastname')

const submit = handleSubmit(values => {
  emit('create' , values)
  alert(JSON.stringify(values))
})

</script>