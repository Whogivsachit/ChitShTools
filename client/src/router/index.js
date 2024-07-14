import store from '@/store/store';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() { return { top: 0 } },

  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/indexPage.vue')
    },
    {
      path: '/mdownloader',
      name: 'mediaDownloader',
      component: () => import('../views/mdownPage.vue')
    },
    {
      path: '/gameinfo',
      name: 'gameInfo',
      component: () => import('../views/gameInfoPage.vue')
    },
    {
      path: '/webhook',
      name: 'webhook',
      component: () => import('../views/webhookPage.vue')
    },
    {
      path: '/smtp',
      name: 'smtp',
      component: () => import('../views/smtpPage.vue')
    },
    {
      path: '/workshop',
      name: 'workshop',
      component: () => import('../views/workshopPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404Page.vue'),
    }
  ]
})

export default router
