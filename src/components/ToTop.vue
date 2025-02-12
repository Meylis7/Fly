<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';

    const showScrollToTop = ref(false);

    const handleScroll = () => {
        showScrollToTop.value = window.scrollY > 1700;
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>

<template>
    <div>
        <button v-if="showScrollToTop" @click="scrollToTop" class="scroll-to-top">
            {{ $t("scrollTop") }}
        </button>
    </div>
</template>

<style scoped>
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #223A60;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        /* opacity: 0.8; */
        transition: opacity 0.3s ease;
        z-index: 20;
        border: 1px solid #fff;
    }

    .scroll-to-top:hover {
        opacity: 1;
    }

    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 10px;
            right: 10px;
            padding: 8px 12px;
            font-size: 14px;
        }
    }
</style>