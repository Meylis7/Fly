<script setup>
import { ref, reactive, watch, onMounted, onUnmounted, defineProps, computed  } from 'vue';
import apiService from "@/services/apiService";
import { useI18n } from 'vue-i18n';

const { locale } = useI18n(); 

const currentLocale = computed(() => ['en', 'ru', 'tk'].includes(locale.value) ? locale.value : 'en');


const props = defineProps({
    placeholder: {
        type: String,
        default: 'Enter city or airport',
    },
    modelValue: String
})

const isSelecting = ref(false); // Add this line

const emit = defineEmits(['update:modelValue', 'city-selected', 'airport-selected']);

const searchQuery = ref(props.modelValue || '');
const state = reactive({
    flights: {},
});
const autocompleteContainer = ref(null);

watch(() => props.modelValue, (newValue) => {
    searchQuery.value = newValue || '';
});

watch(searchQuery, (newValue) => {
    if (!isSelecting.value) { // Add this check
        emit('update:modelValue', newValue);
        debouncedFetchAirports();
    }
    isSelecting.value = false; // Reset the flag
});

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const fetchAirports = async () => {
    if (searchQuery.value.length < 3) {
        state.flights = {};
        return;
    }

    try {
        const data = await apiService.fetchAirports(searchQuery.value);
        state.flights = data.data; // Assuming the response contains a 'data' field with the list of airports
    } catch (error) {
        console.error("Error fetching airports:", error);
        state.flights = {};
    }
};

const debouncedFetchAirports = debounce(fetchAirports, 300);

const selectCity = (city, cityData, country) => {
    isSelecting.value = true;
    searchQuery.value = city;
    state.flights = {};
    emit('update:modelValue', city);
    emit('city-selected', {
        city,
        cityData,
        country,
        cityCode: cityData.citycode || (cityData.airports && cityData.airports[0] && cityData.airports[0].code)
    });
};

// const selectCity = (city, cityData, country) => {
//     isSelecting.value = true; // Add this line
//     searchQuery.value = city;
//     state.flights = {};
//     emit('update:modelValue', city);
//     emit('city-selected', { city, cityData, country });
// };


const selectAirport = (airport) => {
    isSelecting.value = true;
    searchQuery.value = airport.name[currentLocale.value] ?? airport.name.en;
    state.flights = {};
    emit('update:modelValue', airport.name[currentLocale.value] ?? airport.name.en);
    emit('airport-selected', {
        airport,
        airportCode: airport.code
    });
};

const handleClickOutside = (event) => {
    if (autocompleteContainer.value && !autocompleteContainer.value.contains(event.target)) {
        state.flights = {};
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="autocomplete" ref="autocompleteContainer">
        <ul v-if="Object.keys(state.flights).length > 0"
            class="flights p-1 block bg-white rounded-xl shadow-lg overflow-auto max-h-96 md:max-h-80 z-10">
            <li v-for="(cityData, city) in state.flights" :key="city">
                <a href="#"
                    class="flex items-center justify-between p-4 border-b border-b-[#C8C8C8] hover:bg-[#303c8526] transition rounded"
                    @click.prevent="selectCity(city, cityData, cityData.country)">

                    <h3 class="text-sm md:text-base font-semibold flex items-center">
                        <span class="block mr-2">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.8172 6.55029L7.45248 0.186293C7.20409 -0.0620977 6.79683 -0.0620977 6.54844 0.186293L0.18444 6.55029C0.0585614 6.67617 0 6.84378 0 7.00197V13.366C0 13.716 0.286095 14.0021 0.636124 14.0021H4.45487C4.8049 14.0021 5.09099 13.716 5.09099 13.366V10.184C5.09099 9.83394 5.37709 9.54785 5.72711 9.54785H8.27289C8.62291 9.54785 8.90901 9.83394 8.90901 10.184V13.366C8.90901 13.716 9.19511 14.0021 9.54513 14.0021H13.3639C13.7139 14.0021 14 13.716 14 13.366V7.00197C14 6.84311 13.9421 6.67685 13.8156 6.55029H13.8172ZM7.00081 6.36585C6.30074 6.36585 5.72789 5.793 5.72789 5.09293C5.72789 4.39286 6.30074 3.82001 7.00081 3.82001C7.70088 3.82001 8.27373 4.39286 8.27373 5.09293C8.27373 5.793 7.70088 6.36585 7.00081 6.36585Z"
                                    fill="#84889B" />
                            </svg>
                        </span>
                        {{ city }}
                        <span v-if="cityData.country" class="text-base font-normal">
                            {{ cityData.country[$i18n.locale] ?? cityData.country.en }}
                        </span>

                    </h3>
                    <p class="text-sm font-semibold capitalize text-[#84889B]">
                        {{ cityData.citycode || (cityData.airports && cityData.airports[0] &&
                            cityData.airports[0].code) }}
                    </p>
                </a>
                <ul v-if="cityData.airports && cityData.airports.length > 1" class="subFlights">
                    <li v-for="airport in cityData.airports" :key="airport.code" class="border-b border-b-[#C8C8C8]">
                        <a href="#"
                            class="flex items-center justify-between p-4 pl-10 hover:bg-[#303c8526] cursor-pointer transition rounded"
                            @click.prevent="selectAirport(airport)">
                            <h6 class="flex items-center">
                                <span class="block mr-2">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13.2949 1.28865C13.2453 1.6813 13.0967 2.02488 12.849 2.31937C12.5022 2.76111 12.1058 3.25194 11.7095 3.64459C11.2636 4.13542 11.2141 4.1845 11.0159 4.33175C10.9168 4.42991 10.8177 4.52807 10.57 4.77348C10.8177 6.00054 11.0654 7.2276 11.2636 8.40557L11.8581 11.5468C11.9077 11.8413 11.8086 12.0867 11.6104 12.2831C11.5113 12.3812 11.4122 12.4794 11.3131 12.5776C11.214 12.6757 11.1645 12.7248 11.0654 12.823C10.8672 13.0193 10.6691 13.0684 10.5204 13.0684C10.4709 13.0684 10.4214 13.0684 10.4214 13.0684C10.2727 13.0684 10.025 12.9702 9.87638 12.6266L7.54785 7.7675L6.70561 8.6019C6.40835 8.89639 6.11109 9.19089 5.76429 9.53446C5.86337 9.87804 5.96246 10.2216 6.06155 10.6143C6.16063 10.9578 6.25972 11.2523 6.30926 11.5959C6.40835 11.8904 6.30926 12.1849 6.06155 12.4303C5.96246 12.5285 5.86337 12.6266 5.76429 12.7248L5.56611 12.9211C5.3184 13.1665 5.07068 13.2156 4.92205 13.1665C4.77342 13.1665 4.5257 13.0684 4.37707 12.7248L3.93118 11.8904C3.63392 11.3505 3.33666 10.8106 3.0394 10.2707C3.0394 10.2216 2.98986 10.2216 2.94032 10.1725C2.3458 9.82895 1.75128 9.53446 1.2063 9.19088L0.512698 8.79823C0.215438 8.6019 0.116346 8.40557 0.0668032 8.25832C0.0668032 8.11108 0.0668032 7.86567 0.31452 7.62026L0.512698 7.42393C0.611784 7.32576 0.710866 7.2276 0.809953 7.08035C1.00813 6.83494 1.30539 6.78586 1.60265 6.83494C1.89991 6.9331 2.19717 6.98219 2.49443 7.08035C2.89078 7.17851 3.23757 7.27668 3.63392 7.37484C4.12935 6.88402 4.67433 6.34412 5.16977 5.85329L5.41748 5.60788L0.512698 3.30102C0.165894 3.15377 0.0668076 2.90836 0.0172643 2.76111C-0.032279 2.61387 0.0172644 2.36846 0.264981 2.07396L0.760414 1.58314C0.958587 1.38681 1.2063 1.33773 1.45402 1.38681C3.0394 1.6813 4.57525 1.9758 6.16063 2.27029L7.74602 2.56478C7.94419 2.61387 8.14236 2.61387 8.34054 2.66295L8.83597 2.17213C9.08369 1.92671 9.18278 1.82855 9.7773 1.28865C10.1241 0.945071 10.5204 0.650577 10.9663 0.356084C11.2636 0.159755 11.6599 0.0615901 11.9077 0.0125078C12.2545 -0.0365744 12.6013 0.0615898 12.849 0.257919C13.1958 0.552412 13.3444 0.895988 13.2949 1.28865Z"
                                            fill="#84889B" />
                                    </svg>
                                </span>
                                <span v-if="airport && airport.name">
                                    {{ airport.name[$i18n.locale] ?? airport.name.en }}
                                </span>
                            </h6>
                            <p v-if="airport">{{ airport.code }}</p>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>


<style scoped>
.autocomplete {
    position: relative;
    width: 100%;
}

.flights {
    z-index: 10;
}
</style>
