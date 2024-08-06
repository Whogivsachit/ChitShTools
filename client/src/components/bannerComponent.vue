<template>
    <div v-if="isBannerVisible" class="fixed bottom-0 w-full z-50 p-4 bg-foreground text-white border-glowing-top rounded-t-md">
        <div class="flex place-content-between w-full">
            <p class="text-center">Hey, I now have a <a href="https://discord.gg/eMa7YDzJUT" class="underline">Discord</a> Feel free to join if your interested in my development/coding <span class="text-muted text-sm">( Once you dismiss this banner it wont appear again)</span></p>
            <faIcon @click="dismissBanner" :icon="['fa', 'circle-xmark']" class="text-2xl hover:text-red-600"/>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'bannerComponent',

    computed: {
        ...mapGetters(['isBannerVisible']),
    },

    methods: {
        ...mapMutations(['dismissBanner']),
    },

}
</script>