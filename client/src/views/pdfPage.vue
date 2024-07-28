<template>
    <appLayout title="pdfPage">
        <div class="container mx-auto">
            <loadingBar :isLoading="isLoading" />

            <headerComponent title="PDF Converter" description="Quickly and easily convert any file to a pdf." />

            <cardComponent title="Upload File" class="w-2/3">
                <template #response>
                    <div class="text-2xl font-bold" :class="successMessage ? 'text-green-600' : 'text-red-600'">{{ showMessage }}</div>
                </template>
                <div class="space-y-3 pt-5">
                    <div @click="fileUpload" class="flex text-2xl bg-background rounded-full p-5 mx-auto w-2/6 hover:cursor-pointer">
                        <faIcon :icon="['fas', 'plus']" class="self-center"/>
                        <a class="w-full text-center">Choose File</a>
                        <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept=".doc,.docx,.txt,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
                    </div>
                </div>
            </cardComponent>

            <cardComponent title="Information" class="w-2/3 mt-5">
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
            successMessage: '',
            errorMessage: '',
            isLoading: false,
        }
    },

    computed: {
        showMessage() { return this.successMessage || this.errorMessage; }
    },

    methods: {
        fileUpload(e) {
            this.$refs.fileInput.click();
        }, 

        handleFileChange(event) {
            this.file = event.target.files[0];
            this.convertToPdf();
        },

        async convertToPdf() {
            if (!this.file) return this.errorMessage = 'Please select a file first.';
            this.successMessage = '';
            this.errorMessage = '';
            this.isLoading = true;

            // Create a new FormData instance
            const formData = new FormData();
            formData.append('file', this.file);

            try {
                const response = await coreService.convertToPdf(formData);
                if(!response) return this.errorMessage = 'Error converting file.';

                // Create a Blob from the PDF Stream
                const url = window.URL.createObjectURL(response);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `[ChitShTools] ${this.file.name.split('.')[0]}.pdf`);
                document.body.appendChild(link);
                link.click();

                // Clean up and remove the Blob URL
                window.URL.revokeObjectURL(url);

                this.successMessage = 'Successfully converted file to PDF.';
            } catch (error) {
                this.errorMessage = 'Error converting file.';
            } finally {
                this.isLoading = false;
                this.$refs.fileInput.value = null;
                this.file = null;
            }
        }

    }
}
</script>
