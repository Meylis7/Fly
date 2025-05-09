<script setup>
    import { ref, defineEmits, defineProps, computed } from 'vue';

    const props = defineProps({
        flights: {
            type: Array,
            required: true
        }
    });

    const emit = defineEmits(['close', 'filter-change', 'sort-change']);

    const menuRef = ref(null);
    const selectedSort = ref('');
    const selectedStops = ref([]);
    const selectedBaggage = ref(false);
    const selectedAirlines = ref([]);

    // Only keep the original three sort options
    const sortOptions = [
        { key: 'cheap', label: 'filter.sort.val_1' },
        { key: 'fast', label: 'filter.sort.val_2' },
        { key: 'time', label: 'filter.sort.val_3' }
    ];

    // Helper to get stops count
    function getStopsCount(stops) {
        if (!stops) return 0;
        return Array.isArray(stops) ? stops.length : 0;
    }

    // Compute available airlines from flights
    const availableAirlines = computed(() => {
        const airlines = new Set();
        props.flights.forEach(flight => {
            // Check outward segments
            if (flight.Outward?.Segments) {
                flight.Outward.Segments.forEach(segment => {
                    if (segment.Operator?.Name) {
                        airlines.add(segment.Operator.Name);
                    }
                });
            }
            // Check return segments
            if (flight.Return?.Segments) {
                flight.Return.Segments.forEach(segment => {
                    if (segment.Operator?.Name) {
                        airlines.add(segment.Operator.Name);
                    }
                });
            }
        });
        return Array.from(airlines);
    });

    // Compute available stops options
    const availableStops = computed(() => {
        const stops = new Set();
        props.flights.forEach(flight => {
            stops.add(Number(flight.Outward?.StopsCount ?? 0));
            if (flight.Return) stops.add(Number(flight.Return?.StopsCount ?? 0));
        });
        return Array.from(stops).sort((a, b) => a - b);
    });

    // Compute if any flight has baggage
    const hasBaggage = computed(() => {
        return props.flights.some(flight => {
            // Check outward segments
            if (flight.Outward?.Segments) {
                if (flight.Outward.Segments.some(segment => segment.Features?.HoldBag)) {
                    return true;
                }
            }
            // Check return segments
            if (flight.Return?.Segments) {
                if (flight.Return.Segments.some(segment => segment.Features?.HoldBag)) {
                    return true;
                }
            }
            return false;
        });
    });

    const closeMenu = () => {
        emit('close');
    };

    const handleSortChange = (sortType) => {
        if (selectedSort.value === sortType) {
            selectedSort.value = '';
            emit('sort-change', '');
        } else {
            selectedSort.value = sortType;
            emit('sort-change', sortType);
        }
    };

    const handleStopsChange = (stops) => {
        stops = Number(stops); // Ensure it's a number
        const index = selectedStops.value.indexOf(stops);
        if (index === -1) {
            selectedStops.value.push(stops);
        } else {
            selectedStops.value.splice(index, 1);
        }
        emit('filter-change', {
            stops: selectedStops.value,
            baggage: selectedBaggage.value,
            airlines: selectedAirlines.value
        });
    };

    const handleBaggageChange = (hasBaggage) => {
        selectedBaggage.value = hasBaggage;
        emit('filter-change', {
            stops: selectedStops.value,
            baggage: hasBaggage,
            airlines: selectedAirlines.value
        });
    };

    const handleAirlinesChange = (airline) => {
        const index = selectedAirlines.value.indexOf(airline);
        if (index === -1) {
            selectedAirlines.value.push(airline);
        } else {
            selectedAirlines.value.splice(index, 1);
        }
        emit('filter-change', {
            stops: selectedStops.value,
            baggage: selectedBaggage.value,
            airlines: selectedAirlines.value
        });
    };

    // Add resetFilters function
    const resetFilters = () => {
        selectedSort.value = '';
        selectedStops.value = [];
        selectedBaggage.value = false;
        selectedAirlines.value = [];
        emit('filter-change', {
            stops: [],
            baggage: false,
            airlines: []
        });
        emit('sort-change', '');
    };
</script>

<template>
    <aside ref="menuRef" @click.self="closeMenu"
        class="aside w-full 1xl:w-[350px] h-full bg-[rgba(0,0,0,.5)] 1xl:!bg-transparent">
        <div
            class="p-5 max-w-[calc(100%-100px)] md:max-w-[550px] 1xl:w-full h-full overflow-auto bg-white rounded-xl border border-solid border-[#223a604d] shadow-[0px_4px_5px_rgba(0, 0, 0, 0.15)]">
            <h3 class="text-lg md:text-xl font-semibold mb-10">
                {{ $t("filter.title") }}
            </h3>
            <div class="mb-4 text-base font-semibold text-[#223A60]">
                {{ $t('filter.total') }}: {{ flights.length }}
            </div>
            <form class="relative filter-form">
                <div class="block mb-5 border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                    <div v-for="sort in sortOptions" :key="sort.key" class="filter_check mb-[14px]">
                        <input type="checkbox" :id="sort.key" :checked="selectedSort === sort.key"
                            @change="handleSortChange(sort.key)">
                        <label class="text-sm sm:text-base font-normal relative block" :for="sort.key">
                            {{ $t(sort.label) }}
                        </label>
                    </div>
                </div>

                <div class="block mb-5 border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                    <h5 class="text-base md:text-lg font-semibold mb-4">
                        {{ $t("filter.stops.title") }}
                    </h5>

                    <div v-for="stop in availableStops" :key="stop" class="filter_check mb-[14px]">
                        <input type="checkbox" :id="`stop_${stop}`" :checked="selectedStops.includes(stop)"
                            @change="handleStopsChange(stop)">
                        <label class="text-sm sm:text-base font-normal relative block" :for="`stop_${stop}`">
                            {{ stop === 0 ? $t("filter.stops.val_1") : stop === 1 ? $t("filter.stops.val_2") : $t("filter.stops.val_3") }}
                            ({{ flights.filter(f => {
                                const outwardStops = Number(f.Outward?.StopsCount ?? 0);
                                const returnStops = f.Return ? Number(f.Return?.StopsCount ?? 0) : null;
                                return outwardStops === stop || returnStops === stop;
                            }).length }})
                        </label>
                    </div>
                </div>

                <div class="block mb-5 border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                    <h5 class="text-base md:text-lg font-semibold mb-4">
                        {{ $t("filter.baggage.title") }}
                    </h5>

                    <div class="filter_radio mb-[14px]" v-if="hasBaggage">
                        <input type="checkbox" id="luggage" :checked="selectedBaggage"
                            @change="handleBaggageChange(!selectedBaggage)">
                        <label class="text-sm sm:text-base font-normal relative block" for="luggage">
                            {{ $t("filter.baggage.val_1") }}
                            ({{ flights.filter(f => {
                                const hasOutwardBaggage = f.Outward?.Segments?.some(segment => segment.Features?.HoldBag) || false;
                                const hasReturnBaggage = f.Return?.Segments?.some(segment => segment.Features?.HoldBag) || false;
                                return hasOutwardBaggage || hasReturnBaggage;
                            }).length }})
                        </label>
                    </div>
                </div>

                <div class="block mb-5 border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                    <h5 class="text-base md:text-lg font-semibold mb-4">
                        {{ $t("filter.airlines.title") }}
                    </h5>

                    <div v-for="airline in availableAirlines" :key="airline" class="filter_check mb-[14px]">
                        <input type="checkbox" :id="`airline_${airline}`" :checked="selectedAirlines.includes(airline)"
                            @change="handleAirlinesChange(airline)">
                        <label class="text-sm sm:text-base font-normal relative block" :for="`airline_${airline}`">
                            {{ airline }}
                            ({{ flights.filter(f => {
                                const outwardAirlines = f.Outward?.Segments?.map(segment => segment.Operator?.Name) || [];
                                const returnAirlines = f.Return?.Segments?.map(segment => segment.Operator?.Name) || [];
                                return [...outwardAirlines, ...returnAirlines].includes(airline);
                            }).length }})
                        </label>
                    </div>
                </div>
                <!-- Reset button at the end of the form -->
                <div class="mt-6">
                    <button type="button" @click="resetFilters" class="w-full border  bg-[#223A60] rounded-lg p-3 text-sm font-semibold text-white hover:bg-white hover:text-[#223A60] transition-all">
                        {{ $t('filter.resetAll') }}
                    </button>
                </div>
            </form>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
    .filter_check {
        input {
            display: none;

            &:checked~label {
                &::before {
                    background: #223A60;
                }

                &::after {
                    opacity: 1;
                }
            }
        }

        label {
            display: block;
            position: relative;
            cursor: pointer;

            &::before {
                content: '';
                transition: all .1s linear;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 0;
                background: #EDF0F1;
                border: 1px solid #C2C2C2;
                width: 20px;
                height: 20px;
                border-radius: 3px;
            }

            &::after {
                content: '';
                transition: all .3s linear;
                opacity: 0;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 3px;
                width: 14px;
                height: 14px;
                background: url("@/assets/images/svg/tick.svg") no-repeat center;
            }
        }
    }

    .filter_radio {
        input {
            display: none;

            &:checked~label {
                &::before {
                    background: #223A60;
                }

                &::after {
                    background: #fff;
                    right: 0;
                }
            }
        }

        label {
            display: block;
            position: relative;
            cursor: pointer;

            &::before {
                content: '';
                transition: all .1s linear;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 0;
                background: #EDF0F1;
                border: 1px solid #C2C2C2;
                width: 42px;
                height: 20px;
                border-radius: 12px;
            }

            &::after {
                content: '';
                transition: all .4s linear;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 23px;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                background: #223A60;
            }
        }
    }
</style>