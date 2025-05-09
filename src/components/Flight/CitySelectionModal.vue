<script setup>
import { ref, watch, nextTick } from 'vue';
import Autocomplete from '../Autocomplete.vue';

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

const searchQuery = ref('');
const searchInput = ref(null);

// Watch for modal visibility changes
watch(() => props.visible, (newValue) => {
    if (newValue) {
        // Use nextTick to ensure the input is mounted before focusing
        nextTick(() => {
            searchInput.value?.focus();
        });
    }
});

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
    <div v-if="visible" class="fixed inset-0 bg-white z-50 md:hidden">
        <div class="p-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold text-prime-color">{{ placeholder }}</h2>
                <button @click="handleClose" class="p-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#223A60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            
            <div class="relative">
                <input 
                    ref="searchInput"
                    type="text" 
                    v-model="searchQuery"
                    :placeholder="placeholder"
                    class="w-full p-3 bg-[#F2F3F4] rounded-md text-base font-medium focus:ring-1 focus:ring-prime-color"
                />
                
                <Autocomplete 
                    v-model="searchQuery"
                    @city-selected="handleCitySelected"
                    @airport-selected="handleAirportSelected"
                    class="!absolute z-20 top-[calc(100%+5px)] left-0 w-full"
                />
            </div>
        </div>
    </div>
</template> 