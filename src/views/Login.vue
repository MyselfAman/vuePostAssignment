
<template>
    <div id="loginScreen">
        <v-row no-gutters>
            <v-col
                cols="12"
                sm="6"
                id="login"
                
            >
                <div class="d-flex flex-column align-center text-white" style="padding-top:40%">
                    <v-icon class="mb-4" style="font-size:50px">mdi-apple-keyboard-command</v-icon>
                    <p class="text-h4">App Management System</p>
                    <p>An application for app management</p>
                </div>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                class="d-flex align-center justify-center"
            >
            <v-card width="500" height="280" elevation="20">
                <v-card-title>
                    Sign In
                </v-card-title>
                <v-card-text class="mt-4">
                    <form @submit.prevent="submit">
                        <v-text-field
                            v-model="username.value.value"
                            :error-messages="username.errorMessage.value"
                            label="Username"
                            variant="underlined"
                            placeholder="Please enter username"
                        ></v-text-field>
                        <v-text-field
                            v-model="password.value.value"
                            :error-messages="password.errorMessage.value"
                            label="Password"
                            variant="underlined"
                            placeholder="Please enter password"
                        ></v-text-field>  
                        
                       <div class="d-flex flex-row-reverse mt-2">
                            <v-btn
                                class="ml-2 primaryBtn"
                                type="submit"
                            >
                                LOGIN
                            </v-btn>
                        
                           
                       </div>
                    </form>
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
    </div>
</template>


<script setup>
  import { ref } from 'vue'
  import {useRouter} from 'vue-router'
  import { useField, useForm } from 'vee-validate'
  import {useAuthStore} from "../stores/authStore"


  const auth = useAuthStore();
  const { handleSubmit } = useForm({
    validationSchema: {
      username (value) {
        if (value !== '') return true

        return 'Please provide username.'
      },
      password (value) {
        if (value?.length >= 5) return true 
        return 'Must be at least 5 characters.'
      }
    },
  })

  const username = useField('username')
  const password = useField('password')
  const router = useRouter();



  const submit = handleSubmit(values => {
    auth.authenticate(values);
    sessionStorage.setItem('authApiKey', true);
    router.push("/users")

  })
</script>
