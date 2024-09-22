<template>
    <appLayout title="jsonPage">
        <div class="container mx-auto px-2 md:px-0">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="Json Beautify" description="Convert your ugly bland json to beautiful formatted and easy to read json" />

            <div class="flex flex-col md:flex-row gap-6">
                <cardComponent title="RawJson" :divider="true" class="w-full md:w-1/2">
                    <template #buttons>
                        <button @click="beautify" :disabled="!isValid" :class="isValid ? 'bg-green-600' : 'bg-muted'" class="bg-green-600 text-white rounded-md px-4 py-1 mt-3">Beautify</button>
                        <button @click="clear" class="bg-red-600 text-white rounded-md px-4 py-1 mt-3">Clear</button>
                    </template>

                    <textarea v-model="rawJson" class="bg-background/75 text-white p-2 rounded-md mb-5 h-64 mt-2 w-full" placeholder="Enter Raw Json"></textarea>
                </cardComponent>

                <cardComponent title="Pretty Json" :divider="true" class="w-full md:w-1/2">
                    <pre class="bg-background p-5 rounded-md pt-0 h-fit overflow-x-scroll">
                        <code class="text-muted block">{{ fancyJson }}</code>
                    </pre>   
                </cardComponent>
            </div>
        </div>
    </appLayout>
</template>


<script>
import _ from 'lodash';

export default {
    name: 'base64Page',
    data() {
        return {
            rawJson: '{ "name": "jerry" }',
            isValid: true,
            fancyJson: '',
            isLoading: false,
        };
    },


    watch: {
        rawJson: {
            handler: _.debounce(function () { // Debounce the watcher to prevent multiple calls
                try {
                    JSON.parse(this.rawJson);
                    this.isValid = true;
                } catch (error) {
                    push.error('Invalid Json');
                    this.isValid = false;
                }
            }, 750),
            immediate: true,
        },
    },

    methods: {
        async beautify() {
            this.fancyJson = '';
            this.isLoading = true;

            if(!this.rawJson) return push.error('No Json to Beautify');

            this.fancyJson = JSON.stringify(JSON.parse(this.rawJson), null, 2);
            push.success('Beautified Successfully');
            this.isLoading = false;
        },

        clear() {
            this.rawJson = '';
            this.fancyJson = '';
        },
    },
}
</script>