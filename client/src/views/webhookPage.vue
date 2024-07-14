<template>
    <appLayout title="GameInformation">
        <div class="container mx-auto px-2 md:px-0">
            <loadingBar :isLoading="isLoading" />

            <!-- Header -->
            <div class="flex flex-col py-16 text-center text-white">
                <h1 class="text-5xl font-bold">Webhook Sender</h1>
                <p class="text-xl pt-2">Quickly send indepth and beautiful embeds to any webhook</p>
            </div>

            <div class="text-2xl font-bold" :class="successMessage ? 'text-green-600' : 'text-red-600'">{{ showMessage }}</div>

            <div class="flex flex-col md:flex-row gap-0 md:gap-6">
                <!-- Left -->
                <div class="p-5 bg-foreground rounded-md w-full md:w-1/2">
                    
                    <!-- Header -->
                    <div class="flex place-content-between align-middle">
                        <h1 class="text-2xl text-white">Webhook Sender</h1>
                        <div class="flex flex-row space-x-3">
                            <button @click.prevent="clearAll" class="bg-background/75 hover:bg-background text-white rounded-md px-2 py-1 text-lg">Clear All</button>
                            <button @click.prevent="sendContent" class="bg-background/75 hover:bg-background text-white rounded-md px-2 py-1 text-lg">Send Only Content</button>
                            <button @click.prevent="sendEmbed" class="bg-background/75 hover:bg-background text-white rounded-md px-2 py-1 text-lg">Send Embed</button>
                        </div>
                    </div>
                    <hr class="border-borders my-2">

                    <form class="space-y-3 pt-2">
                       
                        <!-- Webhook URL -->
                        <input type="text" v-model="webhookUrl" placeholder="webhookURL" class="text-white border border-borders rounded-l-md bg-background/75 w-full">

                        <!-- Content -->
                        <h2 class="text-white font-semibold text-lg">Content</h2>
                        <textarea v-model="content" placeholder="content" class="text-white border border-borders rounded-md bg-background/75 w-full h-64"></textarea>

                        <!-- Profile -->
                        <h2 class="text-white font-semibold text-lg">Profile</h2>
                        <input type="text" v-model="profile" placeholder="Profile" class="text-white border border-borders rounded-md bg-background/75 w-full">
                        <div class="flex gap-2">
                            <input type="text" v-model="profileIcon" placeholder="Profile Icon URL" class="text-white border border-borders rounded-md bg-background/75 w-1/2">
                            <input type="text" v-model="profileUrl" placeholder="Profile URL" class="text-white border border-borders rounded-md bg-background/75 w-1/2">
                        </div>

                        <!-- Author -->
                        <h2 class="text-white font-semibold text-lg">Author</h2>
                        <div class="flex gap-2">
                            <input type="text" v-model="author" placeholder="Author" class="text-white border border-borders rounded-md bg-background/75 w-1/2">
                            <input type="text" v-model="authorIcon" placeholder="Author Icon URL" class="text-white border border-borders rounded-md bg-background/75 w-1/2">
                        </div>

                        <!-- Body -->
                        <h2 class="text-white font-semibold text-lg">Body</h2>
                        <input type="text" v-model="title" placeholder="Title" class="text-white border border-borders rounded-md bg-background/75 w-full">
                        <input type="text" v-model="description" placeholder="Description" class="text-white border border-borders rounded-md bg-background/75 w-full">
                        <div class="flex gap-2">
                            <input type="text" v-model="url" placeholder="URL" class="text-white border border-borders rounded-md bg-background/75 w-full">
                            <input type="text" v-model="color" placeholder="Color" class="text-white border border-borders rounded-md bg-background/75 w-full">  
                        </div>

                        <!-- Images -->
                        <h2 class="text-white font-semibold text-lg">Images</h2>
                        <div class="flex gap-2">
                            <input type="text" v-model="thumbnail" placeholder="Thumbnail URL" class="text-white border border-borders rounded-md bg-background/75 w-1/2">
                            <input type="text" v-model="image" placeholder="Image URL" class="text-white border border-borders rounded-md bg-background/75 w-1/2">
                        </div>

                        <!-- Footer -->
                        <h2 class="text-white font-semibold text-lg">Footer</h2>
                        <input type="text" v-model="footer" placeholder="Footer" class="text-white border border-borders rounded-md bg-background/75 w-full">
                        <div class="flex gap-2">
                            <input type="text" v-model="footerIcon" placeholder="Footer Icon URL" class="text-white border border-borders rounded-md bg-background/75 w-1/2">
                            <input type="text" v-model="timestamp" placeholder="Timestamp" class="text-white border border-borders rounded-md bg-background/75 w-1/2">
                        </div>

                        <!-- Fields -->
                        <div class="flex place-content-between items-center">
                            <h2 class="text-white font-semibold text-lg">Fields</h2>
                            <button @click.prevent="addField" class="bg-background/75 hover:bg-background text-white rounded-md px-2 py-1 text-lg">Add Field</button>
                        </div>

                        <div v-for="(field, index) in fields" :key="index" class="flex flex-col gap-2 text-white">
                            <div class="flex place-content-between items-center">
                                <h3 class="text-white font-semibold text-lg">Field {{ index }}</h3>
                                <button @click.prevent="deleteField(index)" class="bg-background/75 text-white rounded-md w-max p-2 hover:bg-background">Delete</button>
                            </div>
                            <input type="text" v-model="field.name" placeholder="Name" class="text-white border border-borders rounded-md bg-background/75 w-full">
                            <input type="text" v-model="field.value" placeholder="Value" class="text-white border border-borders rounded-md bg-background/75 w-full">
                        </div>

                    </form>
                </div>
                <!-- Right -->
                <div class="p-5 bg-foreground rounded-md w-full md:w-1/2">
                    <h1 class="text-2xl text-white">Preview </h1>
                    <p class="text-white"><a class="underline" href="https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline">Discord Markdown</a> does work but will not be displayed on this page.</p>
                    <hr class="border-borders my-2">

                    <div class="flex flex-col pt-2">
                        <div class="flex gap-2">
                            <img v-if="authorIcon" :src="authorIcon" class="w-10 h-10 rounded-full">
                            <div class="flex flex-col text-lg text-[#D6D8DC] w-full">
                                <div class="text-white font-medium space-x-2">
                                    <span :class="profileUrlActive">{{ author }}</span>
                                    <span class="bg-[#5865F2] rounded-md px-1 py-0.5 text-sm">BOT</span> 
                                    <span class="text-muted text-sm">{{ timestampComp }}</span>
                                </div>
                                <div> {{ content }}</div>

                                <div class="flex flex-col p-2 rounded-md bg-[#2B2D31] w-4/6 text-[#D6D8DC] border-l-4 space-y-2 mt-2" :style="{ 'border-color': color }">
                                    <div class="flex">
                                        <div>
                                            <p class="flex align-center"><img v-if="profileIcon" :src="profileIcon" class="w-6 h-6 rounded-full mr-2"> {{ profile }}</p>
                                            <a :href="url" class="font-bold" :class="bodyUrlActive">{{ title }}</a>
                                            <p class="text-sm">{{ description }}</p>
                                        </div>
                                        <img v-if="thumbnail" :src="thumbnail" class="h-1/3 w-1/3">
                                    </div>
                                    <div v-for="(field, index) in fields" :key="index" class="flex flex-col gap-1">
                                        <p>{{ field.name }}</p>
                                        <p>{{ field.value }}</p>
                                    </div>

                                    <div class="flex gap-2 w-1/2 h-1/2">
                                        <img v-if="image" :src="image">
                                    </div>

                                    <div class="flex gap-1 items-center">
                                        <img v-if="footerIcon" :src="footerIcon" class="w-8 h-8 rounded-full">
                                        <div class="text-muted  space-x-0.5 text-sm">
                                            <span>{{ footer }}</span>
                                            <span v-if="includeFooterDivider"> * </span>
                                            <span>{{ timestampComp }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </appLayout>
</template>


<script>
import appLayout from '@/layouts/appLayout.vue';
import coreService from '@/services/coreService.js';
import loadingBar from '@/components/loadingBar.vue';

export default {
    name: 'webhookPage',
    components: {
        appLayout,
        loadingBar,
    },
    data() {
        return {
            webhookUrl: 'https://discord.com/api/webhooks/1094472430019412019/sqA0gGRB-KWvYJBaB0tgoyS1PYPlT2s7SV2qppHeR2Le-351meUDv5GSiG64LzN-ps0v',
            content: 'Hey, welcome to CshTools Embed Sender! 🎉',
            profile: 'CshTools',
            profileIcon: 'https://cdn.chit.sh/537AYgyfHpvYQkkUErZmtRsv.jpg',
            profileUrl: 'https://chit.sh/',
            author: 'CshTools',
            authorIcon: 'https://cdn.chit.sh/537AYgyfHpvYQkkUErZmtRsv.jpg',
            title: 'What\'s this about?',
            description: 'CshTools embed sender is a tool that allows you to send beautiful embeds to any webhook you have access to. It\'s a great way to send messages to your discord server or any other webhook supported service.',
            url: '',
            color: '#58B9FF',
            thumbnail: '',
            image: '',
            footer: 'Sent by CshTools Embed Sender',
            footerIcon: 'https://cdn.chit.sh/537AYgyfHpvYQkkUErZmtRsv.jpg',
            timestamp: '',
            fields: [],
            successMessage: '',
            errorMessage: '',
            showProfileSection: true,
            isLoading: false,
        }
    },

    computed: {
        timestampComp() {
            return this.timestamp || `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        },

        profileUrlActive() {
            return this.profileUrl ? 'text-[#00A8FC]' : 'text-white';
        },

        bodyUrlActive() {
            return this.url ? 'text-[#00A8FC]' : 'text-white';
        },

        includeFooterDivider() {
            return !!this.footer && !!this.timestampComp;
        },
        
        showMessage() { return this.successMessage || this.errorMessage; }
    },

    methods: {
        async sendEmbed() {
            if(!this.webhookUrl) return this.errorMessage = 'Please provide a webhook URL';
            this.isLoading = true;

            const webhook = {
                content: this.content,
                profile: this.profile,
                profileIcon: this.profileIcon,
                profileUrl: this.profileUrl,
                author: this.author,
                authorIcon: this.authorIcon,
                title: this.title,
                description: this.description,
                url: this.url,
                color: this.color,
                thumbnail: this.thumbnail,
                image: this.image,
                footer: this.footer,
                footerIcon: this.footerIcon,
                timestamp: this.timestamp,
                fields: this.fields,
            };

            const response = await coreService.sendWebhook({webhookUrl: this.webhookUrl, webhook});
            response.stauts === 200 ? this.successMessage = response.response : this.errorMessage = response.response; // Set response based on status
            this.isLoading = false;
        },

        async sendContent() {
            if(!this.webhookUrl) return this.errorMessage = 'Please provide a webhook URL';
            this.isLoading = true;

            const webhook = {
                content: this.content,
                author: this.author,
                authorIcon: this.authorIcon,
            };

            const response = await coreService.sendWebhook({webhookUrl: this.webhookUrl, webhook, contentOnly: true});
            if(response.status === 200) {
                this.successMessage = response.response;
            } else {
                this.errorMessage = response.response;
            }
            this.isLoading = false;
        },

        addField() {
            this.fields.push({ name: '', value: '' });
        },

        deleteField(index) {
            this.fields.splice(index, 1);
        },

        clearAll() {
            Object.keys(this.$data).forEach(key => {
                this.$data[key] = '';
            });
        }
    }

}
</script>