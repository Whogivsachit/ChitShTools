<template>
    <appLayout title="indexPage">
        <div class="container mx-auto">
            <div class="flex flex-col py-16 text-center text-white">
                <h1 class="text-6xl font-bold">ChitSh Tools</h1>
                <p class="text-2xl">cshTools is a collection of useful tools and scripts making everyday life easier.</p>
                <div class="flex gap-6 pt-5 mx-auto">
                    <router-link to="/mdownload" class="bg-accent hover:bg-accent/75 text-white font-semibold py-2 px-3 rounded">Media Downloader</router-link>
                </div>
            </div>
        </div>
    </appLayout>
</template>


<script>
import appLayout from '@/layouts/appLayout.vue';
import devService from '@/services/devService';

export default {
    name: 'indexPage',
    components: {
        appLayout,
    },
    data() {
        return {
            res: '',
        }
    },

    async mounted() {
        const response = await devService.heartbeat();
        this.res = response.message;
    },

}
</script>