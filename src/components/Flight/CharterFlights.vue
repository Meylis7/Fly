<script setup>
    import { ref, reactive, watch, computed, onMounted, onUnmounted } from "vue";
    import { useRouter, useRoute } from 'vue-router'
    import apiService from "@/services/apiService";

    import { useI18n } from 'vue-i18n';

    const { locale } = useI18n();
    const { t } = useI18n();

    const currentLocale = computed(() => ['en', 'ru'].includes(locale.value) ? locale.value : 'en');

    const route = useRoute()
    const router = useRouter()

    // Reactive data for form state
    const departureCities = ref([]);
    const destinationCities = ref([]);
    const availableDates = ref([]);
    const availableFlights = ref([]);

    // Selected values
    const selectedDepartureCity = ref(null);
    const selectedDestinationCity = ref(null);
    const selectedDate = ref(null);

    // Loading states
    const loading = reactive({
        departureCities: false,
        destinationCities: false,
        availableDates: false,
        availableFlights: false
    });

    // Error states
    const errors = ref({});

    // API service methods for charter flights
    const charterFlightAPI = {
        async getDepartureCities() {
            try {
                loading.departureCities = true;
                const response = await apiService.get('/charter-flights/departure-cities', {
                    headers: {
                        'Accept-Language': currentLocale.value
                    }
                });
                return response.data || response;
            } catch (error) {
                console.error('Error fetching departure cities:', error);
                throw error;
            } finally {
                loading.departureCities = false;
            }
        },

        async getDestinationCities(departureCityId) {
            try {
                loading.destinationCities = true;
                const response = await apiService.get('/charter-flights/destination-cities', {
                    params: { departure_city_id: departureCityId },
                    headers: {
                        'Accept-Language': currentLocale.value
                    }
                });
                return response.data || response;
            } catch (error) {
                console.error('Error fetching destination cities:', error);
                throw error;
            } finally {
                loading.destinationCities = false;
            }
        },

        async getAvailableDates(departureCityId, destinationCityId) {
            try {
                loading.availableDates = true;
                const response = await apiService.get('/charter-flights/available-dates', {
                    params: { 
                        departure_city_id: departureCityId,
                        destination_city_id: destinationCityId
                    },
                    headers: {
                        'Accept-Language': currentLocale.value
                    }
                });
                return response.data || response;
            } catch (error) {
                console.error('Error fetching available dates:', error);
                throw error;
            } finally {
                loading.availableDates = false;
            }
        },

        async getAvailableFlights(departureCityId, destinationCityId, date) {
            try {
                loading.availableFlights = true;
                const response = await apiService.get('/charter-flights/available-flights', {
                    params: { 
                        departure_city_id: departureCityId,
                        destination_city_id: destinationCityId,
                        date: date
                    },
                    headers: {
                        'Accept-Language': currentLocale.value
                    }
                });
                return response.data || response;
            } catch (error) {
                console.error('Error fetching available flights:', error);
                throw error;
            } finally {
                loading.availableFlights = false;
            }
        }
    };

    // Load departure cities on component mount
    const loadDepartureCities = async () => {
        try {
            departureCities.value = await charterFlightAPI.getDepartureCities();
        } catch (error) {
            errors.value.departureCities = t('errors.failedToLoadDepartureCities');
        }
    };

    // Load destination cities when departure city changes
    const loadDestinationCities = async (departureCityId) => {
        if (!departureCityId) {
            destinationCities.value = [];
            return;
        }

        try {
            destinationCities.value = await charterFlightAPI.getDestinationCities(departureCityId);
            delete errors.value.destinationCities;
        } catch (error) {
            errors.value.destinationCities = t('errors.failedToLoadDestinationCities');
            destinationCities.value = [];
        }
    };

    // Load available dates when both cities are selected
    const loadAvailableDates = async (departureCityId, destinationCityId) => {
        if (!departureCityId || !destinationCityId) {
            availableDates.value = [];
            return;
        }

        try {
            availableDates.value = await charterFlightAPI.getAvailableDates(departureCityId, destinationCityId);
            delete errors.value.availableDates;
        } catch (error) {
            errors.value.availableDates = t('errors.failedToLoadAvailableDates');
            availableDates.value = [];
        }
    };

    // Load available flights when all selections are made
    const loadAvailableFlights = async (departureCityId, destinationCityId, date) => {
        if (!departureCityId || !destinationCityId || !date) {
            availableFlights.value = [];
            return;
        }

        try {
            availableFlights.value = await charterFlightAPI.getAvailableFlights(departureCityId, destinationCityId, date);
            delete errors.value.availableFlights;
        } catch (error) {
            errors.value.availableFlights = t('errors.failedToLoadAvailableFlights');
            availableFlights.value = [];
        }
    };

    // Watchers for dependent dropdowns
    watch(selectedDepartureCity, async (newDepartureCityId, oldDepartureCityId) => {
        if (newDepartureCityId !== oldDepartureCityId) {
            // Reset dependent selections
            selectedDestinationCity.value = null;
            selectedDate.value = null;
            availableDates.value = [];
            availableFlights.value = [];

            // Load destination cities for new departure city
            await loadDestinationCities(newDepartureCityId);
        }
    });

    watch(selectedDestinationCity, async (newDestinationCityId, oldDestinationCityId) => {
        if (newDestinationCityId !== oldDestinationCityId) {
            // Reset dependent selections
            selectedDate.value = null;
            availableFlights.value = [];

            // Load available dates for selected cities
            await loadAvailableDates(selectedDepartureCity.value, newDestinationCityId);
        }
    });

    watch(selectedDate, async (newDate, oldDate) => {
        if (newDate !== oldDate) {
            // Load available flights for selected date
            await loadAvailableFlights(selectedDepartureCity.value, selectedDestinationCity.value, newDate);
        }
    });

    // Watch locale changes to reload data
    watch(currentLocale, async () => {
        await loadDepartureCities();
        if (selectedDepartureCity.value) {
            await loadDestinationCities(selectedDepartureCity.value);
        }
        if (selectedDepartureCity.value && selectedDestinationCity.value) {
            await loadAvailableDates(selectedDepartureCity.value, selectedDestinationCity.value);
        }
        if (selectedDepartureCity.value && selectedDestinationCity.value && selectedDate.value) {
            await loadAvailableFlights(selectedDepartureCity.value, selectedDestinationCity.value, selectedDate.value);
        }
    });

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(currentLocale.value, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Format time for display
    const formatTime = (datetime) => {
        if (!datetime) return '';
        const date = new Date(datetime);
        return date.toLocaleTimeString(currentLocale.value, {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Format price for display
    const formatPrice = (price) => {
        if (!price) return '';
        return new Intl.NumberFormat(currentLocale.value, {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    // Handle flight booking (placeholder for future implementation)
    const handleFlightBooking = (flight) => {
        // WhatsApp number in international format (without + and spaces)
        const whatsappNumber = '99361387806';
        
        // Create a pre-filled message with flight details using localized text
        const message = `${t('whatsappBooking.greeting')}

🛫 ${t('whatsappBooking.route')}: ${flight.city_from?.name || 'N/A'} → ${flight.city_to?.name || 'N/A'}
📅 ${t('whatsappBooking.date')}: ${formatDate(flight.departure_datetime)}
🕐 ${t('whatsappBooking.time')}: ${formatTime(flight.departure_datetime)}
💰 ${t('whatsappBooking.price')}: ${formatPrice(flight.price)}

${t('whatsappBooking.request')}

${t('whatsappBooking.thanks')}`;

        // URL encode the message
        const encodedMessage = encodeURIComponent(message);
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in a new tab/window
        window.open(whatsappUrl, '_blank');
        
        console.log('Opening WhatsApp for flight booking:', flight);
    };

    // Lifecycle hooks
    onMounted(async () => {
        await loadDepartureCities();
        document.addEventListener('click', handleOutsideClick);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleOutsideClick);
    });

    // Close modal when clicking outside (keeping existing functionality)
    const handleOutsideClick = (event) => {
        // Existing outside click logic can be kept here if needed
    };

    const state = reactive({
        flights: [],
    })

    // const fetchAirports = async () => {
    //     if (departureCity.value.length < 3) {
    //         state.flights = {};
    //         return;
    //     }

    //     try {
    //         state.flights = await apiService.fetchAirports(departureCity.value);
    //     } catch {
    //         state.flights = {};
    //     }
    // };

</script>

<template>
    <form class="w-full relative">
        <div
            class="content w-full pt-5 px-[30px] pb-[60px] bg-white rounded-tr-none md:rounded-tr-3xl rounded-r-3xl rounded-bl-3xl">

            <div class="flex flex-wrap z-20 1xl:flex-nowrap items-center justify-between gap-y-3">
                <!-- Departure City Dropdown -->
                <div class="w-full md:w-[calc(50%-25px)] lg:w-[calc(33.33%-25px)]">
                    <label class="text-sm font-normal mb-2 block">
                        {{ $t("searchForm.routeFrom.label") }}
                    </label>
                    <select
                        v-model="selectedDepartureCity"
                        :disabled="loading.departureCities"
                        class="text-sm lg:text-base font-normal w-full py-[14px] min-h-[54px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                        :class="{ 'opacity-50': loading.departureCities, 'border-red-500': errors.departureCities }">
                        
                        <option value="" disabled selected>
                            {{ loading.departureCities ? $t('loading') : $t('selectDepartureCity') }}
                        </option>
                        <option 
                            v-for="city in departureCities" 
                            :key="city.id" 
                            :value="city.id"
                            class="text-base text-black">
                            {{ city.name }}
                        </option>
                    </select>
                    <div v-if="errors.departureCities" class="text-red-500 text-sm mt-1">
                        {{ errors.departureCities }}
                    </div>
                </div>

                <span class="bg-[#F2F3F4] w-[3px] h-[73px] rounded hidden md:block"></span>

                <!-- Destination City Dropdown -->
                <div class="w-full md:w-[calc(50%-25px)] lg:w-[calc(33.33%-25px)]">
                    <label class="text-sm font-normal mb-2 block">
                        {{ $t("searchForm.routeTo.label") }}
                    </label>
                    <select
                        v-model="selectedDestinationCity"
                        :disabled="!selectedDepartureCity || loading.destinationCities"
                        class="text-sm lg:text-base font-normal w-full py-[14px] min-h-[54px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                        :class="{ 'opacity-50': !selectedDepartureCity || loading.destinationCities, 'border-red-500': errors.destinationCities }">
                        
                        <option value="" disabled selected>
                            <span v-if="!selectedDepartureCity">{{ $t('selectDepartureCityFirst') }}</span>
                            <span v-else-if="loading.destinationCities">{{ $t('loading') }}</span>
                            <span v-else>{{ $t('selectDestinationCity') }}</span>
                        </option>
                        <option 
                            v-for="city in destinationCities" 
                            :key="city.id" 
                            :value="city.id"
                            class="text-base text-black">
                            {{ city.name }}
                        </option>
                    </select>
                    <div v-if="errors.destinationCities" class="text-red-500 text-sm mt-1">
                        {{ errors.destinationCities }}
                    </div>
                </div>

                <span class="bg-[#F2F3F4] w-[3px] h-[73px] rounded hidden lg:block"></span>

                <!-- Date Dropdown -->
                <div class="w-full md:w-[calc(50%-25px)] lg:w-[calc(33.33%-25px)]">
                    <label class="text-sm font-normal mb-2 block">
                        {{ $t("searchForm.datePicker.placeholder") }}
                    </label>
                    <select
                        v-model="selectedDate"
                        :disabled="!selectedDepartureCity || !selectedDestinationCity || loading.availableDates"
                        class="text-sm lg:text-base font-normal w-full py-[14px] min-h-[54px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                        :class="{ 'opacity-50': !selectedDepartureCity || !selectedDestinationCity || loading.availableDates, 'border-red-500': errors.availableDates }">
                        
                        <option value="" disabled selected>
                            <span v-if="!selectedDepartureCity || !selectedDestinationCity">{{ $t('selectCitiesFirst') }}</span>
                            <span v-else-if="loading.availableDates">{{ $t('loading') }}</span>
                            <span v-else-if="availableDates.length === 0">{{ $t('noDatesAvailable') }}</span>
                            <span v-else>{{ $t('selectDate') }}</span>
                        </option>
                        <option 
                            v-for="date in availableDates" 
                            :key="date" 
                            :value="date"
                            class="text-base text-black">
                            {{ formatDate(date) }}
                        </option>
                    </select>
                    <div v-if="errors.availableDates" class="text-red-500 text-sm mt-1">
                        {{ errors.availableDates }}
                    </div>
                </div>
            </div>

            <!-- Loading indicator for flights -->
            <div v-if="loading.availableFlights" class="flex justify-center items-center mt-7 p-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#223A60]"></div>
                <span class="ml-3 text-[#223A60]">{{ $t('loadingFlights') }}</span>
            </div>

            <!-- Error message for flights -->
            <div v-else-if="errors.availableFlights" class="mt-7 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {{ errors.availableFlights }}
            </div>

            <!-- No flights message -->
            <div v-else-if="selectedDepartureCity && selectedDestinationCity && selectedDate && availableFlights.length === 0 && !loading.availableFlights" 
                 class="mt-7 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                {{ $t('noFlightsAvailable') }}
            </div>

            <!-- Flight Results -->
            <div v-for="flight in availableFlights" :key="flight.id" 
                 class="ticket block sm:flex justify-between border border-solid border-[#A1B0CC] rounded mt-7 px-5 py-4">
                <div class="block">
                    <div class="flex items-center justify-center gap-x-3 mb-3 text-xl">
                        <h6 class="font-medium">
                            {{ flight.city_from?.name || $t('departure') }}
                        </h6>
                        <span class="block">
                            <svg width="16" height="11" viewBox="0 0 20 14" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.4625 0.253559C13.3992 0.178316 13.3208 0.116973 13.2323 0.0734407C13.1437 0.0299081 13.047 0.00514119 12.9483 0.000718845C12.8496 -0.0037035 12.751 0.0123158 12.6589 0.0477555C12.5667 0.0831951 12.483 0.137278 12.4132 0.206555C12.3433 0.275832 12.2887 0.358784 12.253 0.450123C12.2172 0.541461 12.2011 0.639182 12.2055 0.737055C12.21 0.834928 12.235 0.930806 12.2789 1.01858C12.3228 1.10635 12.3847 1.18408 12.4606 1.24683L17.5726 6.32046H0.675595C0.493192 6.33005 0.321449 6.40864 0.195757 6.54003C0.0700649 6.67142 0 6.8456 0 7.02667C0 7.20775 0.0700649 7.38193 0.195757 7.51332C0.321449 7.64471 0.493192 7.7233 0.675595 7.73289H17.5726L12.4526 12.8006C12.3237 12.9343 12.2518 13.1122 12.2518 13.2972C12.2518 13.4822 12.3237 13.66 12.4526 13.7938C12.5183 13.8592 12.5964 13.911 12.6823 13.9464C12.7683 13.9818 12.8605 14 12.9535 14C13.0466 14 13.1388 13.9818 13.2248 13.9464C13.3107 13.911 13.3888 13.8592 13.4545 13.7938L19.7869 7.51636C19.8543 7.45204 19.9079 7.37491 19.9445 7.28958C19.9811 7.20424 20 7.11246 20 7.01972C20 6.92698 19.9811 6.8352 19.9445 6.74987C19.9079 6.66453 19.8543 6.5874 19.7869 6.52309L13.4625 0.253559Z"
                                    fill="black" />
                            </svg>
                        </span>
                        <h6 class="font-medium">
                            {{ flight.city_to?.name || $t('destination') }}
                        </h6>
                    </div>

                    <div class="flex items-center justify-center gap-x-2 sm:mt-6">
                        <span>
                            <svg width="28" height="28" viewBox="0 0 25 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.33203 2.5V5.5" stroke="#223A60" stroke-width="1.5" stroke-miterlimit="10"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.332 2.5V5.5" stroke="#223A60" stroke-width="1.5" stroke-miterlimit="10"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.4" d="M3.83203 9.58984H20.832" stroke="#223A60" stroke-width="1.5"
                                    stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M21.332 9V17.5C21.332 20.5 19.832 22.5 16.332 22.5H8.33203C4.83203 22.5 3.33203 20.5 3.33203 17.5V9C3.33203 6 4.83203 4 8.33203 4H16.332C19.832 4 21.332 6 21.332 9Z"
                                    stroke="#223A60" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path opacity="0.4" d="M16.0258 14.2002H16.0347" stroke="#223A60" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.4" d="M16.0258 17.2002H16.0347" stroke="#223A60" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.4" d="M12.3265 14.2002H12.3355" stroke="#223A60" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.4" d="M12.3265 17.2002H12.3355" stroke="#223A60" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.4" d="M8.62732 14.2002H8.6363" stroke="#223A60" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.4" d="M8.625 17.2002H8.63398" stroke="#223A60" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <p class="text-base sm:text-lg">
                            {{ formatDate(flight.departure_datetime) }} • {{ formatTime(flight.departure_datetime) }}
                        </p>
                    </div>
                </div>

                <div class="block text-right">
                    <h4 class="hidden sm:block font-medium">
                        {{ formatPrice(flight.price) }}
                    </h4>

                    <button 
                        type="button"
                        @click="handleFlightBooking(flight)"
                        class="block w-full text-center p-3 mt-3 bg-[#223A60] rounded text-white hover:bg-[#1a2d4d] transition-colors">
                        <p class="hidden sm:block text-base">
                            {{ $t('contactToBook') }}
                        </p>

                        <p class="sm:hidden text-xl">
                            {{ formatPrice(flight.price) }}
                        </p>
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<style lang="scss" scoped>
    @use '../../assets/css/variables.scss' as v;


    .modal {
        box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.15);
    }

    .air-type {
        margin-right: 10px;

        &:last-child {
            margin-right: 0;
        }

        input {
            display: none;
            appearance: none;

            &:checked~label {
                background: v.$main-color;
                color: #fff;
            }
        }

        label {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.06em;
            color: #223A60;
            padding: 10px;
            border-radius: 7px;
            display: block;
            cursor: pointer;
            background: #F2F3F4;
        }
    }

    .class-type {
        margin-right: 10px;

        &:last-child {
            margin-right: 0;
        }

        input {
            display: none;

            &:checked~label {
                background: white;
            }
        }

        label {
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
            letter-spacing: 0.06em;
            text-transform: capitalize;
            color: #000000;
            display: block;
            cursor: pointer;
            text-align: center;
            padding: 12px;
            border-radius: 7px;
        }
    }

    .rotate-animation {
        animation: rotate 0.5s ease-in-out;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(180deg);
        }
    }

    .not-allowed {
        pointer-events: none;
        cursor: not-allowed;
    }

    .opacity-50 {
        opacity: 0.5;
    }

    .cursor-not-allowed {
        cursor: not-allowed;
    }

    .disabled {
        opacity: 0.5;
        pointer-events: none;
        cursor: not-allowed;
    }

    .passenger-counter input[type="number"]::-webkit-charter-spin-button,
    .passenger-counter input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .passenger-counter input[type="number"] {
        -moz-appearance: textfield;
    }
</style>