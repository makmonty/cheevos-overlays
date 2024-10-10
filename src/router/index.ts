import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/catalog',
      name: 'catalog',
			component: () => import('../views/CatalogView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameInfo.vue')
    },
    {
      path: '/game-progress',
      name: 'game-progress',
      component: () => import('../views/GameProgress.vue')
    },
  ]
})

export default router
