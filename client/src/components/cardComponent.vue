<template>
    <div class="p-5 bg-foreground rounded-md text-white mx-auto">
        <div class="flex place-content-between items-center">
            <h1 class="text-2xl font-bold">{{ title }}</h1>
            <slot name="response"></slot>
            <div v-if="$slots.buttons" class="space-x-3 pb-2">
                <slot name="buttons"></slot>
            </div>
        </div>
        <p class="text-muted">{{ description }}</p>
        <hr v-if="divider" class="border-borders my-2">
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
    },
    divider: {
      type: Boolean,
      default: true
    }
  }
}
</script>