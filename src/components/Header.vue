<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import logo from "@/assets/images/logo.png";
import apiService from '@/services/apiService';

import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const router = useRouter();
const userStore = useUserStore();

// Locale selection
const selectedLocale = ref(localStorage.getItem('locale') || 'en');
const dropdownVisible = ref(false);

const localeLabels = {
    en: "English",
    ru: "Russian",
    tk: "Turkmen",
};

const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value;
};

const changeLocale = (newLocale) => {
    selectedLocale.value = newLocale;
    localStorage.setItem('locale', newLocale);
    locale.value = newLocale; // Update Vue I18n
    dropdownVisible.value = false; // Close dropdown
};

const user = ref('')

// Ensure Header updates when user logs in or out
onMounted(async () => {

    userStore.loadUser();
    locale.value = selectedLocale.value;

    if (userStore.user) {
        try {
            const response = await apiService.getUser();
            user.value = response.data;

            userStore.updateUser(response.data);

        } catch (error) {
            console.error('Error fetching user', error);
        }
    }
});


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
                            <RouterLink to="/" class="text-base">{{ $t("header.links.flightHotel") }}</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/tours" class="text-base">{{ $t("header.links.tour") }}</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/visas" class="text-base">{{ $t("header.links.visa") }}</RouterLink>
                        </li>
                        <li v-if="userStore.user">
                            <RouterLink to="/profile" class="text-base">{{ $t("header.links.profile") }}</RouterLink>
                        </li>
                    </ul>
                </nav>

                <div class="flex items-center gap-4">
                    <button v-if="userStore.user" @click="router.push({ name: 'profile' })"
                        class="text-base text-white bg-[#223A60] capitalize rounded-lg py-2 px-4 hover:bg-[#1B2E50] transition">
                        {{ userStore.user.balance }}
                    </button>

                    <!-- Show Sign in if not logged in -->
                    <RouterLink v-else to="/signin"
                        class="text-base text-white bg-[#223A60] rounded-lg py-2 px-4 hover:bg-[#1B2E50] transition">
                        {{ $t("header.signin") }}
                    </RouterLink>

                    <!-- Custom Locale Selector -->
                    <!-- <div class="relative">
                        <select v-model="selectedLocale" @change="changeLocale"
                            class="py-2 px-4 border border-[#223A60] text-base text-center rounded-lg bg-white text-[#223A60] cursor-pointer appearance-none">
                            <option value="en">English</option>
                            <option value="ru">Russian</option>
                            <option value="tk">Turkmen</option>
                        </select>
                    </div> -->
                    <div class="relative">
                        <button @click="toggleDropdown"
                            class="py-2 px-4 border border-[#223A60] text-base text-center rounded-lg bg-white text-[#223A60] cursor-pointer">
                            {{ localeLabels[selectedLocale] }}
                        </button>
                        <ul v-if="dropdownVisible"
                            class="absolute left-0 mt-2 w-full bg-white border border-[#223A60] rounded-lg shadow-md">
                            <li v-for="(label, locale) in localeLabels" :key="locale" @click="changeLocale(locale)"
                                class="p-2 text-center cursor-pointer hover:bg-gray-200">
                                {{ label }}
                            </li>
                        </ul>
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