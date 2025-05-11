<script setup>
import { useI18n } from 'vue-i18n';
import { Vue3Lottie } from 'vue3-lottie';
    import LoadingJson from '@/assets/Loading.json'
import NoResultsJson from '@/assets/not-found.json';

const { locale } = useI18n();

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    airports: {
        type: Object,
        required: true
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    hasSearched: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['city-selected', 'airport-selected']);

const handleCitySelected = (city, cityData, country) => {
    emit('city-selected', {
        city,
        cityData,
        country,
        cityCode: cityData.citycode || (cityData.airports && cityData.airports[0] && cityData.airports[0].code)
    });
};

const handleAirportSelected = (airport) => {
    emit('airport-selected', {
        airport,
        airportCode: airport.code
    });
};
</script>

<template>
    <div v-if="visible" class="h-full overflow-auto">
        <div v-if="isLoading" class="flex flex-col items-center pt-8">
            <Vue3Lottie :animationData="LoadingJson" class="!w-[50px] !h-[50px]" />
        </div>
        
        <div v-else-if="Object.keys(airports).length > 0" class="h-full">
            <div v-for="(cityData, city) in airports" :key="city">
                <div 
                    class="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    @click="handleCitySelected(city, cityData, cityData.country)"
                >
                    <div class="flex items-center gap-2">
                        <div class="flex-shrink-0">
                            <svg class="w-6 h-6 text-prime-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div class="flex-grow text-sm md:text-base font-semibold flex items-center">
                            <span >{{ city }}</span>
                            <span v-if="cityData.country">
                                {{ cityData.country[$i18n.locale] ?? cityData.country.en }}
                            </span>
                        </div>
                        <div class="text-sm md:text-base font-semibold flex items-center">
                            {{ cityData.citycode || (cityData.airports && cityData.airports[0] && cityData.airports[0].code) }}
                        </div>
                    </div>
                </div>
                
                <div 
                    v-for="airport in cityData.airports" 
                    :key="airport.code"
                    class="p-4 pl-10 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    @click="handleAirportSelected(airport)"
                >
                    <div class="flex items-center gap-2">
                        <div class="flex-shrink-0">
                            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="flex-grow">
                            <div v-if="airport && airport.name" class="font-medium text-gray-900">
                                {{ airport.name[$i18n.locale] ?? airport.name.en }}
                            </div>
                        </div>
                        <div v-if="airport" class="text-sm font-medium text-prime-color">
                            {{ airport.code }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-else-if="hasSearched" class="flex flex-col items-center pt-8">
            <Vue3Lottie :animationData="NoResultsJson" class="!w-[120px] !h-[120px]" />
            <p class="text-gray-500 text-lg mt-4">{{ $t('notFound') }}</p>
        </div>
    </div>
</template>

<style scoped>
.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style> 