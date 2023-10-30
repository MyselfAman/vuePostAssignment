<template>
  <v-main>
    <div>
      <p class="text-h5 mx-4">
        Total Products : {{ store.getProducts.products?.length }}
      </p>
      <div class="d-flex">
        <v-row no-gutters>
          <v-col
            v-for="product in store.getProducts.products"
            :key="product.id"
            cols="12"
            sm="3"
            class="my-2"
          >
            <v-card
              class="mx-auto my-12"
              max-width="374"
              height="550"
              elevation="20"
            >
              <v-img cover height="250" :src="product.thumbnail"></v-img>

              <v-card-item>
                <v-card-title>{{ product.title }}</v-card-title>

                <v-card-subtitle>
                  <span class="me-1">{{
                    shortenText(product.description, 40)
                  }}</span>

                  <v-icon
                    color="error"
                    icon="mdi-fire-circle"
                    size="small"
                  ></v-icon>
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating
                    :model-value="product.rating"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating>

                  <div class="text-grey ms-4">
                    {{ product.rating }}
                  </div>
                </v-row>

                <div class="my-4 text-subtitle-1">
                  <v-chip color="green"> $ {{ product.price }}</v-chip>
                </div>

                <div>{{  shortenText(product.description, 40)}}</div>
              </v-card-text>

              <v-divider class="mx-4 mb-1"></v-divider>

              <v-card-title> Availability : {{ product.stock }}</v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primaryBtn mt-4 mr-4" >View Details</v-btn>

               
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "../../stores/productStore";
import router from "../../router";

const store = useProductStore();
const dialog = ref(false);

const productList = ref([]);

function shortenText(text, maxLength) {
  console.log("iuagfigfuids");
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + "...";
  }
}

onMounted(() => {
  store.fetchProducts();
});
</script>
