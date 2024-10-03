<template>
    <appLayout title="mediaDownloader">
        <div class="container mx-auto px-4 md:px-0">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="Media Downloader" :divider="false">
                <p class="text-xl pt-2">Download <span class="font-bold underline">Youtube</span>, <span class="font-bold underline">Spotify</span> & <span class="font-bold underline">SoundCloud</span> videos and audio in high quality.</p>
            </headerComponent>

            <div v-if="isLoading" class="text-3xl font-bold blinking text-center text-green-600 pt-2">Downloading...</div>

            <div class="flex flex-col md:flex-row gap-6 mx-auto">
                <div class="flex flex-col gap-6 w-full md:w-full">
                    <cardComponent :divider="false" class="w-full">
                        <div class="flex flex-col w-full">
                            <span class="text-white text-left">Media Link:</span>
                            <input type="text" name="link" v-model="link" placeholder="Paste your video link here" class="text-white border border-borders rounded-md p-2 my-2 bg-background/75">

                            <div class="flex gap-4">
                                <div class="flex flex-col pt-2 w-1/3">
                                    <span class="text-white text-left">Download:</span>
                                    <select v-model="format" class="text-white border border-borders rounded-md p-2 my-2 bg-background/75">
                                        <option value="audio">Audio</option>
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
                            <button @click="downloadMedia" class="bg-accent hover:bg-blue-800 text-white rounded-md p-2 my-2">Download</button>
                        </div>
                    </cardComponent>

                    <cardComponent title="How do I download a video/audio here?" :divider="true">
                        <p class="text-white">To download a video or audio, simply paste the link of the video/audio you want to download in the input field to the left. Select the format you want to download the media in, the quality and click the download button. The media will be downloaded to your device.</p>
                        <p class="text-white py-2"><span class="font-bold text-xl">Note:</span> The download process may take a few seconds to complete depending on the size of the media and your internet connection.</p>

                        <div class="text-white pt-5 space-y-1">
                            <p class="font-bold text-lg">Q: Why are the downloads on this site slower than other downloaders?</p>
                            <p class="text-md">A: We download and transcode only the highest quality available due to this it might take a little longer to download your media.</p>
                            <p class="font-bold text-lg pt-5">Q: Can I download Videos?</p>
                            <p class="text-md">A: No as of right now downloading as video is disabled due to high BW Costs</p>                            
                            <p class="font-bold text-lg pt-5">Q: Can I download playlists?</p>
                            <p class="text-md">A: Of course! We currently limit downloading to only 16 item playlists though. If you need a better solution for long playlists we recommend using the yt-dlp on cli</p>
                        </div>
                    </cardComponent>
                </div>
            </div>
        </div>
    </appLayout>
</template>


<script>
import coreService from '@/services/coreService.js';

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
                // video: ['mp4', 'webm'], Video has been disabled due to high BW Costs
            },
            isLoading: false,
        }
    },

    watch: {
        format() {
            this.fileType = this.fileTypes[this.format][0];
        }
    },

    methods: {
        createBlobFromBase64(base64, type) {
            const byteCharacters = atob(base64);
            const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type });
        },

        downloadBlob(blob, filename) {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${filename}`);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        },

        async downloadMedia() {

            // Check if links contains youtube.com, spotify.com or soundcloud.com
            const regex = /youtube\.com|spotify\.com|soundcloud\.com|youtu\.be/;
            if(!regex.test(this.link) || !this.link) return push.error('Please enter a valid Youtube, Spotify or SoundCloud link') ;
            if(!this.link) return push.error('Please enter a link');
            this.isLoading = true;           
            
            try {
                const response = await coreService.downloadMedia({ 
                    link: this.link, 
                    format: this.format, 
                    fileType: this.fileType, 
                    quality: this.quality
                });

                if(!response.file) return push.error(response.message);
                
                console.log(`[Media Downloader]: ${response.message}`);

                if(response.playlist) {
                    const blob = this.createBlobFromBase64(response.file, 'application/zip');
                    this.downloadBlob(blob, `[${this.$appName}] playlist.zip`);
                } else {
                    const blob = this.createBlobFromBase64(response.file, response.type);
                    this.downloadBlob(blob, response.message);
                }
                  
            } catch (error) {
                console.error(error);
                push.error(error.message);
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>