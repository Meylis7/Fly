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
    // const handleSubmit = (event) => {
    //     if (!validateForm()) return;
    //     event.preventDefault()

    //     // Prepare query parameters
    //     const queryParams = {
    //         tripType: tripType.value,
    //         departureCityCode: departureCityCode.value,
    //         departureCity: departureCity.value,
    //         arrivalCityCode: arrivalCityCode.value,
    //         arrivalCity: arrivalCity.value,
    //         departureDate: departureDate.value,
    //         returnDate: returnDate.value,

    //         adults: counts.value.adult,
    //         children: counts.value.child,
    //         infants: counts.value.infant,
    //         flightClass: selectedClass.value
    //     }

    //     if (route.name === 'flights') {
    //         window.location.href = router.resolve({
    //             name: 'flights',
    //             query: queryParams
    //         }).href
    //     } else {
    //         router.push({
    //             name: 'flights',
    //             query: queryParams,
    //             force: true
    //         })
    //     }
    // }

    // Close modal when clicking outside
    const handleOutsideClick = (event) => {
        if (showModal.value && !event.target.closest('.modal') && !event.target.closest('#passengers-input')) {
            showModal.value = false;
        }

        if (autocompleteContainer.value && !autocompleteContainer.value.contains(event.target)) {
            state.flights = {};
        }
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
    <form class="w-full relative" @submit.prevent="handleSubmit">
        <div
            class="content w-full pt-5 px-[30px] pb-[60px] bg-white rounded-tr-none md:rounded-tr-3xl rounded-r-3xl rounded-bl-3xl">

            <div class="flex flex-wrap z-20 1xl:flex-nowrap items-center justify-between gap-y-3">
                <div class="w-full md:w-[calc(50%-25px)] lg:w-[calc(33.33%-25px)]">
                    <label class="text-sm font-normal mb-2 block">
                        {{ $t("searchForm.routeFrom.label") }}
                    </label>
                    <select
                        class=" text-sm lg:text-base font-normal w-full py-[14px] min-h-[54px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded">

                        <option class="text-base text-black">
                            Asgabat
                        </option>
                        <option class="text-base text-black">
                            Balkan
                        </option>
                        <option class="text-base text-black">
                            Lebap
                        </option>
                    </select>
                </div>

                <span class="bg-[#F2F3F4] w-[3px] h-[73px] rounded hidden md:block"></span>

                <div class="w-full md:w-[calc(50%-25px)] lg:w-[calc(33.33%-25px)]">
                    <label class="text-sm font-normal mb-2 block">
                        {{ $t("searchForm.routeTo.label") }}
                    </label>
                    <select
                        class=" text-sm lg:text-base font-normal w-full py-[14px] min-h-[54px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded">

                        <option class="text-base text-black">
                            Asgabat
                        </option>
                        <option class="text-base text-black">
                            Balkan
                        </option>
                        <option class="text-base text-black">
                            Lebap
                        </option>
                    </select>
                </div>

                <span class="bg-[#F2F3F4] w-[3px] h-[73px] rounded hidden lg:block"></span>

                <div class="w-full md:w-[calc(50%-25px)] lg:w-[calc(33.33%-25px)]">
                    <label class="text-sm font-normal mb-2 block">
                        {{ $t("searchForm.datePicker.placeholder") }}
                    </label>
                    <select
                        class=" text-sm lg:text-base font-normal w-full py-[14px] min-h-[54px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded">

                        <option class="text-base text-black">
                            21.07.2025
                        </option>
                        <option class="text-base text-black">
                            28.07.2025
                        </option>
                        <option class="text-base text-black">
                            31.08.2025
                        </option>
                    </select>
                </div>
            </div>

            <div class="ticket block sm:flex justify-between border border-solid border-[#A1B0CC] rounded mt-7 px-5 py-4">
                <div class="block">
                    <div class="flex items-center justify-center gap-x-3 mb-3 text-xl">
                        <h6 class="font-medium">
                            Asgabat
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
                            Istanbul
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
                        <p class="text-base sm:text-lg ">
                            25.07.2025 • 21:00
                        </p>
                    </div>
                </div>

                <div class="block text-right">
                    <h4 class="hidden sm:block font-medium">
                        $ 350
                    </h4>

                    <a href="#" class="block text-center p-3 mt-3 bg-[#223A60] rounded text-white">
                        <p class="hidden sm:block text-base">
                            Contact to Book
                        </p>

                        <p class="sm:hidden text-xl">
                            $ 350
                        </p>
                    </a>
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

    .passenger-counter input[type="number"]::-webkit-inner-spin-button,
    .passenger-counter input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .passenger-counter input[type="number"] {
        -moz-appearance: textfield;
    }
</style>