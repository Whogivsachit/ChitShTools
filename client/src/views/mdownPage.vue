<template>
    <appLayout title="mediaDownloader">
        <div class="container mx-auto px-4 md:px-0">
            <loadingBar :isLoading="isLoading" />

            <!-- Header -->
            <div class="flex flex-col py-16 text-center text-white">
                <h1 class="text-5xl font-bold">Media Downloader</h1>
                <p class="text-xl pt-2">Download <span class="font-bold underline">Youtube</span>, <span class="font-bold underline">Spotify</span> & <span class="font-bold underline">SoundCloud</span> videos and audio in high quality.</p>
            </div>

            <!-- Status -->
            <div v-if="loading" class="text-3xl font-bold blinking text-center text-green-600 pt-2">Downloading...</div>
            <div class="text-2xl font-bold text-center pt-2" :class="success ? 'text-green-600' : 'text-red-600'">{{ showMessage }}</div>

            <div class="flex flex-col md:flex-row gap-6 mx-auto">
                <!-- Media Downloader [LEFT] -->
                <div class="flex flex-col gap-6 w-full md:w-2/3">
                    <div class="flex flex-col bg-foreground rounded-md p-5">
                        <form @submit.prevent="downloadMedia" class="flex flex-col w-full">
                            <span class="text-white text-left">Media Link:</span>
                            <input type="text" name="link" v-model="link" placeholder="Paste your video link here" class="text-white border border-borders rounded-md p-2 my-2 bg-background/75">

                            <div class="flex gap-4">
                                <div class="flex flex-col pt-2 w-1/3">
                                    <span class="text-white text-left">Download:</span>
                                    <select v-model="format" class="text-white border border-borders rounded-md p-2 my-2 bg-background/75">
                                        <option value="audio">Audio</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                                <div class="flex flex-col pt-2 w-1/3">
                                    <span class="text-white text-left">Download as: </span>
                                    <select v-model="fileType" class="text-white border border-borders rounded-md p-2 my-2 bg-background/75">
                                        <option v-for="fileType in fileTypes[format]" :value="fileType">{{ fileType }}</option>
                                    </select>
                                </div>
                                <div class="flex flex-col pt-2 w-1/3">
                                    <span class="text-white text-left">Quality:</span>
                                    <select v-model="quality" class="text-white border border-borders rounded-md p-2 my-2 bg-background/75">
                                        <option value="best">Best</option>
                                        <option value="worst">Worst</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" class="bg-accent hover:bg-blue-800 text-white rounded-md p-2 my-2">Download</button>
                        </form>
                    </div>
                    <!-- How to download -->
                    <div class="flex flex-col bg-foreground p-5 rounded-md">
                        <h2 class="text-white text-2xl pb-5">How do I download a video/audio here?</h2>
                        <p class="text-white">To download a video or audio, simply paste the link of the video/audio you want to download in the input field to the left. Select the format you want to download the media in, the quality and click the download button. The media will be downloaded to your device.</p>
                        <p class="text-white py-2"><span class="font-bold text-xl">Note:</span> The download process may take a few seconds to complete depending on the size of the media and your internet connection.</p>

                        <div class="text-white pt-5 space-y-1">
                            <p class="font-bold text-lg">Q: Why are the downloads on this site slower than other downloaders?</p>
                            <p class="text-md">A: We download and transcode only the highest quality available due to this it might take a little longer to download your media.</p>
                            <p class="font-bold text-lg pt-5">Q: Can I download playlists?</p>
                            <p class="text-md">A: Currently we do not support downloading playlists.</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-6 w-full md:w-1/3">
                    <div class="bg-foreground p-5 rounded-md text-white">
                        <h1 class="text-2xl">Download History</h1>
                        <hr class="border-borders my-2">
                        <ul>
                            <li class="text-md">Not Implemented Yet</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </appLayout>
</template>


<script>
import coreService from '@/services/coreService.js';
import axios from 'axios';

export default {
    name: 'mediaDownloader',
    data() {
        return {
            link: '',
            format: 'audio',
            quality: 'best',
            fileType: 'wav',
            fileTypes: {
                audio: ['wav', '3gp', 'aac', 'flv', 'm4a', 'mp3', 'ogg', 'webm'],
                video: ['mp4', 'webm'],
            },
            error: '',
            success: '',
            loading: false,
            isLoading: false,
        }
    },

    watch: {
        format() {
            this.fileType = this.fileTypes[this.format][0];
        }
    },

    computed: {
        showMessage() { return this.success || this.error; }
    },

    methods: {
        async downloadMedia() {
            this.error = '';
            this.success = '';

            // Check if links contains youtube.com, spotify.com or soundcloud.com
            const regex = /youtube\.com|spotify\.com|soundcloud\.com/;
            if(!regex.test(this.link) || !this.link) return this.error = 'Please enter a valid Youtube, Spotify or SoundCloud link'; 
            this.isLoading = true;           
            
            try {
                this.loading = true;
                const response = await coreService.downloadMedia({ 
                    link: this.link, 
                    format: this.format, 
                    fileType: this.fileType, 
                    quality: this.quality
                });

                if(response.status !== 200) return this.error = response.message;

                this.loading = false;
                this.success = 'Media downloaded successfully';
                console.log(response.file) // Echos for debug

                const file = await axios.get(response.file, { responseType: 'blob', });
                const url = window.URL.createObjectURL(new Blob([file.data]));
                const link = document.createElement('a');

                link.href = url;
                link.setAttribute('download', `${response.name}`);
                document.body.appendChild(link);
                link.click();
                this.isLoading = false;  

            } catch (error) {
                this.error = error.message;
                this.loading = false;
                this.isLoading = false;  
            }
        }
    }
}
</script>