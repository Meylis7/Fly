<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router';

import { Vue3Lottie } from 'vue3-lottie'
import LoadingJson from '@/assets/btn-load.json'
import Booking_loading from '@/assets/booking-loading.json';

import Back from '@/components/Back.vue';
import apiService from "@/services/apiService";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const router = useRouter();
const processLoading = ref(false);
const loading = ref(false);
const token = ref('');

const bookingData = history.state?.updatedSearchData || {};

const states = reactive({
    country: [],
});

const options = ref({});
const selectedOptions = ref({});

const state = reactive({
    passengers: [
        {
            firstname: '',
            lastname: '',
            birthdate: '',
            passport_country: '',
            nationality: '',
            gender: 'male',
            passport_number: '',
            passport_expiry_date: '',
        }
    ],

    contact_details: {
        firstname: '',
        lastname: '',
        email: '',
        phone: {
            code: '',
            number: ''
        },
        gender: 'male',
        address: {
            country_code: '',
            city: '',
            street: ''
        }
    },
    payment_type: 'post-pay'
});

const fetchOptions = async () => {
    try {
        const payload = {
            routing_id: bookingData.routing_id,
            outward_id: bookingData.outward_id,
            return_id: bookingData.return_id
        };

        const response = await apiService.processDetails(payload);

        if (!response.data.success) {
          // If the response indicates failure, notify and go back
          toast.error("Unable to load options. Returning to previous page.", {
            autoClose: 3000,
          });
          router.go(-1);
          return; // Ensure no further code is executed here
        }

        // If success is true, proceed
        processLoading.value = true;
        options.value = response.data.options;

        Object.keys(options.value).forEach(key => {
            selectedOptions.value[key] = "";
        });
    } catch (error) {
        const errorMessage = error.message || "An error occurred";
        toast.error(errorMessage, {
          autoClose: 3000,
        });
        // Optionally go back
        router.go(-1);
    }
};

onMounted(async () => {
    try {
        token.value = localStorage.getItem("authToken");

        await fetchOptions();

        const response = await apiService.fetchCountries();

        states.country = response.data;

        const passengersCount = bookingData.travellers_count || 1;

        // Initialize passengers array
        state.passengers = Array.from({ length: passengersCount }, () => ({
            firstname: "",
            lastname: "",
            birthdate: "",
            passport_country: "",
            passport_expiry_date: "",
            passport_number: "",
            nationality: "",
            gender: "male",
        }));
    } catch (error) {
        console.error("Error loading countries:", error.message);
        toast.error("Error loading countries: " + error.message, {
          autoClose: 2000,
        });
    }
});

const errors = ref({})

const validateForm = () => {
    errors.value = {} // Clear previous errors

    // Contact Details
    if (!state.contact_details.firstname?.trim()) errors.value.firstname = true
    if (!state.contact_details.lastname?.trim()) errors.value.lastname = true
    if (!state.contact_details.email?.trim()) errors.value.email = true
    if (!state.contact_details.address.country_code?.trim()) errors.value.country_code = true
    // if (!state.contact_details.phone?.number?.trim()) errors.value.phone = true
    if (!String(state.contact_details.phone?.number || "").trim()) errors.value.phone = true

    if (!state.contact_details.address?.city?.trim()) errors.value.city = true
    if (!state.contact_details.address?.street?.trim()) errors.value.street = true

    // Passengers
    state.passengers.forEach((passenger, index) => {
        if (!passenger.firstname?.trim()) errors.value[`passenger${index}firstname`] = true
        if (!passenger.lastname?.trim()) errors.value[`passenger${index}lastname`] = true
        if (!passenger.birthdate) errors.value[`passenger${index}birthdate`] = true
        if (!passenger.passport_country?.trim()) errors.value[`passenger${index}passportCountry`] = true
        if (!passenger.passport_number?.trim()) errors.value[`passenger${index}passportNumber`] = true
        if (!passenger.nationality?.trim()) errors.value[`passenger${index}nationality`] = true
        if (!passenger.passport_expiry_date?.trim()) errors.value[`passenger${index}expiryDate`] = true
    })

    return Object.keys(errors.value).length === 0
}

// Submit form
const submitForm = async () => {
    const isValid = validateForm()
    console.log('Validation errors:', errors.value) // Add this to debug
    if (!isValid) return

    loading.value = true;
    try {

        const payload = {
            routing_id: bookingData.routing_id,
            outward_id: bookingData.outward_id,
            return_id: bookingData.return_id,
            contact_details: state.contact_details,
            travellers: state.passengers,
            payment_type: state.payment_type,
            options: selectedOptions.value
        };

        console.log(payload);
        const response = await apiService.bookFlight(payload);
        console.log("Form submitted successfully:", response);

        toast.success("Booking submitted successfully!", { autoClose: 1000 });

        router.push({
            path: `/flight/book/${response.data.booking_reference}`,
        });
    } catch (error) {
        toast.error(error.message || "Failed to submit the form. Please try again.", { autoClose: 1000 });
        console.error("Error submitting form:", error);
    } finally {
        loading.value = false;
    }
};


</script>

<template>

    <section class="mt-[150px] pt-[50px] pb-[100px] bg-[#F9F9F9]">
        <div class="auto_container">
            <div class="wrapper">
                <Back />
                <form @submit.prevent="submitForm" class="flex items-start mt-[30px] gap-x-[20px]"
                    v-if="processLoading">
                    <div class="flex flex-col w-[calc(100%-480px)] gap-y-[30px]">
                        <!-- Contact Information -->
                        <div
                            class="block rounded-[10px] p-[30px] bg-white border border-solid border-[#223a604d] gap-y-[30px]">
                            <h4 class="text-2xl font-semibold mb-5">
                                {{ $t("booking.contact.title") }}
                            </h4>
                            <p class="text-base font-normal mb-5">
                                {{ $t("booking.contact.text") }}
                            </p>

                            <div class="flex flex-wrap gap-x-5 gap-y-4">
                                <div class="input w-[calc(50%-10px)]">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.contact.firstName.label") }}
                                    </label>
                                    <input v-model="state.contact_details.firstname" required type="text"
                                        class="text-base font-normal w-full py-[14px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors.firstname ? 'border-red-500' : '']"
                                        :placeholder="$t('booking.contact.firstName.placeholder')">
                                </div>

                                <div class="input w-[calc(50%-10px)]">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.contact.lastname.label") }}
                                    </label>
                                    <input v-model="state.contact_details.lastname" required type="text"
                                        class="text-base font-normal w-full py-[14px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors.lastname ? 'border-red-500' : '']"
                                        :placeholder="$t('booking.contact.lastname.placeholder')">
                                </div>

                                <div class="input w-[calc(50%-10px)]">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.contact.gmail.label") }}
                                    </label>
                                    <input v-model="state.contact_details.email" required type="email"
                                        class="text-base font-normal w-full py-[14px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors.email ? 'border-red-500' : '']"
                                        :placeholder="$t('booking.contact.gmail.placeholder')">
                                </div>

                                <div class="input relative w-[calc(50%-10px)] overflow-hidden">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.contact.number.label") }}
                                    </label>
                                    <input v-model="state.contact_details.phone.number" required type="number" min="8"
                                        class="text-base font-normal w-full py-[14px] pr-3 pl-[80px] placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors.phone ? 'border-red-500' : '']"
                                        :placeholder="$t('booking.contact.number.placeholder')">

                                    <input type="number" v-model="state.contact_details.phone.code"
                                        class="absolute left-[0.7px] bottom-[0.7px] text-base font-normal w-[70px] text-center py-[14px] border-solid border-0 border-r border-[#A1B0CC] rounded-l"
                                        placeholder="993">
                                </div>

                                <div class="input w-[calc(50%-10px)]">
                                    <h6 class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.contact.gender.label") }}
                                    </h6>

                                    <div class="flex items-center bg-[#F2F2F2] py-3 px-3 rounded-lg w-fit gap-[10px]">
                                        <div class="block w-[109px]">
                                            <input v-model="state.contact_details.gender" required type="radio"
                                                class="peer hidden" name="user-gender" value="male" id="user-male"
                                                checked>
                                            <label
                                                class="text-sm font-normal cursor-pointer flex items-center justify-center transition-all rounded w-full py-2 text-[#AFAFC2] peer-checked:bg-prime-color peer-checked:text-white"
                                                for="user-male">
                                                <span class="block mr-2">
                                                    <svg width="7" height="15" viewBox="0 0 7 15" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path class="peer-checked:!fill-white" fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M3.25941 0.293728C2.83258 0.378852 2.47356 0.66188 2.28255 1.06374C2.09986 1.44815 2.0933 1.9014 2.2649 2.28423C2.47368 2.74992 2.8682 3.0474 3.35639 3.10728C3.7951 3.16109 4.26397 2.96208 4.5452 2.60274C4.99422 2.02905 4.95869 1.21669 4.46183 0.692846C4.29404 0.515959 4.06619 0.377916 3.83999 0.316088C3.69431 0.276282 3.40302 0.265068 3.25941 0.293728ZM1.44024 3.2281C1.21311 3.2857 1.0213 3.47514 0.955484 3.70684C0.940222 3.76052 0.775252 4.65078 0.588866 5.6852C0.296609 7.30734 0.25 7.58519 0.25 7.70592C0.25 7.93749 0.306767 8.10155 0.436481 8.2449C0.524759 8.34249 0.611539 8.4009 0.729605 8.44224C0.851605 8.48497 1.06148 8.47847 1.18557 8.42811C1.37107 8.3528 1.53358 8.16976 1.58955 7.9732C1.60502 7.91877 1.71247 7.25716 1.82831 6.50288L2.03893 5.13155L2.04019 9.62255C2.04134 13.7073 2.04351 14.1208 2.06419 14.1937C2.13515 14.4437 2.31224 14.6284 2.54596 14.6962C2.89871 14.7985 3.26435 14.5906 3.38655 14.2185L3.4168 14.1264L3.4207 11.8592L3.42469 9.59205H3.50182H3.57904L3.57921 11.8223C3.57947 13.7026 3.58268 14.0683 3.59975 14.1524C3.67914 14.5444 4.06654 14.7994 4.43297 14.701C4.66575 14.6384 4.82834 14.4861 4.92055 14.2443L4.95435 14.1558L4.96137 9.66415L4.96839 5.1725L5.16478 6.45699C5.38951 7.92692 5.39635 7.96635 5.4474 8.07547C5.61666 8.43669 6.03691 8.5751 6.39276 8.38677C6.55561 8.30054 6.70355 8.08699 6.73761 7.88887C6.77011 7.69977 6.76161 7.64248 6.42006 5.74349C6.23849 4.73379 6.07963 3.8579 6.06707 3.79708C6.00822 3.51221 5.81877 3.30023 5.56033 3.22983C5.48761 3.21004 5.23221 3.20742 3.49489 3.20851C1.96675 3.20948 1.49594 3.21397 1.44024 3.2281Z"
                                                            fill="currentColor" />
                                                    </svg>
                                                </span>

                                                {{ $t("booking.contact.gender.val_1") }}
                                            </label>
                                        </div>

                                        <div class="block w-[109px]">
                                            <input v-model="state.contact_details.gender" required type="radio"
                                                class="peer hidden" name="user-gender" value="female" id="user-female">
                                            <label
                                                class="text-sm font-normal cursor-pointer flex items-center justify-center transition-all rounded w-full py-2 text-[#AFAFC2] peer-checked:bg-prime-color peer-checked:text-white"
                                                for="user-female">
                                                <span class="block mr-2">
                                                    <svg width="7" height="15" viewBox="0 0 7 15" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path class="peer-checked:!fill-white" fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M3.00826 0.292542C2.40575 0.415002 1.96623 0.912694 1.89822 1.54961C1.84924 2.00805 2.03869 2.4934 2.38093 2.78636C2.92886 3.25535 3.7115 3.21791 4.20749 2.69895C4.6228 2.26447 4.72585 1.60741 4.46437 1.06084C4.28454 0.684865 3.95434 0.409057 3.56326 0.308116C3.43834 0.275876 3.13252 0.267296 3.00826 0.292542ZM1.52032 3.23439C1.34175 3.29446 1.18346 3.42865 1.10845 3.58359C1.08903 3.6237 1.02529 3.83241 0.966836 4.04736C0.908379 4.26232 0.667229 5.14206 0.430976 6.00236C0.0204098 7.49735 0.00135178 7.57223 6.91089e-05 7.69564C-0.00167289 7.86308 0.0295099 8.00236 0.0944839 8.11745C0.283643 8.45259 0.679241 8.56786 1.02027 8.38716C1.11079 8.33923 1.25235 8.1899 1.29658 8.09578C1.31563 8.05522 1.42622 7.65188 1.54235 7.19948C1.65848 6.74709 1.75521 6.38236 1.75732 6.38898C1.7625 6.4053 1.07715 9.88112 1.04959 9.97818C0.998486 10.1583 1.03392 10.3919 1.13779 10.5598C1.25902 10.7557 1.44329 10.8666 1.67968 10.886L1.78893 10.8949V12.4848C1.78893 13.5855 1.7937 14.0987 1.80446 14.1528C1.86197 14.4423 2.09946 14.6715 2.38664 14.7149C2.705 14.7628 3.0099 14.5642 3.13151 14.2298L3.16325 14.1425L3.16723 12.5166L3.1712 10.8905H3.24784H3.32449L3.32849 12.5092C3.33248 14.1201 3.33264 14.1282 3.36272 14.2199C3.53147 14.7344 4.14457 14.8917 4.50259 14.5125C4.54922 14.4631 4.60451 14.3891 4.62549 14.3479C4.70973 14.1827 4.70687 14.2474 4.70687 12.495V10.8905L4.78088 10.8903C4.87925 10.89 5.01471 10.8555 5.10501 10.8077C5.25607 10.7275 5.40254 10.5336 5.44891 10.3522C5.47395 10.2544 5.47283 10.0767 5.44657 9.97619C5.41667 9.86153 4.73373 6.38913 4.73833 6.37504C4.74041 6.36866 4.83713 6.73331 4.95317 7.18535C5.08257 7.68923 5.17989 8.04023 5.20468 8.09249C5.31466 8.32406 5.55178 8.47183 5.81343 8.47183C6.05176 8.47183 6.24572 8.36298 6.38716 8.14986C6.46057 8.03928 6.48752 7.9377 6.49411 7.74704L6.5 7.57526L5.97723 5.66753C5.68975 4.61827 5.44397 3.7252 5.43105 3.68296C5.37403 3.49658 5.20823 3.32052 5.01939 3.24572L4.93948 3.21408L3.26905 3.21106C1.69939 3.20823 1.5939 3.20965 1.52032 3.23439ZM4.73061 6.33611C4.72611 6.34786 4.72273 6.34437 4.72212 6.32719C4.72151 6.31165 4.72481 6.30294 4.72949 6.30784C4.73417 6.31273 4.73469 6.32546 4.73061 6.33611ZM1.77036 6.35085C1.76587 6.36261 1.76252 6.35911 1.76185 6.34194C1.76124 6.32639 1.76457 6.31769 1.76925 6.32258C1.77393 6.32748 1.77443 6.34021 1.77036 6.35085Z"
                                                            fill="currentColor" />
                                                    </svg>
                                                </span>

                                                {{ $t("booking.contact.gender.val_2") }}
                                            </label>
                                        </div>
                                    </div>

                                </div>

                                <br>

                                <div class="input w-[calc(50%-10px)]">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.contact.country.label") }}
                                    </label>
                                    <select v-model="state.contact_details.address.country_code"
                                        class=" text-base font-normal w-full py-[14px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors.country_code ? 'border-red-500' : '']">
                                        <option value="" disabled>
                                            {{ $t("booking.contact.country.placeholder") }}
                                        </option>
                                        <option v-for="country in states.country" :key="country.key"
                                            :value="country.key" class="text-base text-black">
                                            {{ country.country_en }}
                                        </option>
                                    </select>
                                </div>

                                <div class="input w-[calc(50%-10px)]">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.contact.city.label") }}
                                    </label>
                                    <input v-model="state.contact_details.address.city" required="text"
                                        class="text-base font-normal w-full py-[14px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors.city ? 'border-red-500' : '']"
                                        :placeholder="$t('booking.contact.city.label')">
                                </div>

                                <div class="input w-[calc(50%-10px)]">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.contact.street.label") }}
                                    </label>
                                    <input v-model="state.contact_details.address.street" required="text"
                                        class="text-base font-normal w-full py-[14px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors.street ? 'border-red-500' : '']"
                                        :placeholder="$t('booking.contact.street.label')">
                                </div>
                            </div>
                        </div>

                        <!-- Options -->
                        <div class="block rounded-[10px] p-[30px] bg-white border border-solid border-[#223a604d] gap-y-[30px]"
                            v-if="Object.keys(options).length">
                            <h4 class="text-2xl font-semibold mb-5">
                                {{ $t("booking.options.title") }}
                            </h4>

                            <div class="flex flex-wrap gap-x-5 gap-y-4">
                                <div v-for="(optionGroup, optionKey) in options" :key="optionKey"
                                    class="input w-[calc(50%-10px)]">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t(`booking.options.${optionKey}`) }}
                                    </label>
                                    <select v-model="selectedOptions[optionKey]"
                                        class="text-base font-normal w-full py-[14px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded">
                                        <option value="" disabled>{{ $t("booking.options.select_placeholder") }}
                                        </option>
                                        <option v-for="item in optionGroup" :key="item.key" :value="item.key">
                                            {{ item.value }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Dynamic Passenger Fields -->
                        <div v-for="(passenger, index) in state.passengers" :key="index"
                            class="block rounded-[10px] p-[30px] bg-white border border-solid border-[#223a604d] gap-y-[30px]">
                            <h4 class="text-2xl font-semibold mb-5">
                                {{ $t("booking.passenger.title") }} {{ index + 1 }}
                            </h4>
                            <p class="text-base font-normal mb-5">
                                {{ $t("booking.passenger.text") }}
                            </p>
                            <h6 class=" text-xl font-semibold mb-5">
                                {{ $t("booking.passenger.personal") }}
                            </h6>

                            <div class="flex flex-wrap gap-x-5 gap-y-4 mb-4">
                                <div class="input w-[calc(50%-10px)]">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.passenger.firstName.label") }}
                                    </label>
                                    <input v-model="passenger.firstname" required type="text"
                                        class="text-base font-normal w-full py-[14px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors[`passenger${index}firstname`] ? 'border-red-500' : '']"
                                        :placeholder="$t('booking.passenger.firstName.label')">
                                </div>

                                <div class="input w-[calc(50%-10px)]">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.passenger.lastname.label") }}
                                    </label>
                                    <input v-model="passenger.lastname" required type="text"
                                        class="text-base font-normal w-full py-[14px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors[`passenger${index}lastname`] ? 'border-red-500' : '']"
                                        :placeholder="$t('booking.passenger.lastname.label')">
                                </div>

                                <div class="input w-[calc(50%-10px)] relative">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.passenger.birth.label") }}
                                    </label>
                                    <input v-model="passenger.birthdate" required type="date"
                                        class="text-base font-normal w-full !py-[14px] pl-3 pr-14 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors[`passenger${index}birthdate`] ? 'border-red-500' : '']"
                                        :placeholder="$t('booking.passenger.birth.label')">
                                </div>

                                <div class="input w-[calc(50%-10px)]">
                                    <h6 class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.passenger.gender.label") }}
                                    </h6>

                                    <div class="flex items-center bg-[#F2F2F2] py-3 px-3 rounded-lg w-fit gap-[10px]">
                                        <div class="block w-[109px]">
                                            <input v-model="passenger.gender" value="male" required type="radio"
                                                class="peer hidden" :name="`gender-${index}`" :id="`male-${index}`">
                                            <label
                                                class="text-sm font-normal cursor-pointer flex items-center justify-center transition-all rounded w-full py-2 text-[#AFAFC2] peer-checked:bg-prime-color peer-checked:text-white"
                                                :for="`male-${index}`">
                                                <span class="block mr-2">
                                                    <svg width="7" height="15" viewBox="0 0 7 15" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path class="peer-checked:!fill-white" fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M3.25941 0.293728C2.83258 0.378852 2.47356 0.66188 2.28255 1.06374C2.09986 1.44815 2.0933 1.9014 2.2649 2.28423C2.47368 2.74992 2.8682 3.0474 3.35639 3.10728C3.7951 3.16109 4.26397 2.96208 4.5452 2.60274C4.99422 2.02905 4.95869 1.21669 4.46183 0.692846C4.29404 0.515959 4.06619 0.377916 3.83999 0.316088C3.69431 0.276282 3.40302 0.265068 3.25941 0.293728ZM1.44024 3.2281C1.21311 3.2857 1.0213 3.47514 0.955484 3.70684C0.940222 3.76052 0.775252 4.65078 0.588866 5.6852C0.296609 7.30734 0.25 7.58519 0.25 7.70592C0.25 7.93749 0.306767 8.10155 0.436481 8.2449C0.524759 8.34249 0.611539 8.4009 0.729605 8.44224C0.851605 8.48497 1.06148 8.47847 1.18557 8.42811C1.37107 8.3528 1.53358 8.16976 1.58955 7.9732C1.60502 7.91877 1.71247 7.25716 1.82831 6.50288L2.03893 5.13155L2.04019 9.62255C2.04134 13.7073 2.04351 14.1208 2.06419 14.1937C2.13515 14.4437 2.31224 14.6284 2.54596 14.6962C2.89871 14.7985 3.26435 14.5906 3.38655 14.2185L3.4168 14.1264L3.4207 11.8592L3.42469 9.59205H3.50182H3.57904L3.57921 11.8223C3.57947 13.7026 3.58268 14.0683 3.59975 14.1524C3.67914 14.5444 4.06654 14.7994 4.43297 14.701C4.66575 14.6384 4.82834 14.4861 4.92055 14.2443L4.95435 14.1558L4.96137 9.66415L4.96839 5.1725L5.16478 6.45699C5.38951 7.92692 5.39635 7.96635 5.4474 8.07547C5.61666 8.43669 6.03691 8.5751 6.39276 8.38677C6.55561 8.30054 6.70355 8.08699 6.73761 7.88887C6.77011 7.69977 6.76161 7.64248 6.42006 5.74349C6.23849 4.73379 6.07963 3.8579 6.06707 3.79708C6.00822 3.51221 5.81877 3.30023 5.56033 3.22983C5.48761 3.21004 5.23221 3.20742 3.49489 3.20851C1.96675 3.20948 1.49594 3.21397 1.44024 3.2281Z"
                                                            fill="currentColor" />
                                                    </svg>
                                                </span>

                                                {{ $t("booking.passenger.gender.val_1") }}
                                            </label>
                                        </div>

                                        <div class="block w-[109px]">
                                            <input v-model="passenger.gender" value="female" required type="radio"
                                                class="peer hidden" :name="`gender-${index}`" :id="`female-${index}`">
                                            <label
                                                class="text-sm font-normal cursor-pointer flex items-center justify-center transition-all rounded w-full py-2 text-[#AFAFC2] peer-checked:bg-prime-color peer-checked:text-white"
                                                :for="`female-${index}`">
                                                <span class="block mr-2">
                                                    <svg width="7" height="15" viewBox="0 0 7 15" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path class="peer-checked:!fill-white" fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M3.00826 0.292542C2.40575 0.415002 1.96623 0.912694 1.89822 1.54961C1.84924 2.00805 2.03869 2.4934 2.38093 2.78636C2.92886 3.25535 3.7115 3.21791 4.20749 2.69895C4.6228 2.26447 4.72585 1.60741 4.46437 1.06084C4.28454 0.684865 3.95434 0.409057 3.56326 0.308116C3.43834 0.275876 3.13252 0.267296 3.00826 0.292542ZM1.52032 3.23439C1.34175 3.29446 1.18346 3.42865 1.10845 3.58359C1.08903 3.6237 1.02529 3.83241 0.966836 4.04736C0.908379 4.26232 0.667229 5.14206 0.430976 6.00236C0.0204098 7.49735 0.00135178 7.57223 6.91089e-05 7.69564C-0.00167289 7.86308 0.0295099 8.00236 0.0944839 8.11745C0.283643 8.45259 0.679241 8.56786 1.02027 8.38716C1.11079 8.33923 1.25235 8.1899 1.29658 8.09578C1.31563 8.05522 1.42622 7.65188 1.54235 7.19948C1.65848 6.74709 1.75521 6.38236 1.75732 6.38898C1.7625 6.4053 1.07715 9.88112 1.04959 9.97818C0.998486 10.1583 1.03392 10.3919 1.13779 10.5598C1.25902 10.7557 1.44329 10.8666 1.67968 10.886L1.78893 10.8949V12.4848C1.78893 13.5855 1.7937 14.0987 1.80446 14.1528C1.86197 14.4423 2.09946 14.6715 2.38664 14.7149C2.705 14.7628 3.0099 14.5642 3.13151 14.2298L3.16325 14.1425L3.16723 12.5166L3.1712 10.8905H3.24784H3.32449L3.32849 12.5092C3.33248 14.1201 3.33264 14.1282 3.36272 14.2199C3.53147 14.7344 4.14457 14.8917 4.50259 14.5125C4.54922 14.4631 4.60451 14.3891 4.62549 14.3479C4.70973 14.1827 4.70687 14.2474 4.70687 12.495V10.8905L4.78088 10.8903C4.87925 10.89 5.01471 10.8555 5.10501 10.8077C5.25607 10.7275 5.40254 10.5336 5.44891 10.3522C5.47395 10.2544 5.47283 10.0767 5.44657 9.97619C5.41667 9.86153 4.73373 6.38913 4.73833 6.37504C4.74041 6.36866 4.83713 6.73331 4.95317 7.18535C5.08257 7.68923 5.17989 8.04023 5.20468 8.09249C5.31466 8.32406 5.55178 8.47183 5.81343 8.47183C6.05176 8.47183 6.24572 8.36298 6.38716 8.14986C6.46057 8.03928 6.48752 7.9377 6.49411 7.74704L6.5 7.57526L5.97723 5.66753C5.68975 4.61827 5.44397 3.7252 5.43105 3.68296C5.37403 3.49658 5.20823 3.32052 5.01939 3.24572L4.93948 3.21408L3.26905 3.21106C1.69939 3.20823 1.5939 3.20965 1.52032 3.23439ZM4.73061 6.33611C4.72611 6.34786 4.72273 6.34437 4.72212 6.32719C4.72151 6.31165 4.72481 6.30294 4.72949 6.30784C4.73417 6.31273 4.73469 6.32546 4.73061 6.33611ZM1.77036 6.35085C1.76587 6.36261 1.76252 6.35911 1.76185 6.34194C1.76124 6.32639 1.76457 6.31769 1.76925 6.32258C1.77393 6.32748 1.77443 6.34021 1.77036 6.35085Z"
                                                            fill="currentColor" />
                                                    </svg>
                                                </span>

                                                {{ $t("booking.passenger.gender.val_2") }}
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <h6 class=" text-xl font-semibold mb-5">
                                {{ $t("booking.passenger.documents") }}
                            </h6>

                            <div class="flex flex-wrap gap-x-5 gap-y-4">
                                <div class="input w-[calc(50%-10px)]">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.passenger.passportCountry.label") }}
                                    </label>
                                    <select v-model="passenger.passport_country"
                                        class=" text-base font-normal w-full py-[14px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors[`passenger${index}passportCountry`] ? 'border-red-500' : '']">
                                        <option value="" disabled>
                                            {{ $t("booking.passenger.passportCountry.placeholder") }}
                                        </option>
                                        <option v-for="country in states.country" :key="country.key"
                                            :value="country.key" class="text-base text-black">
                                            {{ country.country_en }}
                                        </option>
                                    </select>
                                </div>

                                <div class="input w-[calc(50%-10px)]">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.passenger.citizenship.label") }}
                                    </label>
                                    <select v-model="passenger.nationality"
                                        class=" text-base font-normal w-full py-[14px] px-3 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors[`passenger${index}nationality`] ? 'border-red-500' : '']">
                                        <option value="" disabled>
                                            {{ $t("booking.passenger.citizenship.placeholder") }}
                                        </option>
                                        <option v-for="country in states.country" :key="country.key"
                                            :value="country.key" class="text-base text-black">
                                            {{ country.country_en }}
                                        </option>
                                    </select>
                                </div>

                                <div class="input w-[calc(50%-10px)] relative">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.passenger.passportSeries.label") }}
                                    </label>
                                    <input v-model="passenger.passport_number" type="text"
                                        class="text-base font-normal w-full py-[14px] pl-3 pr-14 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors[`passenger${index}passportNumber`] ? 'border-red-500' : '']"
                                        :placeholder="$t('booking.passenger.passportSeries.label')">
                                </div>

                                <div class="input w-[calc(50%-10px)] relative">
                                    <label class="text-sm font-normal mb-2 block">
                                        {{ $t("booking.passenger.passportExpire.label") }}
                                    </label>
                                    <input v-model="passenger.passport_expiry_date" type="date"
                                        class="text-base font-normal w-full py-[14px] pl-3 pr-14 placeholder:text-[#7C8DB0] border border-solid border-[#A1B0CC] rounded"
                                        :class="[errors[`passenger${index}expiryDate`] ? 'border-red-500' : '']"
                                        :placeholder="$t('booking.passenger.passportExpire.placeholder')">
                                </div>
                            </div>
                        </div>

                        <button type="submit" :disabled="loading" @click="validateForm"
                            class="bg-prime-color text-white flex items-center gap-2  mx-auto rounded-lg mt-10 disabled:opacity-50 disabled:cursor-not-allowed">
                            <div v-if="loading" class="flex items-center pl-6 py-0">
                                {{ $t("loading") }}
                                <Vue3Lottie :animationData="LoadingJson" class="!w-[50px] !h-[50px]" />
                            </div>
                            <p v-else class="px-6 py-2">
                                {{ $t("booking.submit") }}
                            </p>
                        </button>

                    </div>

                    <div class=" block w-[480px] ">
                        <div class=" block rounded-[10px] p-[30px] bg-white border border-solid border-[#223a604d]
                            gap-y-[30px]">
                            <h4 class="text-2xl font-semibold mb-5">
                                {{ $t("booking.payment.title") }}
                            </h4>

                            <div class="flex flex-wrap gap-x-5 gap-y-4">
                                <div class="payment input w-full">
                                    <input v-model="state.payment_type" required type="radio" class="peer hidden"
                                        name="method" id="post-pay" value="post-pay" checked>
                                    <label for="post-pay">
                                        Post pay
                                    </label>
                                </div>

                                <div class="payment input w-full" v-if="token">
                                    <input v-model="state.payment_type" required type="radio" class="peer hidden"
                                        name="method" id="balance" value="balance">
                                    <label for="balance">
                                        {{ $t("booking.payment.val_1") }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div v-else class="flex items-center pl-6 py-0">
                    <Vue3Lottie :animationData="Booking_loading" class="!w-[200px] !h-[200px]" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
input[type="date"] {
    position: relative;
    padding: 10px;

    &::-webkit-calendar-picker-indicator {
        color: transparent;
        background: none;
        z-index: 1;
        opacity: 0;

    }

    &:before {
        content: '';
        color: transparent;
        background: none;
        display: block;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 14px;
        right: 12px;
        background: url('@/assets/images/svg/input-calendar.svg');
        cursor: pointer;
    }
}

.payment {
    input {
        &:checked~label {
            border-color: #223A60;

            &::before {
                border-color: #223A60;
            }

            &::after {
                opacity: 1;
                background: #223A60;
            }
        }
    }

    label {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        border: 1px solid #CDCDCD;
        border-radius: 6px;

        font-size: 14px;
        font-weight: 700;
        text-align: center;
        padding: 17px;

        &::before {
            content: '';
            display: block;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 1px solid #CDCDCD;
            margin-right: 10px;
        }

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 22px;
            width: 14px;
            height: 14px;
            background: #CDCDCD;
            border-radius: 50%;
            transition: all .2s linear;
            opacity: 0;
        }
    }
}

// .input-field {
//     @apply text-base font-normal w-full py-[14px] px-3 border border-solid border-[#A1B0CC] rounded;
// }

// .btn-primary {
//     @apply bg-blue-600 text-white py-2 px-4 rounded-lg;
// }</style>