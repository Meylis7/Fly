<script setup>
    import { ref, reactive, watch, computed, onMounted, onUnmounted } from "vue";
    import Autocomplete from "../Autocomplete.vue";
    import { useRouter, useRoute } from 'vue-router'
    import CitySelectionModal from './CitySelectionModal.vue';

    import 'v-calendar/style.css'; // Import the CSS
    import minus from '@/assets/images/svg/minus.svg'
    import plus from '@/assets/images/svg/plus.svg'
    import calendar from '@/assets/images/svg/calendar.svg'
    import apiService from "@/services/apiService";

    import { useI18n } from 'vue-i18n';

    const { locale } = useI18n();
    const { t } = useI18n();

    const currentLocale = computed(() => ['en', 'ru'].includes(locale.value) ? locale.value : 'en');

    const route = useRoute()
    const router = useRouter()

    const departureCityCode = ref("");
    const departureCity = ref("");
    const arrivalCityCode = ref("");
    const arrivalCity = ref("");
    const tripType = ref('one-way');
    const isRotating = ref(false);

    const swapCities = () => {
        // Trigger rotate animation
        isRotating.value = true;

        // Swap input values
        const temp = departureCity.value;
        departureCity.value = arrivalCity.value;
        arrivalCity.value = temp;

        const tempCode = departureCityCode;
        departureCityCode = arrivalCityCode.value;
        arrivalCityCode = tempCode;

        // Remove animation class after animation ends
        setTimeout(() => {
            isRotating.value = false;
        }, 500); // Match the animation duration
    };

    // Calendar inputs ======================================================
    const departureDate = ref(null);
    const returnDate = ref(null);
    const minDate = ref(new Date());
    const departureCalendarVisible = ref(false);
    const returnCalendarVisible = ref(false);
    const departureInput = ref(null);
    const returnInput = ref(null);

    function formatDate(date) {
        if (!date) return ''
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    const openDepartureCalendar = () => {
        departureCalendarVisible.value = true;
        returnCalendarVisible.value = false; // Close other calendar
    };

    const openReturnCalendar = () => {
        returnCalendarVisible.value = true;
        departureCalendarVisible.value = false; // Close other calendar
    };

    const onDepartureDateSelect = () => {
        departureCalendarVisible.value = false;
    };

    const onReturnDateSelect = () => {
        returnCalendarVisible.value = false;
    };

    const isPastDay = (day) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayDate = new Date(day.year, day.month, day.day);
        return dayDate < today;
    };

    const handleClickOutside = (event) => {
        if (event.target.closest('.vc-container')) {
            return;
        }
        if (departureCalendarVisible.value && !departureInput.value.contains(event.target)) {
            departureCalendarVisible.value = false;
        }
        if (returnCalendarVisible.value && !returnInput.value.contains(event.target)) {
            returnCalendarVisible.value = false;
        }
    };

    // Modal people count ======================================

    const counts = ref({
        adult: 1,
        child: 0,
        infant: 0,
    });
    const totalCount = computed(() => {
        return counts.value.adult + counts.value.child + counts.value.infant;
    });

    const isMaxCount = computed(() => totalCount.value >= 9);

    const incrementCount = (type) => {
        if (!isMaxCount.value) {
            counts.value[type]++;
        }
    };

    const decrementCount = (type) => {
        if (type === 'adult' && counts.value[type] > 1) {
            counts.value[type]--;
        } else if (type !== 'adult' && counts.value[type] > 0) {
            counts.value[type]--;
        }
    };

    const showModal = ref(false);

    const selectedClass = ref('all'); // Default selected class

    const passengerDisplay = computed(() => {
        // Get the selected class text (Econom or Business)
        // const selectedClassText = selectedClass.value === 'econom' ? 'Econom' : selectedClass.value === 'all' ? 'All' : 'Business';
        const selectedClassText = selectedClass.value === 'econom' ? `${t('searchForm.typeFlights[1].title')}` : selectedClass.value === 'all' ? `${t('searchForm.typeFlights[0].title')}` : `${t('searchForm.typeFlights[2].title')}`;

        // const selectedClassText = t(`searchForm.typeFlights.find(flight => flight.value === '${selectedClass.value}').title`);
        return `${totalCount.value} ${t('searchForm.passengers.label')}, ${selectedClassText}`;
    });

    const toggleModal = () => {
        showModal.value = !showModal.value;
    };


    const errors = ref({});
    const validateForm = () => {
        errors.value = {};

        if (!departureCityCode.value) {
            errors.value.departureCityCode = "required";
        }

        if (!arrivalCityCode.value) {
            errors.value.arrivalCityCode = "required";
        }

        if (!departureDate.value) {
            errors.value.departureDate = "required";
        }

        if (tripType.value === 'round-trip' && !returnDate.value) {
            errors.value.returnDate = "required";
        }

        console.log(errors.value);
        return Object.keys(errors.value).length === 0;
    };

    // Form submission handler
    const handleSubmit = (event) => {
        if (!validateForm()) return;
        event.preventDefault()

        // Prepare query parameters
        const queryParams = {
            tripType: tripType.value,
            departureCityCode: departureCityCode.value,
            departureCity: departureCity.value,
            arrivalCityCode: arrivalCityCode.value,
            arrivalCity: arrivalCity.value,
            departureDate: departureDate.value,
            returnDate: returnDate.value,

            adults: counts.value.adult,
            children: counts.value.child,
            infants: counts.value.infant,
            flightClass: selectedClass.value
        }

        // console.log(departureDate.value)
        // console.log(departureDate.value.toISOString().split('T')[0])
        // Navigate to results with query parameters
        if (route.name === 'flights') {
            window.location.href = router.resolve({
                name: 'flights',
                query: queryParams
            }).href
        } else {
            router.push({
                name: 'flights',
                query: queryParams,
                force: true
            })
        }
    }

    // Close modal when clicking outside
    const handleOutsideClick = (event) => {
        if (showModal.value && !event.target.closest('.modal') && !event.target.closest('#passengers-input')) {
            showModal.value = false;
        }

        if (autocompleteContainer.value && !autocompleteContainer.value.contains(event.target)) {
            state.flights = {};
        }
    };

    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('click', handleOutsideClick);


        // Populate city details from route params
        departureCityCode.value = route.query.departureCityCode || ""
        departureCity.value = route.query.departureCity || ""
        arrivalCityCode.value = route.query.arrivalCityCode || ""
        arrivalCity.value = route.query.arrivalCity || ""

        // Populate dates
        departureDate.value = route.query.departureDate
            ? new Date(route.query.departureDate)
            : null

        returnDate.value = route.query.returnDate
            ? new Date(route.query.returnDate)
            : null

        // Populate passenger counts
        counts.value.adult = Number(route.query.adults) || 1
        counts.value.child = Number(route.query.children) || 0
        counts.value.infant = Number(route.query.infants) || 0

        // Populate flight class and type
        selectedClass.value = route.query.flightClass || 'all'
        tripType.value = route.query.tripType || 'one-way'
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('click', handleOutsideClick);
    });

    const autocompleteContainer = ref(null);
    const state = reactive({
        flights: [],
    })

    const emit = defineEmits(['city-selected', 'airport-selected']);

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
        if (departureCity.value.length < 3) {
            state.flights = {};
            return;
        }

        try {
            state.flights = await apiService.fetchAirports(departureCity.value);
        } catch {
            state.flights = {};
        }
    };


    const debouncedFetchAirports = debounce(fetchAirports, 300);

    watch(departureCity, () => {
        debouncedFetchAirports();
    });

    const handleDepartureCitySelected = (selectedCity) => {
        departureCity.value = selectedCity.city;
        departureCityCode.value = selectedCity.cityCode;
    };

    const handleDepartureAirportSelected = (selectedAirport) => {
        departureCity.value = selectedAirport.airport.name[currentLocale.value] ?? selectedAirport.airport.name.en;
        departureCityCode.value = selectedAirport.airportCode;
    };

    const handleArrivalCitySelected = (selectedCity) => {
        arrivalCity.value = selectedCity.city;
        arrivalCityCode.value = selectedCity.cityCode;
    };

    const handleArrivalAirportSelected = (selectedAirport) => {
        arrivalCity.value = selectedAirport.airport.name[currentLocale.value] ?? selectedAirport.airport.name.en;
        arrivalCityCode.value = selectedAirport.airportCode;
    };
    // import { useScreens } from 'vue-screen-utils';

    // const { mapCurrent } = useScreens({ xs: '0px', sm: '640px', md: '768px', lg: '1024px' });
    // const columns = mapCurrent({ lg: 2 }, 1);

    const handleFocus = (event) => {
        // For Samsung devices, we need to trigger a blur and then focus
        if (/Samsung/i.test(navigator.userAgent)) {
            event.target.blur();
            setTimeout(() => {
                event.target.focus();
            }, 100);
        }
    };

    const handleBlur = (event) => {
        // Handle any blur-related logic if needed
    };

    // Add these refs after other refs
    const showDepartureModal = ref(false);
    const showArrivalModal = ref(false);

    // Add these methods after other methods
    const openDepartureModal = () => {
        if (window.innerWidth < 768) { // Only open modal on mobile
            showDepartureModal.value = true;
        }
    };

    const openArrivalModal = () => {
        if (window.innerWidth < 768) { // Only open modal on mobile
            showArrivalModal.value = true;
        }
    };
</script>

<template>
    <form class="w-full relative" @submit.prevent="handleSubmit">
        <div
            class="content w-full pt-5 px-[30px] pb-[60px] bg-white rounded-tr-none md:rounded-tr-3xl rounded-r-3xl rounded-bl-3xl">
            <div class="flex items-center mb-5">
                <div class="air-type">
                    <input type="radio" name="type" checked id="one-way" value="one-way" v-model="tripType">
                    <label for="one-way">{{ $t("searchForm.flightType.oneWay") }}</label>
                </div>

                <div class="air-type">
                    <input type="radio" name="type" id="round" value="round-trip" v-model="tripType">
                    <label for="round">{{ $t("searchForm.flightType.RoundTrip") }}</label>
                </div>
            </div>

            <div class="flex flex-wrap z-20 1xl:flex-nowrap items-center justify-between gap-y-3">
                <div
                    class="flex items-center xsm:items-end flex-col xsm:flex-row relative gap-x-[22px] w-full 1xl:w-[35%] mb-5 1xl:mb-0">
                    <div class="relative w-full xsm:w-1/2 1xl:w-full mb-5 xsm:mb-0">
                        <label class="flex items-center gap-3 text-base font-bold text-prime-color mb-2">
                            {{ $t("searchForm.routeFrom.label") }}

                            <span>
                                <svg width="20" height="17" viewBox="0 0 20 17" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.06058 7.93614L18.9155 12.3495C19.525 12.5177 20.0924 11.9923 19.9874 11.3618L19.9243 11.0255C19.567 8.94491 17.9278 7.30565 15.8472 6.92736L13.1571 6.44399L10.4881 1.46316C10.1938 0.895719 9.66843 0.496412 9.03795 0.349299L7.60885 0.0130405C7.25157 -0.0710242 6.93633 0.265234 7.02039 0.622509L8.34441 5.58232L3.72086 4.74168L2.58598 2.28279C2.52293 2.15669 2.41785 2.05161 2.27074 2.00958L0.63148 1.54722C0.295221 1.46316 -0.0200212 1.71535 0.000994971 2.07262L0.35827 5.96062C0.463351 6.90634 1.13587 7.70496 2.06058 7.93614Z"
                                        fill="#223A60" />
                                    <path
                                        d="M19.5427 14.6194H0.859308C0.607114 14.6194 0.417969 14.8295 0.417969 15.0607V15.9644C0.417969 16.2166 0.62813 16.4058 0.859308 16.4058H19.5217C19.7739 16.4058 19.963 16.1956 19.963 15.9644V15.0607C19.984 14.8085 19.7739 14.6194 19.5427 14.6194Z"
                                        fill="#223A60" />
                                </svg>
                            </span>
                        </label>

                        <input type="text" v-model="departureCity" :placeholder="$t('searchForm.routeFrom.placeholder')"
                            class="bg-[#F2F3F4] w-full text-base font-medium p-3 rounded-md focus:ring-1 focus:ring-prime-color"
                            :class="errors.departureCityCode ? 'border-red-500 border-solid border' : ''"
                            @click="openDepartureModal"
                            @focus="handleFocus"
                            @blur="handleBlur">

                        <Autocomplete v-model="departureCity" @city-selected="handleDepartureCitySelected"
                            @airport-selected="handleDepartureAirportSelected"
                            class="!absolute z-[51] top-[calc(100%+5px)] left-0 min-w-full xsm:min-w-80 lg:!min-w-96 hidden md:block" />
                    </div>

                    <button @click="swapCities" type="button"
                        class="cursor-pointer block absolute right-0 xsm:right-auto xsm:left-[50%] rotate-90 xsm:rotate-0 xsm:translate-x-[-50%] bottom-[55px] xsm:bottom-1 z-10">
                        <svg :class="{ 'rotate-animation': isRotating }" class="pointer-events-none" width="40"
                            height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="20" fill="#223A60" />
                            <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#223A60"
                                stroke-opacity="0.3" />
                            <path
                                d="M28.8015 17.6152L28.7754 17.6465L25.6413 20.2582C25.5236 20.3553 25.376 20.4088 25.2234 20.4097C25.1242 20.4132 25.0255 20.3938 24.9349 20.3531C24.8443 20.3123 24.7643 20.2513 24.7011 20.1746C24.5903 20.0416 24.5369 19.8701 24.5526 19.6977C24.5682 19.5253 24.6517 19.3662 24.7847 19.2553L26.5345 17.798H15.8212C15.6481 17.798 15.482 17.7292 15.3596 17.6067C15.2371 17.4843 15.1683 17.3182 15.1683 17.145C15.1683 16.9719 15.2371 16.8058 15.3596 16.6834C15.482 16.5609 15.6481 16.4921 15.8212 16.4921H26.5554L24.8056 15.0348C24.7374 14.9807 24.6807 14.9135 24.6388 14.8371C24.597 14.7608 24.5708 14.6768 24.5619 14.5902C24.553 14.5036 24.5615 14.4161 24.5869 14.3328C24.6123 14.2495 24.6541 14.1722 24.7098 14.1053C24.7655 14.0384 24.8341 13.9834 24.9114 13.9434C24.9888 13.9034 25.0733 13.8792 25.1601 13.8724C25.2469 13.8655 25.3342 13.8761 25.4168 13.9035C25.4995 13.9309 25.5758 13.9745 25.6413 14.0319L28.7754 16.6436L28.8015 16.6749L28.8328 16.7011C28.8824 16.7552 28.9229 16.8169 28.953 16.8839C28.953 16.8839 28.953 16.8839 28.953 16.91C28.984 16.9845 29 17.0644 29 17.145C29 17.2257 28.984 17.3056 28.953 17.3801C28.953 17.3801 28.953 17.3801 28.953 17.4062C28.9229 17.4732 28.8824 17.5349 28.8328 17.589L28.8015 17.6152ZM24.1788 22.2379H13.4446L15.1944 20.7806C15.2626 20.7265 15.3193 20.6592 15.3612 20.5829C15.403 20.5065 15.4292 20.4226 15.4381 20.336C15.447 20.2494 15.4385 20.1619 15.4131 20.0786C15.3877 19.9953 15.3459 19.918 15.2902 19.8511C15.2345 19.7842 15.1659 19.7291 15.0886 19.6891C15.0112 19.6491 14.9267 19.625 14.8399 19.6182C14.7531 19.6113 14.6658 19.6219 14.5832 19.6493C14.5005 19.6767 14.4242 19.7203 14.3587 19.7777L11.2246 22.3894L11.1933 22.4207C11.1305 22.4794 11.0807 22.5506 11.047 22.6297C11.047 22.6297 11.047 22.6297 11.047 22.6558C11.016 22.7303 11 22.8102 11 22.8908C11 22.9715 11.016 23.0514 11.047 23.1259C11.047 23.1259 11.047 23.1259 11.047 23.152C11.0758 23.2196 11.1165 23.2815 11.1672 23.3348L11.1985 23.3662L14.3326 25.9779C14.4492 26.0769 14.5975 26.1307 14.7504 26.1294C14.8497 26.1329 14.9484 26.1135 15.039 26.0727C15.1296 26.032 15.2096 25.9709 15.2728 25.8943C15.3836 25.7613 15.437 25.5897 15.4213 25.4174C15.4056 25.245 15.3222 25.0859 15.1892 24.975L13.4446 23.5438H24.1788C24.3519 23.5438 24.518 23.475 24.6405 23.3525C24.7629 23.2301 24.8317 23.064 24.8317 22.8908C24.8317 22.7177 24.7629 22.5516 24.6405 22.4291C24.518 22.3067 24.3519 22.2379 24.1788 22.2379Z"
                                fill="#F2F3F4" />
                        </svg>
                    </button>

                    <div class="relative w-full xsm:w-1/2 1xl:w-full">
                        <label class="flex items-center gap-3 text-base font-bold text-prime-color mb-2">
                            {{ $t("searchForm.routeTo.label") }}

                            <span>
                                <svg width="22" height="19" viewBox="0 0 22 19" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.30379 14.0902L20.2487 9.99418C20.7929 9.85265 20.9963 9.19563 20.635 8.75674L20.4369 8.52578C19.2365 7.08211 17.2449 6.54846 15.4741 7.18232L13.1872 8.00627L8.91643 5.35678C8.43747 5.05056 7.85522 4.97665 7.30418 5.14371L6.0539 5.52022C5.74133 5.61435 5.64805 6.01354 5.87168 6.25134L9.09709 9.48278L5.16204 10.8914L3.19446 9.50211C3.08982 9.43302 2.96216 9.39881 2.83015 9.43186L1.36193 9.80471C1.06555 9.88949 0.934887 10.2239 1.10995 10.4898L3.11411 13.3256C3.61561 14.0073 4.48875 14.3233 5.30379 14.0902Z"
                                        fill="#223A60" />
                                    <path
                                        d="M20.5823 16.7935H2.00142C1.75061 16.7935 1.5625 16.9804 1.5625 17.186V17.9897C1.5625 18.214 1.77151 18.3822 2.00142 18.3822H20.5614C20.8122 18.3822 21.0003 18.1953 21.0003 17.9897V17.186C21.0212 16.9617 20.8122 16.7935 20.5823 16.7935Z"
                                        fill="#223A60" />
                                </svg>
                            </span>
                        </label>

                        <input type="text" v-model="arrivalCity" :placeholder="$t('searchForm.routeTo.placeholder')"
                            class="bg-[#F2F3F4] w-full text-base font-medium p-3 rounded-md focus:ring-1 focus:ring-prime-color"
                            :class="errors.arrivalCityCode ? 'border-red-500 border-solid border' : ''"
                            @click="openArrivalModal"
                            @focus="handleFocus"
                            @blur="handleBlur">

                        <Autocomplete v-model="arrivalCity" @city-selected="handleArrivalCitySelected"
                            @airport-selected="handleArrivalAirportSelected"
                            class="!absolute z-[51] top-[calc(100%+5px)] right-0 min-w-full xsm:min-w-80 lg:!min-w-96 hidden md:block" />
                    </div>
                </div>

                <span class="bg-[#F2F3F4] w-[3px] h-[73px] rounded hidden 1xl:block"></span>

                <div class="dates relative w-full md:w-[calc(33.33%-15px)] 1xl:w-[20%]">
                    <label class="flex items-center gap-3 text-base font-bold text-prime-color mb-2">
                        {{ $t("searchForm.datePicker.tuda") }}
                    </label>

                    <input type="text" :value="formatDate(departureDate)"
                        :placeholder="$t('searchForm.datePicker.placeholder')"
                        class="bg-[#F2F3F4] w-full text-base font-medium p-3 rounded-md focus:ring-1 focus:ring-prime-color"
                        :class="errors.departureDate ? 'border-red-500 border-solid border' : ''"
                        @focus="openDepartureCalendar" ref="departureInput" />

                    <VDatePicker v-model="departureDate" :columns="columns" placeholder="Choose Dates"
                        :min-date="minDate" :day-class="(day) => (isPastDay(day) ? 'not-allowed' : '')"
                        v-if="departureCalendarVisible" @update:modelValue="onDepartureDateSelect"
                        class="!absolute z-20 top-[85px] left-0 bg-[#F2F3F4] text-base font-medium p-3 rounded-md focus:ring-1 focus:ring-prime-color" />

                    <span class="icon absolute bottom-3 right-2 pointer-events-none">
                        <img :src="calendar" alt="calendar-icon">
                    </span>
                </div>

                <span class="bg-[#F2F3F4] w-[3px] h-[73px] rounded hidden md:block"></span>

                <div class="dates relative w-full md:w-[calc(33.33%-15px)] 1xl:w-[20%]"
                    :class="{ 'disabled': tripType === 'one-way' }">
                    <label class="flex items-center gap-3 text-base font-bold text-prime-color mb-2">
                        {{ $t("searchForm.datePicker.obratno") }}
                    </label>

                    <input type="text" :value="formatDate(returnDate)"
                        :placeholder="$t('searchForm.datePicker.placeholder')"
                        class="bg-[#F2F3F4] w-full text-base font-medium p-3 rounded-md focus:ring-1 focus:ring-prime-color"
                        :class="errors.returnDate ? 'border-red-500 border-solid border' : ''"
                        @focus="openReturnCalendar" ref="returnInput" />

                    <VDatePicker v-model="returnDate" mode="single" placeholder="Choose Dates"
                        :min-date="departureDate || minDate" :day-class="(day) => (isPastDay(day) ? 'not-allowed' : '')"
                        v-if="returnCalendarVisible" @update:modelValue="onReturnDateSelect"
                        class="!absolute z-20 top-[85px] left-0 z-10 bg-[#F2F3F4] text-base font-medium p-3 rounded-md focus:ring-1 focus:ring-prime-color" />

                    <span class="icon absolute bottom-3 right-2 pointer-events-none">
                        <img :src="calendar" alt="calendar-icon">
                    </span>
                </div>

                <span class="bg-[#F2F3F4] w-[3px] h-[73px] rounded hidden md:block"></span>

                <div class=" w-full md:w-[calc(33.33%-15px)] 1xl:w-[20%]">
                    <label class="flex items-center gap-3 text-base font-bold text-prime-color mb-2">
                        {{ $t("searchForm.passengers.label") }}
                    </label>

                    <input type="text" id="passengers-input" :value="passengerDisplay"
                        class="bg-[#F2F3F4] w-full text-base font-medium p-3 rounded-md focus:ring-1 focus:ring-prime-color cursor-pointer"
                        readonly @click="toggleModal" ref="passengerInput" />
                </div>
            </div>


            <div v-if="showModal" class="modal absolute z-20 top-full right-0 w-full md:w-[485px] p-5 rounded-3xl bg-white ">
                <div
                    class="flex items-center justify-between flex-col sm:flex-row text-center gap-y-4 sm:gap-y-0 sm:text-left w-full border-solid border-0 border-b border-b-[#CCCCCC] p-[10px]">
                    <div class="block">
                        <h5 class="text-base font-medium mb-2 ">
                            {{ $t("searchForm.passengersLists[0].title") }}
                        </h5>
                        <p class=" max-w-60 text-[#666666] text-sm ">
                            {{ $t("searchForm.passengersLists[0].text") }}
                        </p>
                    </div>

                    <div class="flex items-center gap-3">
                        <button type="button" class="cursor-pointer" @click="decrementCount('adult')"
                            :disabled="counts.adult <= 1">
                            <img :src="minus" alt="minus-icon">
                        </button>
                        <input type="number" class="text-base font-bold text-center w-5" v-model.number="counts.adult"
                            min="1" max="9" readonly>
                        <button type="button" class="cursor-pointer" @click="incrementCount('adult')"
                            :class="{ 'opacity-50 cursor-not-allowed': isMaxCount }">
                            <img :src="plus" alt="plus-icon">
                        </button>
                    </div>
                </div>

                <div
                    class="flex items-center justify-between flex-col sm:flex-row text-center gap-y-4 sm:gap-y-0 sm:text-left w-full border-solid border-0 border-b border-b-[#CCCCCC] p-[10px]">
                    <div class="block">
                        <h5 class="text-base font-medium mb-2 ">
                            {{ $t("searchForm.passengersLists[1].title") }}
                        </h5>
                        <p class=" max-w-60 text-[#666666] text-sm ">
                            {{ $t("searchForm.passengersLists[1].text") }}
                        </p>
                    </div>

                    <div class="flex items-center gap-3">
                        <button type="button" class="cursor-pointer" @click="decrementCount('child')"
                            :disabled="counts.child <= 0">
                            <img :src="minus" alt="minus-icon">
                        </button>
                        <input type="number" class="text-base font-bold text-center w-5" v-model.number="counts.child"
                            min="0" max="9" readonly>
                        <button type="button" class="cursor-pointer" @click="incrementCount('child')"
                            :class="{ 'opacity-50 cursor-not-allowed': isMaxCount }">
                            <img :src="plus" alt="plus-icon">
                        </button>
                    </div>
                </div>

                <div
                    class="flex items-center justify-between flex-col sm:flex-row text-center gap-y-4 sm:gap-y-0 sm:text-left w-full border-solid border-0 border-b border-b-[#CCCCCC] p-[10px]">
                    <div class="block">
                        <h5 class="text-base font-medium mb-2 ">
                            {{ $t("searchForm.passengersLists[2].title") }}
                        </h5>
                        <p class=" max-w-60 text-[#666666] text-sm ">
                            {{ $t("searchForm.passengersLists[2].text") }}
                        </p>
                    </div>

                    <div class="flex items-center gap-3">
                        <button type="button" class="cursor-pointer" @click="decrementCount('infant')"
                            :disabled="counts.infant <= 0">
                            <img :src="minus" alt="minus-icon">
                        </button>
                        <input type="number" class="text-base font-bold text-center w-5" v-model.number="counts.infant"
                            min="0" max="9" readonly>
                        <button type="button" class="cursor-pointer" @click="incrementCount('infant')"
                            :class="{ 'opacity-50 cursor-not-allowed': isMaxCount }">
                            <img :src="plus" alt="plus-icon">
                        </button>
                    </div>
                </div>

                <div class="class_type p-[10px] mt-3 rounded-[7px] bg-[#ECEFF5] flex items-center flex-wrap sm:flex-nowrap">
                    <div class="class-type w-[calc(100%-10px)] text-center sm:w-[33.33%]">
                        <input type="radio" id="all" name="flight-type" value="all" v-model="selectedClass">
                        <label for="all"> {{ $t("searchForm.typeFlights[0].title") }}</label>
                    </div>
                    <div class="class-type w-[calc(100%-10px)] text-center sm:w-[33.33%]">
                        <input type="radio" id="econom" name="flight-type" value="econom" v-model="selectedClass">
                        <label for="econom">{{ $t("searchForm.typeFlights[1].title") }}</label>
                    </div>
                    <div class="class-type w-[calc(100%-10px)] text-center sm:w-[33.33%]">
                        <input type="radio" id="business" name="flight-type" value="business" v-model="selectedClass">
                        <label for="business">{{ $t("searchForm.typeFlights[2].title") }}</label>
                    </div>
                </div>
            </div>
        </div>

        <button type="submit"
            class="flex items-center z-10 w-3/4 xsm:w-auto justify-center bg-prime-color py-[10px] px-4 gap-3 rounded-xl absolute left-[50%] translate-x-[-50%] bottom-[-36px] cursor-pointer">
            <p class="text-sm md:text-base font-semibold text-white">
                {{ $t("searchForm.searchButton.flightText") }}
            </p>

            <span>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="-0.000244141" width="47.9991" height="47.9991" rx="7.9997" fill="#395582"
                        fill-opacity="0.5" />
                    <circle cx="21" cy="20.9993" r="6" stroke="white" stroke-width="1.99993" stroke-linejoin="round" />
                    <path d="M25 24.9988L32 31.9988" stroke="white" stroke-width="1.99993" stroke-linejoin="round" />
                </svg>
            </span>
        </button>

        <CitySelectionModal
            :visible="showDepartureModal"
            :placeholder="$t('searchForm.routeFrom.placeholder')"
            @city-selected="handleDepartureCitySelected"
            @airport-selected="handleDepartureAirportSelected"
            @close="showDepartureModal = false"
        />

        <CitySelectionModal
            :visible="showArrivalModal"
            :placeholder="$t('searchForm.routeTo.placeholder')"
            @city-selected="handleArrivalCitySelected"
            @airport-selected="handleArrivalAirportSelected"
            @close="showArrivalModal = false"
        />
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

    .passenger-counter input[type="number"]::-webkit-inner-spin-button,
    .passenger-counter input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .passenger-counter input[type="number"] {
        -moz-appearance: textfield;
    }
</style>