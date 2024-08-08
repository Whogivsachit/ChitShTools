<template>
    <appLayout title="Dns Lookup">
        <div class="container mx-auto">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="Dns Lookup" description="Dns Record Lookup" />

            <div class="flex flex-col md:flex-row gap-5">
                <cardComponent title="Domain" :divider="false" class="w-full md:w-1/2">
                    <div class="flex flex-col pt-2 w-full text-white">
                        <input type="text" v-model="domain" placeholder="google.com" class="border border-borders rounded-md bg-background/75">
                        <button @click="submit" class="bg-accent text-white rounded-md px-4 py-1 mt-3">Lookup</button>
                    </div>
                </cardComponent>

                <cardComponent title="Instructions" class="w-full md:w-1/2">
                    <p>Enter the domain you wish to check the dns information for</p>
                </cardComponent>
            </div>

            <cardComponent title="Dns Result" class="w-full mt-5">
                <template #response>
                    <div class="text-2xl font-bold" :class="successMessage ? 'text-green-600' : 'text-red-600'">{{ showMessage }}</div>
                </template>
                <div class="flex flex-col gap-2 text-white">
                    <pre class="bg-background p-5 rounded-md mt-5 overflow-x-scroll">
                        <code class="text-muted block">{{ result }}</code>
                    </pre>
                </div>
            </cardComponent>

        </div>
    </appLayout>
</template>

<script>
import coreService from '@/services/coreService';

export default {
    name: 'Dns Lookup',
    data() {
        return {
            domain: '',
            result: '',
            errorMessage: '',
            successMessage: '',
            isLoading: false
        }
    },

    computed: {
        showMessage() { return this.successMessage || this.errorMessage; },
    },

    methods: {
        async submit() {
            this.isLoading = true;
            this.errorMessage = '';
            this.successMessage = '';

            if(!this.domain) {
                this.errorMessage = 'Please enter a domain';
                return this.isLoading = false;
            }

            if(this.domain.includes('http://') || this.domain.includes('https://')) {
                this.errorMessage = 'Please enter a domain without http or https Example: google.com';
                return this.isLoading = false;
            }

            const response = await coreService.dns({ domain: this.domain });
            console.log(`[Dns] ${response.message}`);

            this.result = response.data
            this.isLoading = false;
        }
    }
}
</script>