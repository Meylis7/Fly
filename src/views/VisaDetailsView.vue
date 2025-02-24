<script setup>
    import { reactive, onMounted, watch, computed } from 'vue';
    import { useRoute, RouterLink } from 'vue-router';

    import axios from 'axios';
    import Back from '@/components/Back.vue';
    import Visa from '@/components/Visa.vue';

    const route = useRoute();

    const visaId = route.params.id;

    const state = reactive({
        visa: null,
        isLoading: true,
        error: null,
    });

    const docItems = computed(() => {
        return state.visa?.necessary_documents?.filter(item => item && item.item)?.map(item => item.item) || [];
    });

    onMounted(async () => {
        await fetchVisaDetails(route.params.id); // Initial fetch
    });

    watch(
        () => route.params.id,
        async (newVisaId) => {
            await fetchVisaDetails(newVisaId); // Fetch when route changes
        }
    );

    const fetchVisaDetails = async (visaId) => {
        try {
            const response = await axios.get(`https://www.flyashgabat.com:4443/api/visas/${visaId}/details`);

            if (response.data && response.data.data) {
                state.visa = response.data.data;
            } else {
                state.error = "Invalid API response";
                console.error("Invalid API response:", response);
            }
        } catch (error) {
            state.error = "Error fetching visa details";
            console.error('Error fetching visa', error);
        } finally {
            state.isLoading = false;
        }
    };

</script>

<template>
    <section class="mt-[150px] pt-[30px] pb-[100px] bg-[#F9F9F9]">
        <div class="auto_container">
            <div class="wrapper">
                <Back />

                <div
                    class="flex items-center justify-center bg-[url('@/assets/images/visa-bg.png')] bg-cover overflow-hidden rounded-3xl h-[230px]">
                    <h6 class="text-[40px] font-semibold text-white">
                        {{ $t("visa.visa") }}
                    </h6>
                </div>

                <div class="flex gap-5 mt-5">
                    <div class="block w-1/2 border border-solid border-[#D6D6D6] rounded-[20px] p-9">
                        <h4 class="text-xl font-medium mb-5">
                            {{ $t("visa.details.docs") }} <span class="text-red">*</span>
                        </h4>

                        <ul>
                            <li v-for="(item, index) in docItems" :key="index" class="mb-4">
                                -
                                <p class="text-base font-normal w-[calc(100%-14px)]">
                                    - {{ item }}
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div class="block w-1/2 border border-solid border-[#D6D6D6] rounded-[20px] p-9">
                        <img class="h-[420px] w-full rounded-2xl mb-5 overflow-hidden" :src="state.visa?.main_image"
                            alt="visa--country-image">

                        <h5 class="text-lg font-bold mb-3">
                            {{ state.visa?.location }}
                        </h5>
                        <p class="text-base font-normal text-[#111111] mb-3">
                            {{ $t("visa.details.price") }}: {{ state.visa?.price }} $
                        </p>
                        <p class="text-base font-normal text-[#111111] mb-3">
                            {{ $t("visa.details.days") }}: {{ state.visa?.days }}
                        </p>

                        <p class="text-base font-normal mb-5">
                            {{ state.visa?.description }}
                        </p>

                        <a href="#"
                            class="bg-prime-color flex items-center justify-center text-white text-base font-semibold text-center px-6 py-3 rounded-lg">
                            {{ $t("ticket.bookNow") }}

                            <span class="block ml-3">
                                <svg width="19" height="16" viewBox="0 0 19 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.9237 8.42506L11.6737 14.675C11.4393 14.9094 11.1269 15.0266 10.8143 15.0266C10.4628 15.0266 10.1503 14.9094 9.91588 14.675C9.4081 14.2063 9.40803 13.386 9.91595 12.9172L14.0175 8.77656L2.0643 8.77662C1.36116 8.77664 0.814288 8.22976 0.814302 7.52663C0.814323 6.86254 1.36119 6.27661 2.06433 6.27661L14.0175 6.27663L9.91588 2.17505C9.40807 1.70629 9.40807 0.885984 9.91589 0.417229C10.3846 -0.0905797 11.2049 -0.0905868 11.6737 0.417229L17.9237 6.66722C18.4315 7.13595 18.4315 7.9563 17.9237 8.42506Z"
                                        fill="white" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>

                <div class="relative !mt-[100px]">
                    <Visa :title="$t('searchForm.header.links.visa')" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>