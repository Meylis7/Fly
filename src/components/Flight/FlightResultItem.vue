<script setup>
    import { defineProps } from 'vue';
    defineProps({
        flight: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="card flex justify-between p-5 mb-8 rounded-lg bg-white border border-solid border-[#223a604d]">
        <div class="block w-[740px]">
            <div class="block">
                <!-- <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <img class="h-12 object-contain block mr-3" src="@/assets/images/airline-1.png"
                            alt="airline-img">
                        <h4 class="text-lg font-normal">
                            ABC Airline
                        </h4>
                    </div>

                    <p class="text-base font-normal">Travel Class: Economy</p>
                </div> -->

                <div class="block bg-[#FAFCFC] rounded-lg mt-4 py-4 px-7">
                    <!-- <div class="flex items-center justify-between">
                        <h6 class="text-base font-normal mb-3">
                            {{ flight.Outward.DepartDate.Date }}
                        </h6>
                        <h6 class="text-base font-normal mb-3">
                            {{ flight.Outward.ArriveDate.Date }}
                        </h6>
                    </div> -->

                    <div class="flex items-center justify-between">
                        <div class="block">
                            <p class="text-base font-semibold mb-1">
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

                            <p class="text-base font-semibold text-center mt-2">
                                {{ flight.Outward.Duration.Hours }}hr {{ flight.Outward.Duration.Minutes }}min
                            </p>
                        </div>

                        <div class="block">
                            <p class="text-base font-semibold mb-1">
                                {{ flight.Outward.ArriveDate.Time }}
                            </p>
                            <h6 class="text-base font-normal">{{ flight.Destination.Airport.ru }}</h6>
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
                <div class="block bg-[#FAFCFC] rounded-lg mt-4 py-4 px-7">
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
                                {{ flight.Return.Duration.Hours }}hr {{ flight.Return.Duration.Minutes }}min
                            </p>

                            <span class="flex items-center gap-[10px]">
                                <span class="w-[70px] h-[1px] bg-[#C8C8C8] block"></span>
                                <img src="@/assets/images/svg/ticket-plane.svg" alt="plane-icon">
                                <span class="w-[70px] h-[1px] bg-[#C8C8C8] block"></span>
                            </span>
                        </div>

                        <div class="block">
                            <p class="text-base font-semibold mb-1">
                                {{ flight.Return.ArriveDate.Time }}
                            </p>
                            <h6 class="text-base font-normal">{{ flight.Destination.Airport.ru }}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <span class="line relative block mx-1"></span>

        <div class="flex flex-col justify-end">
            <h5
                class="price text-base font-bold text-center py-4 w-[200px] border border-solid border-prime-color rounded-lg mb-3">
                {{ flight.TotalSum.Amount }} {{ flight.TotalSum.Currency }}
            </h5>

            <a href="#"
                class="block text-base font-normal text-white text-center py-4 w-[200px] bg-prime-color rounded-lg cursor-pointer">
                Book now
            </a>
        </div>
    </div>
</template>



<style lang="scss" scoped>
    .line {
        width: 1px;
        border-left: 2px dashed #F2F2F2;

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