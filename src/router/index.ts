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
			path: '/overlay',
			name: 'overlay',
			children: [
				{
					path: 'game-progress',
					name: 'game-progress',
					component: () => import('../views/overlays/GameProgressView.vue')
				},
				{
					path: 'user-profile',
					name: 'user-profile',
					component: () => import('../views/overlays/UserProfileView.vue')
				},
			]
		}
  ]
})

export default router
