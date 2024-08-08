<template>
    <appLayout title="jsonPage">
        <div class="container mx-auto px-2 md:px-0">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="Json Beautify" description="Convert your ugly bland json to beautiful formatted and easy to read json" />

            <div class="flex flex-col md:flex-row gap-6">
                <cardComponent title="RawJson" :divider="true" class="w-full md:w-1/2">
                    <template #buttons>
                        <button @click="beautify" :disabled="isJsonInvalid" :class="isJsonInvalid ? 'bg-muted' : 'bg-green-600'" class="bg-green-600 text-white rounded-md px-4 py-1 mt-3">Beautify</button>
                        <button @click="clear" class="bg-red-600 text-white rounded-md px-4 py-1 mt-3">Clear</button>
                    </template>

                    <textarea v-model="rawJson" class="bg-background/75 text-white p-2 rounded-md mb-5 h-64 mt-2 w-full" placeholder="Enter Raw Json"></textarea>
                </cardComponent>

                <cardComponent title="Pretty Json" :divider="true" class="w-full md:w-1/2">
                    <template #response>
                        <div class="text-2xl font-bold" :class="successMessage ? 'text-green-600' : 'text-red-600'">{{ message }}</div>
                    </template>
                    <pre class="bg-background p-5 rounded-md pt-0 h-fit">
                        <code class="text-muted block">{{ fancyJson }}</code>
                    </pre>   
                </cardComponent>
            </div>
        </div>
    </appLayout>
</template>


<script>

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

            if(!this.rawJson) return this.errorMessage = 'Invalid Json';

            this.fancyJson = JSON.stringify(JSON.parse(this.rawJson), null, 2);
            this.successMessage = 'Successfuly Beautified Json'

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