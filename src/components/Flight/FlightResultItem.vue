<script setup>
import { defineProps, ref, onMounted, onUnmounted } from 'vue';
import FlightSegment from './FlightSegment.vue';
defineProps({
    flight: {
        type: Object,
        required: true
    }
})

// Instead of boolean, use number to track which item is open
const openIndex = ref(-1) // -1 means all closed

const toggleDetails = (index) => {
    // If clicking the same item that's already open, close it
    if (openIndex.value === index) {
        openIndex.value = -1
    } else {
        // Otherwise, open the clicked item (which automatically closes others)
        openIndex.value = index
    }
}

const handleClickOutside = () => {
    // Close all details
    openIndex.value = -1
}

</script>

<template>
    <div class="block mb-8">
        <div class="card p-5 rounded-lg bg-white border border-solid border-[#223a604d]">
            <div class="flex justify-between">
                <div class="block w-[740px]">
                    <div class="block">

                        <div class="block bg-[#E8F0FE] rounded-lg mt-4 py-4 px-7">
                            <div class="flex items-center justify-between">
                                <div class="block">
                                    <h6 class="text-base font-normal">{{ flight.Origin.Code }}</h6>
                                    <p class="text-lg font-semibold my-1">
                                        {{ flight.Outward.DepartDate.Time }}
                                    </p>
                                    <h6 class="text-base font-normal">{{ flight.Origin.Airport.ru }}</h6>
                                </div>

                                <div class="block mx-3">
                                    <p class="text-base font-semibold text-center mb-2">
                                        {{ flight.Outward.Duration.Hours }}hr {{ flight.Outward.Duration.Minutes }}min
                                    </p>

                                    <span class="flex items-center gap-[10px]">
                                        <span class="w-[70px] h-[1px] bg-[#C8C8C8] block"></span>
                                        <img src="@/assets/images/svg/ticket-plane.svg" alt="plane-icon">
                                        <span class="w-[70px] h-[1px] bg-[#C8C8C8] block"></span>
                                    </span>

                                    <p class="text-sm font-semibold text-center mt-2">
                                        <template v-if="!flight.Outward.Stops || flight.Outward.Stops.length === 0">
                                            Nonstop
                                        </template>
                                        <template v-else>
                                            <span v-for="(stop, index) in flight.Outward.Stops" :key="index"
                                                class="block">
                                                {{ (stop.Duration.Hours || 0) + 'h ' + (stop.Duration.Minutes || 0) +
                                                    'min '
                                                    + stop.Location.Airport.en }}
                                            </span>
                                        </template>
                                    </p>
                                </div>

                                <div class="block">
                                    <h6 class="text-base font-normal">{{ flight.Destination.Code }}</h6>
                                    <p class="text-lg font-semibold my-1">
                                        {{ flight.Outward.ArriveDate.Time }}
                                    </p>
                                    <h6 class="text-base font-normal">{{ flight.Destination.Airport.en }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6" v-if="flight.Return != null">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <img class="h-12 object-contain block mr-3" src="@/assets/images/airline-1.png"
                                    alt="airline-img">
                                <h4 class="text-lg font-normal">
                                    ABC Airline
                                </h4>
                            </div>

                            <p class="text-base font-normal">Travel Class: Economy</p>
                        </div>
                        <div class="block bg-[#E8F0FE] rounded-lg mt-4 py-4 px-7">
                            <div class="flex items-center justify-between">
                                <h6 class="text-base font-normal mb-3">
                                    {{ flight.Return.DepartDate.Date }}
                                </h6>
                                <h6 class="text-base font-normal mb-3">
                                    {{ flight.Return.ArriveDate.Date }}
                                </h6>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="block">
                                    <p class="text-base font-semibold mb-1">
                                        {{ flight.Return.DepartDate.Time }}
                                    </p>
                                    <h6 class="text-base font-normal">{{ flight.Origin.Airport.ru }}</h6>
                                </div>

                                <div class="block mx-3">
                                    <p class="text-base font-semibold text-center mb-5">
                                        {{ flight.Return.Duration.Hours }} hr {{ flight.Return.Duration.Minutes }}min
                                    </p>

                                    <span class="flex items-center gap-[10px]">
                                        <span class="w-[70px] h-[1px] bg-[#C8C8C8] block"></span>
                                        <img src="@/assets/images/svg/ticket-plane.svg" alt="plane-icon">
                                        <span class="w-[70px] h-[1px] bg-[#C8C8C8] block"></span>
                                    </span>
                                    <p class="text-sm font-semibold text-center mt-2">
                                        <template v-if="!flight.Return.Stops || flight.Return.Stops.length === 0">
                                            Nonstop
                                        </template> <template v-else>
                                            <span v-for="(stop, index) in flight.Return.Stops" :key="index"
                                                class="block">
                                                {{ (stop.Duration.Hours || 0) + 'h ' + (stop.Duration.Minutes || 0) +
                                                    'min '
                                                    + stop.Location.Airport.en }}
                                            </span>
                                        </template>
                                    </p>
                                </div>

                                <div class="block">
                                    <h6 class="text-base font-normal">{{ flight.Destination.Code }}</h6>
                                    <p class="text-lg font-semibold my-1">
                                        {{ flight.Return.ArriveDate.Time }}
                                    </p>
                                    <h6 class="text-base font-normal">{{ flight.Destination.Airport.en }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <span class="line relative block mx-1"></span>

                <div class="flex items-center flex-col justify-between">
                    <div class="block">
                        <h5
                            class="price text-base font-bold text-center py-4 w-[200px] border border-solid border-prime-color rounded-lg mb-3">
                            {{ Math.floor(flight.TotalSum.Amount) }} {{ flight.TotalSum.Currency }}
                        </h5>

                        <RouterLink :to="'/flight/book'"
                            class="block text-base font-normal text-white text-center py-4 w-[200px] bg-prime-color rounded-lg cursor-pointer">
                            Book now
                        </RouterLink>
                    </div>

                    <button type="button" class="details cursor-pointer flex items-center mt-5"
                        @click.stop="toggleDetails(index)">
                        <p class="text-sm font-normal mr-1">
                            Details
                        </p>

                        <span :class="['transition-all', openIndex === index ? '-rotate-180' : '']" class="block">
                            <svg class=" object-contain" width="10" height="6" viewBox="0 0 10 6" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.99986 5.4188C4.88885 5.4188 4.78236 5.37459 4.70383 5.29623L0.122691 0.71459C-0.0408971 0.551002 -0.0408971 0.285945 0.122691 0.122691C0.286279 -0.0408971 0.551169 -0.0408971 0.71459 0.122691L4.99986 4.40847L7.14267 2.26575L9.28547 0.123026C9.44906 -0.0405617 9.71395 -0.0405617 9.87737 0.123026C10.0408 0.286615 10.041 0.551504 9.87737 0.714924L5.2959 5.29606C5.21737 5.37459 5.11088 5.4188 4.99986 5.4188Z"
                                    fill="black" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <div v-show="openIndex === index"
            class="details-info block p-5 mt-2 relative z-20 rounded-lg bg-white border border-solid border-[#223a604d]">
            <div class="Departure block">
                <h4 class="text-base font-bold text-center">
                    Departure
                </h4>

                <div v-for="(segment, index) in flight.Outward.Segments" :key="segment.FlightNumber"
                    :class="{ 'mb-4': index !== flight.Outward.Segments.length - 1 }">
                    <FlightSegment :segment="segment" :stops="flight.Outward.Stops" :index="index" />
                </div>

            </div>

            <div class="Return block mt-4 pt-4 border-dashed border-0 border-t border-t-[#223A60]" v-if="flight.Return">
                <h4 class="text-base font-bold text-center">
                    Return
                </h4>

                <div v-for="(segment, index) in flight.Return.Segments" :key="segment.FlightNumber"
                    :class="{ 'mb-4': index !== flight.Return.Segments.length - 1 }">

                    <FlightSegment :segment="segment" :stops="flight.Return.Stops" :index="index" />
                </div>
            </div>
        </div>
    </div>
</template>

<!--  -->

<style lang="scss" scoped>
.line {
    width: 1px;
    border-left: 3px dashed #F2F2F2;
    // border-left: 2px dashed #223A60;

    &::before {
        content: '';
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 20px;
        background: #F9F9F9;
        border-radius: 7px;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 20px;
        background: #F9F9F9;
        border-radius: 7px;
    }
}
</style>