<template>
    <appLayout title="jsonPage">
        <div class="container mx-auto px-2 md:px-0">
            <loadingBar :isLoading="isLoading" />

            <!-- Header -->
            <div class="flex flex-col py-16 text-center text-white">
                <h1 class="text-5xl font-bold">Json Beautify</h1>
                <p class="text-xl pt-2">Convert your ugly bland json to beautiful formatted and easy to read json</p>
            </div>

            <div class="flex flex-row gap-6">
                <!-- RawJson -->
                <div class="flex flex-col p-5 bg-foreground text-white rounded-md w-1/2">
                    <div class="flex place-content-between items-center">
                        <h1 class="text-2xl">RawJson</h1>
                        <div class="space-x-3">
                            <button @click="beautify" :disabled="isJsonInvalid" :class="isJsonInvalid ? 'bg-muted' : 'bg-green-600'" class="text-white rounded-md px-4 py-1 mt-3">Beautify</button>
                            <button @click="clear" class="bg-red-600 text-white rounded-md px-4 py-1 mt-3">Clear</button>
                        </div>
                    </div>
                    <hr class="border-borders my-2">
                    <textarea v-model="rawJson" class="bg-background/75 text-white p-2 rounded-md mb-5 h-64 mt-2" placeholder="Enter Raw Json"></textarea>
                </div>
                <!-- PrettyJson -->
                <div class="flex flex-col p-5 bg-foreground text-white rounded-md w-1/2">
                    <div class="flex place-content-between items-center">
                        <h1 class="text-2xl py-1">Pretty Json</h1>
                        <div class="text-2xl font-bold" :class="successMessage ? 'text-green-600' : 'text-red-600'">{{ message }}</div>
                    </div>
                    <hr class="border-borders my-2">
                    <pre class="bg-background p-5 rounded-md pt-0 h-full overflow-y-scroll">
                        <code class="text-muted block" v-html="fancyJson"></code>
                    </pre>
                </div>
            </div>
        </div>
    </appLayout>
</template>


<script>
import coreService from '@/services/coreService';

export default {
    name: 'base64Page',
    data() {
        return {
            rawJson: '{ "name": "jerry" }',
            fancyJson: '',
            successMessage: '',
            errorMessage: '',
            isLoading: false,
        };
    },

    computed: {
       message() { return this.successMessage || this.errorMessage; },
       isJsonInvalid() { return this.errorMessage !== ''; },
    },

    watch: {
        rawJson() {
            try {
                JSON.parse(this.rawJson);
                this.errorMessage = '';
            } catch (error) {
                this.errorMessage = 'Invalid Json';
                this.fancyJson = '';
                this.successMessage = ''
            }
        },
    },

    methods: {
        async beautify() {
            this.fancyJson = '';
            this.isLoading = true;

            const response = await coreService.beautifyJson({ rawJson: this.rawJson});
            if(response.status === 200) {
                this.successMessage = response.message;
                this.fancyJson = response.code;
            } else {
                return this.errorMessage = response.message;
            }
            this.isLoading = false;
        },

        clear() {
            this.rawJson = '';
            this.fancyJson = '';
            this.successMessage = '';
            this.errorMessage = '';
        },
    },
}
</script>