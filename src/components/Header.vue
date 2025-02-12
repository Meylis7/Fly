<script setup>
import { computed, ref, watchEffect, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import logo from "@/assets/images/logo.png";

const router = useRouter();
const userStore = useUserStore();

// Ensure Header updates when user logs in or out
onMounted(() => {
    userStore.loadUser();
});

// Computed user name
const userDisplayName = computed(() => {
    if (userStore.user) {
        return `${userStore.user.firstname} ${userStore.user.lastname.charAt(0)}.`;
    }
    return null;
});

// Locale selection
const selectedLocale = ref(localStorage.getItem('locale') || 'en');

const changeLocale = () => {
    localStorage.setItem('locale', selectedLocale.value);
    location.reload();
};
</script>



<template>
    <header class="absolute z-20 top-7 left-0 w-full">
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
                            <RouterLink to="/tours" class="text-base">Tour</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/visas" class="text-base">Visa</RouterLink>
                        </li>
                    </ul>
                </nav>

                <!-- <button>
                    <RouterLink to="/signin" class="text-base text-white bg-prime-color rounded-lg py-3 px-8">
                        Sign in
                    </RouterLink>
                </button> -->

                <div class="flex items-center gap-4">
                    <button v-if="userStore.user" @click="router.push({ name: 'profile' })"
                        class="text-base text-white bg-[#223A60] capitalize rounded-lg py-2 px-4 hover:bg-[#1B2E50] transition">
                        {{ userDisplayName }}
                    </button>

                    <!-- Show Sign in if not logged in -->
                    <RouterLink v-else to="/signin"
                        class="text-base text-white bg-[#223A60] rounded-lg py-2 px-4 hover:bg-[#1B2E50] transition">
                        Sign in
                    </RouterLink>

                    <!-- Custom Locale Selector -->
                    <div class="relative">
                        <select v-model="selectedLocale" @change="changeLocale"
                            class="py-2 px-4 border border-[#223A60] text-center rounded-lg bg-white text-[#223A60] cursor-pointer appearance-none">
                            <option value="en">English</option>
                            <option value="ru">Russian</option>
                            <option value="tk">Turkmen</option>
                        </select>
                    </div>
                </div>
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