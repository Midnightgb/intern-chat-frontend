// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.LOGIN,
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: ROUTES.DASHBOARD,
      name: 'Panel',
      component: () => import('@/views/dashboard/DashboardView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'Panel' });
  } else {
    next();
  }
});

export default router;