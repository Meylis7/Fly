<script setup>
    import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="card relative mb-[400px] rounded-xl overflow-hidden w-full h-[420px] flex flex-col justify-end">
        <img src="../assets/images/tour-1.png" class="absolute top-0 left-0 w-full h-full" alt="Tour-img">

        <div class="p-6">
            <h4 class=" text-white text-2xl font-semibold">
                Melbourne
            </h4>
            <p class="text-sm text-white">
                An amazing journey
            </p>

            <RouterLink to="/" class="block relative text-center py-4 text-sm font-medium mt-4 cursor-pointer bg-[#8DD3BB] rounded">
                Book Tour
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss"></style>