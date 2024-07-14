<template>
    <appLayout title="GameInformation">
        <div class="container mx-auto px-2 md:px-0">
            <loadingBar :isLoading="isLoading" />

            <!-- Header -->
            <div class="flex flex-col py-16 text-center text-white">
                <h1 class="text-5xl font-bold">GameServer Information</h1>
                <p class="text-xl pt-2">View, Monitor, Check Your gameserver information.</p>
            </div>

            <!-- Form -->
            <div class="p-5 w-full bg-foreground rounded-md">
                <form @submit.prevent="fetchServer">
                    <div class="flex">
                        <input type="text" v-model="ip" placeholder="ip:port / mc.hypixel.net:25565 / 192.168.1.1:25565" class="text-white border border-borders rounded-l-md bg-background/75 w-5/6">
                        <button type="submit" class="bg-accent hover:bg-blue-800 text-white rounded-r-md w-1/6">Get Server Status</button>
                    </div>
                    <div class="flex flex-col mt-2">
                        <select v-model="game" class="text-white border border-borders rounded-md p-2 my-2 bg-background/75 w-1/2">
                            <option v-for="gameOption in gameOptions" :key="gameOption" :value="gameOption.split(':')[0]">{{ gameOption.split(':')[1] }}</option>
                        </select>
                        <span class="text-white">Don't see your game? Either use the <a href="https://api.chit.sh/#/ServerInfo/get_serverinfo__game___ip___port_" target="_blank" class="underline">API</a> Directly or request a game to be added in my discord.</span>
                        <div class="text-2xl font-bold  pt-2" :class="success ? 'text-green-600' : 'text-red-600'">{{ showMessage }}</div>
                    </div>
                </form>
            </div>

            <!-- Server Data -->
            <div v-if="serverHasData" class="p-5 w-full bg-foreground rounded-md mt-5 text-white">
                <h1 class="text-2xl">Server Information</h1>
                <hr class="border-borders my-2">
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
            </div>

            <!-- Server Players -->
            <div v-if="serverHasPlayers" class="p-5 w-full bg-foreground rounded-md mt-5 text-white">
                <h1 class="text-2xl">Player List</h1>
                <hr class="border-borders my-2">
                <div class="flex flex-row gap-2">
                    <div v-for="player in data.playerArray" class="bg-background/75 p-2 rounded-md">
                        <span class="text-white">{{ player.name }}</span>
                    </div>
                </div>
            </div>

            <!-- API Information -->
            <div class="bg-foreground p-5 rounded-md text-white mt-5">
                <h1 class="text-2xl">Did you know we have a public api!</h1>
                <hr class="border-borders my-2">
                <p class="text-lg">You can use our public api to get the server information of any minecraft server. <a href="https://api.chit.sh/#/ServerInfo/get_serverinfo__game___ip___port_" target="_blank" class="underline">Click here</a> to view the documentation.</p>
            </div>
            
        </div>
    </appLayout>
</template>


<script>
import appLayout from '@/layouts/appLayout.vue';
import coreService from '@/services/coreService.js';
import loadingBar from '@/components/loadingBar.vue';

export default {
    name: 'mediaDownloader',
    components: {
        appLayout,
        loadingBar,
    },
    data() {
        return {
            ip: '',
            game: 'minecraft',
            error: '',
            success: '',
            data: {},
            gameOptions: [
                'minecraft:Minecraft', 'garrysmod:Garrys Mod', 'csgo:Counter Strike Global Offensive', 'counterstrike2:Counter Strike 2', 'counterstrike16:Counter Strike 1.6', 'counterstrike15:Counter Strike 1.5', 
                'barotrauma:Barotrauma', 'baldursgate:Baldurs Gate', 'asa:Arc Survival Ascended', 'ase:Ark Survival Evolved', 'arma3:Arma3', 'abioticfactor:Abiotic Factor', 'dayz:Dayz', 'discord:Discord', 
                'dst: Dont Starve Together', 'eco:Eco', 'enshrouded:Enshrouded', 'factorio:Factorio', 'groundbreach:GroundBreach', 'gta5f:Gta5 Fivem', 'gta5r: Gta5 Rage', 'halo: Halo', 'halo2: Halo2', 
                'hll:Hell Let Loose', 'insurgency:Insurgency', 'insurgencysandstorm:InsurgencySandstorm', 'l4d:Left4Dead', 'l4d2:Left4Dead2', 'mgm:Mumble', 'mordhau:Mordhau', 'palworld:Palworld', 
                'rainbowsix:Rainbow Six', 'ror2:Risk of rain 2', 'rust:Rust', 'spaceengineers:Space Engineers', 'squad:Squad', 'swat4:Swat4', 'teamfortress2:TeamFortress 2', 'teamspeak2:TeamSpeak 2', 
                'teamspeak3:TeamSpeak 3', 'theforest:The Forest', 'valheim:Valheim', 'vrising:V Rising'
            ],
            isLoading: false,
        }
    },

    computed: {
        serverHasData() { return this.data.name?.length > 0; },
        serverHasPlayers() { return this.data?.playerArray && this.data?.playerArray[0]?.name; }, // Check if playerArray exists and has atleast 1 player with a valid name
        parsedIp() { return this.serverHasData ? this.data.ip.split(':') : []; },
        showMessage() { return this.success || this.error; }
    },

    methods: {
        async fetchServer() {
            this.error = '';
            this.success = '';
            this.data = {};
            if(!this.ip || !this.ip.includes(':')) return this.error = 'Please enter a valid IP Address or Domain Name with port number';
            if(!this.game) return this.error = 'Please select a game';
            this.isLoading = true;

            try {
                const response = await coreService.fetchServerInfo({ game: this.game, ip: this.ip });
                if (response.status === 500) return this.error = 'Server is offline or not reachable'; // Api returns 500 on unreachable servers
                this.data = response.data;
                this.success = 'Server information retrieved successfully';
                this.isLoading = false;
            } catch (error) {
                this.error = 'An error occurred while fetching the server information';
                this.isLoading = false;
            }
        }
    }
}
</script>