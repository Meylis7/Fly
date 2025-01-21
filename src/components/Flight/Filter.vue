<script setup>

</script>

<template>
    <aside
        class="aside p-5 w-[350px] bg-white rounded-xl border border-solid border-[#223a604d] shadow-[0px_4px_5px_rgba(0, 0, 0, 0.15)]">
        <h3 class=" text-xl font-semibold mb-10">
            Filter by
        </h3>

        <form>
            <div class="block mb-5 border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                <div class="filter_check mb-[14px]">
                    <input type="checkbox" id="cheap">
                    <label class="text-base font-normal reslative" for="cheap">Cheaper first</label>
                </div>

                <div class="filter_check mb-[14px]">
                    <input type="checkbox" id="fast">
                    <label class="text-base font-normal reslative" for="fast">First the fast ones</label>
                </div>

                <div class="filter_check">
                    <input type="checkbox" id="time">
                    <label class="text-base font-normal reslative" for="time">By departure time</label>
                </div>
            </div>

            <div class="block mb-5 border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                <h5 class=" text-lg font-semibold mb-4">
                    Stop
                </h5>

                <div class="filter_check mb-[14px]">
                    <input type="checkbox" id="nonstop">
                    <label class="text-base font-normal reslative" for="nonstop">Nonstop (10)</label>
                </div>

                <div class="filter_check mb-[14px]">
                    <input type="checkbox" id="1_stop">
                    <label class="text-base font-normal reslative" for="1_stop">1 stop (4)</label>
                </div>

                <div class="filter_check mb-[14px]">
                    <input type="checkbox" id="2_stop">
                    <label class="text-base font-normal reslative" for="2_stop">2+ stop (34)</label>
                </div>
            </div>

            <div class="block mb-5 border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                <h5 class=" text-lg font-semibold mb-4">
                    Baggage
                </h5>

                <div class="filter_radio mb-[14px]">
                    <input type="checkbox" id="luggage">
                    <label class="text-base font-normal reslative" for="luggage">Include luggage</label>
                </div>
            </div>

            <div class="block mb-5 border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                <h5 class=" text-lg font-semibold mb-4">
                    Airlines
                </h5>

                <div class="filter_check mb-[14px]">
                    <input type="checkbox" id="airline_1">
                    <label class="text-base font-normal reslative" for="airline_1">Аэрофлот</label>
                </div>

                <div class="filter_check mb-[14px]">
                    <input type="checkbox" id="airline_2">
                    <label class="text-base font-normal reslative" for="airline_2">Победа</label>
                </div>

                <div class="filter_check mb-[14px]">
                    <input type="checkbox" id="airline_3">
                    <label class="text-base font-normal reslative" for="airline_3">Уральские авиалинии</label>
                </div>
            </div>

            <button type="reset"
                class="w-full cursor-pointer border border-solid border-[#223A60] rounded-lg p-3 transition-all hover:bg-[#223A60] hover:text-white">
                Reset
            </button>
        </form>
    </aside>
</template>

<style lang="scss" scoped></style>