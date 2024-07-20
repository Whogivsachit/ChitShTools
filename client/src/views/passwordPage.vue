<template>
    <appLayout title="passwordPage">
        <div class="container mx-auto px-2 md:px-0">
            <loadingBar :isLoading="isLoading" />

            <!-- Header -->
            <div class="flex flex-col py-16 text-center text-white">
                <h1 class="text-5xl font-bold">Password Generator</h1>
                <p class="text-xl pt-2">Generate personalized hyper-secure passwords in seconds.</p>
            </div>

            <div class="text-2xl font-bold text-center pb-2" :class="successMessage ? 'text-green-600' : 'text-red-600'">{{ showMessage }}</div>
            <div class="flex p-5 bg-foreground rounded-md text-white w-2/3 mx-auto mb-5">
                <div class="flex gap-3 place-content-between w-full items-center">
                    <div class="text-xl" v-html="password"></div>
                    <div class="space-x-3">
                        <button @click="copyPassword" class=""><faIcon :icon="['fas', 'copy']" class="h-8" /></button>
                        <button @click="generatePassword" class=""><faIcon :icon="['fas', 'refresh']" class="h-8" /></button>
                    </div>
                </div>
            </div>

            <div class="flex p-5 bg-foreground text-white rounded-md w-2/3 mx-auto place-content-evenly">
                <div class="pt-4">
                    <span class="text-white">Password Length</span>
                    <div class="flex gap-2 pt-2">
                        <input type="number" id="length" v-model="length" class="p-2 bg-background text-white rounded-md w-full" />
                        <input type="range" id="length" v-model="length" min="1" max="64" class="bg-background text-white rounded-md w-full" />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2 items-center">
                        <input type="checkbox" id="uppercase" v-model="includeUppercase" class="bg-background text-green-600 rounded-md p-4" />
                        <label for="uppercase" class="text-lg">Include Uppercase</label>
                    </div>
                    <div class="flex gap-2 items-center">
                        <input type="checkbox" id="lowercase" v-model="includeNumbers" class="bg-background text-green-600 rounded-md p-4" />
                        <label for="lowercase" class="text-lg">Include Numbers</label>
                    </div>
                    <div class="flex gap-2 items-center">
                        <input type="checkbox" id="symbols" v-model="includeSymbols" class="bg-background text-green-600 rounded-md p-4" />
                        <label for="symbols" class="text-lg">Include Symbols</label>
                    </div>
                </div>
            </div>

        </div>
    </appLayout>
</template>


<script>
import _ from 'lodash';

export default {
    name: 'passwordPage',
    data() {
        return {
            length: 18,
            includeUppercase: true,
            includeNumbers: true,
            includeSymbols: true,
            password: '',
            successMessage: '',
            errorMessage: '',
            isLoading: false,
        };
    },

    mounted() { this.generatePassword(); },

    computed: {
        debounceGeneratePassword() {
            return _.debounce(this.generatePassword, 500);
        },
        showMessage() { return this.successMessage || this.errorMessage; }
    },

    watch: {
        length() {
            if (this.length < 1) this.length = 1;
            if (this.length > 64) this.length = 64;
            this.debounceGeneratePassword();
        },
        includeUppercase() {this.debounceGeneratePassword(); },
        includeNumbers() { this.debounceGeneratePassword(); },
        includeSymbols() { this.debounceGeneratePassword();},
    },

    methods: {
        generatePassword() {
            this.isLoading = true;
            this.password = '';
            this.successMessage = '';
            this.errorMessage = '';

            const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
            const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numberChars = '0123456789';
            const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

            let characters = lowercaseChars;
            if (this.includeUppercase) characters += uppercaseChars;
            if (this.includeNumbers) characters += numberChars;
            if (this.includeSymbols) characters += symbolChars;

            this.password = Array.from({ length: this.length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
            this.isLoading = false;
        },
        copyPassword() {
            const el = document.createElement('textarea');
            el.value = this.password;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            this.successMessage = 'Password copied to clipboard!';
        }
    }
}
</script>