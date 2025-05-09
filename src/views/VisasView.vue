<script setup>
    import { onMounted, ref } from 'vue';

    import axios from 'axios';

    import Back from '@/components/Back.vue';
    import LoadMore from '@/components/LoadMore.vue';
    import VisaCard from '@/components/VisaCard.vue';

    const visa = ref([]);
    const displayedVisas = ref([]);
    const itemsPerPage = ref(2);

    onMounted(async () => {
        try {
            const response = await axios.get('https://www.flyashgabat.com:4443/api/visas/all');
            visa.value = response.data.data;

            // Initialize displayedVisas:
            displayedVisas.value = visa.value.slice(0, itemsPerPage.value);

        } catch (error) {
            console.error('Error fetching visa', error);
        }
    });

    const handleToursLoaded = (loadedTours) => {
        displayedVisas.value = loadedTours;
    };
</script>


<template>
    <section class="mt-[150px] pt-[30px] pb-[100px] bg-[#F9F9F9]">
        <div class="auto_container">
            <div class="wrapper">
                <Back />

                <h2 class=" text-[32px] text-prime-color font-semibold mb-4">
                    {{ $t("visa.title") }}
                </h2>
                <p class="text-base">
                    {{ $t("visa.text") }}
                </p>

                <div class="flex flex-wrap gap-5 mt-10">
                    <VisaCard class="w-[calc(100%-14px)] md:w-[calc(50%-14px)] lg:w-[calc(33.33%-14px)]" v-for="visa in displayedVisas" :key="visa.id"
                        :visa="visa" />
                </div>

                <LoadMore v-if="displayedVisas.length < visa.length" :items="visa" :itemsPerPage="itemsPerPage"
                    @loaded="handleToursLoaded" />

            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped></style>