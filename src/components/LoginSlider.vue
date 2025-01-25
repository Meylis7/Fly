<script setup>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Pagination, Autoplay } from 'swiper/modules';

    import 'swiper/css';
    import 'swiper/css/pagination';
    // import 'swiper/css/autoplay ';

    const onSwiper = (swiper) => {
        // console.log(swiper);
    };

    const onSlideChange = () => {
        // console.log('slide change');
    };
    const modules = [Pagination, Autoplay];

</script>

<template>
    <div>
        <Swiper :modules="modules" :slides-per-view="1" :loop="true" :space-between="20" @swiper="onSwiper"
            @slideChange="onSlideChange" :pagination="{ clickable: true }"
            :autoplay="{ delay: 2500, disableOnInteraction: false, }">
            <SwiperSlide class="w-full !h-[716px] overflow-hidden rounded-[30px]">
                <img src="@/assets/images/login-slider-1.png" class="w-full block object-cover" alt="slider-img">
            </SwiperSlide>
            <SwiperSlide class="w-full !h-[716px] overflow-hidden rounded-[30px]">
                <img src="@/assets/images/login-slider-2.png" class="w-full block object-cover" alt="slider-img">
            </SwiperSlide>
            <SwiperSlide class="w-full !h-[716px] overflow-hidden rounded-[30px]">
                <img src="@/assets/images/login-slider-1.png" class="w-full block object-cover" alt="slider-img">
            </SwiperSlide>
        </Swiper>

        <div class="swiper-pagination"></div>
    </div>
</template>

<style lang="scss">
    .swiper-pagination-bullet {
        background: #fff !important;
        opacity: 1;

        &-active {
            background: #223A60 !important;
            width: 32px;
            height: 10px;
            border-radius: 5px;
        }
    }
</style>