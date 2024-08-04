<template>
    <appLayout title="smtpPage">
        <div class="container mx-auto px-2 md:px-0">
            <loadingBar :isLoading="isLoading" />

            <!-- Header -->
            <headerComponent title="SMTP Test Tool" description="Quickly and easily test your connection to Sendgrid, Mailgun, Amazon SES, or any smtp server." />

            <!-- Form -->
            <cardComponent :divider="false">
                <form @submit.prevent="sendEmail">
                    <div class="flex flex-col md:flex-row gap-4">
                        <!-- SMTP URL -->
                        <div class="flex flex-col w-full text-white">
                            <span class="text-sm pl-1 pb-1">SMTP Server IP/URL</span>
                            <input type="text" v-model="smtpServer" placeholder="your.site.com" class="border border-borders rounded-l-md bg-background/75">
                        </div>

                        <!-- SMTP port -->
                        <div class="flex flex-col w-full text-white">
                            <span class="text-sm pl-1 pb-1">SMTP Port <span class="text-muted">[25, 2525, 465, 587]</span></span>
                            <input type="number" v-model="smtpPort" placeholder="587" class="border border-borders rounded-r-md bg-background/75">
                        </div>

                        <!-- Security Type -->
                        <div class="flex flex-col w-full text-white">
                            <span class="text-sm pl-1 pb-1">Security Type</span>
                            <select v-model="smtpSecurity" class="text-white border border-borders rounded-md bg-background/75 w-full">
                                <option value="auto">Auto</option>
                                <option value="none">None</option>
                                <option value="ssl">SSL</option>
                                <option value="tls">TLS</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex gap-4 pt-2">
                        <!-- Username -->
                        <div class="flex flex-col w-full text-white">
                            <span class="text-sm pl-1 pb-1">Username</span>
                            <input type="text" v-model="username" placeholder="Username" class="border border-borders rounded-l-md bg-background/75">
                        </div>

                        <!-- Password -->
                        <div class="flex flex-col w-full text-white">
                            <span class="text-sm pl-1 pb-1">Password</span>
                            <input type="password" v-model="password" placeholder="Password" class="border border-borders rounded-r-md bg-background/75">
                        </div>
                    </div>
                    <div class="flex gap-4 pt-2">
                        <!-- To -->
                        <div class="flex flex-col w-full text-white">
                            <span class="text-sm pl-1 pb-1">To Email Address</span>
                            <input type="text" v-model="to" placeholder="To" class="border border-borders rounded-l-md bg-background/75">
                        </div>

                        <!-- From -->
                        <div class="flex flex-col w-full text-white">
                            <span class="text-sm pl-1 pb-1">From Email Address</span>
                            <input type="text" v-model="from" placeholder="From" class="border border-borders rounded-r-md bg-background/75">
                        </div>
                    </div>

                    <button type="submit" class="bg-accent hover:bg-blue-800 text-white rounded-md mt-5 px-5 py-2">Send Email</button>
                    <div class="text-2xl font-bold mt-4" :class="successMessage ? 'text-green-600' : 'text-red-600'">{{ showMessage }}</div>
                </form>
            </cardComponent>


            <!-- SMTP Information -->
            <cardComponent title="Confused on how this works?" class="mt-5">
                <ul class="text-muted">
                    <li>Fill out the form with your SMTP server information.</li>
                    <li>Click the "Send Email" button.</li>
                    <li>Check your email inbox for the test email.</li>

                    <li class="pt-2"><span class="text-white">SMTP Server IP/URL:</span> host or ip address of your smtp server (example: smtp.site.com) </li>
                    <li><span class="text-white">SMTP Port:</span> port of your smtp server (example: 587)</li>
                    <li><span class="text-white">Security Type:</span> type of security to use when connecting to the smtp server</li>
                    <li><span class="text-white">Username:</span> username to authenticate with the smtp server</li>
                    <li><span class="text-white">Password:</span> password to authenticate with the smtp server</li>
                    <li><span class="text-white">To:</span> email address to send the test email to</li>
                    <li><span class="text-white">From:</span> email address to send the test email from</li>
                </ul>
            </cardComponent>
        </div>
    </appLayout>
</template>



<script>
import coreService from '@/services/coreService.js';

export default {
    name: 'smtpPage',
    data() {
        return {
            smtpServer: '',
            smtpPort: '',
            smtpSecurity: 'auto',
            username: '',
            password: '',
            to: '',
            from: '',
            successMessage: '',
            errorMessage: '',
            isLoading: false,
        }
    },

    computed: {
        showMessage() { return this.successMessage || this.errorMessage; }
    },

    methods: {
        async sendEmail() {
            this.successMessage = '';
            this.errorMessage = '';

            if(!this.smtpServer || !this.smtpPort || !this.username || !this.password || !this.to || !this.from || !this.smtpSecurity) return this.errorMessage = 'Please fill out all fields';
            
            this.isLoading = true;

            const response = await coreService.sendEmail({
                smtpServer: this.smtpServer,
                smtpPort: this.smtpPort,
                smtpSecurity: this.smtpSecurity,
                username: this.username,
                password: this.password,
                to: this.to,
                from: this.from,
            });
            
            response.status !== 200 ? 
            this.errorMessage = `${response.status} - ${response.message}` : 
            this.successMessage = `${response.status} - ${response.message}`;
            console.log(`[SMTP Sender]: ${response.message}`);
            this.isLoading = false;
        }
    }

}
</script>