<script setup>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation } from 'swiper/modules';

    import TourCard from './TourCard.vue';

    import 'swiper/css';
    import 'swiper/css/navigation';
    // import 'swiper/css/autoplay ';

    const onSwiper = (swiper) => {
        console.log(swiper);
    };

    const onSlideChange = () => {
        console.log('slide change');
    };

</script>

<template>
    <section class="tours mt-60">
        <div class="auto_container">
            <div class="wrapper">
                <h2 class=" text-[32px] text-prime-color font-semibold mb-4">
                    Explore the Tours
                </h2>
                <p class="text-base">
                    Planning a getaway or heading home? Our travel tools make every journey seamless.
                </p>

                <button class="arrow-left arrow">Prev</button>
                <button class="arrow-right arrow">Next</button>


                <Swiper :modules="[Navigation]" :navigation="{ nextEl: '.arrow-right', prevEl: '.arrow-left' }"
                    :slides-per-view="5" :loop="true" :space-between="20" @swiper="onSwiper"
                    @slideChange="onSlideChange">

                    <SwiperSlide v-for="i in 9" :key="i">
                        <TourCard />
                    </SwiperSlide>
                </swiper>


            </div>
        </div>
    </section>
</template>

<style lang="scss">

    .arrow {
        cursor: pointer;
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
    }

    .arrow-left {
        left: 10px;
    }

    .arrow-right {
        right: 10px;
    }

    .arrow:hover {
        background-color: #0056b3;
    }
</style>