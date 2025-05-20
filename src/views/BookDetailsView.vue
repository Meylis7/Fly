<script setup>
    import { reactive, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { Vue3Lottie } from 'vue3-lottie';
    import { RouterLink } from 'vue-router';
    import Load_3 from '@/assets/loading-3.json';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';
    import { useI18n } from 'vue-i18n';

    import apiService from '@/services/apiService';

    const { t } = useI18n();
    const route = useRoute();

    const state = reactive({
        loading: true,
        status: '',
        bookId: route.params.id,
        booking: null,
        tickets: [],
    });

    const fetchBookingDetails = async () => {
        const data = await apiService.getBookingDetails(state.bookId);

        if (data.data) {
            state.status = data.data.status;
            state.booking = data.data;
            
            // Handle different statuses
            switch (state.status) {
                case 'Pending':
                case 'BookingInProgress':
                    if(state.booking.payment_type === 'post-pay') {
                        state.loading = false;
                    } else {
                        setTimeout(fetchBookingDetails, 5000);
                    }
                    break;
                    
                case 'Succeeded':
                    state.loading = false;
                    state.tickets = data.data.tickets;
                    toast.success(t('BookingTicket.status.succeeded'), { autoClose: 3000 });
                    break;
                    
                case 'Unconfirmed':
                case 'UnconfirmedBySupplier':
                    state.loading = false;
                    toast.warning(t('BookingTicket.status.' + state.status.toLowerCase()), { autoClose: 5000 });
                    break;
                    
                case 'Duplicate':
                    state.loading = false;
                    toast.error(t('BookingTicket.status.duplicate'), { autoClose: 5000 });
                    break;
                    
                case 'Failed':
                    state.loading = false;
                    toast.error(t('BookingTicket.status.failed'), { autoClose: 3000 });
                    break;
                    
                default:
                    state.loading = false;
                    break;
            }
        } else {
            state.status = 'Failed';
            state.loading = false;
            toast.error(t('BookingTicket.status.failed'), { autoClose: 3000 });
        }
    };

    onMounted(() => {
        fetchBookingDetails();
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
                        {{ t("loadingBooking") }}
                    </p>
                </div>

                <!-- Success state -->
                <div v-else-if="state.status === 'Succeeded' || state.booking.payment_type === 'post-pay' ">
                    <h4 class="text-xl font-normal text-center mb-4">
                        <span v-if="state.booking.payment_type != 'post-pay'">{{ t("BookingTicket.title") }}</span>
                        <span v-if="state.booking.payment_type === 'post-pay'">{{ t("BookingTicket.title2") }}</span>
                    </h4>
                    <p class="text-base font-normal text-center">
                        {{ t("BookingTicket.subTitle") }} {{ state.bookId }}
                    </p>
                    
                    <p class="text-base font-normal text-center" v-if=" state.booking.payment_type === 'post-pay'">
                        {{ t("BookingTicket.contact_admin") }}
                    </p>
                    
                    <a href="tel:+99365000000" class=" block text-base font-normal text-center" v-if=" state.booking.payment_type === 'post-pay'">
                        +993 65 00 00 00
                    </a>

                    <div
                        class="mt-[30px] mx-auto p-10 max-w-[650px] rounded-lg bg-white border border-solid border-[#223a604d]" v-if="state.tickets.length">
                        <h5 class="text-xl font-bold">
                            {{ t("BookingTicket.form.title") }}
                        </h5>
                        <p class="text-sm font-normal my-[10px]">
                            {{ t("BookingTicket.form.text") }}
                        </p>

                        <div v-for="ticket in state.tickets" :key="ticket.ticket_url"
                            class="flex items-center justify-between border border-solid border-[#223a604d] p-[10px] rounded-lg mb-[10px]">
                            <div>
                                <h6 class="text-base font-semibold mb-1">
                                    {{ ticket.name }}
                                </h6>
                                <p class="text-sm font-normal">
                                    {{ t("BookingTicket.form.passenger") }}
                                </p>
                            </div>

                            <a :href="ticket.ticket_url" target="_blank"
                                class="flex items-center text-sm font-medium text-prime-color">
                                <span class="block mr-[10px]">
                                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M20.1056 14.0793C20.2116 13.8433 20.489 13.7389 20.7242 13.8449C20.9602 13.951 21.0646 14.2284 20.9586 14.4636C20.5934 15.2719 19.9995 15.9567 19.2613 16.4358C18.5439 16.9014 17.6908 17.1717 16.7805 17.1717H6.59713C5.05693 17.1717 3.65874 16.5419 2.64383 15.5278C1.62899 14.5138 1 13.1147 1 11.5745C1 10.2775 1.44723 9.0792 2.1966 8.12654C2.89973 7.23208 3.86992 6.55526 4.9852 6.21724C5.32879 4.70973 6.16346 3.38884 7.31298 2.4321C8.51595 1.43082 10.0618 0.828125 11.7463 0.828125C12.6479 0.828125 13.5089 1.00032 14.2998 1.31362C15.1193 1.63807 15.8631 2.11561 16.4969 2.71112C16.6851 2.8881 16.6938 3.18386 16.5169 3.37201C16.3399 3.56015 16.0441 3.56891 15.856 3.39194C15.3107 2.87854 14.6666 2.46638 13.9563 2.18417C13.273 1.91392 12.5277 1.76484 11.7473 1.76484C10.2868 1.76484 8.94906 2.28462 7.9111 3.14877C6.854 4.02888 6.10463 5.26532 5.84638 6.67329C5.81449 6.84947 5.68136 6.99936 5.49642 7.04479C4.46882 7.29671 3.57118 7.893 2.93415 8.70376C2.31153 9.49617 1.94004 10.4927 1.94004 11.573C1.94004 12.8541 2.4638 14.0179 3.30883 14.863C4.15386 15.708 5.31858 16.2318 6.59886 16.2318H16.7822C17.5093 16.2318 18.1861 16.0173 18.7537 15.6498C19.342 15.2688 19.8156 14.7219 20.1066 14.077L20.1056 14.0793ZM15.7521 9.35579V6.53699C15.7521 6.27791 15.9617 6.06823 16.2208 6.06823C16.4799 6.06823 16.6896 6.27789 16.6896 6.53699V9.35579H19.1449C19.2677 9.35579 19.3705 9.43233 19.4072 9.54952C19.4558 9.70975 19.4176 9.89152 19.29 10.0191L16.5516 12.7575C16.3683 12.9408 16.0725 12.9408 15.8884 12.7575L13.15 10.0191C13.0232 9.89232 12.9841 9.71056 13.0328 9.54952C13.0686 9.43233 13.1723 9.35579 13.2951 9.35579H15.7521Z"
                                            fill="#223A60" stroke="#223A60" />
                                    </svg>
                                </span>
                                {{ t("BookingTicket.form.download") }}
                            </a>
                        </div>
                    </div>


                    <RouterLink to="/"
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

                        {{ t("BookingTicket.goHome") }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>

</template>


<style lang="scss" scoped></style>