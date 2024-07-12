// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from '@/constants/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.LOGIN,
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: ROUTES.DASHBOARD,
      name: 'Panel',
      component: () => import('@/views/dashboard/DashboardView.vue')
    },
  ]
});

export default router;