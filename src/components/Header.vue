<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
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

const user = ref('');

// Mobile Menu
// Track whether the menu is open or closed
const menuOpen = ref(false);

// Toggle the menu open/close state
const toggleMenu = (event) => {
    // Prevent event from propagating to the document click listener
    event.stopPropagation();
    menuOpen.value = !menuOpen.value;
};

// Reference to the menu element (the <ul> element)
const menuRef = ref(null);

// Close the menu if click happens outside the menu
const handleClickOutside = (event) => {
    // Check if the click is outside the menu
    if (menuRef.value && !menuRef.value.contains(event.target)) {
        menuOpen.value = false;
    }
};

// Ensure Header updates when user logs in or out
onMounted(async () => {
    document.addEventListener('click', handleClickOutside);


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

// Clean up the event listener when the component is unmounted
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});


</script>



<template>
    <header class="absolute z-20 top-7 left-0 w-full">
        <div class="auto_container">
            <div class="inner-wrapper">
                <div class="inner p-5 flex items-center justify-between">
                    <RouterLink to="/">
                        <span class="block min-w-[55px]">
                            <img :src="logo" class="block object-contain" alt="logo">
                        </span>
                    </RouterLink>

                    <nav
                        :class="['fixed top-0 z-50 bg-[rgba(0,0,0,.5)] w-full h-screen lg:block lg:static lg:w-auto lg:h-auto lg:bg-transparent transition-all', { '-left-full': !menuOpen, 'left-0': menuOpen }]">
                        <ul ref="menuRef"
                            class="flex items-center justify-center flex-col lg:flex-row gap-y-6 sm:gap-12 bg-white lg:bg-transparent w-3/4 sm:w-3/5 lg:w-auto h-full rounded-br-xl rounded-tr-xl">
                            <li>
                                <RouterLink to="/" class="text-base text-center w-full block sm:text-2xl lg:text-base">{{ $t("header.links.flightHotel") }}</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/tours" class="text-base text-center w-full block sm:text-2xl lg:text-base">{{ $t("header.links.tour") }}</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/visas" class="text-base text-center w-full block sm:text-2xl lg:text-base">{{ $t("header.links.visa") }}</RouterLink>
                            </li>
                            <li v-if="userStore.user">
                                <RouterLink to="/profile" class="text-base text-center w-full block sm:text-2xl lg:text-base">{{ $t("header.links.profile") }}
                                </RouterLink>
                            </li>
                        </ul>
                    </nav>

                    <div class="flex items-center gap-2 xsm:gap-4 relative">
                    <div class="flex items-center gap-4 relativeq">
                        <button v-if="userStore.user" @click="router.push({ name: 'profile' })"
                            class="text-sm sm:text-base text-white bg-[#223A60] capitalize rounded-lg py-2 px-4 hover:bg-[#1B2E50] transition">
                            $ {{ userStore.user.balance }}
                        </button>

                        <!-- Show Sign in if not logged in -->
                        <RouterLink v-else to="/signin"
                            class="text-sm sm:text-base text-white bg-[#223A60] rounded-lg py-2 px-4 hover:bg-[#1B2E50] transition">
                            {{ $t("header.signin") }}
                        </RouterLink>

                        <div class="block">
                            <button @click="toggleDropdown"
                                class="py-2 px-4 border border-[#223A60] text-sm sm:text-base text-center rounded-lg bg-white text-[#223A60] cursor-pointer">
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

                        <button @click="toggleMenu" class="burger block lg:hidden xsm:ml-4">
                            <svg class="block object-contain" width="24" height="18" viewBox="0 0 24 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.44152 2.86559H22.9478C23.528 2.86559 23.9994 2.2237 23.9994 1.43279C23.9994 0.641892 23.5287 0 22.9478 0H7.44152C6.86127 0 6.39062 0.641892 6.39062 1.43279C6.39062 2.2237 6.86055 2.86559 7.44152 2.86559Z"
                                    fill="#223A60" />
                                <path
                                    d="M22.5652 7.16406H1.43271C0.641855 7.16406 0 7.80595 0 8.59686C0 9.38776 0.641855 10.0297 1.43271 10.0297H22.5652C23.3561 10.0297 23.9979 9.38776 23.9979 8.59686C23.9979 7.80595 23.3561 7.16406 22.5652 7.16406Z"
                                    fill="#223A60" />
                                <path
                                    d="M22.9471 14.209H7.44152C6.86127 14.209 6.39062 14.8509 6.39062 15.6418C6.39062 16.4327 6.86127 17.0746 7.44152 17.0746H22.9478C23.528 17.0746 23.9994 16.4327 23.9994 15.6418C23.9994 14.8509 23.528 14.209 22.9471 14.209Z"
                                    fill="#223A60" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.inner-wrapper {
    position: relative;
    z-index: 1;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90.12deg, rgba(234, 240, 240, 0.3) 0%, rgba(234, 240, 240, 0.2) 100%);
        backdrop-filter: blur(5.5px);
        border-radius: 14px;
    }
}

.inner {
    z-index: 99;
    position: relative;
}
</style>