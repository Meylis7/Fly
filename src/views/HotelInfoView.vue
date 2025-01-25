<template>
    <section>
        <div class="auto_container">
            <div class="wrapper">
                <RouterLink to="/" class="flex items-center text-base font-normal">
                    <span class="block mr-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M24 12C24 5.38105 18.6189 0 12 0C5.38105 0 0 5.38105 0 12C0 18.6189 5.38105 24 12 24C18.6189 24 24 18.6189 24 12ZM12.0505 16.7242L8.48842 13.1368C8.18526 12.8337 8.00842 12.4042 8.00842 12C8.00842 11.5958 8.16 11.1663 8.48842 10.8632L12.0758 7.27579C12.7074 6.64421 13.7179 6.64421 14.3495 7.27579C14.9811 7.90737 14.9811 8.91789 14.3495 9.54947L11.8989 12L14.3495 14.4505C14.9811 15.0821 14.9811 16.0926 14.3495 16.7242C13.7179 17.3558 12.6821 17.3558 12.0505 16.7242Z"
                                fill="#223A60" />
                        </svg>
                    </span>
                    Go back
                </RouterLink>

                <div class="mt-10 gallery">
                    <div class="main-slider">
                        <swiper :modules="modules" :slides-per-view="1" @swiper="onMainSwiperReady" :loop="true"
                            :autoplay="{ delay: 2500, disableOnInteraction: false }" :navigation="true"
                            :pagination="{ clickable: true }" class="mySwiper" @slideChange="onSlideChange">
                            <swiper-slide v-for="(image, index) in images" :key="index">
                                <a :href="image" data-gallery="mygallery" @click.prevent="openGallery(index)">
                                    <img :src="image" alt="Gallery Image" />
                                </a>
                            </swiper-slide>
                        </swiper>
                    </div>

                    <div class="thumbnail-container">
                        <div v-for="(image, index) in images" :key="index" class="thumbnail">
                            <a :href="image" data-gallery="mygallery" @click.prevent="openGallery(index)">
                                <img :src="image" alt="Thumbnail" :class="{ active: currentSlideIndex === index }" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
    import { ref, watch, onMounted } from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/autoplay';
    import { Navigation, Pagination, Autoplay } from 'swiper/modules';
    import lightGallery from 'lightgallery';
    import 'lightgallery/css/lightgallery.css';

    const modules = [Navigation, Pagination, Autoplay];

    const images = ref([
        'https://picsum.photos/id/1015/800/600',
        'https://picsum.photos/id/1016/800/600',
        'https://picsum.photos/id/1018/800/600',
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
    ]);

    const mainSwiper = ref(null);
    const currentSlideIndex = ref(0);
    let lg;

    const onMainSwiperReady = (swiper) => {
        mainSwiper.value = swiper;
    };

    const onSlideChange = () => {
        if (mainSwiper.value) {
            currentSlideIndex.value = mainSwiper.value.activeIndex;
        }
    };

    const openGallery = (index) => {
        if (lg) {
            lg.destroy();
        }
        lg = lightGallery(document.querySelector('.gallery'), {
            selector: 'a',
            speed: 500,
            dynamic: true,
            dynamicEl: images.value.map((image) => ({ src: image })),
            download: false, // This line removes the download button
        });
        lg.openGallery(index);
    };

    onMounted(() => {
        // Initialization moved to first click
    });
</script>

<style lang="scss" scoped>
    .thumbnail-container {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    .thumbnail {
        width: calc(25% - 10px);
        margin: 5px;
        overflow: hidden;
    }

    .thumbnail img {
        width: 100%;
        height: 100px;
        object-fit: cover;
        cursor: pointer;
        border: 2px solid transparent;
    }

    .thumbnail img.active {
        border-color: blue;
    }

    .main-slider img {
        cursor: pointer;
    }

    /* LightGallery Overlay Styles (More Robust) */
    .lg-outer>.lg-bg {
        /* Very specific selector */
        background-color: rgba(0, 0, 0, 0.6) !important;
        backdrop-filter: blur(5px);
    }

    /* Optional styles (if needed) */
    .lg-outer .lg-item {
        background: transparent !important;
    }

    .lg-toolbar {
        background: transparent !important;
    }

    .lg-components {
        background: transparent !important;
    }

    .lg-sub-html {
        background: transparent !important;
    }
</style>