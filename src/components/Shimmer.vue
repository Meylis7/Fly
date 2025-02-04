<script setup>

</script>

<template>
    <div class="shimmer flex flex-col justify-between w-[calc(25%-12px)]">
        <div class="shimmer-top flex justify-between items-center p-4">
            <div class="shimmer-line w-1/4 h-4 bg-gray-300 rounded"></div>
            <div class="shimmer-line w-1/4 h-4 bg-gray-300 rounded"></div>
        </div>

        <div class="shimmer-bottom p-4">
            <div class="shimmer-line h-4 bg-gray-300 rounded mb-2"></div>
            <div class="shimmer-line w-full h-10 bg-gray-300 rounded"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    /* Shimmer Styles */
    .shimmer-wrapper {
        width: 100%;
        height: 420px;
        overflow: hidden;
    }

    .shimmer {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #ddd;
        border-radius: 12px;
        animation: shimmer 1.5s linear infinite;

    }

    .shimmer-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .shimmer-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    .shimmer-line {
        background-color: #00000033;
        animation: shimmer-line 1.5s linear infinite;
    }

    @keyframes shimmer {
        0% {
            background-color: #ddd;
        }

        50% {
            background-color: #eee;
        }

        100% {
            background-color: #ddd;
        }
    }

    @keyframes shimmer-line {
        0% {
            background-color: #00000033;
        }

        50% {
            background-color: #eee;
        }

        100% {
            background-color: #00000033;
        }
    }

</style>