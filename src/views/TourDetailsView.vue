<script setup>
    import Back from '@/components/Back.vue';
    import Tour from '@/components/Tour.vue';
    import { reactive, onMounted, watch, computed } from 'vue';
    import { useRoute, RouterLink, useRouter } from 'vue-router';

    import axios from 'axios';


    const route = useRoute();
    // const router = useRouter();

    const tourId = route.params.id;

    const state = reactive({
        tour: null,
        isLoading: true,
        error: null,
    });

    const includedItems = computed(() => {
        return state.tour?.included?.filter(item => item && item.item)?.map(item => item.item) || [];
    });

    const notIncludedItems = computed(() => {
        return state.tour?.not_included?.filter(item => item && item.item)?.map(item => item.item) || [];
    });

    onMounted(async () => {
        await fetchTourDetails(route.params.id); // Initial fetch
    });

    watch(
        () => route.params.id,
        async (newTourId) => {
            await fetchTourDetails(newTourId); // Fetch when route changes
        }
    );

    const fetchTourDetails = async (tourId) => {
        try {
            const response = await axios.get(`https://www.flyashgabat.com:4443/api/tours/${tourId}/details`);

            if (response.data && response.data.data) {
                state.tour = response.data.data;
            } else {
                state.error = "Invalid API response";
                console.error("Invalid API response:", response);
            }
        } catch (error) {
            state.error = "Error fetching tour details";
            console.error('Error fetching tour', error);
        } finally {
            state.isLoading = false;
        }
    };
</script>

<template>
    <div v-if="state.isLoading">Loading tour details...</div>

    <section v-else class="mt-[150px] pt-[30px] pb-[100px] bg-[#F9F9F9]">
        <div class="auto_container">
            <div class="wrapper">
                <Back />

                <div
                    class="relative p-[50px] mb-[30px] rounded-[20px] flex items-center min-h-[600px] w-full overflow-hidden">
                    <img class="absolute top-0 left-0 object-cover w-full h-full" :src="state.tour.background_image"
                        alt="Tour-country-image">

                    <div class="block relative z-10 max-w-[50%] bg-white rounded-[20px] p-8">
                        <h2 class=" text-2xl font-medium mb-6">
                            {{ state.tour.name }}
                        </h2>

                        <p class="text-base font-normal text-[#717171] mb-6">
                            {{ state.tour.description }}
                        </p>

                        <div class="flex items-center mb-4">
                            <span class="block mr-[10px]">
                                <svg width="13" height="17" viewBox="0 0 13 17" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.49171 0.553223C4.77049 0.555582 3.12085 1.24046 1.90363 2.45764C0.687216 3.67405 0.00235605 5.32446 9.18485e-07 7.04491V7.17072C-0.000785333 9.02324 0.503234 10.8403 1.45781 12.4271C2.41238 14.0146 3.78133 15.3112 5.41845 16.1786C6.09546 16.5363 6.90534 16.5363 7.58235 16.1786C9.21865 15.3113 10.5877 14.0147 11.5422 12.4271C12.4968 10.8403 13.0008 9.02322 13 7.17072V7.04491C12.9984 5.32134 12.3112 3.66862 11.0909 2.4514C9.86973 1.2342 8.21538 0.551653 6.49171 0.553223ZM11.7418 7.17074C11.7442 8.79366 11.3031 10.3868 10.4665 11.7777C9.62985 13.1687 8.42998 14.305 6.99496 15.0636C6.68593 15.2303 6.31403 15.2303 6.005 15.0636C4.57079 14.3049 3.37007 13.1687 2.5335 11.7777C1.69692 10.3868 1.25575 8.79376 1.25812 7.17074V7.04493C1.25812 5.17274 2.2575 3.44218 3.87896 2.50557C5.5011 1.56909 7.49902 1.56909 9.12124 2.50557C10.7435 3.44204 11.7421 5.1727 11.7421 7.04493L11.7418 7.17074ZM6.49171 3.66542C5.65745 3.66542 4.85777 3.99644 4.26802 4.58617C3.67751 5.1759 3.34648 5.97634 3.34648 6.81066C3.34648 7.64498 3.67751 8.4446 4.26802 9.03435C4.85775 9.62408 5.65741 9.95589 6.49171 9.95589C7.32601 9.95589 8.12564 9.62408 8.71539 9.03435C9.30591 8.44462 9.63693 7.64496 9.63693 6.81066C9.63693 5.97636 9.30591 5.17594 8.71539 4.58617C8.12566 3.99644 7.32601 3.66542 6.49171 3.66542ZM6.49171 8.69775C5.7282 8.69775 5.0402 8.23775 4.74847 7.53244C4.45597 6.82713 4.61794 6.01566 5.15733 5.47623C5.69674 4.93604 6.50898 4.77484 7.21354 5.06656C7.91886 5.35906 8.37885 6.04708 8.37885 6.81058C8.37885 7.85244 7.53356 8.69775 6.49171 8.69775Z"
                                        fill="black" />
                                </svg>
                            </span>

                            <p class="text-sm font-normal">
                                {{ state.tour.location }}
                            </p>
                        </div>
                        <div class="flex items-center">
                            <span class="block mr-[10px]">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.33275 8.75C9.24525 8.75 9.156 8.73017 9.07258 8.68875L6.73925 7.52208C6.5415 7.42292 6.41667 7.22108 6.41667 7V2.91667C6.41667 2.59467 6.678 2.33333 7 2.33333C7.322 2.33333 7.58333 2.59467 7.58333 2.91667V6.6395L9.59408 7.64517C9.88225 7.78925 9.99892 8.13983 9.85483 8.428C9.75275 8.63217 9.54683 8.75 9.33275 8.75ZM7 14C3.14008 14 0 10.8599 0 7C0 3.14008 3.14008 0 7 0C10.8599 0 14 3.14008 14 7C14 10.8599 10.8599 14 7 14ZM7 1.16667C3.7835 1.16667 1.16667 3.7835 1.16667 7C1.16667 10.2165 3.7835 12.8333 7 12.8333C10.2165 12.8333 12.8333 10.2165 12.8333 7C12.8333 3.7835 10.2165 1.16667 7 1.16667Z"
                                        fill="black" />
                                </svg>
                            </span>

                            <p class="text-sm font-normal">
                                {{ state.tour.days }} days
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex items-start gap-4">
                    <div class="block w-1/2">
                        <h4 class=" text-2xl font-semibold mb-4">
                            Included
                        </h4>

                        <ul>
                            <li v-for="(item, index) in includedItems" :key="index" class="text-base font-normal mb-3">
                                - {{ item }}
                            </li>
                        </ul>
                    </div>

                    <div class="block w-1/2">
                        <h4 class=" text-2xl font-semibold mb-4">
                            Not included
                        </h4>

                        <ul>
                            <li v-for="(item, index) in notIncludedItems" :key="index"
                                class="text-base font-normal mb-3">
                                - {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>

                <a href="#"
                    class="bg-prime-color flex items-center justify-center text-white text-base font-semibold text-center px-6 py-3 mx-auto rounded-lg mt-10 max-w-[200px]">
                    Book Now

                    <span class="block ml-3">
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.9237 8.42506L11.6737 14.675C11.4393 14.9094 11.1269 15.0266 10.8143 15.0266C10.4628 15.0266 10.1503 14.9094 9.91588 14.675C9.4081 14.2063 9.40803 13.386 9.91595 12.9172L14.0175 8.77656L2.0643 8.77662C1.36116 8.77664 0.814288 8.22976 0.814302 7.52663C0.814323 6.86254 1.36119 6.27661 2.06433 6.27661L14.0175 6.27663L9.91588 2.17505C9.40807 1.70629 9.40807 0.885984 9.91589 0.417229C10.3846 -0.0905797 11.2049 -0.0905868 11.6737 0.417229L17.9237 6.66722C18.4315 7.13595 18.4315 7.9563 17.9237 8.42506Z"
                                fill="white" />
                        </svg>
                    </span>
                </a>

                <div class="relative !mt-[100px]">
                    <Tour title="Tours" />
                </div>

                <div class="block relative my-[60px]">
                    <span class=" block w-full">
                        <img src="@/assets/images/svg/plane-bg.svg" alt="svg-icon">
                    </span>

                    <div
                        class="flex flex-col items-center max-w-[420px] text-center absolute top-[60%] left-2/4 -translate-x-2/4 -translate-y-2/4 ">
                        <h4 class="text-2xl font-semibold">
                            Feeling ready to travel?
                        </h4>

                        <p class="text-xl font-normal my-[14px]">
                            We're ready to provide you with the best service, so please contact us.
                        </p>

                        <RouterLink to="/"
                            class="text-sm font-medium bg-prime-color text-white block px-6 py-2 rounded-lg">
                            Contact us
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .arrows {
        top: 7px !important;
    }
</style>