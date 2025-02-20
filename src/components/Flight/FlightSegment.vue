<script setup>
import { defineProps} from 'vue';
import CustomImage from '../CustomImage.vue';
defineProps({
    segment: {
        type: Object,
        required: true
    },
    stops: {
        type: Object,
        required: true
    },
    index: {
        type: Number, 
        required: true
    }
})

</script>

<template>
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
                class="flex items-start relative before:block before:!w-3 before:h-3 before:mt-2 before:rounded-full
                             before:bg-prime-color before:mr-2 mb-4 after:block after:absolute after:left-[5.5px] after:top-[22px] 
                             after:w-[1px] after:h-full after:border-dashed after:border-0 after:border-l after:border-l-[#223A60]">
                <div class="block">
                    <div class="flex items-center my-1">
                        <p class="text-sm font-semibold mr-2">{{ segment.DepartDate.Time }}</p>
                        <p class="text-sm font-semibold">{{ segment.DepartDate.Date }}</p>
                    </div>
                    <h5 class="text-sm font-normal">{{ segment.Origin.Airport }}</h5>
                </div>
            </div>
            <div
                class="flex items-start relative before:block before:!w-3 before:h-3 before:mt-2 before:rounded-full before:bg-prime-color before:mr-2">
                <div class="block">
                    <div class="flex items-center my-1">
                        <p class="text-sm font-semibold mr-2">{{ segment.ArriveDate.Time }}</p>
                        <p class="text-sm font-semibold">{{ segment.ArriveDate.Date }}</p>
                    </div>
                    <h5 class="text-sm font-normal">{{ segment.Destination.Airport }}</h5>
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
                    <span class="font-semibold">{{ $t("ticket.flightDuration") }}: </span> {{ segment.Duration.Hours }}
                    {{ $t("ticket.hour") }}
                    {{ segment.Duration.Min }}  {{ $t("ticket.minute") }}
                </p>
            </div>

            <div class="flex items-center mb-2">
                <span class="block h-[18px] mr-2">
                    <svg v-if="segment.Features.HoldBag" width="18" height="15" viewBox="0 0 18 15" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
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
                    <span class="font-semibold">{{ $t("ticket.baggage") }}: </span>
                    <span v-if="segment.Features.HoldBag"> {{ segment.Features.HoldBag.Value }}</span>
                    <span v-else>{{ $t("ticket.notInclude") }}</span>
                </p>
            </div>

            <div class="flex items-center mb-2">
                <span class="block h-[18px] mr-2">
                    <span v-if="segment.Features.CabinBag">
                        <svg width="18" height="15" viewBox="0 0 18 15"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.23706 14.3033C5.9728 14.3033 5.73257 14.1832 5.54039 13.991L0.279341 8.3216C-0.105028 7.91321 -0.0810052 7.26458 0.279341 6.85619C0.663709 6.4478 1.26429 6.47182 1.64865 6.85619L6.21304 11.7809L16.3267 0.321922C16.6871 -0.0864698 17.3117 -0.110493 17.6961 0.273876C18.0804 0.658245 18.1044 1.30687 17.7441 1.73928L6.95775 13.991C6.74154 14.1832 6.50131 14.3033 6.23706 14.3033Z"
                                fill="#223A60" />
                        </svg>
                    </span>
                    <span v-else>
                        <svg width="16" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.6824 1.8C17.8938 1.59795 17.9997 1.3509 18 1.05882C17.9997 0.766751 17.8938 0.51528 17.6824 0.304412C17.4803 0.101781 17.2333 0.000310202 16.9412 0C16.6491 0.000310202 16.3976 0.101781 16.1868 0.304412L9 7.50441L1.8 0.304412C1.59795 0.101781 1.3509 0.000310202 1.05882 0C0.766751 0.000310202 0.51528 0.101781 0.304412 0.304412C0.101781 0.51528 0.000310202 0.766751 0 1.05882C0.000310202 1.3509 0.101781 1.59795 0.304412 1.8L7.50441 9L0.304412 16.1868C0.101781 16.3976 0.000310202 16.6491 0 16.9412C0.000310202 17.2333 0.101781 17.4803 0.304412 17.6824C0.51528 17.8938 0.766751 17.9997 1.05882 18C1.3509 17.9997 1.59795 17.8938 1.8 17.6824L9 10.4956L16.1868 17.6824C16.3976 17.8938 16.6491 17.9997 16.9412 18C17.2333 17.9997 17.4803 17.8938 17.6824 17.6824C17.8938 17.4803 17.9997 17.2333 18 16.9412C17.9997 16.6491 17.8938 16.3976 17.6824 16.1868L10.4956 9L17.6824 1.8Z"
                                fill="#223A60" />
                        </svg>
                    </span>
                </span>
                <p class="text-sm font-normal">
                    <span class="font-semibold">{{ $t("ticket.cabinBag") }}: </span>
                    <span v-if="segment.Features.CabinBag">
                        {{ segment.Features.CabinBag.Value }}
                    </span>
                    <span v-else>
                        {{ $t("ticket.notInclude") }}
                    </span>
                </p>
            </div>
            
            <div class="flex items-center mb-2">
                <span class="block h-[18px] mr-2">
                    <svg v-if="segment.Features.FlightChange" width="18" height="15" viewBox="0 0 18 15" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
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
                    <span class="font-semibold">  {{ $t("ticket.change") }}: </span>
                    <span v-if="segment.Features.FlightChange"> {{ segment.Features.FlightChange.Value }}</span>
                    <span v-else>{{ $t("ticket.notInclude") }}</span>
                </p>
            </div>

            
            <div class="flex items-center">
                <span class="block h-[18px] mr-2">
                    <svg v-if="segment.Features.Cancellation" width="18" height="15" viewBox="0 0 18 15" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
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
                    <span class="font-semibold">{{ $t("ticket.cancellation") }}: </span>
                    <span v-if="segment.Features.Cancellation"> {{ segment.Features.Cancellation.Value }}</span>
                    <span v-else>{{ $t("ticket.notInclude") }}</span>
                </p>
            </div>
        </div>
    </div>

    <div v-if="stops && stops[index]" class="stopover bg-[#E8F0FE] py-3 mt-3 rounded">
        <p class="text-sm font-bold text-[#223A60] text-center ">
            {{ $t("ticket.waitingDuration") }}:
            <span class="font-normal">
                <span class="font-semibold">{{ stops[index].Location.Airport
                    }}</span>,
                {{ stops[index].Location.Country }}
                ({{ stops[index].Duration.Hours }} {{ $t("ticket.hour") }} {{
                    stops[index].Duration.Minutes }} {{ $t("ticket.minute") }})
            </span>
        </p>
    </div>
</template>