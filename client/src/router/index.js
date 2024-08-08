import store from '@/store/store';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() { return { top: 0 } },

  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('../views/indexPage.vue')
    },
    {
      path: '/mdownloader',
      name: '[YT/SC] Media Downloader',
      component: () => import('../views/mdownPage.vue')
    },
    {
      path: '/gameinfo',
      name: 'Game Server Information',
      component: () => import('../views/gameInfoPage.vue')
    },
    {
      path: '/webhook',
      name: 'Discord Embed Sender',
      component: () => import('../views/webhookPage.vue')
    },
    {
      path: '/smtp',
      name: 'SMTP Sender',
      component: () => import('../views/smtpPage.vue')
    },
    {
      path: '/workshop',
      name: 'Gmod Workshop Generator',
      component: () => import('../views/workshopPage.vue')
    },
    {
      path: '/shorten',
      name: 'Url Shortener',
      component: () => import('../views/shortenPage.vue')
    },
    {
      path: '/qrcode',
      name: 'QR Code Generator',
      component: () => import('../views/qrCodePage.vue')
    },
    {
      path: '/b64',
      name: 'Base64 Encode/Decode',
      component: () => import('../views/base64Page.vue')
    },
    {
      path: '/json',
      name: 'Json Beautify',
      component: () => import('../views/jsonPage.vue')
    },
    {
      path: '/diff',
      name: 'Text Diff Checker',
      component: () => import('../views/diffPage.vue')
    },
    {
      path: '/uuid',
      name: 'UUID Generator',
      component: () => import('../views/uuidPage.vue')
    },
    {
      path: '/password',
      name: 'Password Generator',
      component: () => import('../views/passwordPage.vue')
    },
    {
      path: '/pdf',
      name: 'PDF Converter',
      component: () => import('../views/pdfPage.vue')
    },
    {
      path: '/iconvert',
      name: 'Image Converter',
      component: () => import('../views/imagePage.vue')
    },
    {
      path: '/vconvert',
      name: 'Video Transcoder',
      component: () => import('../views/videoPage.vue')
    },
    {
      path: '/speedtest',
      name: 'Speedtest',
      component: () => import('../views/speedTestPage.vue')
    },
    {
      path: '/sshc',
      name: 'SSH Client',
      component: () => import('../views/sshcPage.vue')
    },
    {
      path: '/nmap',
      name: 'Nmap Scanner',
      component: () => import('../views/nmapPage.vue')
    },
    {
      path: '/css',
      name: "CSS Minify/Beautify",
      component: () => import('../views/cssPage.vue')
    },
    {
      path: '/whois',
      name: 'Whois Lookup',
      component: () => import('../views/whoisPage.vue')
    },
    {
      path: '/dns',
      name: 'DNS Lookup',
      component: () => import('../views/dnsPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404Page.vue'),
    }
  ]
})

export default router
