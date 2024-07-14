<template>
    <appLayout title="indexPage">
        <div class="container mx-auto">
            <div class="flex flex-col py-16 text-center text-white">
                <h1>404 page not found!</h1>
            </div>
        </div>
    </appLayout>
</template>


<script>
import appLayout from '@/layouts/appLayout.vue';

export default {
    name: '404Page',
    components: {
        appLayout,
    }
}
</script>