import { createRouter, createWebHistory, type RouteLocation } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAuthStore } from '@/stores/auth';

export const routes = [
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
    path: '/overlay',
    name: 'overlay',
    beforeEnter: async (to: RouteLocation) => {
      const { login, setCredentials } = useAuthStore();
      const {
        query: { username, webApiKey }
      } = to;

      if (username && webApiKey) {
        setCredentials(to.query.username as string, to.query.webApiKey as string);
        return login();
      }
    },
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
      }
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
