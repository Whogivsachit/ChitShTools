<template>
    <appLayout title="Base64 Encode/Decode">
        <div class="container mx-auto px-2 md:px-0">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="Base64 Encode/Decode" description="Encode or Decode base64 easily" />

            <div class="flex flex-col md:flex-row gap-6">
                <cardComponent title="Encode" :divider="true" class="w-full md:w-1/2">
                    <template #buttons>
                        <button @click="modify('encode')" class="bg-green-600 text-white rounded-md px-4 py-1 mt-3">Encode</button>
                        <button @click="clear('encode')" class="bg-red-600 text-white rounded-md px-4 py-1 mt-3">Clear</button>
                    </template>
                    <textarea v-model="encodeText" class="bg-background/75 text-white p-2 rounded-md mb-5 h-64 mt-2 w-full" placeholder="Enter text to encode"></textarea>
                    <h1 class="text-2xl pt-5">Result</h1>
                    <textarea v-model="encodedText" class="bg-background/75 text-white p-2 rounded-md mt-2 h-64 w-full" placeholder="Result goes here" readonly></textarea>
                </cardComponent>

                <cardComponent title="Decode" :divider="true" class="w-full md:w-1/2">
                    <template #buttons>
                        <button @click="modify('decode')" class="bg-green-600 text-white rounded-md px-4 py-1 mt-3">Decode</button>
                        <button @click="clear('decode')" class="bg-red-600 text-white rounded-md px-4 py-1 mt-3">Clear</button>
                    </template>
                    <textarea v-model="decodeText" class="bg-background/75 text-white p-2 rounded-md mb-5 h-64 mt-2 w-full" placeholder="Enter text to decode"></textarea>
                    <h1 class="text-2xl pt-5">Result</h1>
                    <textarea v-model="decodedText" class="bg-background/75 text-white p-2 rounded-md mt-2 h-64 w-full" placeholder="Result goes here" readonly></textarea>
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
            encodeText: '',
            encodedText: '',
            decodeText: '',
            decodedText: '',
            isLoading: false,
        };
    },

    methods: {
        modify(type) {
            if(type === 'encode') {
                if(!this.encodeText) return push.error('No text to encode');
                this.encodedText = btoa(this.encodeText);
                push.success('Encoded Successfuly');
            } else {
                if(!this.decodeText) return push.error('No text to decode');
                this.decodedText = atob(this.decodeText);
                push.success('Decoded Successfuly');
            }
        },

        clear(type) {
            if(type === 'encode') {
                this.encodeText = '';
                this.encodedText = '';
            } else {
                this.decodeText = '';
                this.decodedText = '';
            }
        },
    },
}
</script>