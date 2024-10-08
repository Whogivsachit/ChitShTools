<template>
    <appLayout title="ImagePage">
        <div class="container mx-auto">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="Image Converter" description="Convert your image files for free." />

            <cardComponent title="Upload Form" class="w-full md:w-2/3">
                <div class="space-y-3 pt-5">
                    <div class="flex mx-auto w-full md:w-2/6">
                        <span class="text-white text-left self-center w-1/2">Download as: </span>
                        <select v-model="fileType" class="text-white border border-borders rounded-md p-2 my-2 bg-background/75 w-full ml-2">
                            <option v-for="fileType in fileTypes" :value="fileType" class="uppercase">{{ fileType }}</option>
                        </select>
                    </div>
                    <div @click="fileUpload" class="flex text-2xl bg-background rounded-full p-5 mx-auto w-full md:w-2/6 hover:cursor-pointer">
                        <faIcon :icon="['fas', 'plus']" class="self-center"/>
                        <a class="w-full text-center">Choose File</a>
                        <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" :accept="acceptTypes"/>
                    </div>
                </div>
            </cardComponent>

            <cardComponent title="Information" class="w-full md:w-2/3 mt-5">
                <div class="space-y-3 pt-5">
                    <p>Select Your desired output than upload the image above.</p>
                    <p class="text-lg pt-5">Supported File Types:</p>
                    <ul class="list-disc list-inside">
                        <li v-for="fileType in fileTypes" :value="fileType" class="uppercase">{{ fileType }}</li>
                    </ul>
                </div>
            </cardComponent>

        </div>
    </appLayout>
</template>


<script>
import coreService from '@/services/coreService';

export default {
    name: 'imagePage',
    data() {
        return {
            file: null,
            fileType: 'png',
            isLoading: false,
            fileTypes: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'jp2', 'tiff', 'avif', 'heif', 'jxl', 'raw', 'tile']
        }
    },

    computed: {
        acceptTypes() { return this.fileTypes.map(fileType => `.${fileType}`).join(', '); }
    },

    methods: {
        fileUpload(e) {
            this.$refs.fileInput.click();
        }, 

        handleFileChange(event) {
            this.file = event.target.files[0];
            this.convertImage();
        },

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
            link.setAttribute('download', `[${this.$appName}] ${filename}`);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        },

        async convertImage() {
            if (!this.file) return push.error('Please select a file first.');
            this.isLoading = true;

            // Create a new FormData instance
            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('format', this.fileType);

            try {
                const response = await coreService.convertImage(formData);
                if(response.status !== 200) return push.error(response.message);
                
                console.log(`[Image Converter]: Success: ${response.message}`);

                const blob = this.createBlobFromBase64(response.file, response.message.split('.')[1]);
                this.downloadBlob(blob, `${this.file.name.split('.')[0]}.${this.fileType}`);

                push.success('Successfully converted image.');
            } catch (error) {
                console.error(error);
                push.error('An error occurred while converting the image.');
            } finally {
                this.isLoading = false;
                this.$refs.fileInput.value = null;
                this.file = null;
            }
        },
    }
}
</script>
