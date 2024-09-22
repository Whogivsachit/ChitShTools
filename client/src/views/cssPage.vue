<template>
    <appLayout title="CSS Minify/Beautify">
        <div class="container mx-auto">
            <loadingBar :isLoading="isLoading" />
            <headerComponent title="CSS Minify/Beautify" description="Convert your nasty long css into elegant and beautiful/minified code" />

            <cardComponent title="Input" :divider="false">
                <template #buttons>
                    <button @click="minify('minify')" class="border border-green-600 text-white rounded-md px-4 py-1 mt-3">Minify</button>
                    <button @click="minify('unminify')" class="border border-blue-600 text-white rounded-md px-4 py-1 mt-3">Unminify</button>
                    <button @click="minify('unminify')" class="border border-orange-600 text-white rounded-md px-4 py-1 mt-3">Beautify</button>
                </template>
                <textarea v-model="css" class="w-full border border-borders rounded p-4 bg-foreground h-96 mt-5" placeholder="Enter CSS code here"></textarea>
            </cardComponent>

            <cardComponent title="Result" description="The Converted result will be displayed here." class="mt-5">
                <template #buttons>
                    <button @click="copyToClipboard(result)" class="border border-blue-600 text-white rounded-md px-4 py-1 mt-3">Copy</button>
                    <button @click="clear" class="border border-red-600 text-white rounded-md px-4 py-1 mt-3">Clear</button>
                </template>
                <pre ref="scrollableContainer" class="bg-background p-5 rounded-md overflow-scroll mt-3">
                    <code class="text-muted block">{{ result }}</code>
                </pre>
            </cardComponent>
        </div>
    </appLayout>
</template>

<script>
import coreService from '@/services/coreService'

export default {
    name: 'CSS Minify',
    data() {
        return {
            css: '',
            result: '',
            isLoading: false
        }
    },

    methods: {
        async minify(type) {
            this.isLoading = true;
            try {
                const response = await coreService.css({ css: this.css, type });
                if(response.status !== 200) return push.error(response.message);
                
                this.result = response.result;
            } catch (error) {
                push.error(error.message)
            } finally {
                this.isLoading = false;
            }
        },

        async clear() {
            this.css = ''
            this.result = ''
        },

        copyToClipboard(text) {
            navigator.clipboard.writeText(text)
            push.info('Copied to clipboard')
        }
    }
}
</script>