<script setup>
    import { defineProps, ref, computed, onUnmounted } from 'vue';
    import FlightSegment from './FlightSegment.vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps({
        flight: {
            type: Object,
            required: true
        },
        searchData: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    });

    const goToBookingPage = () => {
        // Extract flight dates for age calculation
        let outwardDate = null;
        let returnDate = null;
        
        if (props.flight?.Outward?.DepartDate?.Date) {
            const [day, month, year] = props.flight.Outward.DepartDate.Date.split('/');
            outwardDate = `${year}-${month}-${day}`;
        }
        
        if (props.flight?.Return?.DepartDate?.Date) {
            const [day, month, year] = props.flight.Return.DepartDate.Date.split('/');
            returnDate = `${year}-${month}-${day}`;
        }
        
        // Use return date as flight date if it exists, otherwise use outward date
        const flightDate = returnDate || outwardDate;
        
        console.log(
            {
                ...props.searchData,
                outward_id: props.flight?.Outward?.Id,
                return_id: props.flight?.Return?.Id || null,
                flightDate
            }
        )
        
        router.push({
            path: '/flight/book',
            state: {
                updatedSearchData: {
                    ...props.searchData,
                    outward_id: props.flight?.Outward?.Id,
                    return_id: props.flight?.Return?.Id || null,
                    flightDate: flightDate // Send the pre-formatted date directly
                }
            }
        });
    };

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

    // const handleClickOutside = () => {
    //     // Close all details
    //     openIndex.value = -1
    // }

</script>

<template>
    <div class="block mb-8">
        <div class="card p-5 rounded-lg bg-white border border-solid border-[#223a604d]">
            <div class="flex flex-col lg:flex-row justify-between">
                <div class="block max-w-full 1xl:max-w-[740px] w-full">
                    <div class="block bg-[#E8F0FE] rounded-lg mt-4 py-4 px-7">
                        <div class="flex items-center justify-between flex-col md:flex-row">
                            <div class="block text-center md:text-left w-full md:w-auto">
                                <h6 class="text-base font-normal mb-3">
                                    {{ flight.Outward.DepartDate.Date }}
                                </h6>
                                <h6 class="text-base font-normal">{{ flight.Origin.Code }}</h6>
                                <p class="text-lg font-semibold my-1">
                                    {{ flight.Outward.DepartDate.Time }}
                                </p>
                                <h6 class="text-base font-normal">{{ flight.Origin.Airport }}</h6>
                            </div>

                            <div class="block my-6 md:my-0 mx-3 w-full md:w-auto">
                                <p class="text-base font-semibold text-center mb-2">
                                    {{ flight.Outward.Duration.Hours }}{{ $t("ticket.hour") }} {{
                                        flight.Outward.Duration.Minutes }}{{ $t("ticket.minute") }}
                                </p>

                                <span class="flex items-center justify-center gap-[10px]">
                                    <span class="w-[70px] h-[1px] bg-[#C8C8C8] block"></span>
                                    <img src="@/assets/images/svg/ticket-plane.svg" alt="plane-icon">
                                    <span class="w-[70px] h-[1px] bg-[#C8C8C8] block"></span>
                                </span>

                                <p class="text-sm font-semibold text-center mt-2">
                                    <template v-if="!flight.Outward.Stops || flight.Outward.Stops.length === 0">
                                        {{ $t("ticket.nonstop") }}
                                    </template>
                                    <template v-else>
                                        <span v-for="(stop, index) in flight.Outward.Stops" :key="index" class="block">
                                            {{ (stop.Duration.Hours || 0) + $t("ticket.hour") +
                                                (stop.Duration.Minutes || 0) +
                                                $t("ticket.minute") + stop.Location.Airport }}
                                        </span>
                                    </template>
                                </p>
                            </div>

                            <div class="block text-center md:text-left w-full md:w-auto">
                                <h6 class="text-base font-normal mb-3">
                                    {{ flight.Outward.ArriveDate.Date }}
                                </h6>
                                <h6 class="text-base font-normal">{{ flight.Destination.Code }}</h6>
                                <p class="text-lg font-semibold my-1">
                                    {{ flight.Outward.ArriveDate.Time }}
                                </p>
                                <h6 class="text-base font-normal">{{ flight.Destination.Airport }}</h6>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6" v-if="flight.Return != null">
                        <div class="block bg-[#E8F0FE] rounded-lg mt-4 py-4 px-7">
                            <div class="flex items-center justify-between flex-col md:flex-row">
                                <div class="block w-full md:w-auto">
                                    <h6 class="text-base font-normal mb-3">
                                        {{ flight.Return.DepartDate.Date }}
                                    </h6>
                                    <h6 class="text-base font-normal">{{ flight.Destination.Code }}</h6>
                                    <p class="text-base font-semibold mb-1">
                                        {{ flight.Return.DepartDate.Time }}
                                    </p>
                                    <h6 class="text-base font-normal">{{ flight.Destination.Airport }}</h6>
                                </div>

                                <div class="block my-6 md:my-0 mx-3 w-full md:w-auto">
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
                                            {{ $t("ticket.nonstop") }}
                                        </template> <template v-else>
                                            <span v-for="(stop, index) in flight.Return.Stops" :key="index"
                                                class="block">
                                                {{ (stop.Duration.Hours || 0) + 'h ' + (stop.Duration.Minutes || 0) +
                                                    'min '
                                                    + stop.Location.Airport }}
                                            </span>
                                        </template>
                                    </p>
                                </div>

                                <div class="block w-full md:w-auto">
                                    <h6 class="text-base font-normal mb-3">
                                        {{ flight.Return.ArriveDate.Date }}
                                    </h6>
                                    <h6 class="text-base font-normal">{{ flight.Origin.Code }}</h6>
                                    <p class="text-lg font-semibold my-1">
                                        {{ flight.Return.ArriveDate.Time }}
                                    </p>
                                    <h6 class="text-base font-normal">{{ flight.Origin.Airport }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <span class="line relative mx-2 hidden lg:block"></span>
                <span class="line-mobile relative my-5 block lg:hidden"></span>

                <div class="flex items-center flex-col md:flex-row lg:flex-col justify-between mt-2 lg:mt-0">
                    <div class="flex items-center flex-col w-full md:flex-row lg:block">
                        <h5
                            class="price text-base font-bold text-center py-4 w-full md:w-[200px] border border-solid border-prime-color rounded-lg mb-3 md:mb-0 md:mr-3 lg:mr-0 lg:mb-3">
                            {{ Math.floor(flight.TotalSum.Amount) }} {{ flight.TotalSum.Currency }}
                        </h5>

                        <button @click="goToBookingPage"
                            class="block text-base font-normal text-white text-center py-4 w-full md:w-[200px] bg-prime-color rounded-lg cursor-pointer">
                            {{ $t("ticket.bookNow") }}
                        </button>
                    </div>

                    <button type="button" class="details cursor-pointer flex items-center mt-5 md:mt-0 lg:mt-5"
                        @click.stop="toggleDetails(index)">
                        <p class="text-sm font-normal mr-1">
                            {{ $t("ticket.details") }}
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
            class="details-info block p-5 mt-2 relative rounded-lg bg-white border border-solid border-[#223a604d]">
            <div class="Departure block">
                <h4 class="text-base font-bold text-center">
                    {{ $t("ticket.departure") }}
                </h4>

                <div v-for="(segment, index) in flight.Outward.Segments" :key="segment.FlightNumber"
                    :class="{ 'mb-4': index !== flight.Outward.Segments.length - 1 }">
                    <FlightSegment :segment="segment" :stops="flight.Outward.Stops" :index="index" />
                </div>

            </div>

            <div class="Return block mt-4 pt-4 border-dashed border-0 border-t border-t-[#223A60]" v-if="flight.Return">
                <h4 class="text-base font-bold text-center">
                    {{ $t("ticket.return") }}
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

    .line-mobile {
        width: 100%;
        height: 1px;
        border-top: 3px dashed #F2F2F2;
        // border-left: 2px dashed #223A60;

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: -30px;
            transform: translateY(-50%);
            width: 20px;
            height: 40px;
            background: #F9F9F9;
            border-radius: 7px;
        }

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: -30px;
            transform: translateY(-50%);
            width: 20px;
            height: 40px;
            background: #F9F9F9;
            border-radius: 7px;
        }
    }
</style>