// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'login' }
    },
    {
      path: ROUTES.LOGIN,
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: ROUTES.DASHBOARD,
      name: 'Panel',
      component: () => import('@/views/dashboard/DashboardView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: ROUTES.CONVERSATIONS,
      name: 'Conversations',
      component: () => import('@/views/conversations/ConversationsView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.checkAuth()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'Panel' })
  } else {
    next()
  }
})

export default router
