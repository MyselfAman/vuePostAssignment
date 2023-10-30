import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../utils/axiosInterceptor'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: ref([]),
  }),

  getters: {
    getProducts() {
      return this.products;
    },
  },

  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get('/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },

  },
});
