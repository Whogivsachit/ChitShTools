<template>
    <appLayout title="WhoIs">
        <div class="container mx-auto">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="WhoIs" description="WhoIs domain lookup" />

            <div class="flex flex-col md:flex-row gap-5">
                <cardComponent title="Domain" :divider="false" class="w-full md:w-1/2">
                    <div class="flex flex-col pt-2 w-full text-white">
                        <input type="text" v-model="domain" placeholder="google.com" class="border border-borders rounded-md bg-background/75">
                        <button @click="submit" class="bg-accent text-white rounded-md px-4 py-1 mt-3">Lookup</button>
                    </div>
                </cardComponent>

                <cardComponent title="Instructions" class="w-full md:w-1/2">
                    <p>Enter the domain you wish to check the whois information for</p>
                </cardComponent>
            </div>

            <cardComponent title="Whois Result" class="w-full mt-5">
                <div class="flex flex-col gap-2 text-white">
                    <pre class="bg-background p-5 rounded-md mt-5 overflow-x-scroll">
                        <code class="text-muted block" v-html="formattedResponse"></code>
                    </pre>
                </div>
            </cardComponent>

        </div>
    </appLayout>
</template>

<script>
import coreService from '@/services/coreService';

export default {
    name: 'WhoIs',
    data() {
        return {
            domain: '',
            result: '',
            isLoading: false
        }
    },

    computed: {
        formattedResponse() { return this.result.replace(/(.*):(.*)/g, '<span class="text-white">$1</span>:$2'); }
    },

    methods: {
        async submit() {
            this.isLoading = true;

            if(!this.domain) {
                push.error('Please enter a domain')
                return this.isLoading = false;
            }

            if(this.domain.includes('http://') || this.domain.includes('https://')) {
                push.error('Please enter a domain without http or https Example: google.com');
                return this.isLoading = false;
            }

            try {
                const response = await coreService.whois({ domain: this.domain });
                if(response.status !== 200) return push.error(response.message);

                console.log(`[whoIs] ${response.message}`);

                this.result = response.data
                push.success('WhoIs lookup successful');
            } catch(error) {
                console.error(error);
                push.error('An error occurred');
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>