<template>
    <appLayout title="shortenPage">
        <div class="container mx-auto">
            <loadingBar :isLoading="isLoading" />

            <!-- Header -->
            <headerComponent title="Url Shortener" description="Quickly and efficiently genereate masked/shortened urls" />

            <!-- Main Content -->
            <div class="flex flex-col md:flex-row gap-5">
                <!-- Form -->
                <cardComponent title="Url" :divider="false" class="w-full md:w-1/2">
                    <form @submit.prevent="generateUrl">
                        <div class="flex flex-col md:flex-row gap-4">
                            <!-- Workshop Name -->
                            <div class="flex flex-col w-full text-white">
                                <span class="text-sm pl-1 pb-1">Url</span>
                                <input type="text" v-model="originalUrl" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="border border-borders rounded-md bg-background/75">
                                <button type="submit" class="bg-accent text-white rounded-r-md px-4 py-1 mt-3">Generate</button>
                            </div>
                        </div>
                    </form>
                </cardComponent>

                <!-- Instructions -->
                <cardComponent title="Instructions" class="w-full md:w-1/2">
                    <p>Enter the URL you wish to create a shortened link for and click generate. <br/>Impressions will update every 5 seconds.</p>
                </cardComponent>
            </div>

            <!-- Result -->
            <cardComponent title="Link Information" class="w-full mt-5">
                <template #response>
                    <div class="text-2xl font-bold" :class="successMessage ? 'text-green-600' : 'text-red-600'">{{ showMessage }}</div>
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

            if(response.status === 200) {
                this.shortUrl = `${this.$appUrl}/api/shorten/${response.shortUrl}`;
                this.impressions = response.impressions;
                this.successMessage = 'Shortened URL generated successfully!';
            } else {
                console.log(response);
                this.errorMessage = 'An error occurred while generating the shortened URL';
            }

            this.isLoading = false;
        },

        async copyShortUrl() {
            navigator.clipboard.writeText(this.shortUrl);
            this.successMessage = 'Shortened URL copied to clipboard!';
        },

        async updateImpressions() {
            const response = await coreService.generateShortUrl({ originalUrl: this.originalUrl});
            if(response.status === 200) {
                this.impressions = response.impressions;
            }

        }

    }


}
</script>