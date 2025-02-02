<script setup>
    import { onMounted, ref } from 'vue';

    import axios from 'axios';

    import Back from '@/components/Back.vue';
    import LoadMore from '@/components/LoadMore.vue';
    import TourCard from '@/components/TourCard.vue';

    const tours = ref([]);
    const displayedTours = ref([]);
    const itemsPerPage = ref(2);

    onMounted(async () => {
        try {
            const response = await axios.get('https://www.flyashgabat.com:4443/api/tours/all');
            tours.value = response.data.data;

            // Initialize displayedTours:
            displayedTours.value = tours.value.slice(0, itemsPerPage.value);

        } catch (error) {
            console.error('Error fetching tours', error);
        }
    });

    const handleToursLoaded = (loadedTours) => {
        displayedTours.value = loadedTours;
    };
</script>


<template>
    <section class="mt-[150px] pt-[30px] pb-[100px] bg-[#F9F9F9]">
        <div class="auto_container">
            <div class="wrapper">
                <Back />

                <h2 class=" text-[32px] text-prime-color font-semibold mb-4">
                    Explore the Tours
                </h2>
                <p class="text-base">
                    Planning a getaway or heading home? Our travel tools make every journey seamless.
                </p>

                <div class="flex flex-wrap gap-5 mt-10">
                    <TourCard class="!w-[calc(25%-15px)]" v-for="tour in displayedTours" :key="tour.id" :tour="tour" />
                </div>

                <LoadMore v-if="displayedTours.length < tours.length" :items="tours" :itemsPerPage="itemsPerPage"
                    @loaded="handleToursLoaded" />

            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped></style>