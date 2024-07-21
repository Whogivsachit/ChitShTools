<template>
    <div class="flex flex-col py-16 text-center text-white">
        <h1 class="text-5xl font-bold">{{ title }}</h1>
        <p class="text-xl pt-2">{{ description }}</p>
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
        type: String,
        default: ''
    }
  }
}
</script>