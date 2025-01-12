<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        airports: Array,
    })
</script>

<template>
    <ul class="subFlights">
        <li v-for="airport in airports" :key="airport.code"
            class="p-4 pl-8 hover:bg-[#303c8526] cursor-pointer transition">
            <a href="#" class="flex items-center justify-between">
                <h6 class="flex items-center">
                    <span class="block mr-2">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                            xmlns="http://www.w3.org/2000/svg"></svg>
                    </span>
                    <span v-if="airport && airport.airportName">{{ airport.airportName.ru }}</span>
                </h6>
                <p v-if="airport">{{ airport.code }}</p>
            </a>
        </li>
    </ul>
</template>
