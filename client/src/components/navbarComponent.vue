<template>
    <nav id="header">
        <!-- Main Navbar -->
        <div class="fixed top-0 left-0 w-full" :class="dynamicClass" id="navbar">
            <div class="container mx-auto px-4 md:px-0 flex items-center justify-between h-16">
                <a href="/" class="text-3xl text-white">{{ $appName }}</a>
                <button id="dropdown" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" @click="toggleDropdown">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div class="hidden md:block space-x-0 md:space-x-8 text-xl text-muted">
                    <router-link to="/" active-class="active" class="hover:text-white" >Home</router-link>
                    <a href="#" @click="toggleDropdown($event)" class="hover:text-white" >Tools</a>
                    <a href="http://localhost:5173/api/docs/" class="hover:text-white" >Api</a>
                </div>
            </div>
        </div>
        <!-- Dropdown Navbar -->
        <div v-if="dropdown" ref="dropdown" v-click-outside="closeDropdown" class="bg-background absolute w-full animate__animated animate__fadeIn animate__faster border-b-2 border-borders mt-16">
            <div class="container mx-auto px-4 md:px-0 flex items-center h-max py-2">
            <div class="flex flex-col md:flex-row gap-6 mx-auto text-white w-full">
                <div class="w-full md:w-full">
                    <hr class="border-t border-borders">
                    <div class="flex">
                        <div class="w-1/2">
                            <router-link to="/mdownloader" class="block px-4 py-2 text-muted hover:text-white">[YT/SC] Media Downloader</router-link>
                            <router-link to="/shorten" class="block px-4 py-2 text-muted hover:text-white">Url Shortener</router-link>
                            <router-link to="/json" class="block px-4 py-2 text-muted hover:text-white">Json Beautify</router-link>
                            <router-link to="/diff" class="block px-4 py-2 text-muted hover:text-white">Text Diff Checker</router-link>
                        </div>
                        <div class="w-1/2">
                            <router-link to="/qrcode" class="block px-4 py-2 text-muted hover:text-white">QR Code Generator</router-link>
                            <router-link to="/uuid" class="block px-4 py-2 text-muted hover:text-white">UUID Generator</router-link>
                            <router-link to="/speedtest" class="block px-4 py-2 text-muted hover:text-white">Speedtest</router-link>
                            <router-link to="/webhook" class="block px-4 py-2 text-muted hover:text-white">Discord Embed Sender</router-link>
                        </div>
                        <div class="w-1/2">
                            <router-link to="/gameinfo" class="block px-4 py-2 text-muted hover:text-white">Game Server Information</router-link>
                            <router-link to="/workshop" class="block px-4 py-2 text-muted hover:text-white">Gmod Workshop Generator</router-link>
                            <router-link to="/password" class="block px-4 py-2 text-muted hover:text-white">Password Generator</router-link>
                            <router-link to="/smtp" class="block px-4 py-2 text-muted hover:text-white">SMTP Sender</router-link>
                        </div>
                        <div class="w-1/2">
                            <router-link to="/pdf" class="block px-4 py-2 text-muted hover:text-white">PDF Converter</router-link>
                            <router-link to="/b64" class="block px-4 py-2 text-muted hover:text-white">Base64 Encode/Decode</router-link>
                            <router-link to="/iconvert" class="block px-4 py-2 text-muted hover:text-white">Image Converter</router-link>
                            <router-link to="/vconvert" class="block px-4 py-2 text-muted hover:text-white">Video Transcoder</router-link>
                        </div>
                        <div class="w-1/2">
                            <router-link to="/sshc" class="block px-4 py-2 text-muted hover:text-white">SSH Client</router-link>
                            <!-- <router-link to="/nmap" class="block px-4 py-2 text-muted hover:text-white">Nmap Scanner</router-link> -->
                        </div>
                    </div>
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
            isScrolled: false,
            scrollDirection: '',
        };
    },

    computed: {
        dynamicClass() {
            if(this.dropdown) return 'bg-background';
            return {
                'bg-background border-glowing glow-in': this.isScrolled && this.scrollDirection === 'down',
                'bg-transparent glow-out': this.scrollDirection === 'up',
            };
        }
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        handleScroll() {
            const currentScrollPosition = window.scrollY;
            this.scrollDirection = currentScrollPosition > this.lastScrollPosition ? 'down' : 'up';
            this.isScrolled = currentScrollPosition > 50;
            this.lastScrollPosition = currentScrollPosition;
        },

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