<template>
     <div v-if="isLoading" class="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse"></div>
</template>

<script>
export default {
  name: 'loadingBar',
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>