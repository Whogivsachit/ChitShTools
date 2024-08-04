<template>
    <appLayout title="SpeedTestPage">
        <div class="container mx-auto">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="Speedtest" description="Test your speed!" />

            <cardComponent class="w-1/2">
                <div v-if="result" class="flex place-content-evenly pt-5">
                    <div class="flex flex-col text-center">
                        <div class="text-white text-xl">Download <span class="text-muted text-sm">Mbps</span></div>
                        <span class="text-4xl">{{ downloadSpeed}}</span>
                    </div>
                    <div class="flex flex-col text-center">
                        <div class="text-white text-xl">Upload <span class="text-muted text-sm">Mbps</span></div>
                        <span class="text-4xl">{{ uploadSpeed }}</span>
                    </div>
                </div>

                <h1 v-if="!result" class="w-full text-center pb-5">Click the "Run Speedtest" button below to begin. This test will measure your download speed by downloading a 100MB file from Hetzner and will also assess your upload speed by sending a file to our backend server.</h1>

                <div v-if="result" class="flex place-content-evenly pt-3">
                    <div>Duration: {{ downloadDuration }} <span class="text-muted text-sm">Seconds</span></div>
                    <div>Duration: {{ uploadDuration }} <span class="text-muted text-sm">Seconds</span></div>
                </div>

                <div class="flex w-full">
                    <button @click="runSpeedTest" class="bg-accent text-white rounded-md px-4 py-2 w-full md:w-1/2 mx-auto" :class="result ? 'mt-5' : ''">{{ btnText }}</button>
                </div>
            </cardComponent>

        </div>
    </appLayout>
</template>


<script>
import coreService from '@/services/coreService';

export default {
    name: 'speedTestPage',
    data() {
        return {
            downloadSpeed: '',
            downloadDuration: '',
            uploadSpeed: '',
            uploadDuration: '',
            successMessage: '',
            errorMessage: '',
            isLoading: false,
        }
    },

    computed: {
        showMessage() { return this.successMessage || this.errorMessage; },
        result() { return this.downloadSpeed && this.uploadSpeed; },
        btnText() { return this.result ? 'Re-Run Speedtest' : 'Run Speedtest'; }
    },

    methods: {
        async runSpeedTest() {
            this.downloadSpeed = '';
            this.uploadSpeed = '';
            this.successMessage = '';
            this.errorMessage = '';
            this.isLoading = true;

            const downResponse = await this.testDownloadSpeed();
            const upResponse = await this.testUploadSpeed();
            if(!downResponse || !upResponse) return this.errorMessage = 'SpeedTest Failed';
            console.log(`[SpeedTest Download]: ${downResponse.message}`, `\n[SpeedTest Upload]: ${upResponse.message}`);

            this.downloadSpeed = downResponse.speed;
            this.downloadDuration = downResponse.duration;
            this.uploadSpeed = upResponse.speed;
            this.uploadDuration = upResponse.duration;

            this.successMessage = 'SpeedTest Completed';
            this.isLoading = false;
        },

        async testDownloadSpeed() {
            try {
                const response = await coreService.testDownload();
                return response;
            } catch (error) {
                this.errorMessage = error.message;
            }
        },

        async testUploadSpeed() {
            try {

                const fileSize = 1024 * 1024 * 10; // 10MB
                const file = new File(["0".repeat(fileSize)], "speedtest.txt", {type: 'text/plain'});
                const formData = new FormData();
                formData.append('file', file);
                formData.append('startTime', Date.now().toString());

                const response = await coreService.testUpload(formData);
                return response;

            } catch (error) {
                this.errorMessage = error.message;
            }
        }
    }
}
</script>