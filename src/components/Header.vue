<script setup>
    import { RouterLink } from 'vue-router';
    import logo from "@/assets/images/logo.png"

</script>

<template>
    <header class=" absolute z-10 top-7 left-0 w-full">
        <div class="auto_container">
            <div class="inner p-5 flex items-center justify-between">
                <RouterLink to="/">
                    <span>
                        <img :src="logo" alt="logo">
                    </span>
                </RouterLink>

                <nav>
                    <ul class="flex items-center gap-12">
                        <li>
                            <RouterLink to="/" class="text-base">Flights & Hotels</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/" class="text-base">Tour</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/" class="text-base">Visa</RouterLink>
                        </li>
                    </ul>
                </nav>

                <button>
                    <RouterLink to="/" class="text-base text-white bg-prime-color rounded-lg py-3 px-8">
                        Sign up
                    </RouterLink>
                </button>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>

    .inner {
        background: linear-gradient(90.12deg, rgba(234, 240, 240, 0.3) 0%, rgba(234, 240, 240, 0.2) 100%);
        backdrop-filter: blur(5.5px);
        border-radius: 14px;
    }

</style>