<script>
    import Back from '@/components/Back.vue';


</script>

<template>
    <section class="mt-[150px] pt-[50px] pb-[100px] bg-[#F9F9F9]">
        <div class="auto_container">
            <div class="wrapper">
                <Back />

                <div class="mt-[30px] p-5 bg-white rounded border border-solid border-[#223a604d]">
                    <div>
                        <div class="flex items-center justify-between mb-[10px]">
                            <div class="flex items-center gap-x-[10px]">
                                <h6 class=" text-xl font-normal">
                                    France
                                </h6>
                                <span>
                                    <svg width="21" height="8" viewBox="0 0 21 8" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M19.662 5.33622C18.7796 4.66425 17.729 4.18079 16.6361 4.15968C15.5221 4.11743 14.409 4.11743 13.2747 4.13856C13.0017 4.13856 12.7075 4.07518 12.5182 3.92811C11.1524 2.91975 9.78644 1.9114 8.35804 0.902207C8.18985 0.776264 8.00052 0.671442 7.76977 0.586949C7.68608 0.544698 7.60158 0.523571 7.5179 0.523571C7.07669 0.460192 6.65661 0.544696 6.19427 0.544696C5.73193 0.608074 5.64825 0.544696 5.606 0.775461C5.606 0.92253 5.66938 1.21667 5.81644 1.34262C6.53066 2.18279 7.30826 3.08632 8.06481 3.88511C8.1485 3.98993 8.23301 4.09555 8.38007 4.2215C8.02173 4.26457 5.85796 4.26457 4.87075 4.26457C3.6097 4.26457 3.58938 4.15975 2.95886 3.52921C2.0342 2.52085 0.457968 2.33154 0.457968 2.33154C0.0378941 2.39492 -0.0880553 2.54198 0.059007 2.94094C0.416533 3.88674 0.710657 4.8317 1.06737 5.79857C1.10962 5.92451 1.25669 6.09272 1.40376 6.1764C1.80272 6.47054 2.01317 6.61761 2.43324 6.86948C2.97926 7.24731 3.67316 7.5 4.38738 7.5C9.13581 7.5 13.9055 7.5 18.6751 7.47888C18.8222 7.47888 18.9481 7.47888 19.0952 7.45775C19.6201 7.43662 19.9565 7.14249 20.1458 6.59647C20.2083 6.13494 20.0824 5.67262 19.6623 5.33623L19.662 5.33622Z"
                                            fill="black" />
                                    </svg>
                                </span>
                                <h6 class=" text-xl font-normal">
                                    Russia
                                </h6>
                            </div>

                            <div class="flex items-center">
                                <span class="block h-[35px] mr-2">
                                    <!-- <CustomImage :url="segment.Operator.Logo" class="block w-full h-full object-contain"
                                    alt="Airline Logo" /> -->
                                    <img class="block w-full h-full object-contain" src="../assets/images/airline-1.png"
                                        alt="airline-logo">
                                </span>
                                <p class="font-semibold !uppercase">
                                    <!-- {{ segment.Operator.Name }} - {{ segment.FlightNumber }} - {{
                                    segment.TravelClass.SupplierClass }} -->
                                    ABC Airline
                                </p>
                            </div>
                        </div>
                        <div class="block bg-[#E8F0FE] rounded-lg mt-4 py-4 px-7">
                            <div class="flex items-center justify-between flex-col md:flex-row">
                                <div class="block text-center md:text-left w-full md:w-auto">
                                    <h6 class="text-base font-normal mb-3">
                                        <!-- {{ flight.Outward.DepartDate.Date }} -->
                                        Sun, 29 Jan 2023
                                    </h6>
                                    <h6 class="text-base font-normal">
                                        <!-- {{ flight.Origin.Code }} -->
                                        IST
                                    </h6>
                                    <p class="text-lg font-semibold my-1">
                                        <!-- {{ flight.Outward.DepartDate.Time }} -->
                                        14.50
                                    </p>
                                    <h6 class="text-base font-normal">
                                        <!-- {{ flight.Origin.Airport }} -->
                                        Moi Intl, Mombasa Kenya
                                    </h6>
                                </div>

                                <div class="block my-6 md:my-0 mx-3 w-full md:w-auto">
                                    <p class="text-base font-semibold text-center mb-2">
                                        <!-- {{ flight.Outward.Duration.Hours }}{{ $t("ticket.hour") }} {{
                                        flight.Outward.Duration.Minutes }}{{ $t("ticket.minute") }} -->
                                        9hr 50min
                                    </p>

                                    <span class="flex items-center justify-center gap-[10px]">
                                        <span class="w-[70px] h-[1px] bg-[#C8C8C8] block"></span>
                                        <img src="@/assets/images/svg/ticket-plane.svg" alt="plane-icon">
                                        <span class="w-[70px] h-[1px] bg-[#C8C8C8] block"></span>
                                    </span>

                                    <!-- <p class="text-sm font-semibold text-center mt-2">
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
</p> -->
                                </div>

                                <div class="block text-center md:text-left w-full md:w-auto">
                                    <h6 class="text-base font-normal mb-3">
                                        <!-- {{ flight.Outward.ArriveDate.Date }} -->
                                        Sun, 29 Jan 2023
                                    </h6>
                                    <h6 class="text-base font-normal">
                                        <!-- {{ flight.Destination.Code }} -->
                                        FRA
                                    </h6>
                                    <p class="text-lg font-semibold my-1">
                                        <!-- {{ flight.Outward.ArriveDate.Time }} -->
                                        14.50
                                    </p>
                                    <h6 class="text-base font-normal">
                                        <!-- {{ flight.Destination.Airport }} -->
                                        JFK Terminal, Nairobi, Kenya
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-[25px]">
                        <div class="flex items-center justify-between mb-[10px]">
                            <div class="flex items-center gap-x-[10px]">
                                <h6 class=" text-xl font-normal">
                                    Russia
                                </h6>
                                <span>
                                    <svg width="21" height="8" viewBox="0 0 21 8" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M19.662 5.33622C18.7796 4.66425 17.729 4.18079 16.6361 4.15968C15.5221 4.11743 14.409 4.11743 13.2747 4.13856C13.0017 4.13856 12.7075 4.07518 12.5182 3.92811C11.1524 2.91975 9.78644 1.9114 8.35804 0.902207C8.18985 0.776264 8.00052 0.671442 7.76977 0.586949C7.68608 0.544698 7.60158 0.523571 7.5179 0.523571C7.07669 0.460192 6.65661 0.544696 6.19427 0.544696C5.73193 0.608074 5.64825 0.544696 5.606 0.775461C5.606 0.92253 5.66938 1.21667 5.81644 1.34262C6.53066 2.18279 7.30826 3.08632 8.06481 3.88511C8.1485 3.98993 8.23301 4.09555 8.38007 4.2215C8.02173 4.26457 5.85796 4.26457 4.87075 4.26457C3.6097 4.26457 3.58938 4.15975 2.95886 3.52921C2.0342 2.52085 0.457968 2.33154 0.457968 2.33154C0.0378941 2.39492 -0.0880553 2.54198 0.059007 2.94094C0.416533 3.88674 0.710657 4.8317 1.06737 5.79857C1.10962 5.92451 1.25669 6.09272 1.40376 6.1764C1.80272 6.47054 2.01317 6.61761 2.43324 6.86948C2.97926 7.24731 3.67316 7.5 4.38738 7.5C9.13581 7.5 13.9055 7.5 18.6751 7.47888C18.8222 7.47888 18.9481 7.47888 19.0952 7.45775C19.6201 7.43662 19.9565 7.14249 20.1458 6.59647C20.2083 6.13494 20.0824 5.67262 19.6623 5.33623L19.662 5.33622Z"
                                            fill="black" />
                                    </svg>
                                </span>
                                <h6 class=" text-xl font-normal">
                                    France
                                </h6>
                            </div>

                            <div class="flex items-center">
                                <span class="block h-[35px] mr-2">
                                    <!-- <CustomImage :url="segment.Operator.Logo" class="block w-full h-full object-contain"
                                    alt="Airline Logo" /> -->
                                    <img class="block w-full h-full object-contain" src="../assets/images/airline-1.png"
                                        alt="airline-logo">
                                </span>
                                <p class="font-semibold !uppercase">
                                    <!-- {{ segment.Operator.Name }} - {{ segment.FlightNumber }} - {{
                                    segment.TravelClass.SupplierClass }} -->
                                    ABC Airline
                                </p>
                            </div>
                        </div>
                        <div class="block bg-[#E8F0FE] rounded-lg mt-4 py-4 px-7">
                            <div class="flex items-center justify-between flex-col md:flex-row">
                                <div class="block text-center md:text-left w-full md:w-auto">
                                    <h6 class="text-base font-normal mb-3">
                                        <!-- {{ flight.Outward.DepartDate.Date }} -->
                                        Sun, 29 Jan 2023
                                    </h6>
                                    <h6 class="text-base font-normal">
                                        <!-- {{ flight.Origin.Code }} -->
                                        IST
                                    </h6>
                                    <p class="text-lg font-semibold my-1">
                                        <!-- {{ flight.Outward.DepartDate.Time }} -->
                                        14.50
                                    </p>
                                    <h6 class="text-base font-normal">
                                        <!-- {{ flight.Origin.Airport }} -->
                                        Moi Intl, Mombasa Kenya
                                    </h6>
                                </div>

                                <div class="block my-6 md:my-0 mx-3 w-full md:w-auto">
                                    <p class="text-base font-semibold text-center mb-2">
                                        <!-- {{ flight.Outward.Duration.Hours }}{{ $t("ticket.hour") }} {{
                                        flight.Outward.Duration.Minutes }}{{ $t("ticket.minute") }} -->
                                        9hr 50min
                                    </p>

                                    <span class="flex items-center justify-center gap-[10px]">
                                        <span class="w-[70px] h-[1px] bg-[#C8C8C8] block"></span>
                                        <img src="@/assets/images/svg/ticket-plane.svg" alt="plane-icon">
                                        <span class="w-[70px] h-[1px] bg-[#C8C8C8] block"></span>
                                    </span>

                                    <!-- <p class="text-sm font-semibold text-center mt-2">
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
</p> -->
                                </div>

                                <div class="block text-center md:text-left w-full md:w-auto">
                                    <h6 class="text-base font-normal mb-3">
                                        <!-- {{ flight.Outward.ArriveDate.Date }} -->
                                        Sun, 29 Jan 2023
                                    </h6>
                                    <h6 class="text-base font-normal">
                                        <!-- {{ flight.Destination.Code }} -->
                                        FRA
                                    </h6>
                                    <p class="text-lg font-semibold my-1">
                                        <!-- {{ flight.Outward.ArriveDate.Time }} -->
                                        14.50
                                    </p>
                                    <h6 class="text-base font-normal">
                                        <!-- {{ flight.Destination.Airport }} -->
                                        JFK Terminal, Nairobi, Kenya
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <form class="mt-[30px] p-5 bg-white rounded border border-solid border-[#223a604d]">
                    <div class="flex items-center justify-between mb-[10px]">
                        <div class="flex items-center gap-x-[10px]">
                            <h6 class=" text-xl font-normal">
                                Russia
                            </h6>
                            <span>
                                <svg width="21" height="8" viewBox="0 0 21 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.662 5.33622C18.7796 4.66425 17.729 4.18079 16.6361 4.15968C15.5221 4.11743 14.409 4.11743 13.2747 4.13856C13.0017 4.13856 12.7075 4.07518 12.5182 3.92811C11.1524 2.91975 9.78644 1.9114 8.35804 0.902207C8.18985 0.776264 8.00052 0.671442 7.76977 0.586949C7.68608 0.544698 7.60158 0.523571 7.5179 0.523571C7.07669 0.460192 6.65661 0.544696 6.19427 0.544696C5.73193 0.608074 5.64825 0.544696 5.606 0.775461C5.606 0.92253 5.66938 1.21667 5.81644 1.34262C6.53066 2.18279 7.30826 3.08632 8.06481 3.88511C8.1485 3.98993 8.23301 4.09555 8.38007 4.2215C8.02173 4.26457 5.85796 4.26457 4.87075 4.26457C3.6097 4.26457 3.58938 4.15975 2.95886 3.52921C2.0342 2.52085 0.457968 2.33154 0.457968 2.33154C0.0378941 2.39492 -0.0880553 2.54198 0.059007 2.94094C0.416533 3.88674 0.710657 4.8317 1.06737 5.79857C1.10962 5.92451 1.25669 6.09272 1.40376 6.1764C1.80272 6.47054 2.01317 6.61761 2.43324 6.86948C2.97926 7.24731 3.67316 7.5 4.38738 7.5C9.13581 7.5 13.9055 7.5 18.6751 7.47888C18.8222 7.47888 18.9481 7.47888 19.0952 7.45775C19.6201 7.43662 19.9565 7.14249 20.1458 6.59647C20.2083 6.13494 20.0824 5.67262 19.6623 5.33623L19.662 5.33622Z"
                                        fill="black" />
                                </svg>
                            </span>
                            <h6 class=" text-xl font-normal">
                                France
                            </h6>
                        </div>
                    </div>

                    <div class="mt-3 overflow-auto">
                        <div class="item w-[calc(25%-10px)]">
                            <input type="radio" id="economBasic" name="from" class="peer hidden" v-model="selectedPlan">
                            <label for="economBasic" class="group flex items-center flex-col border border-solid border-[#034F75] rounded-lg p-4 peer-checked:bg-[#223A60] transition
                                peer-checked:[&_.plan-text]:text-white
                                peer-checked:[&_.plan-border]:border-white
                                peer-checked:[&_.plan-bg]:bg-white
                                ">
                                <p
                                    class="text-sm text-[#034F75] py-1 px-4 border border-solid border-[#034F75] rounded plan-text plan-border">
                                    Economy Basic
                                </p>
                                <p class=" text-xl font-semibold my-4 text-[#034F75] plan-text">
                                    70$
                                </p>
                                <ul>
                                    <li class="flex items-center tick">
                                        <span class="block">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.80078 0.5C3.66078 0.5 0.300781 3.86 0.300781 8C0.300781 12.14 3.66078 15.5 7.80078 15.5C11.9408 15.5 15.3008 12.14 15.3008 8C15.3008 3.86 11.9408 0.5 7.80078 0.5ZM7.80078 14C4.49328 14 1.80078 11.3075 1.80078 8C1.80078 4.6925 4.49328 2 7.80078 2C11.1083 2 13.8008 4.6925 13.8008 8C13.8008 11.3075 11.1083 14 7.80078 14ZM11.7739 5.21938C11.4812 4.92456 11.0046 4.92371 10.7108 5.2175L7.00652 8.92176C6.61653 9.31175 5.98442 9.31236 5.59368 8.92313L4.88754 8.21971C4.59507 7.92838 4.12195 7.92883 3.83004 8.22074C3.53774 8.51304 3.53774 8.98696 3.83004 9.27926L5.59367 11.0429C5.9842 11.4334 6.61736 11.4334 7.00789 11.0429L11.772 6.27875C12.0644 5.98643 12.0652 5.51274 11.7739 5.21938Z"
                                                    fill="#2DC937" />
                                            </svg>
                                        </span>
                                        <p class="text-base font-normal ml-1 text-[#034F75] plan-text">
                                            Attendance Management
                                        </p>
                                    </li>

                                    <li class="flex items-center pay">
                                        <span class="block">
                                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M0.300781 7.50002C0.300781 3.35464 3.66128 -0.00585938 7.80666 -0.00585938C11.952 -0.00585938 15.3125 3.35464 15.3125 7.50002C15.3125 11.6453 11.952 15.0059 7.80666 15.0059C3.66128 15.0059 0.300781 11.6453 0.300781 7.50002ZM7.80666 1.0708C4.2559 1.0708 1.37745 3.94926 1.37745 7.50002C1.37745 11.0508 4.2559 13.9292 7.80666 13.9292C11.3574 13.9292 14.2358 11.0508 14.2358 7.50002C14.2358 3.94926 11.3574 1.0708 7.80666 1.0708Z"
                                                    fill="#81A7BA" />
                                                <path
                                                    d="M7.95128 5.23414C7.66628 5.23114 7.39928 5.27914 7.15028 5.37814C6.90428 5.47414 6.70478 5.60914 6.55178 5.78314C6.39878 5.95414 6.32228 6.15514 6.32228 6.38614C6.32228 6.65614 6.39278 6.86464 6.53378 7.01164C6.67778 7.15564 6.87278 7.26364 7.11878 7.33564C7.36478 7.40764 7.64228 7.47214 7.95128 7.52914C8.35328 7.59814 8.72678 7.70614 9.07178 7.85314C9.41678 7.99714 9.69428 8.19064 9.90428 8.43364C10.1143 8.67364 10.2193 8.97064 10.2193 9.32464C10.2193 9.66064 10.1263 9.95614 9.94028 10.2111C9.75728 10.4661 9.51278 10.6701 9.20678 10.8231C8.90078 10.9761 8.56478 11.0676 8.19878 11.0976V12.0021H7.71728V11.0976C7.40828 11.0766 7.11278 11.0121 6.83078 10.9041C6.55178 10.7931 6.30878 10.6446 6.10178 10.4586C5.89778 10.2726 5.75078 10.0551 5.66078 9.80614L6.25028 9.58564C6.31628 9.77164 6.43628 9.93214 6.61028 10.0671C6.78728 10.1991 6.99278 10.3011 7.22678 10.3731C7.46378 10.4451 7.70528 10.4811 7.95128 10.4811C8.23928 10.4811 8.50778 10.4331 8.75678 10.3371C9.00578 10.2411 9.20678 10.1076 9.35978 9.93664C9.51278 9.76264 9.58928 9.55864 9.58928 9.32464C9.58928 9.08764 9.50978 8.89264 9.35078 8.73964C9.19178 8.58664 8.98628 8.46664 8.73428 8.37964C8.48528 8.28964 8.22428 8.22064 7.95128 8.17264C7.52228 8.09764 7.13678 7.99564 6.79478 7.86664C6.45578 7.73764 6.18728 7.55614 5.98928 7.32214C5.79128 7.08514 5.69228 6.77314 5.69228 6.38614C5.69228 6.05014 5.78378 5.75464 5.96678 5.49964C6.15278 5.24464 6.39878 5.04064 6.70478 4.88764C7.01378 4.73464 7.35128 4.64464 7.71728 4.61764V3.68614H8.19878V4.61764C8.49578 4.63864 8.78228 4.70314 9.05828 4.81114C9.33428 4.91914 9.57728 5.06614 9.78728 5.25214C10.0003 5.43514 10.1548 5.65564 10.2508 5.91364L9.65228 6.12964C9.58628 5.94064 9.46478 5.78014 9.28778 5.64814C9.11378 5.51314 8.90978 5.41114 8.67578 5.34214C8.44178 5.27014 8.20028 5.23414 7.95128 5.23414Z"
                                                    fill="#81A7BA" />
                                            </svg>
                                        </span>
                                        <p class="text-base font-normal ml-1 text-[#034F75] plan-text">
                                            Attendance Management
                                        </p>
                                    </li>

                                    <li class="flex items-center ban">
                                        <span class="block">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M0.300781 8.00588C0.300781 3.8605 3.66128 0.5 7.80666 0.5C11.952 0.5 15.3125 3.8605 15.3125 8.00588C15.3125 12.1512 11.952 15.5117 7.80666 15.5117C3.66128 15.5117 0.300781 12.1512 0.300781 8.00588ZM7.80666 1.57666C4.2559 1.57666 1.37745 4.45512 1.37745 8.00588C1.37745 11.5566 4.2559 14.4351 7.80666 14.4351C11.3574 14.4351 14.2358 11.5566 14.2358 8.00588C14.2358 4.45512 11.3574 1.57666 7.80666 1.57666ZM10.4742 5.33865C10.6954 5.55994 10.6954 5.91874 10.4742 6.14004L8.60818 8.006L10.4742 9.87198C10.6954 10.0933 10.6954 10.4521 10.4742 10.6734C10.2529 10.8947 9.89406 10.8947 9.67276 10.6734L7.80679 8.80739L5.94082 10.6734C5.71953 10.8947 5.36072 10.8947 5.13943 10.6734C4.91813 10.4521 4.91813 10.0933 5.13943 9.87198L7.00541 8.006L5.13943 6.14004C4.91813 5.91874 4.91813 5.55994 5.13943 5.33865C5.36072 5.11735 5.71953 5.11735 5.94082 5.33865L7.80679 7.20462L9.67276 5.33865C9.89406 5.11735 10.2529 5.11735 10.4742 5.33865Z"
                                                    fill="#81A7BA" />
                                            </svg>
                                        </span>
                                        <p
                                            class="text-base font-normal ml-1 text-[#034F75] plan-text opacity-50 line-through">
                                            Expense Tracking
                                        </p>
                                    </li>
                                </ul>

                                <button type="button"
                                    class="block bg-[#D3E7F0] text-[#034F75] rounded-lg text-base font-medium p-[10px] w-full mt-5 cursor-pointer plan-bg">
                                    {{ selectedPlan === plan.id ? 'Selected' : 'Choose plan' }}
                                </button>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
