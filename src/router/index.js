import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/options',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Options.vue')
  },
  {
    path: '/composition',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/CompositionApi.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
