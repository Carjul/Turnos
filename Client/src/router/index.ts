import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ConfigView from '@/views/ConfigView.vue'
import TurnoView from '@/views/TurnoView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/config',
      name: 'config',
      component: ConfigView,
    },
    {
      path: '/create',
      name: 'create',
      component: TurnoView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

export default router
