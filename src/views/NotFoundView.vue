<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <section
        class="text-center flex flex-col justify-center items-center min-h-[600px] mt-[150px] pt-[50px] pb-[100px] bg-[#F9F9F9]">
        <h1 class="text-6xl font-bold mb-4">
            {{ $t("404.title") }}
        </h1>
        <p class="text-xl mb-5">
            {{ $t("404.subTitle") }}
        </p>
        <RouterLink to="/" class="text-white bg-green-700 hover:bg-green-900 rounded-md px-3 py-2 mt-4">
            {{ $t("404.goHome") }}
        </RouterLink>
    </section>
</template>
