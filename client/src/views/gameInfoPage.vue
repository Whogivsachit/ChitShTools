<template>
    <appLayout title="GameInformation">
        <div class="container mx-auto px-2 md:px-0">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="GameServer Information" description="View, Monitor, Check Your gameserver information." />

            <cardComponent :divider="false" class="w-full">
                <div class="flex">
                    <input type="text" v-model="ip" placeholder="ip:port / mc.hypixel.net:25565 / 192.168.1.1:25565" class="text-white border border-borders rounded-l-md bg-background/75 w-5/6">
                    <button @click="fetchServer" class="bg-accent hover:bg-blue-800 text-white rounded-r-md md:w-1/6">Get Server Status</button>
                </div>
                <div class="flex flex-col mt-2">
                    <select v-model="game" class="text-white border border-borders rounded-md p-2 my-2 bg-background/75 w-1/2">
                        <option v-for="gameOption in gameOptions" :key="gameOption" :value="gameOption" class="capitalize">{{ gameOption}}</option>
                    </select>
                    <span class="text-white">Don't see your game? Either use the <a href="https://api.chit.sh/#/ServerInfo/get_serverinfo__game___ip___port_" target="_blank" class="underline">API</a> Directly or request a game to be added in my discord.</span>
                </div>
            </cardComponent>

            <cardComponent v-if="serverHasData" title="Server Information" :divider="true" class="w-full mt-5">
                <div class="flex flex-col space-y-1 text-muted">
                    <span class="text-xl">Hostname: <span class="text-white">{{ data.name }}</span></span>
                    <span class="text-xl">IP: <span class="text-white">{{ parsedIp[0] }}</span>:<span class="text-white">{{ parsedIp[1] }}</span></span>
                    <span class="text-xl">Game: <span class="text-white">{{ game }}</span></span>
                    <span class="text-xl">Ping: <span class="text-white">{{ data.ping }}</span></span>
                    <span class="text-xl" v-if="data.version">Version: <span class="text-white">{{ data.version }}</span></span>
                    <span class="text-xl" v-if="data.map">Map: <span class="text-white">{{ data.map }}</span></span>
                    <span class="text-xl">Players: <span class="text-white">{{ data.players }}</span></span>
                    <span class="text-xl">Max Players: <span class="text-white">{{ data.maxplayers }}</span></span>
                </div>
            </cardComponent>

            <cardComponent v-if="serverHasPlayers" title="Player List" :divider="true" class="w-full mt-5">
                <div class="flex flex-row gap-2">
                    <div v-for="player in data.playerArray" class="bg-background/75 p-2 rounded-md">
                        <span class="text-white">{{ player.name }}</span>
                    </div>
                </div>
            </cardComponent>

            <cardComponent title="Did you know we have a public Api!" :divider="true" class="w-full mt-5">
                <p class="text-lg">You can use our public api to get the server information of any minecraft server. <a href="https://api.chit.sh/#/ServerInfo/get_serverinfo__game___ip___port_" target="_blank" class="underline">Click here</a> to view the documentation.</p>
            </cardComponent>

        </div>
    </appLayout>
</template>


<script>
import CardComponent from '@/components/cardComponent.vue';
import coreService from '@/services/coreService.js';

export default {
    name: 'GameInformation',
    data() {
        return {
            ip: '',
            game: 'minecraft',
            data: {},
            gameOptions: [
                'minecraft', 'garrysmod', 'csgo', 'counterstrike2', 'counterstrike16', 'counterstrike15', 
                'barotrauma', 'baldursgate', 'asa', 'ase', 'arma3', 'abioticfactor', 'dayz', 'discord', 
                'dst', 'eco', 'enshrouded', 'factorio', 'groundbreach', 'gta5f', 'gta5r', 'halo', 'halo2', 
                'hll', 'insurgency', 'insurgencysandstorm', 'l4d', 'l4d2', 'mgm', 'mordhau', 'palworld', 
                'rainbowsix', 'ror2', 'rust', 'spaceengineers', 'squad', 'swat4', 'teamfortress2', 
                'teamspeak2', 'teamspeak3', 'theforest', 'valheim', 'vrising'
            ],
            isLoading: false,
        }
    },

    computed: {
        serverHasData() { return this.data.name?.length > 0; },
        serverHasPlayers() { return this.data?.playerArray && this.data?.playerArray[0]?.name; }, // Check if playerArray exists and has atleast 1 player with a valid name
        parsedIp() { return this.serverHasData ? this.data.ip.split(':') : []; },
    },

    methods: {
        async fetchServer() {
            this.data = {};

            if(!this.ip || !this.ip.includes(':')) return push.error('Please enter a valid IP Address or Domain Name with port number');
            if(!this.game) return push.error('Please select a game')
            this.isLoading = true;

            try {
                const response = await coreService.fetchServerInfo({ game: this.game, ip: this.ip });
                if (response.status === 500) return push.error('Server is offline or not reachable');
                if(response.status !== 200) return push.error(response.message);

                console.log(`[GameServerInfo]: ${response.data.name}`);
                
                this.data = response.data;
                push.success('Server information retrieved successfully');
            } catch (error) {
                console.error(error);
                push.error('An error occurred while fetching the server information');
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>