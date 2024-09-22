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

                <cardComponent title="Instructions" class="w-full md:w-1/2 space-y-2">
                    <p>Enter the URL you wish to create a shortened link for and click generate.</p>
                    <p>Impressions will update every 15 seconds.</p>
                    <p>If at a later date you want to view the impressions of a url you generated you can retype it into the field and click generate</p>
                </cardComponent>
            </div>

            <cardComponent title="Link Information" class="w-full mt-5">
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
            isLoading: false,
            checkImpressions: null,
        }
    },

    mounted() {
        this.checkImpressions = setInterval(() => { this.updateImpressions(); }, 15000); // 15 seconds
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
            this.shortUrl = '';

            if(!this.originalUrl) {
                push.error('Please enter a valid URL');
                return this.isLoading = false;
            }

            if(!this.originalUrl.includes('http') || !this.originalUrl.includes('https')) {
                push.error('Please enter a valid URL ( http:// or https:// )');
                return this.isLoading = false;
            }

            try {
                const response = await coreService.generateShortUrl({ originalUrl: this.originalUrl});
                if(response.status !== 200 ) return push.error(response.message);

                console.log(`[UrlShortener]: ${response.message}`);

                this.shortUrl = `${this.$appUrl}/api/shorten/${response.shortUrl}`;
                this.impressions = response.impressions;
                push.success('Shortened URL generated successfully!');
            } catch (error) {
                console.error(error);
                push.error(error.message);
            } finally {
                this.isLoading = false;
            }
        },

        async copyShortUrl() {
            navigator.clipboard.writeText(this.shortUrl);
            push.info('Shortened URL copied to clipboard!');
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