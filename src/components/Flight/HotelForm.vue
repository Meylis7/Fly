<script setup>


</script>

<template>
    <form class="w-full relative z-10">
        <div class="content w-full pt-5 px-[30px] pb-[60px] bg-white rounded-r-3xl rounded-bl-3xl">
            <div class="flex items-center justify-between">
                <div class="w-[22%]">
                    <label class="flex items-center gap-3 text-base font-bold text-prime-color mb-2">
                        Departure date
                    </label>

                    <input type="text" placeholder="Choose Dates"
                        class="bg-[#F2F3F4] w-full text-base font-medium p-3 rounded-md focus:ring-1 focus:ring-prime-color">
                </div>

                <span class="bg-[#F2F3F4] w-[3px] h-[73px] rounded block"></span>

                <div class="w-[22%]">
                    <label class="flex items-center gap-3 text-base font-bold text-prime-color mb-2">
                        Departure date
                    </label>

                    <input type="text" placeholder="Choose Dates"
                        class="bg-[#F2F3F4] w-full text-base font-medium p-3 rounded-md focus:ring-1 focus:ring-prime-color">
                </div>

                <span class="bg-[#F2F3F4] w-[3px] h-[73px] rounded block"></span>

                <div class="w-[22%]">
                    <label class="flex items-center gap-3 text-base font-bold text-prime-color mb-2">
                        Return date
                    </label>

                    <input type="text" placeholder="Choose Dates"
                        class="bg-[#F2F3F4] w-full text-base font-medium p-3 rounded-md focus:ring-1 focus:ring-prime-color">
                </div>

                <span class="bg-[#F2F3F4] w-[3px] h-[73px] rounded block"></span>

                <div class="w-[22%]">
                    <label class="flex items-center gap-3 text-base font-bold text-prime-color mb-2">
                        Passangers
                    </label>

                    <input type="text" value="1 Adult" class="bg-[#F2F3F4] w-full text-base font-medium p-3 rounded-md focus:ring-1 focus:ring-prime-color">
                </div>
            </div>
        </div>

        <button type="submit"
            class="flex items-center bg-prime-color py-[10px] px-4 gap-3 rounded-xl absolute left-[50%] translate-x-[-50%] bottom-[-36px]">
            <p class="text-base font-semibold text-white">
                Search Hotels
            </p>

            <span>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="-0.000244141" width="47.9991" height="47.9991" rx="7.9997" fill="#395582"
                        fill-opacity="0.5" />
                    <circle cx="21" cy="20.9993" r="6" stroke="white" stroke-width="1.99993" stroke-linejoin="round" />
                    <path d="M25 24.9988L32 31.9988" stroke="white" stroke-width="1.99993" stroke-linejoin="round" />
                </svg>
            </span>
        </button>
    </form>
</template>

<style lang="scss" scoped>
    @import '../../assets/css/variables.scss';



    .air-type {
        margin-right: 10px;

        &:last-child {
            margin-right: 0;
        }

        input {
            display: none;

            &:checked~label {
                background: $main-color;
                color: #fff;
            }
        }

        label {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.06em;
            color: #223A60;
            padding: 10px;
            border-radius: 7px;
            display: block;
            cursor: pointer;
            background: #F2F3F4;
        }
    }
</style>