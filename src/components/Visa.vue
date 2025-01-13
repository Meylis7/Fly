<script setup>
    import { RouterLink } from 'vue-router';
    import VisaCard from './VisaCard.vue';
    import { onMounted, reactive } from 'vue';
    import axios from 'axios';


    const state = reactive({
        visas: [],
    });

    onMounted(async () => {
        try {
            const response = await axios.get('/api/visas ');
            state.visas = response.data.data;

        } catch (error) {
            console.error('Error fetching visas ', error);
        }
    });



</script>

<template>
    <section class="visa mt-[60px]">
        <div class="auto_container">
            <div class="wrapper relative">
                <h2 class=" text-[32px] text-prime-color font-semibold mb-4">
                    Unlock the World with Your Visa
                </h2>
                <p class="text-base">
                    Wherever you're headed, our tools ensure a smooth and stress-free journey.
                </p>

                <div class="flex flex-wrap gap-5 mt-8">
                    <VisaCard v-for="visa in state.visas" :key="visa.id" :visa="visa" class="block w-[calc(33.33%-14px)]" />
                </div>

                <RouterLink to="/"
                    class="bg-[#223A60] py-5 px-[25px] block w-fit mx-auto mt-5 cursor-pointer rounded-xl">
                    <p class=" text-base text-white font-semibold flex items-center">
                        View More

                        <span class="block ml-3">
                            <svg width="15" height="10" viewBox="0 0 15 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.7266 5.37891L10.2266 8.87891C9.89844 9.23438 9.32422 9.23438 8.99609 8.87891C8.64062 8.55078 8.64062 7.97656 8.99609 7.64844L10.9922 5.625H0.875C0.382812 5.625 0 5.24219 0 4.75C0 4.23047 0.382812 3.875 0.875 3.875H10.9922L8.99609 1.87891C8.64062 1.55078 8.64062 0.976562 8.99609 0.648438C9.32422 0.292969 9.89844 0.292969 10.2266 0.648438L13.7266 4.14844C14.082 4.47656 14.082 5.05078 13.7266 5.37891Z"
                                    fill="white" />
                            </svg>
                        </span>
                    </p>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<style lang="scss"></style>