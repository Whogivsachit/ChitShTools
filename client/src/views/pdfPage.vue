<template>
    <appLayout title="pdfPage">
        <div class="container mx-auto">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="PDF Converter" description="Quickly and easily convert any file to a pdf." />

            <cardComponent title="Upload File" class="w-full md:w-2/3">
                <div class="space-y-3 pt-5">
                    <div @click="fileUpload" class="flex text-2xl bg-background rounded-full p-5 mx-auto w-full md:w-2/6 hover:cursor-pointer">
                        <faIcon :icon="['fas', 'plus']" class="self-center"/>
                        <a class="w-full text-center">Choose File</a>
                        <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept=".doc,.docx,.txt,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
                    </div>
                </div>
            </cardComponent>

            <cardComponent title="Information" class="w-full md:w-2/3 mt-5">
                <div class="space-y-3 pt-5">
                    <p>Click Choose file above to upload your file. It will automatically be converted to a .pdf and downloaded to your system.</p>
                    <p class="text-lg pt-5">Supported File Types:</p>
                    <ul class="list-disc list-inside">
                        <li>DOC</li>
                        <li>DOCX</li>
                        <li>TXT</li>
                        <li>XML</li>
                    </ul>
                </div>
            </cardComponent>

        </div>
    </appLayout>
</template>


<script>
import coreService from '@/services/coreService';

export default {
    name: 'pdfPage',
    data() {
        return {
            file: null,
            isLoading: false,
        }
    },

    methods: {
        fileUpload(e) {
            this.$refs.fileInput.click();
        }, 

        handleFileChange(event) {
            this.file = event.target.files[0];
            this.convertToPdf();
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

        async convertToPdf() {
            if (!this.file) return push.error('Please select a file first.');
            this.isLoading = true;

            // Create a new FormData instance
            const formData = new FormData();
            formData.append('file', this.file);

            try {
                const response = await coreService.convertToPdf(formData);
                if(!response) return push.error('Error converting file.');
                console.log(`[PDF Converter]: PDF file created successfully.`);

                this.downloadBlob(response, `[${this.$appName}] ${this.file.name.split('.')[0]}.pdf`);
                push.success('Successfully converted file to PDF.');
            } catch (error) {
                push.error('An error occurred while converting the file to PDF.');
            } finally {
                this.isLoading = false;
                this.$refs.fileInput.value = null;
                this.file = null;
            }
        }

    }
}
</script>
