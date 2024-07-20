<template>
    <appLayout title="qrPage">
        <div class="container mx-auto">
            <loadingBar :isLoading="isLoading" />

            <!-- Header -->
            <div class="flex flex-col py-16 text-center text-white">
                <h1 class="text-5xl font-bold">Qr-Code Generator</h1>
                <p class="text-xl pt-2">Quickly and efficiently generate QrCodes</p>
            </div>

            <!-- Main Content -->
            <div class="flex gap-5">
                <!-- Form -->
                <div class="p-5 bg-foreground rounded-md w-1/2">
                    <form @submit.prevent="generateCode">
                        <div class="flex flex-col md:flex-row gap-4">
                            <!-- Workshop Name -->
                            <div class="flex flex-col w-full text-white">
                                <span class="text-sm pl-1 pb-1">Url/Text</span>
                                <input type="text" v-model="text" placeholder="https://chit.sh | my text" class="border border-borders rounded-md bg-background/75">
                                <button type="submit" class="bg-accent text-white rounded-r-md px-4 py-1 mt-3">Generate</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- Instructions -->
                <div class="p-5 bg-foreground rounded-md w-1/2 text-white">
                    <h1 class="text-2xl">Instructions</h1>
                    <hr class="border-borders my-2">
                    <p>Step 1. Enter the URL or Text you wish to create a QR Code for.<br/>Step 2. Select a theme below<br/>Step 3. Click Generate</p>
                </div>
            </div>

            <div class="flex gap-5 pt-5">
                <!-- Result -->
                <div class="p-5 bg-foreground text-white rounded-md w-1/2">
                    <div class="flex place-content-between items-center">
                        <h1 class="text-2xl flex gap-6">Qr Code</h1>
                        <div class="text-2xl font-bold" :class="successMessage ? 'text-green-600' : 'text-red-600'">{{ showMessage }}</div>
                    </div>
                    <hr class="border-borders my-2 mb-3">
                    <div class="flex justify-center">
                        <img v-if="qrCode" :src="qrCode" alt="QR Code" class="w-1/2 p-5">
                    </div>
                </div>

                <!-- Themes -->
                <div class="p-5 bg-foreground rounded-md w-1/2 text-white">
                    <h1 class="text-2xl">Themes</h1>
                    <hr class="border-borders my-2">
                    <div class="flex place-content-between">
                        <div class="flex gap-3 pt-2 w-full">
                            <div @click="setTheme('#000000', '#ffffff')" class="flex flex-col align-middle">
                                <img src="https://cdn.chit.sh/i13LYVU3ZBij7rlMsO0S3Xgu.png" alt="Classic" class="p-5 bg-background rounded-md transition-transform duration-300 transform hover:scale-105">
                                <p class="text-center pt-2">Classic</p>
                            </div>
                            <div @click="setTheme('#FFFFFF', '#1D1F23')" class="flex flex-col align-middle">
                                <img src="https://cdn.chit.sh/kBVmbBQFyIQ8gKurzGa9UYDn.png" alt="Classic" class="p-5 bg-background rounded-md transition-transform duration-300 transform hover:scale-105">
                                <p class="text-center pt-2">Dark</p>
                            </div>
                            <div @click="setTheme('#FA4033', '#1D1F23')" class="flex flex-col align-middle">
                                <img src="https://cdn.chit.sh/4cE3Ry1oWREQHguiqiEslpH2.png" alt="Classic" class="p-5 bg-background rounded-md transition-transform duration-300 transform hover:scale-105">
                                <p class="text-center pt-2">ChitSh Theme</p>
                            </div>
                            <div @click="setTheme('#FFA000', '#000000')" class="flex flex-col align-middle">
                                <img src="https://cdn.chit.sh/z84XrxUwd0wq8XaoNFRnuyky.png" alt="Classic" class="p-5 bg-background rounded-md transition-transform duration-300 transform hover:scale-105">
                                <p class="text-center pt-2">Orange Dream</p>
                            </div>
                        </div>
                    </div>
                    <hr class="border-borders my-2">
                    <div class="flex gap-6 py-5 place-content-between">
                        <div>
                            <span class="text-white">Foreground Color</span>
                            <div class="flex">
                                <input type="color" class="h-[2rem] bg-background border border-borders" v-model="foregroundColor">
                                <input type="text" class="h-[2rem] bg-background border border-borders" v-model="foregroundColor">
                            </div>
                        </div>
                        <div>
                            <span class="text-white">Background Color</span>
                            <div class="flex">
                                <input type="color" class="h-[2rem] bg-background border border-borders" v-model="backgroundColor">
                                <input type="text" class="h-[2rem] bg-background border border-borders" v-model="backgroundColor">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </appLayout>
</template>

<script>
import coreService from '@/services/coreService';

export default {
    name: 'qrPage',
    data() {
        return {
            text: '',
            qrCode: '',
            foregroundColor: '#000000',
            backgroundColor: '#ffffff',
            successMessage: '',
            errorMessage: '',
            isLoading: false,
        }
    },

    computed: {
        showMessage() { return this.successMessage || this.errorMessage; }
    },

    methods: {
        async generateCode() {
            this.isLoading = true;
            this.errorMessage = '';
            this.successMessage = '';
            this.qrCode = ''

            if(!this.text) {
                this.errorMessage = 'Please enter valid url or text';
                return this.isLoading = false;
            }

            const response = await coreService.generateQrCode({ text: this.text, colors: { foreground: this.foregroundColor, background: this.backgroundColor} });

            if(response.status === 200) {
                this.qrCode = response.data;
                this.successMessage = response.message
            } else {
                console.log(response);
                this.errorMessage = response.message
            }

            this.isLoading = false;
        },

        setTheme(foreground, background) {
            this.foregroundColor = foreground;
            this.backgroundColor = background;
        }
    }
}
</script>