<template>
    <appLayout title="indexPage">
        <div class="container mx-auto">

            <headerComponent :title="`${$appName}`" :description="`${$appName} is a collection of useful tools and scripts making everyday life easier.`" />

            <div class="flex flex-col md:flex-row gap-6 pb-5">
                <cardComponent title="What is this site?" :divider="true" class="w-full md:w-1/2">
                    <p class="text-xl text-muted">Welcome to {{ $appName }}, your go-to hub for a diverse collection of practical tools and scripts designed to simplify everyday tasks. Frustrated by the need to search for and utilize multiple websites for various utilities, I created {{ $appName }} to provide a comprehensive solution. This platform is free for everyone, forever. Enjoy seamless access to all the tools you need, all in one place.</p>
                </cardComponent>
                <cardComponent title="Are we missing a tool?" :divider="true" class="w-full md:w-1/2">
                    <p class="text-xl text-muted">Join our community on <a href="https://discord.gg/eMa7YDzJUT" class="underline">Discord</a> to request new tools and features! We are committed to continuously improving {{ $appName }} based on user feedback. By joining our Discord, you can directly share your suggestions and ideas, helping us to develop the tools you need. Be a part of our growing community and contribute to making {{ $appName }} even better.</p>
                </cardComponent>
            </div>

            <div class="flex">
                <cardComponent title="Tools" description="Collection of useful tools and scripts making everyday life easier." :divider="true" class="w-full md:w-full">
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2 text-md md:text-xl">
                        <router-link v-for="route in routes" :key="route.path" :to="route.path" class="capitalize hover:text-accent">{{ route.name }}</router-link>
                    </div>
                </cardComponent>
            </div>
        </div>
    </appLayout>
</template>


<script>
import { useRouter } from 'vue-router';

export default {
    name: 'indexPage',
    data() {
        return {
        }
    },
    setup() {
        const router = useRouter();
        const routes = router.getRoutes().filter(route => route.name !== 'Index' && route.name !== '404');
        return { routes }
    },

}
</script>