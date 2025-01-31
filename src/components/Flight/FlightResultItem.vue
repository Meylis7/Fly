<script setup>
    import { defineProps, ref, onMounted, onUnmounted } from 'vue';
    import CustomImage from '../CustomImage.vue';
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

                        <a href="#"
                            class="block text-base font-normal text-white text-center py-4 w-[200px] bg-prime-color rounded-lg cursor-pointer">
                            Book now
                        </a>
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
                    <div class="flex items-center justify-between">
                        <div class="block">
                            <div class="flex items-center my-1">
                                <span class="block h-[35px] mr-2">
                                    <CustomImage :url="segment.Operator.Logo" class="block w-full h-full object-contain"
                                        alt="Airline Logo" />
                                    <!-- <img class="block w-full h-full object-contain" :src="segment.Operator.Logo"
                                        alt="airline-logo"> -->
                                </span>
                                <p class="font-semibold !uppercase">
                                    {{ segment.Operator.Name }} - {{ segment.FlightNumber }} - {{
                                        segment.TravelClass.SupplierClass }}
                                </p>
                            </div>

                            <div
                                class="flex items-start relative before:block before:w-3 before:h-3 before:mt-2 before:rounded-full
                             before:bg-prime-color before:mr-2 mb-4 after:block after:absolute after:left-[5.5px] after:top-[22px] 
                             after:w-[1px] after:h-full after:border-dashed after:border-0 after:border-l after:border-l-[#223A60]">
                                <div class="block">
                                    <div class="flex items-center my-1">
                                        <p class="text-sm font-semibold mr-2">{{ segment.DepartDate.Time }}</p>
                                        <p class="text-sm font-semibold">{{ segment.DepartDate.Date }}</p>
                                    </div>
                                    <h5 class="text-sm font-normal">{{ segment.Origin.Airport.en }}</h5>
                                </div>
                            </div>
                            <div
                                class="flex items-start relative before:block before:w-3 before:h-3 before:mt-2 before:rounded-full before:bg-prime-color before:mr-2">
                                <div class="block">
                                    <div class="flex items-center my-1">
                                        <p class="text-sm font-semibold mr-2">{{ segment.ArriveDate.Time }}</p>
                                        <p class="text-sm font-semibold">{{ segment.ArriveDate.Date }}</p>
                                    </div>
                                    <h5 class="text-sm font-normal">{{ segment.Destination.Airport.en }}</h5>
                                </div>
                            </div>
                        </div>

                        <div class="block">
                            <div class="flex items-center mb-2">
                                <span class="block h-[18px] mr-2">
                                    <svg class="object-contain" width="20" height="20" viewBox="0 0 21 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10 1C5.03746 1 1 5.03726 1 10C1 14.9627 5.03746 19 10 19C14.9625 19 19 14.9627 19 10C19 5.03726 14.9625 1 10 1ZM10 17.9888C5.59506 17.9888 2.01124 14.4049 2.01124 10C2.01124 5.59506 5.59506 2.01124 10 2.01124C14.4049 2.01124 17.9888 5.59506 17.9888 10C17.9888 14.4049 14.4049 17.9888 10 17.9888ZM10.5056 9.78481V3.69676C10.5056 3.41746 10.2793 3.19115 10 3.19115C9.7207 3.19115 9.49438 3.41746 9.49438 3.69676V10C9.49438 10.1375 9.5504 10.2692 9.64971 10.3645L13.1217 13.7017C13.2196 13.796 13.3458 13.8429 13.472 13.8429C13.6047 13.8429 13.7373 13.7909 13.8366 13.6876C14.03 13.4861 14.0237 13.1662 13.8225 12.9726L10.5056 9.78481Z"
                                            fill="#223A60" stroke="#223A60" stroke-width="0.7" />
                                    </svg>
                                </span>
                                <p class="text-sm font-normal">
                                    <span class="font-semibold"> Flight Duration: </span> {{ segment.Duration.Hours }}
                                    Hr.
                                    {{ segment.Duration.Min }} Min.
                                </p>
                            </div>

                            <div class="flex items-center mb-2">
                                <span class="block h-[18px] mr-2">
                                    <svg v-if="segment.Features.HoldBag" width="18" height="15" viewBox="0 0 18 15"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.23706 14.3033C5.9728 14.3033 5.73257 14.1832 5.54039 13.991L0.279341 8.3216C-0.105028 7.91321 -0.0810052 7.26458 0.279341 6.85619C0.663709 6.4478 1.26429 6.47182 1.64865 6.85619L6.21304 11.7809L16.3267 0.321922C16.6871 -0.0864698 17.3117 -0.110493 17.6961 0.273876C18.0804 0.658245 18.1044 1.30687 17.7441 1.73928L6.95775 13.991C6.74154 14.1832 6.50131 14.3033 6.23706 14.3033Z"
                                            fill="#223A60" />
                                    </svg>
                                    <svg v-else width="16" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17.6824 1.8C17.8938 1.59795 17.9997 1.3509 18 1.05882C17.9997 0.766751 17.8938 0.51528 17.6824 0.304412C17.4803 0.101781 17.2333 0.000310202 16.9412 0C16.6491 0.000310202 16.3976 0.101781 16.1868 0.304412L9 7.50441L1.8 0.304412C1.59795 0.101781 1.3509 0.000310202 1.05882 0C0.766751 0.000310202 0.51528 0.101781 0.304412 0.304412C0.101781 0.51528 0.000310202 0.766751 0 1.05882C0.000310202 1.3509 0.101781 1.59795 0.304412 1.8L7.50441 9L0.304412 16.1868C0.101781 16.3976 0.000310202 16.6491 0 16.9412C0.000310202 17.2333 0.101781 17.4803 0.304412 17.6824C0.51528 17.8938 0.766751 17.9997 1.05882 18C1.3509 17.9997 1.59795 17.8938 1.8 17.6824L9 10.4956L16.1868 17.6824C16.3976 17.8938 16.6491 17.9997 16.9412 18C17.2333 17.9997 17.4803 17.8938 17.6824 17.6824C17.8938 17.4803 17.9997 17.2333 18 16.9412C17.9997 16.6491 17.8938 16.3976 17.6824 16.1868L10.4956 9L17.6824 1.8Z"
                                            fill="#223A60" />
                                    </svg>
                                </span>
                                <p class="text-sm font-normal">
                                    <span class="font-semibold">Baggage: </span>
                                    <span v-if="segment.Features.HoldBag"> {{ segment.Features.HoldBag.value }}</span>
                                    <span v-else>Not included</span>
                                </p>
                            </div>

                            <div class="flex items-center">
                                <span class="block h-[18px] mr-2">
                                    <span v-if="segment.Features.SmallCabinBag || segment.Features.LargeCabinBag">
                                        <svg v-if="segment.Features.SmallCabinBag" width="18" height="15"
                                            viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.23706 14.3033C5.9728 14.3033 5.73257 14.1832 5.54039 13.991L0.279341 8.3216C-0.105028 7.91321 -0.0810052 7.26458 0.279341 6.85619C0.663709 6.4478 1.26429 6.47182 1.64865 6.85619L6.21304 11.7809L16.3267 0.321922C16.6871 -0.0864698 17.3117 -0.110493 17.6961 0.273876C18.0804 0.658245 18.1044 1.30687 17.7441 1.73928L6.95775 13.991C6.74154 14.1832 6.50131 14.3033 6.23706 14.3033Z"
                                                fill="#223A60" />
                                        </svg>
                                    </span>
                                    <span v-else>
                                        <svg width="16" height="18" viewBox="0 0 18 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.6824 1.8C17.8938 1.59795 17.9997 1.3509 18 1.05882C17.9997 0.766751 17.8938 0.51528 17.6824 0.304412C17.4803 0.101781 17.2333 0.000310202 16.9412 0C16.6491 0.000310202 16.3976 0.101781 16.1868 0.304412L9 7.50441L1.8 0.304412C1.59795 0.101781 1.3509 0.000310202 1.05882 0C0.766751 0.000310202 0.51528 0.101781 0.304412 0.304412C0.101781 0.51528 0.000310202 0.766751 0 1.05882C0.000310202 1.3509 0.101781 1.59795 0.304412 1.8L7.50441 9L0.304412 16.1868C0.101781 16.3976 0.000310202 16.6491 0 16.9412C0.000310202 17.2333 0.101781 17.4803 0.304412 17.6824C0.51528 17.8938 0.766751 17.9997 1.05882 18C1.3509 17.9997 1.59795 17.8938 1.8 17.6824L9 10.4956L16.1868 17.6824C16.3976 17.8938 16.6491 17.9997 16.9412 18C17.2333 17.9997 17.4803 17.8938 17.6824 17.6824C17.8938 17.4803 17.9997 17.2333 18 16.9412C17.9997 16.6491 17.8938 16.3976 17.6824 16.1868L10.4956 9L17.6824 1.8Z"
                                                fill="#223A60" />
                                        </svg>
                                    </span>
                                </span>
                                <p class="text-sm font-normal">
                                    <span class="font-semibold">Cabin bag: </span>
                                    <span v-if="segment.Features.SmallCabinBag">
                                        {{ segment.Features.SmallCabinBag.value }}
                                    </span>
                                    <span v-else-if="segment.Features.LargeCabinBag">
                                        {{ segment.Features.LargeCabinBag.value }}
                                    </span>
                                    <span v-else>
                                        Not included
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>

                    <div v-if="flight.Outward.Stops && flight.Outward.Stops[index]"
                        class="stopover bg-[#E8F0FE] py-3 mt-3 rounded">
                        <p class="text-sm font-bold text-[#223A60] text-center ">
                            Waiting duration:
                            <span class="font-normal">
                                <span class="font-semibold">{{ flight.Outward.Stops[index].Location.Airport.en
                                    }}</span>,
                                {{ flight.Outward.Stops[index].Location.Country.en }}
                                (Duration: {{ flight.Outward.Stops[index].Duration.Hours }}h {{
                                    flight.Outward.Stops[index].Duration.Minutes }}m)
                            </span>
                        </p>
                    </div>
                </div>

            </div>

            <div class="Return block mt-4 pt-4 border-dashed border-0 border-t border-t-[#223A60]" v-if="flight.Return">
                <h4 class="text-base font-bold text-center">
                    Return
                </h4>

                <div v-for="(segment, index) in flight.Return.Segments" :key="segment.FlightNumber"
                    :class="{ 'mb-4': index !== flight.Return.Segments.length - 1 }">
                    <div class="flex items-center justify-between">
                        <div class="block">
                            <div class="flex items-center my-1">
                                <span class="block h-[35px] mr-2">
                                    <CustomImage :url="segment.Operator.Logo" class="block w-full h-full object-contain"
                                        alt="Airline Logo" />
                                    <!-- <img class="block w-full h-full object-contain" :src="segment.Operator.Logo"
                                    alt="airline-logo" @error="segment.Operator.Logo = null"> -->
                                </span>
                                <p class="font-semibold">
                                    {{ segment.Operator.Name }} - {{ segment.FlightNumber }} - {{
                                        segment.TravelClass.SupplierClass
                                    }}
                                </p>
                            </div>

                            <div
                                class="flex items-start relative before:block before:w-3 before:h-3 before:mt-2 before:rounded-full
                             before:bg-prime-color before:mr-2 mb-4 after:block after:absolute after:left-[5.5px] after:top-[22px] 
                             after:w-[1px] after:h-full after:border-dashed after:border-0 after:border-l after:border-l-[#223A60]">
                                <div class="block">
                                    <div class="flex items-center my-1">
                                        <p class="text-sm font-semibold mr-2">{{ segment.DepartDate.Time }}</p>
                                        <p class="text-sm font-semibold">{{ segment.DepartDate.Date }}</p>
                                    </div>
                                    <h5 class="text-sm font-normal">{{ segment.Origin.Airport.en }}</h5>
                                </div>
                            </div>
                            <div
                                class="flex items-start relative before:block before:w-3 before:h-3 before:mt-2 before:rounded-full before:bg-prime-color before:mr-2">
                                <div class="block">
                                    <div class="flex items-center my-1">
                                        <p class="text-sm font-semibold mr-2">{{ segment.ArriveDate.Time }}</p>
                                        <p class="text-sm font-semibold">{{ segment.ArriveDate.Date }}</p>
                                    </div>
                                    <h5 class="text-sm font-normal">{{ segment.Destination.Airport.en }}</h5>
                                </div>
                            </div>
                        </div>

                        <div class="block">
                            <div class="flex items-center mb-2">
                                <span class="block h-[18px] mr-2">
                                    <svg class="object-contain" width="20" height="20" viewBox="0 0 21 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10 1C5.03746 1 1 5.03726 1 10C1 14.9627 5.03746 19 10 19C14.9625 19 19 14.9627 19 10C19 5.03726 14.9625 1 10 1ZM10 17.9888C5.59506 17.9888 2.01124 14.4049 2.01124 10C2.01124 5.59506 5.59506 2.01124 10 2.01124C14.4049 2.01124 17.9888 5.59506 17.9888 10C17.9888 14.4049 14.4049 17.9888 10 17.9888ZM10.5056 9.78481V3.69676C10.5056 3.41746 10.2793 3.19115 10 3.19115C9.7207 3.19115 9.49438 3.41746 9.49438 3.69676V10C9.49438 10.1375 9.5504 10.2692 9.64971 10.3645L13.1217 13.7017C13.2196 13.796 13.3458 13.8429 13.472 13.8429C13.6047 13.8429 13.7373 13.7909 13.8366 13.6876C14.03 13.4861 14.0237 13.1662 13.8225 12.9726L10.5056 9.78481Z"
                                            fill="#223A60" stroke="#223A60" stroke-width="0.7" />
                                    </svg>
                                </span>
                                <p class="text-sm font-normal">
                                    <span class="font-semibold"> Flight Duration: </span> {{ segment.Duration.Hours }}
                                    Hr.
                                    {{
                                        segment.Duration.Min }} Min.
                                </p>
                            </div>

                            <div class="flex items-center mb-2">
                                <span class="block h-[18px] mr-2">
                                    <svg v-if="segment.Features.HoldBag" width="18" height="15" viewBox="0 0 18 15"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.23706 14.3033C5.9728 14.3033 5.73257 14.1832 5.54039 13.991L0.279341 8.3216C-0.105028 7.91321 -0.0810052 7.26458 0.279341 6.85619C0.663709 6.4478 1.26429 6.47182 1.64865 6.85619L6.21304 11.7809L16.3267 0.321922C16.6871 -0.0864698 17.3117 -0.110493 17.6961 0.273876C18.0804 0.658245 18.1044 1.30687 17.7441 1.73928L6.95775 13.991C6.74154 14.1832 6.50131 14.3033 6.23706 14.3033Z"
                                            fill="black" />
                                    </svg>
                                    <svg v-else width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17.6824 1.8C17.8938 1.59795 17.9997 1.3509 18 1.05882C17.9997 0.766751 17.8938 0.51528 17.6824 0.304412C17.4803 0.101781 17.2333 0.000310202 16.9412 0C16.6491 0.000310202 16.3976 0.101781 16.1868 0.304412L9 7.50441L1.8 0.304412C1.59795 0.101781 1.3509 0.000310202 1.05882 0C0.766751 0.000310202 0.51528 0.101781 0.304412 0.304412C0.101781 0.51528 0.000310202 0.766751 0 1.05882C0.000310202 1.3509 0.101781 1.59795 0.304412 1.8L7.50441 9L0.304412 16.1868C0.101781 16.3976 0.000310202 16.6491 0 16.9412C0.000310202 17.2333 0.101781 17.4803 0.304412 17.6824C0.51528 17.8938 0.766751 17.9997 1.05882 18C1.3509 17.9997 1.59795 17.8938 1.8 17.6824L9 10.4956L16.1868 17.6824C16.3976 17.8938 16.6491 17.9997 16.9412 18C17.2333 17.9997 17.4803 17.8938 17.6824 17.6824C17.8938 17.4803 17.9997 17.2333 18 16.9412C17.9997 16.6491 17.8938 16.3976 17.6824 16.1868L10.4956 9L17.6824 1.8Z"
                                            fill="black" />
                                    </svg>
                                </span>
                                <p class="text-sm font-normal">
                                    <span class="font-semibold">Baggage: </span>
                                    <span v-if="segment.Features.HoldBag"> {{ segment.Features.HoldBag.value }}</span>
                                    <span v-else>Not included</span>
                                </p>
                            </div>

                            <div class="flex items-center">
                                <span class="block h-[18px] mr-2">
                                    <span v-if="segment.Features.SmallCabinBag || segment.Features.LargeCabinBag">
                                        <svg v-if="segment.Features.SmallCabinBag" width="18" height="15"
                                            viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.23706 14.3033C5.9728 14.3033 5.73257 14.1832 5.54039 13.991L0.279341 8.3216C-0.105028 7.91321 -0.0810052 7.26458 0.279341 6.85619C0.663709 6.4478 1.26429 6.47182 1.64865 6.85619L6.21304 11.7809L16.3267 0.321922C16.6871 -0.0864698 17.3117 -0.110493 17.6961 0.273876C18.0804 0.658245 18.1044 1.30687 17.7441 1.73928L6.95775 13.991C6.74154 14.1832 6.50131 14.3033 6.23706 14.3033Z"
                                                fill="black" />
                                        </svg>
                                    </span>
                                    <span v-else>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.6824 1.8C17.8938 1.59795 17.9997 1.3509 18 1.05882C17.9997 0.766751 17.8938 0.51528 17.6824 0.304412C17.4803 0.101781 17.2333 0.000310202 16.9412 0C16.6491 0.000310202 16.3976 0.101781 16.1868 0.304412L9 7.50441L1.8 0.304412C1.59795 0.101781 1.3509 0.000310202 1.05882 0C0.766751 0.000310202 0.51528 0.101781 0.304412 0.304412C0.101781 0.51528 0.000310202 0.766751 0 1.05882C0.000310202 1.3509 0.101781 1.59795 0.304412 1.8L7.50441 9L0.304412 16.1868C0.101781 16.3976 0.000310202 16.6491 0 16.9412C0.000310202 17.2333 0.101781 17.4803 0.304412 17.6824C0.51528 17.8938 0.766751 17.9997 1.05882 18C1.3509 17.9997 1.59795 17.8938 1.8 17.6824L9 10.4956L16.1868 17.6824C16.3976 17.8938 16.6491 17.9997 16.9412 18C17.2333 17.9997 17.4803 17.8938 17.6824 17.6824C17.8938 17.4803 17.9997 17.2333 18 16.9412C17.9997 16.6491 17.8938 16.3976 17.6824 16.1868L10.4956 9L17.6824 1.8Z"
                                                fill="black" />
                                        </svg>
                                    </span>
                                </span>
                                <p class="text-sm font-normal">
                                    <span class="font-semibold">Cabin bag: </span>
                                    <span v-if="segment.Features.SmallCabinBag">
                                        {{ segment.Features.SmallCabinBag.value }}
                                    </span>
                                    <span v-else-if="segment.Features.LargeCabinBag">
                                        {{ segment.Features.LargeCabinBag.value }}
                                    </span>
                                    <span v-else>
                                        Not included
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>

                    <div v-if="flight.Return.Stops && flight.Return.Stops[index]"
                        class="stopover bg-[#E8F0FE] py-3 mt-3 rounded">
                        <p class="text-sm font-bold text-[#223A60] text-center ">
                            Waiting duration:
                            <span class="font-normal">
                                <span class="font-semibold">{{ flight.Return.Stops[index].Location.Airport.en
                                    }}</span>,
                                {{ flight.Return.Stops[index].Location.Country.en }}
                                (Duration: {{ flight.Return.Stops[index].Duration.Hours }}h {{
                                    flight.Return.Stops[index].Duration.Minutes }}m)
                            </span>
                        </p>
                    </div>
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