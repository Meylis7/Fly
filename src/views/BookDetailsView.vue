<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { Vue3Lottie } from 'vue3-lottie';
import Load_3 from '@/assets/loading-3.json';

const route = useRoute();

const state = reactive({
    loading: true,
    status: '',
    bookId: route.params.id,
    tickets: [],
});

const checkBookingStatus = async () => {
    try {
        const response = await axios.get(`https://www.flyashgabat.com:4443/api/book/${state.bookId}/check`);

        if (response.data?.data) {
            state.status = response.data.data.status;

            if (state.status === 'BookingInProgress') {
                setTimeout(checkBookingStatus, 3000); // Retry after 3 seconds
            } else {
                state.loading = false;
                if (state.status === 'Succeeded') {
                    await fetchBookingDetails(); // Fetch ticket details after success
                }
            }
        }
    } catch (error) {
        console.error("Error fetching booking status:", error);
        state.status = 'Failed';
        state.loading = false;
    }
};

const fetchBookingDetails = async () => {
    try {
        const response = await axios.get(`https://www.flyashgabat.com:4443/api/book/${state.bookId}/details`);

        if (response.data?.data?.success) {
            state.tickets = response.data.data.tickets;
        }
    } catch (error) {
        console.error("Error fetching booking details:", error);
    }
};

onMounted(() => {
    checkBookingStatus();
});
</script>

<template>

    <section class="mt-[150px] pt-[50px] pb-[100px] bg-[#F9F9F9] min-h-[calc(100vh-444px)]">
        <div class="auto_container">
            <div class="wrapper">
                <!-- Loading state -->
                <div v-if="state.loading">
                    <Vue3Lottie :animationData="Load_3" class="!w-full !h-[300px]" />
                    <p class="text-base font-normal text-center mt-5">
                        Loading... Please wait.
                    </p>
                </div>

                <!-- Success state -->
                <div v-else-if="state.status === 'Succeeded'">
                    <h4 class="text-xl font-normal text-center mb-4">
                        Booking completed successfully!
                    </h4>
                    <p class="text-base font-normal text-center">
                        Booking Number: {{ state.bookId }}
                    </p>

                    <div
                        class="mt-[30px] mx-auto p-10 max-w-[650px] rounded-lg bg-white border border-solid border-[#223a604d]">
                        <h5 class="text-xl font-bold">
                            Tickets
                        </h5>
                        <p class="text-sm font-normal my-[10px]">
                            A copy of your tickets has been sent to the contact email you provided.
                        </p>

                        <div v-for="ticket in state.tickets" :key="ticket.ticket_url"
                            class="flex items-center justify-between border border-solid border-[#223a604d] p-[10px] rounded-lg mb-[10px]">
                            <div>
                                <h6 class="text-base font-semibold mb-1">
                                    {{ ticket.name }}
                                </h6>
                                <p class="text-sm font-normal">Passenger</p>
                            </div>

                            <a :href="ticket.ticket_url" target="_blank"
                                class="flex items-center text-sm font-medium text-prime-color">
                                <span class="block mr-[10px]">⬇️</span> Download
                            </a>
                        </div>
                    </div>


                    <a href="#"
                        class="w-40 cursor-pointer flex items-center justify-center bg-prime-color text-white py-4 mx-auto mt-10 rounded-lg text-sm font-medium">
                        <span class="block mr-[10px]">
                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.6504 17.1168H15.6432C16.8245 17.1168 17.786 16.1552 17.786 14.974V9.72403C17.786 9.32939 17.4664 9.00977 17.0718 9.00977C16.6771 9.00977 16.3575 9.32939 16.3575 9.72403V14.974C16.3575 15.3677 16.037 15.6882 15.6432 15.6882H13.3647V13.7597C13.3647 12.5785 12.4031 11.6169 11.2219 11.6169H8.77899C7.59776 11.6169 6.63618 12.5785 6.63618 13.7597V15.6882H4.35765C3.9639 15.6882 3.64338 15.3677 3.64338 14.974V9.72403C3.64338 9.32939 3.32375 9.00977 2.92911 9.00977C2.53447 9.00977 2.21484 9.32939 2.21484 9.72403V14.974C2.21484 16.1552 3.17642 17.1168 4.35765 17.1168H7.35049C7.74514 17.1168 8.06476 16.7971 8.06476 16.4025V13.7598C8.06476 13.3661 8.38528 13.0456 8.77903 13.0456H11.2219C11.6157 13.0456 11.9362 13.3661 11.9362 13.7598V16.4025C11.9362 16.7971 12.2557 17.1168 12.6504 17.1168Z"
                                    fill="white" />
                                <path
                                    d="M0.148338 8.29245C0.388515 8.60494 0.837602 8.66387 1.1501 8.4228L9.99994 1.61496L18.8498 8.4228C18.9801 8.5228 19.1328 8.57101 19.2855 8.57101C19.4998 8.57101 19.7114 8.47548 19.8516 8.29243C20.0926 7.97994 20.0337 7.53085 19.7212 7.29068L10.4357 0.147987C10.1786 -0.0493291 9.82143 -0.0493291 9.5643 0.147987L0.278801 7.29068C-0.0336943 7.53085 -0.0927284 7.97906 0.148338 8.29245Z"
                                    fill="white" />
                            </svg>
                        </span>

                        Go home
                    </a>
                </div>
            </div>
        </div>
    </section>

</template>


<style lang="scss" scoped></style>