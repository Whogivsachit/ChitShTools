<template>
    <appLayout title="indexPage">
        <div class="container mx-auto">

            <!-- Header -->
            <headerComponent :title="`${$appName}`" :description="`${$appName} is a collection of useful tools and scripts making everyday life easier.`" />

            <!-- About -->
            <div class="flex flex-col md:flex-row gap-6 pb-5">
                <cardComponent title="What is this site?" :divider="true" class="w-full md:w-1/2">
                    <p class="text-xl text-muted">Welcome to ChitShTools, your go-to hub for a diverse collection of practical tools and scripts designed to simplify everyday tasks. Frustrated by the need to search for and utilize multiple websites for various utilities, I created ChitShTools to provide a comprehensive solution. This platform is free for everyone, forever. Enjoy seamless access to all the tools you need, all in one place.</p>
                </cardComponent>
                <cardComponent title="Are we missing a tool?" :divider="true" class="w-full md:w-1/2">
                    <p class="text-xl text-muted">Join our community on Discord to request new tools and features! We are committed to continuously improving ChitShTools based on user feedback. By joining our Discord, you can directly share your suggestions and ideas, helping us to develop the tools you need. Be a part of our growing community and contribute to making ChitShTools even better.</p>
                </cardComponent>
            </div>

            <!-- Tool List -->
            <div class="flex flex-col md:flex-row gap-6">
                <!-- Tools -->
                <cardComponent title="Tools" description="Collection of useful tools and scripts making everyday life easier." :divider="true" class="w-full md:w-1/4">
                    <div class="flex flex-col place-content-between gap-2 pt-2 text-xl">
                        <router-link to="/mdownloader" class="hover:text-muted">[YT/SC] Media Downloader</router-link>
                        <router-link to="/shorten" class="hover:text-muted">Url Shortener</router-link>
                        <router-link to="/json" class="hover:text-muted">Json Beautify</router-link>
                        <router-link to="/diff" class="hover:text-muted">Text Diff Checker</router-link>
                        <router-link to="/password" class="hover:text-muted">Password Generator</router-link>
                        <router-link to="/qrcode" class="hover:text-muted">QR Code Generator</router-link>
                        <router-link to="/uuid" class="hover:text-muted">Json Beautify</router-link>
                    </div>
                </cardComponent>
                <!-- Senders -->
                <cardComponent title="Senders" description="Easily Create, Edit and Send Webhooks or Api Calls" :divider="true" class="w-full md:w-1/4">
                    <div class="flex flex-col place-content-between gap-2 pt-2 text-xl">
                        <router-link to="/webhook" class="hover:text-muted">Discord Embed Sender</router-link>
                        <router-link to="/smtp" class="hover:text-muted">SMTP Sender</router-link>
                    </div>
                </cardComponent>
                <!-- Game Services -->
                <cardComponent title="Game Services" description="Quick and Easy to use tools for game related servers" :divider="true" class="w-full md:w-1/4">
                    <div class="flex flex-col place-content-between gap-2 pt-2 text-xl">
                        <router-link to="/gameinfo" class="hover:text-muted">Game Server Information</router-link>
                        <router-link to="/workshop" class="hover:text-muted">Gmod Workshop Generator</router-link>
                    </div>
                </cardComponent>
                <!-- Converters -->
                <cardComponent title="Converters" description="Convertibles roll out! Convert one File type to another quickly." :divider="true" class="w-full md:w-1/4">
                    <div class="flex flex-col place-content-between gap-2 pt-2 text-xl">
                        <router-link to="/pdf" class="hover:text-muted">PDF Converter</router-link>
                        <router-link to="/b64" class="hover:text-muted">Base64 Encode/Decode</router-link>
                        <router-link to="/iconvert" class="hover:text-muted">Image Converter</router-link>
                        <router-link to="/vconvert" class="hover:text-muted">Video Converter</router-link>
                    </div>
                </cardComponent>
            </div>
        </div>
    </appLayout>
</template>


<script>
export default {
    name: 'indexPage',
    data() {
        return {
        }
    },

}
</script>