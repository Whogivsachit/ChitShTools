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
                    <a class="hover:text-white" :href="$appUrl + `/api/docs/`" >Api</a>
                </div>
            </div>
        </div>
        <!-- Dropdown Navbar -->
        <div v-if="dropdown" ref="dropdown" v-click-outside="closeDropdown" class="bg-background absolute w-full animate__animated animate__fadeIn animate__faster border-b-2 border-borders mt-16">
            <div class="container mx-auto px-4 md:px-0 flex items-center h-max py-2">
            <div class="flex flex-col md:flex-row gap-6 mx-auto text-white w-full">
                <div class="w-full md:w-full">
                    <hr class="border-t border-borders">
                    <div class="grid grid-cols-5">
                        <router-link v-for="route in routes" :key="route.path" :to="route.path" class="block px-4 py-2 text-muted hover:text-white">{{ route.name }}</router-link>
                    </div>
                </div>
            </div>
        </div>
        </div>

    </nav>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            dropdown: false,
            isScrolled: false,
            scrollDirection: '',
        };
    },

    setup() {
        const router = useRouter();
        const routes = router.getRoutes().filter(route => route.name !== 'Index' && route.name !== '404');
        return { routes }
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