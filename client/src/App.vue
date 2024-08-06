<template>
  <div class="core min-h-screen">
    <bannerComponent />
    <RouterView />
  </div>
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
