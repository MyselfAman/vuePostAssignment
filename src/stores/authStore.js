import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "../utils/axiosInterceptor"

export const useAuthStore = defineStore('authStore', () => {

    const isAuthenticated = ref(false);
    const errorMessage = ref('')
    const checkAuthentication = computed(()=>{
        return isAuthenticated.value;
    })

    
    async function authenticate(value){
        isAuthenticated.value =true
        console.log(value);
        try {
            const response = await axios.post('/auth/login', {...value})
            console.log(response);
            sessionStorage.setItem("logedInUser" , JSON.stringify(response.data))
            return response
          } catch (error) {
            console.log(error);
            errorMessage.value = error.message;
          }
        
    }
    
    function logout(value){
        isAuthenticated.value = value
    }
  return {authenticate , isAuthenticated , checkAuthentication , logout}
})
