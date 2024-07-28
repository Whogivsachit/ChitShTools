<template>
    <appLayout title="diffPage">
        <div class="container mx-auto">
            <headerComponent title="Diff Page" description="Use our online text difference checker to compare all types of text files." />

            <div class="flex flex-col md:flex-row gap-6 text-white">
                <div class="w-full md:w-1/2">
                    <h1 class="py-2 text-2xl text-center">Original Text</h1>
                    <span class="text-xl text-muted">w: {{ originalTextWords }}</span>
                    <span class="text-xl pl-2 text-muted">ch: {{ originalTextLength }}</span>
                    <textarea v-model="originalText" class="w-full border border-borders rounded p-4 bg-foreground h-96 mt-2" placeholder="Enter text here"></textarea>
                </div>
                <div class="w-full md:w-1/2">
                    <h1 class="py-2 text-2xl text-center">Compared Text</h1>
                    <span class="text-xl text-muted">w: {{ changedTextWords }}</span>
                    <span class="text-xl pl-2 text-muted">ch: {{ changedTextLength }}</span>
                    <textarea v-model="changedText" class="w-full border border-borders rounded p-4 bg-foreground h-96 mt-2" placeholder="Enter text here"></textarea>
                </div>
            </div>

            <cardComponent title="Comparison Result" description="The comparison result will be displayed here." class="mt-5">
                <template #buttons>
                    <button @click="clear" class="border border-red-600 text-white rounded-md px-4 py-1 mt-3">Clear</button>
                </template>
                <span class="codeblock" v-html="comparison"></span>
            </cardComponent>
            
        </div>
    </appLayout>
</template>


<script>
import { diffWords } from 'diff';

export default {
    name: 'diffPage',
    data() {
        return {
            originalText: '',
            changedText: '',
            comparison: ""
        }
    },

    computed: {
        originalTextLength() {
            return this.originalText.length;
        },

        originalTextWords() {
            return this.originalText.split(' ').length-1;
        },

        changedTextLength() {
            return this.changedText.length;
        },

        changedTextWords() {
            return this.changedText.split(' ').length-1;
        }
    },

    watch: {
        originalText: function() {
            this.comparison = this.getDifferences(this.originalText, this.changedText);
        },
        changedText: function() {
            this.comparison = this.getDifferences(this.originalText, this.changedText);
        }
    },

    methods: {
        getDifferences(text1, text2) {
            function cleanText(text) {
                return text.replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#039;');
            }

            const diffResult = diffWords(cleanText(text1), cleanText(text2));
            let result = '';
            diffResult.forEach(part => {
                const color = part.added ? 'text-green-600' : part.removed ? 'text-red-600' : 'text-muted';
                result += `<span class="${color}">${part.value}</span>`;
            });
            return result;
        },

        clear() {
            this.originalText = '';
            this.changedText = '';
            this.comparison = '';
        }
    }
}
</script>

<style scoped>
.codeblock {
    white-space: pre-wrap;
}
</style>