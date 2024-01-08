import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
      path: '/posts',
      name: 'posts',
      component: ()=> import("../components/PostManagement/Posts.vue"),
    },
    {
      path: '/posts/:id/comments',
      name: 'postDetails',
      component: ()=> import("../components/PostManagement/PostDetails.vue"),
      props: true,
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

export default router
