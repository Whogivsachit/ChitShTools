<template>
    <appLayout title="sshCPage">
        <div class="container mx-auto">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="SSH Client" description="Login into any server straight in your browser" />

            <div class="flex gap-4">
                <cardComponent v-if="!isConnected" class="w-1/2">
                    <template #response>
                        <div class="text-2xl font-bold pb-2" :class="successMessage ? 'text-green-600' : 'text-red-600'">{{ showMessage }}</div>
                    </template>
                    <form @submit.prevent="connectToSSH">
                        <div class="flex flex-col md:flex-row gap-4">
                            <!-- Server Host -->
                            <div class="flex flex-col w-full text-white">
                                <span class="text-sm pl-1 pb-1">Server Host</span>
                                <input type="text" v-model="sshDetails.host" placeholder="192.168.1.1" class="border border-borders rounded-l-md bg-background/75">
                            </div>

                            <!-- Server Port -->
                            <div class="flex flex-col w-full text-white">
                                <span class="text-sm pl-1 pb-1">Server Port <span class="text-muted">[21, 22]</span></span>
                                <input type="number" v-model="sshDetails.port" placeholder="22" class="border border-borders rounded-r-md bg-background/75">
                            </div>
                        </div>
                        <div class="flex gap-4 pt-2">
                            <!-- Username -->
                            <div class="flex flex-col w-full text-white">
                                <span class="text-sm pl-1 pb-1">Username</span>
                                <input type="text" v-model="sshDetails.username" placeholder="Username" class="border border-borders rounded-l-md bg-background/75">
                            </div>

                            <!-- Password -->
                            <div class="flex flex-col w-full text-white">
                                <span class="text-sm pl-1 pb-1">Password</span>
                                <input type="password" v-model="sshDetails.password" placeholder="Password" class="border border-borders rounded-r-md bg-background/75">
                            </div>
                        </div>
                        <button type="submit" class="bg-accent hover:bg-blue-800 text-white rounded-md mt-5 px-5 py-2">Connect</button>
                    </form>
                </cardComponent>

                <cardComponent v-if="isConnected" title="Shell" :divider="true" class="w-full h-[77vh]">
                    <template #buttons>
                        <button @click="this.disconnect" class="bg-red-500 hover:bg-red-600 text-white rounded-md px-5 py-2">Disconnect</button>
                        <button @click="sendCommand('\x03')" class="bg-blue-500 hover:bg-red-600 text-white rounded-md px-5 py-2">Send ^C</button>
                    </template>
                    <pre ref="scrollableContainer" class="bg-background p-5 rounded-md h-[65vh] overflow-y-scroll">
                        <code class="text-muted block">{{ shellOutput }}</code>
                    </pre>
                    <input type="text" v-model="command" @keyup.enter="inputCommand" placeholder="Enter Command..." class="bg-foreground/75 w-full mt-3 rounded-md"/>
                </cardComponent>
            </div>
        </div>
    </appLayout>
</template>

<script>
import io from 'socket.io-client';
import { nextTick } from 'vue';

export default {
    name: 'sshCPage',
    data() {
        return {
            sshDetails: {
                host: '',
                port: 22,
                username: 'root',
                password: ''
            },
            isConnected: false,
            shellOutput: '',
            command: '',
            socket: null,
            isLoading: false,
            successMessage: '',
            errorMessage: '',
        };
    },

    computed: {
        showMessage() { return this.successMessage || this.errorMessage; }
    },

    methods: {
        async connectToSSH() {
            this.isLoading = true;
            this.errorMessage = '';
            this.successMessage = '';

            const localPatterns = ['localhost', '192.168', '127.0', '172.16', '10.10', '0.0'];
            if (localPatterns.some(pattern => this.sshDetails.host.startsWith(pattern))) {
                this.isLoading = false;
                return this.errorMessage = 'Please enter a valid host';
            }

            this.socket = io('http://localhost:3000');
            
            this.socket.on('connect', () => {
                console.log(`[WebSocket] connected: (${this.sshDetails.host}:${this.sshDetails.port})`);
                this.socket.emit('connectSSH', this.sshDetails);
            });

            this.socket.on('data', (data) => {
                this.shellOutput += data.replace(/\x1b\[[0-?]*[ -\/]*[@-~]/g, '')
                this.scrollToBottom();
                this.isLoading = false;
            });

            this.socket.on('disconnect', () => {
                console.log('[WebSocket] Disconnected Goodbye!');
                this.isConnected = false;
                this.command = '';
                this.shellOutput = '';
            });

            this.isConnected = true;
        },

        async inputCommand() {
            this.socket.emit('command', this.command);
            this.command = '';
        }, 

        async sendCommand(data) {
            this.socket.emit('command', data);
        },

        scrollToBottom() {
            nextTick(() => {
                if(this.isConnected = true) {
                    const container = this.$refs.scrollableContainer;
                    container.scrollTop = container.scrollHeight;
                }
            });
        },

        disconnect() {
            this.socket.disconnect();
            this.isConnected = false;
            this.isLoading = false;
        },
    }
}
</script>