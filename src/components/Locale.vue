<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from '@/stores/userStore';

// import Locale from 'v-calendar/dist/types/src/utils/locale';
const { locale } = useI18n();
const userStore = useUserStore();

// Locale selection
const selectedLocale = ref(localStorage.getItem('locale') || 'en');
const dropdownVisible = ref(false);

const localeLabels = {
    en: "English",
    ru: "Русский",
    tk: "Türkmençe",
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

onMounted(async () => {
    userStore.loadUser();
    locale.value = selectedLocale.value;
});
</script>

<template>

    <div class="block">
        <button @click="toggleDropdown"
            class="py-2 px-4 w-full border border-[#223A60] text-sm sm:text-base text-center rounded-lg bg-white text-[#223A60] cursor-pointer">
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

</template>
