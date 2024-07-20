<template>
    <nav id="header">
        <!-- Main Navbar -->
        <div class="bg-foreground">
            <div class="container mx-auto px-4 md:px-0 flex items-center justify-between h-16">
                <a href="/" class="text-3xl text-white">{{ $appName }}</a>
                <button id="dropdown" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" @click="toggleDropdown">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div class="hidden md:block space-x-0 md:space-x-8 text-xl text-muted">
                    <router-link to="/" active-class="active" class="hover:text-white" >Home</router-link>
                    <a href="#" @click="toggleDropdown($event)" class="hover:text-white" >Tools</a>
                    <a href="https://api.chit.sh" class="hover:text-white" >Api</a>

                </div>
            </div>
        </div>
        <!-- Dropdown Navbar -->
        <div v-if="dropdown" ref="dropdown" v-click-outside="closeDropdown" class="bg-foreground absolute w-full animate__animated animate__fadeIn animate__faster border-b-2 border-borders">
            <div class="container mx-auto px-4 md:px-0 flex items-center h-max py-2">
            <div class="flex flex-col md:flex-row gap-6 mx-auto text-white w-3/4">
                <div class="w-full md:w-2/3">
                    <h1 class="px-4 py-2 font-bold text-xl">Utilities</h1>
                    <hr class="border-t border-borders">
                    <router-link to="/mdownloader" class="block px-4 py-2 text-muted hover:text-white">[YT/SC] Media Downloader</router-link>
                    <router-link to="/shorten" class="block px-4 py-2 text-muted hover:text-white">Url Shortener</router-link>
                    <router-link to="/qrcode" class="block px-4 py-2 text-muted hover:text-white">QR Code Generator</router-link>
                    <router-link to="/json" class="block px-4 py-2 text-muted hover:text-white">Json Beautify</router-link>
                    <router-link to="/password" class="block px-4 py-2 text-muted hover:text-white">Password Generator</router-link>
                </div>
                <div class="w-full md:w-2/3">
                    <h1 class="px-4 py-2 font-bold text-xl">Senders</h1>
                    <hr class="border-t border-borders">
                    <router-link to="/webhook" class="block px-4 py-2 text-muted hover:text-white">Discord Embed Sender</router-link>
                    <router-link to="/smtp" class="block px-4 py-2 text-muted hover:text-white">SMTP Sender</router-link>
                </div>
                <div class="w-full md:w-2/3">
                    <h1 class="px-4 py-2 font-bold text-xl">Game Services</h1>
                    <hr class="border-t border-borders">
                    <router-link to="/gameinfo" class="block px-4 py-2 text-muted hover:text-white">Game Server Information</router-link>
                    <router-link to="/workshop" class="block px-4 py-2 text-muted hover:text-white">Gmod Workshop Generator</router-link>
                </div>
                <div class="w-full md:w-2/3">
                    <h1 class="px-4 py-2 font-bold text-xl">Converters</h1>
                    <hr class="border-t border-borders">
                    <router-link to="/" class="block px-4 py-2 text-muted hover:text-white line-through">PDF Converter</router-link>
                    <router-link to="/" class="block px-4 py-2 text-muted hover:text-white line-through">FileType Converter</router-link>
                    <router-link to="/b64" class="block px-4 py-2 text-muted hover:text-white">Base64 Encode/Decode</router-link>
                </div>
            </div>
        </div>
        </div>

    </nav>
</template>

<script>
export default {
    data() {
        return {
            dropdown: false,
        };
    },

    methods: {
        toggleDropdown(event) {
            event.stopPropagation();
            this.dropdown = !this.dropdown;
        },
    
        closeDropdown() {
            this.dropdown = false;
        },
  },
    
}
</script>

<style scoped>
.active { color: #FA4033 }
.active:hover { color: white }
</style>