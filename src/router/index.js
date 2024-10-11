// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from '@constants/routes'
import { useAuthStore } from '@stores/auth'

const login = () => import('@/views/auth/LoginView.vue')
const home = () => import('@/views/home/HomeView.vue')
const admin = () => import('@/views/admin/AdminView.vue')
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
      component: login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: ROUTES.DASHBOARD,
      name: 'Panel',
      component: home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: ROUTES.ADMIN,
      name: 'Admin',
      component: admin,
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
