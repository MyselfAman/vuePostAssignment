import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../views/Login.vue"
import {useAuthStore} from "../stores/authStore"
import NotFound from "../components/Reusables/NotFound.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/users',
      name: 'users',
      component: ()=> import("../components/UserManagement/Users.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/users/:id',
      name: 'userDetails',
      component: ()=> import("../components/UserManagement/UserDetails.vue"),
      props: true,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/products',
      name: 'products',
      component: ()=> import("../components/ProductManagement/Product.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const authApiKey = sessionStorage.getItem("authApiKey")
  // when someone try to manually change route and try to access /login after being authenticated bcz state will be reset so authstore will be false
  if (to.path === '/login' && authApiKey) {
    next('/users'); // Redirect to the dashboard or any other default route
  }
  if (to.name === 'NotFound' && authApiKey) {
    next('/users'); // Redirect to the dashboard or any other default route
  }
  // Check if the route requires authentication and if the user is not authenticated
  else if (to.meta.requiresAuth && (!authApiKey && !authStore.isAuthenticated)) {
    // Redirect to the login page
    console.log( sessionStorage.getItem("authApiKey"));
    next('/login');
  } else {
    // Proceed to the intended route
    next();
  }
});

export default router
