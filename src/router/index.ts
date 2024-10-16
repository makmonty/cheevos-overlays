import { createRouter, createWebHistory, type RouteLocation } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    beforeEnter: async (to: RouteLocation) => {
      const auth = useAuthStore();
      const { login, setCredentials } = auth;
      const { username, webApiKey } = storeToRefs(auth);
      const {
        query: { username: queryUsername, webApiKey: queryWebApiKey }
      } = to;

      if (queryUsername && queryWebApiKey) {
        setCredentials(queryUsername as string, queryWebApiKey as string);
        await login();
      }

      if (!username.value || !webApiKey.value) {
        return { name: 'login' };
      }

      if (to.path === '/') {
        return { name: 'catalog' };
      }
    },
    children: [
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
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
