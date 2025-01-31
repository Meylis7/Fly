<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { defineProps } from 'vue';

    import { Vue3Lottie } from 'vue3-lottie'
    import LoadingJson from '@/assets/Loading.json'


    const props = defineProps({
        items: {
            type: Array,
            required: true,
        },
        itemsPerPage: {
            type: Number,
            default: 10,
        },
    });

    const emit = defineEmits(['loaded']);

    const displayedItems = ref([]);
    const loadingMore = ref(false);
    const totalItems = ref(0);

    onMounted(() => {
        initializeItems();
    });

    watch(
        () => props.items,
        () => {
            initializeItems();
        }
    );

    const initializeItems = () => {
        totalItems.value = props.items.length;
        displayedItems.value = props.items.slice(0, props.itemsPerPage);
        loadingMore.value = false;
        emit('loaded', displayedItems.value);
    };

    const loadMore = () => {
        if (loadingMore.value) return;
        loadingMore.value = true;

        setTimeout(() => {
            const start = displayedItems.value.length;
            const end = Math.min(start + props.itemsPerPage, props.items.length);

            displayedItems.value.push(...props.items.slice(start, end));

            loadingMore.value = false;
            emit('loaded', displayedItems.value);
        }, 500);
    };
</script>


<template>
    <button v-if="displayedItems.length < totalItems && !loadingMore" @click="loadMore"
        class="bg-prime-color text-white block px-6 py-2 mx-auto rounded-lg mt-10">
        Load More
    </button>
    <div v-if="loadingMore" class="flex justify-center w-full my-10">
        <Vue3Lottie :animationData="LoadingJson" class="!w-[50px] !h-[50px]" />
    </div>
</template>

<style lang="scss" scoped></style>