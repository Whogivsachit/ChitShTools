<template>
    <appLayout title="nmapPage">
        <div class="container mx-auto">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="Nmap Scanner" description="Scan for opened ports on your networks" />

            <div class="flex gap-4">
                <cardComponent title="Scan your network" class="w-2/3">
                    <template #buttons>
                        <button @click="scan" class="bg-green-500 hover:bg-red-600 text-white rounded-md px-5 py-2">Scan</button>
                    </template>
                    <div class="flex flex-col space-y-2 pt-2">
                        <label for="host" class="text-muted">IP Address [IP Or Host]</label>
                        <input type="text" v-model="host" placeholder="1.1.1.1" class="bg-foreground/75 rounded-md" />

                        <label for="flags" class="text-muted">Flags</label>
                        <input type="text" v-model="flags" placeholder="-sS -p 80" class="bg-foreground/75 rounded-md" />

                        <h1 class="text-xl font-bold pt-5">Common ports</h1>
                        <div class="flex place-content-between">
                            <ul>
                                <li>21 FTP</li>
                                <li>22 SSH</li>
                                <li>23 Telnet</li>
                                <li>25 SMTP</li>
                                <li>53 DNS</li> 
                            </ul>
                            <ul>
                                <li>80 HTTP</li>
                                <li>110 POP3</li>
                                <li>115 SFTP</li>
                                <li>135 RPC</li>
                                <li>139 NetBIOS</li>  
                            </ul>
                            <ul>
                                <li>143 IMAP</li>
                                <li>194 IRC</li>
                                <li>443 SSL</li>
                                <li>445 SMB</li>
                                <li>1433 MSSQL</li> 
                            </ul>
                            <ul>
                                <li>3306 MySQL</li>
                                <li>3389 Remote Desktop</li>
                                <li>5632 PCAnywhere</li>
                                <li>5900 VNC</li>
                                <li>25565 Minecraft</li>
                            </ul>
                        </div>
                    </div>
                </cardComponent>

                <cardComponent title="Result" class="w-2/3">
                    <template #response>
                        <div class="text-2xl font-bold pb-2" :class="successMessage ? 'text-green-600' : 'text-red-600'">{{ showMessage }}</div>
                    </template>
                    <pre class="bg-background p-5 rounded-md mt-2 h-[23rem] overflow-y-scroll">
                        <code class="text-muted block">{{ results }}</code>
                    </pre>
                </cardComponent>
            </div>

            <div class="flex pt-4 gap-4">
                <cardComponent title="What Is Nmap?" :divider="true" class="w-1/2 space-y-4">
                    <p>Nmap is a powerful network exploration and security auditing tool. It can be used to identify hosts and services on a network, as well as security issues. Nmap is widely used in the cyber security community and is an essential tool for penetration testing.</p>
                    <p>Nmap can easily identify open ports on the target host making it easy for you to audit your own website security. Nmap is also frequently used to scan for vulnerable open ports on systems.</p>
                    <p>Nmap is available for free and runs on all major platforms including Windows, Linux, and OS X.</p>
                </cardComponent>

                <cardComponent title="Disclaimer" :divider="true" class="w-1/2 space-y-4">
                    <p>WARNING: This utility is for educational purposes only and should only be used on your own infrastructure. Use of this tool for any other reason is strictly prohibited.</p>
                    <p>By using this utility, you understand that you are solely responsible for any and all consequences that may arise from its use and agree to hold harmless the creator of this tool from any and all liability. This tool is provided "as is" with no warranty of any kind, express or implied.</p>
                </cardComponent>
            </div>

        </div>
    </appLayout>
</template>

<script>
import coreService from '@/services/coreService';

export default {
    name: 'nmapPage',
    data() {
        return {
            host: '',
            flags: '-Pn',
            results: '',
            successMessage: '',
            errorMessage: '',
            isLoading: false
        }
    },

    computed: {
        showMessage() { return this.successMessage || this.errorMessage; }
    },

    methods: {
        async scan() {
            this.results = '';
            this.successMessage = '';
            this.errorMessage = '';
            this.isLoading = true;

            const localPatterns = ['localhost', '192.168', '127.0', '172.16', '10.10', '0.0'];
            if (localPatterns.some(pattern => this.host.startsWith(pattern))) {
                this.isLoading = false;
                return this.errorMessage = 'Please enter a valid host';
            }

            try {
                const response = await coreService.nmap({host: this.host, flags: this.flags});
                if(response.status !== 200) return this.errorMessage = response.message;
                console.log(`[nmapScanner] Executed`);

                this.results = response.data;
                this.successMessage = response.message;
                this.isLoading = false;
            } catch (error) {
                this.errorMessage = error;
                this.isLoading = false;
            }
        }
    }
}
</script>