<template>
    <appLayout title="shortenPage">
        <div class="container mx-auto">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="Url Shortener" description="Quickly and efficiently genereate masked/shortened urls" />

            <div class="flex flex-col md:flex-row gap-5">
                <cardComponent title="Url" :divider="false" class="w-full md:w-1/2">
                    <div class="flex flex-col pt-2 w-full text-white">
                        <input type="text" v-model="originalUrl" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="border border-borders rounded-md bg-background/75">
                        <button @click="generateUrl" class="bg-accent text-white rounded-r-md px-4 py-1 mt-3">Generate</button>
                    </div>
                </cardComponent>

                <cardComponent title="Instructions" class="w-full md:w-1/2">
                    <p>Enter the URL you wish to create a shortened link for and click generate.</p>
                    <p>Impressions will update every 5 seconds.</p>
                    <p>If at a later date you want to view the impressions of a url you generated you can retype it into the field and click generate</p>
                </cardComponent>
            </div>

            <cardComponent title="Link Information" class="w-full mt-5">
                <template #response>
                    <div class="text-lg md:text-2xl font-bold text-right w-1/2" :class="successMessage ? 'text-green-600' : 'text-red-600'">{{ showMessage }}</div>
                </template>
                <div class="flex flex-col gap-2 text-white">
                    <div>Original Url: <span class="text-muted">{{ originalUrl }}</span></div>
                    <div>Shortened Url: <span class="text-muted underline cursor-pointer" @click="copyShortUrl">{{ shortUrl }}</span></div>
                    <div>Impressions: <span class="text-muted">{{ impressions }}</span></div>
                </div>
            </cardComponent>

        </div>
    </appLayout>
</template>

<script>
import coreService from '@/services/coreService';

export default {
    name: 'shortenPage',
    data() {
        return {
            originalUrl: '',
            shortUrl: '',
            impressions: 0,
            successMessage: '',
            errorMessage: '',
            isLoading: false,
            checkImpressions: null,
        }
    },

    computed: {
        showMessage() { return this.successMessage || this.errorMessage; }
    },

    mounted() {
        this.checkImpressions = setInterval(() => { this.updateImpressions(); }, 5000);
    },

    // Cleanup
    beforeDestroy() {
        clearInterval(this.checkImpressions);
    },

    // Cleanup when navigating away
    beforeRouteLeave(to, from, next) {
        clearInterval(this.checkImpressions);
        next();
    },

    methods: {
        async generateUrl() {
            this.isLoading = true;
            this.errorMessage = '';
            this.successMessage = '';
            this.shortUrl = '';

            const response = await coreService.generateShortUrl({ originalUrl: this.originalUrl});
            if(response.status !== 200 ) {
                this.errorMessage = response.message;
                return this.isLoading = false;
            }
            console.log(`[UrlShortener]: ${response.message}`);

            this.shortUrl = `${this.$appUrl}/api/shorten/${response.shortUrl}`;
            this.impressions = response.impressions;
            this.successMessage = 'Shortened URL generated successfully!';
            this.isLoading = false;
        },

        async copyShortUrl() {
            navigator.clipboard.writeText(this.shortUrl);
            this.successMessage = 'Shortened URL copied to clipboard!';
        },

        async updateImpressions() {
            if(!this.shortUrl) return;
            const response = await coreService.generateShortUrl({ originalUrl: this.originalUrl});
            if(response.status === 200) {
                this.impressions = response.impressions;
            }

        }

    }


}
</script>