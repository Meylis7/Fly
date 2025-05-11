<script setup>
import { ref, watch, nextTick } from 'vue';
import AirportList from './AirportList.vue';
import apiService from "@/services/apiService";

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    placeholder: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['close', 'city-selected', 'airport-selected']);

const airports = ref({});
const isLoading = ref(false);
const hasSearched = ref(false);
const searchInput = ref(null);

// Watch for modal visibility changes
watch(() => props.visible, async (newValue) => {
    if (newValue) {
        // Focus input when modal opens
        await nextTick();
        searchInput.value?.focus();
    } else {
        // Clear data when modal is closed
        airports.value = {};
        hasSearched.value = false;
    }
});

const onSearchInput = async (event) => {
    const value = event.target.value;
    if (value.length >= 3) {
        hasSearched.value = true;
        await fetchAirports(value);
    } else {
        airports.value = {};
    }
};

const fetchAirports = async (query) => {
    isLoading.value = true;
    try {
        const data = await apiService.fetchAirports(query);
        airports.value = { ...data.data };
    } catch (error) {
        console.error("Error fetching airports:", error);
        airports.value = {};
    } finally {
        isLoading.value = false;
    }
};

const handleClose = () => {
    emit('close');
};

const handleCitySelected = (city) => {
    emit('city-selected', city);
    handleClose();
};

const handleAirportSelected = (airport) => {
    emit('airport-selected', airport);
    handleClose();
};
</script>

<template>
    <div v-if="visible" class="fixed inset-0 bg-white z-50 flex flex-col">
        <div class="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold text-prime-color">{{ placeholder }}</h2>
                <button @click="handleClose" class="p-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#223A60" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <div class="relative">
                <input 
                    ref="searchInput"
                    type="text" 
                    @input="onSearchInput" 
                    :placeholder="placeholder"
                    class="w-full p-3 pl-10 bg-[#F2F3F4] rounded-md text-base font-medium focus:ring-1 focus:ring-prime-color" 
                />
                <svg 
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                </svg>
            </div>
        </div>

        <div class="flex-1 overflow-hidden">
            <AirportList 
                :visible="true" 
                :airports="airports" 
                :is-loading="isLoading"
                :has-searched="hasSearched"
                @city-selected="handleCitySelected"
                @airport-selected="handleAirportSelected" 
            />
        </div>
    </div>
</template>