<script setup>
import { Notivue, Notification, darkTheme, NotificationProgress } from 'notivue'

const theme = {
  ...darkTheme,
  '--nv-global-bg': '#17191C',
  '--nv-global-border': '#3C3E45',
  '--nv-global-fg': '#fff',
  '--nv-global-accent': '#FA4033',
  '--nv-min-width': '340px'
}
</script>


<template>
  <div class="core min-h-screen">
    <bannerComponent />
    <RouterView />
  </div>

  <Notivue v-slot="item">
    <Notification :item="item" :theme="theme">
      <NotificationProgress :item="item" />
    </Notification>
  </Notivue>
</template>

<script>
import bannerComponent from './components/bannerComponent.vue'
export default {
  name: `ChitShTools`,
  components: {
    bannerComponent
  }
}
</script>
