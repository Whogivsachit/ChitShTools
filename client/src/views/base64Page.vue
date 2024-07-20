<template>
    <appLayout title="base64Page">
        <div class="container mx-auto px-2 md:px-0">
            <loadingBar :isLoading="isLoading" />

            <!-- Header -->
            <div class="flex flex-col py-16 text-center text-white">
                <h1 class="text-5xl font-bold">Base64 Encode/Decode</h1>
                <p class="text-xl pt-2">Easily Encode or Decode base64</p>
            </div>

            <div class="flex flex-row gap-6">
                <!-- Encode -->
                <div class="flex flex-col p-5 bg-foreground text-white rounded-md w-1/2">
                    <div class="flex place-content-between items-center">
                        <h1 class="text-2xl">Encode</h1>
                        <div class="text-2xl font-bold text-green-600">{{ encodeSuccessMessage }}</div>
                        <div class="space-x-3 pb-2">
                            <button @click="modify('encode')" class="bg-green-600 text-white rounded-md px-4 py-1 mt-3">Encode</button>
                            <button @click="clear('encode')" class="bg-red-600 text-white rounded-md px-4 py-1 mt-3">Clear</button>
                        </div>
                    </div>
                    <hr class="border-borders my-2">
                    <textarea v-model="encodeText" class="bg-background/75 text-white p-2 rounded-md mb-5 h-64 mt-2" placeholder="Enter text to encode"></textarea>
                    <h1 class="text-2xl pt-5">Result</h1>
                    <textarea v-model="encodedText" class="bg-background/75 text-white p-2 rounded-md mt-2 h-64" placeholder="Result goes here" readonly></textarea>
                </div>
                <!-- Decode -->
                <div class="flex flex-col p-5 bg-foreground text-white rounded-md w-1/2">
                    <div class="flex place-content-between items-center">
                        <h1 class="text-2xl">Decode</h1>
                        <div class="text-2xl font-bold text-green-600">{{ decodeSuccessMessage }}</div>
                        <div class="space-x-3 pb-2">
                            <button @click="modify('decode')" class="bg-green-600 text-white rounded-md px-4 py-1 mt-3">Decode</button>
                            <button @click="clear('decode')" class="bg-red-600 text-white rounded-md px-4 py-1 mt-3">Clear</button>
                        </div>
                    </div>
                    <hr class="border-borders my-2">
                    <textarea v-model="decodeText" id="textarea1" class="bg-background/75 text-white p-2 rounded-md mb-5 h-64 mt-2" placeholder="Enter text to decode"></textarea>
                    <h1 class="text-2xl pt-5">Result</h1>
                    <textarea v-model="decodedText" id="textarea2" class="bg-background/75 text-white p-2 rounded-md h-64 mt-2" placeholder="Result goes here" readonly></textarea>
                </div>
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
            encodeSuccessMessage: '',
            decodeSuccessMessage: '',
            errorMessage: '',
            isLoading: false,
        };
    },

    methods: {
        modify(type) {
            if(type === 'encode') {
                this.encodedText = btoa(this.encodeText);
                this.encodeSuccessMessage = 'Encoded Successfuly';
            } else {
                this.decodedText = atob(this.decodeText);
                this.decodeSuccessMessage = 'Decoded Successfuly';
            }
        },
        clear(type) {
            if(type === 'encode') {
                this.encodeText = '';
                this.encodedText = '';
                this.encodeSuccessMessage = '';
            } else {
                this.decodeText = '';
                this.decodedText = '';
                this.decodeSuccessMessage = '';
            }
        },
    },
}
</script>