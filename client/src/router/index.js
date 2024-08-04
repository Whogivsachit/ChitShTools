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
      path: '/shorten',
      name: 'shorten',
      component: () => import('../views/shortenPage.vue')
    },
    {
      path: '/qrcode',
      name: 'qrCode',
      component: () => import('../views/qrCodePage.vue')
    },
    {
      path: '/b64',
      name: 'base64',
      component: () => import('../views/base64Page.vue')
    },
    {
      path: '/json',
      name: 'json',
      component: () => import('../views/jsonPage.vue')
    },
    {
      path: '/diff',
      name: 'diff',
      component: () => import('../views/diffPage.vue')
    },
    {
      path: '/uuid',
      name: 'uuid',
      component: () => import('../views/uuidPage.vue')
    },
    {
      path: '/password',
      name: 'password',
      component: () => import('../views/passwordPage.vue')
    },
    {
      path: '/pdf',
      name: 'pdfConverter',
      component: () => import('../views/pdfPage.vue')
    },
    {
      path: '/iconvert',
      name: 'iconvert',
      component: () => import('../views/imagePage.vue')
    },
    {
      path: '/vconvert',
      name: 'vconvert',
      component: () => import('../views/videoPage.vue')
    },
    {
      path: '/speedtest',
      name: 'speedtest',
      component: () => import('../views/speedTestPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404Page.vue'),
    }
  ]
})

export default router
