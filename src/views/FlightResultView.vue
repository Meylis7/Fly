<script setup>
  import { ref, onMounted, computed, nextTick  } from 'vue'
  import { useRoute } from 'vue-router'
  import { Vue3Lottie } from 'vue3-lottie'
  import LoadAnimationJSON from '@/assets/ticket-loading.json'
  import NotFoundJson from '@/assets/not-found.json'
  import { toast } from 'vue3-toastify'

  import apiService from "@/services/apiService";

  import Filter from '@/components/Flight/Filter.vue';
  import FlightForm from '@/components/Flight/FlightForm.vue';
  import FlightResultItem from '@/components/Flight/FlightResultItem.vue';
  import LoadMore from '@/components/LoadMore.vue'
  import ToTop from '@/components/ToTop.vue'
  import Timer from "@/components/Timer.vue";

  const route = useRoute()
  const displayedFlights = ref([]);
  const flights = ref([])
  const loading = ref(true)
  const error = ref(null)
  const searchData = ref({});

  const itemsPerPage = ref(20);

  const timerRef = ref(null);

  // Filter and sort state
  const activeFilters = ref({
    stops: [],
    baggage: false,
    airlines: []
  });
  const activeSort = ref('');

  // Computed filtered and sorted flights
  const filteredFlights = computed(() => {
    let result = [...flights.value];

    // Apply filters
    if (activeFilters.value.stops.length > 0) {
      result = result.filter(flight => {
        const outwardStops = Number(flight.Outward?.StopsCount ?? 0);
        const returnStops = flight.Return ? Number(flight.Return?.StopsCount ?? 0) : null;
        return activeFilters.value.stops.includes(outwardStops) || activeFilters.value.stops.includes(returnStops);
      });
    }

    if (activeFilters.value.baggage) {
      result = result.filter(flight => {
        const hasOutwardBaggage = flight.Outward?.Segments?.some(segment => segment.Features?.HoldBag) || false;
        const hasReturnBaggage = flight.Return?.Segments?.some(segment => segment.Features?.HoldBag) || false;
        return hasOutwardBaggage || hasReturnBaggage;
      });
    }

    if (activeFilters.value.airlines.length > 0) {
      result = result.filter(flight => {
        const outwardAirlines = flight.Outward?.Segments?.map(segment => segment.Operator?.Name) || [];
        const returnAirlines = flight.Return?.Segments?.map(segment => segment.Operator?.Name) || [];
        const allAirlines = [...outwardAirlines, ...returnAirlines];
        return allAirlines.some(airline => activeFilters.value.airlines.includes(airline));
      });
    }

    // Apply sorting
    if (activeSort.value) {
      result.sort((a, b) => {
        switch (activeSort.value) {
          case 'cheap':
            return parseFloat(a.TotalSum.Amount) - parseFloat(b.TotalSum.Amount);
          case 'fast':
            const aDuration = (a.Outward?.Duration?.Hours || 0) * 60 + (a.Outward?.Duration?.Minutes || 0);
            const bDuration = (b.Outward?.Duration?.Hours || 0) * 60 + (b.Outward?.Duration?.Minutes || 0);
            return aDuration - bDuration;
          case 'time':
            const aTime = a.Outward?.DepartDate?.Time || '';
            const bTime = b.Outward?.DepartDate?.Time || '';
            return aTime.localeCompare(bTime);
          default:
            return 0;
        }
      });
    }

    return result;
  });

  // Handle filter changes
  const handleFilterChange = (filters) => {
    activeFilters.value = filters;
    // Reset displayed flights to first page
    displayedFlights.value = filteredFlights.value.slice(0, itemsPerPage.value);
  };

  // Handle sort changes
  const handleSortChange = (sortType) => {
    activeSort.value = sortType;
    // Reset displayed flights to first page
    displayedFlights.value = filteredFlights.value.slice(0, itemsPerPage.value);
  };

  // Helper to format dates to YYYY-MM-DD
  function formatDate(dateInput) {
    // If the input is NOT already a Date, convert it:
    const dateObj = (dateInput instanceof Date) ? dateInput : new Date(dateInput)

    // If dateObj is invalid, bail out:
    if (isNaN(dateObj.getTime())) {
      console.warn('Invalid date:', dateInput)
      return ''
    }

    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  // Search flights method
  const searchFlights = async (params) => {
    try {
      // Construct dynamic query parameters
      const queryParams = {
        departure_code: params.departureCityCode,
        arrival_code: params.arrivalCityCode,
        departure_date: formatDate(params.departureDate),
        flight_type: params.tripType,
        is_direct_flight: '0',
        adults_count: params.adults || 1,
        class_type: params.flightClass || 'all'
      }

      // Conditionally add children and infants
      if (params.children > 0) {
        queryParams.children_count = params.children
      }
      if (params.infants > 0) {
        queryParams.infants_count = params.infants
      }

      // Add return date only for round trips
      if (params.tripType === 'round-trip' && params.returnDate) {
        queryParams.arrival_date = formatDate(params.returnDate)
      }

      // Convert queryParams to query string
      // const queryString = new URLSearchParams(queryParams).toString();

      const searchResponse = await apiService.searchFlight(queryParams);

      return searchResponse.data
    } catch (error) {
      console.error('Flight search error:', error)
      throw error
    }
  }

  onMounted(async () => {
    const flyError = sessionStorage.getItem('fly_error');
    if (flyError) {
      toast.error(flyError, { autoClose: 3000 });
      sessionStorage.removeItem('fly_error');
    }
    try {
      // Convert route query to search parameters
      const searchParams = {
        departureCityCode: route.query.departureCityCode,
        arrivalCityCode: route.query.arrivalCityCode,
        departureDate: route.query.departureDate,
        returnDate: route.query.returnDate,
        tripType: route.query.tripType || 'one-way',
        adults: Number(route.query.adults) || 1,
        children: Number(route.query.children) || 0,
        infants: Number(route.query.infants) || 0,
        flightClass: route.query.flightClass || 'all'
      }

      // Perform flight search
      const results = await searchFlights(searchParams)

      console.log(results);
      flights.value = results.flights

      const travellersCount = searchParams.adults + searchParams.children + searchParams.infants;
      const routingId = results.routing_id;

      searchData.value = {
        travellers_count: travellersCount,
        routing_id: routingId
      };


      // Initialize displayed flights
      displayedFlights.value = flights.value.slice(0, itemsPerPage.value);

      // Start timer only if there are flights
      if (flights.value && flights.value.length > 0 && timerRef.value) {
        timerRef.value.startTimer();
      }
    } catch (searchError) {
      error.value = searchError
    } finally {
      loading.value = false
    }
  })

  const handleFlightsLoaded = (loadedFlights) => {
    displayedFlights.value = loadedFlights;
  };

  const noFlightsFound = computed(() => {
    return flights.value && flights.value.message === "No result found" || flights.value.length == 0;
  });


  // Tabs ============================
  const activeTab = ref('src-1');
  const setActiveTab = (tab) => {
    activeTab.value = tab;
  };

  // Mobile Filter
  const menuOpen = ref(false);
  const filterRef = ref(null);

  onMounted(() => {
    if (window.innerWidth >= 1280) {
      menuOpen.value = true;
      nextTick(() => {
        if (filterRef.value) {
          filterRef.value.openMenu();
        }
      });
    }
  });

  function getStopsCount(stops) {
    if (stops === null || stops === undefined) return 0;
    return Array.isArray(stops) ? stops.length : 0;
  }
</script>

<template>
  <section class="pt-[150px]">
    <div class="auto_container">
      <div class="wrapper">
        <FlightForm class="form" />
      </div>
    </div>
  </section>

  <Timer ref="timerRef" mode="result" />

  <section class="relative pt-20 pb-24 bg-[#F9F9F9]">
    <div class="auto_container">
      <div class="wrapper">
        <div v-if="loading" class="w-full min-h-[700px]">
          <Vue3Lottie :animationData="LoadAnimationJSON" class="!w-full md:!w-[400px] !h-[400px]" />
        </div>

        <div v-else-if="noFlightsFound && !loading" class="w-full pt-10 flex flex-col items-center min-h-[700px]">
          <h4 class="text-3xl font-semibold text-center">
            {{ $t("notFound") }}
          </h4>

          <Vue3Lottie :animationData="NotFoundJson" class="w-full md:!w-[400px] !h-[400px]" />
        </div>

        <!-- class="pointer-events-none" -->
        <div v-else class="flex flex-col xl:flex-row items-start gap-[30px]">
          <Filter 
            @close="menuOpen = false" 
            ref="filterRef"
            :flights="flights"
            @filter-change="handleFilterChange"
            @sort-change="handleSortChange"
            :class="['fixed 1xl:static top-0 transition-all', { '-left-full': !menuOpen, 'left-0': menuOpen },]" 
          />

          <!-- <div class="tabs bg-[#EDF0F1] mb-8 flex rounded-xl overflow-hidden w-fit">
            <h3 @click="setActiveTab('src-1')" :class="[
              'tab-item relative cursor-pointer text-base font-semibold p-5 rounded-xl min-w-[180px] text-center text-[#223A60] opacity-40 transition-all',
              activeTab === 'src-1' ? 'text-white bg-prime-color !opacity-100' : ''
            ]">
              European source
            </h3>

            <h3 @click="setActiveTab('src-2')" :class="[
              'tab-item relative cursor-pointer text-base font-semibold p-5 rounded-xl min-w-[180px] text-center text-[#223A60] opacity-40 transition-all',
              activeTab === 'src-2' ? 'text-white bg-prime-color !opacity-100' : ''
            ]">
              CIS source
            </h3>
          </div> -->

          <section class="w-full 1xl:w-[calc(100%-380px)] flex flex-col">
            <button @click="menuOpen = !menuOpen"
              class="filter_btn bg-prime-color cursor-pointer w-full md:w-auto text-white flex items-center justify-center px-6 py-3 mx-auto md:ml-auto md:mr-0 rounded-lg mb-7 1xl:hidden">
              <span class="block mr-2">
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.6012 19.5635V12.8668C15.6012 12.1814 15.8419 11.5353 16.2419 11.0106L21.0827 4.83862L2.92188 4.8402L7.76267 11.0122C8.16267 11.5369 8.40332 12.2223 8.40332 12.8683V21.6211C8.40332 22.1048 8.64394 22.5082 9.04396 22.7902C9.44396 23.0329 9.92364 23.0723 10.3643 22.8706L14.8051 20.8127C15.2848 20.5701 15.6051 20.0863 15.6051 19.5616L15.6012 19.5635Z"
                    fill="white" />
                  <path
                    d="M24 1.61348C24 0.726391 23.2797 0 22.4 0H1.6C0.72032 0 0 0.726391 0 1.61348C0 2.50058 0.72032 3.22697 1.6 3.22697H22.4C23.2797 3.22697 24 2.50058 24 1.61348Z"
                    fill="white" />
                </svg>
              </span>

              <p class="text-base">
                {{ $t("filter.filter") }}
              </p>
            </button>

            <!-- <div class="tabs bg-[#EDF0F1] mb-8 flex rounded-xl overflow-hidden w-fit">
              <h3 @click="setActiveTab('src-1')" :class="[
                'tab-item relative cursor-pointer text-base font-semibold p-5 rounded-xl min-w-[180px] text-center text-[#223A60] opacity-40 transition-all',
                activeTab === 'src-1' ? 'text-white bg-prime-color !opacity-100' : ''
              ]">
                European source
              </h3>

              <h3 @click="setActiveTab('src-2')" :class="[
                'tab-item relative cursor-pointer text-base font-semibold p-5 rounded-xl min-w-[180px] text-center text-[#223A60] opacity-40 transition-all',
                activeTab === 'src-2' ? 'text-white bg-prime-color !opacity-100' : ''
              ]">
                CIS source
              </h3>
            </div> -->

            <div>
              <FlightResultItem v-for="(flight, index) in displayedFlights" :key="flight.id" :flight="flight"
                :searchData="searchData" :index="index" class="last:mb-0" />
            </div>

            <LoadMore 
              v-if="displayedFlights.length < filteredFlights.length" 
              :items="filteredFlights" 
              :itemsPerPage="itemsPerPage"
              @loaded="handleFlightsLoaded" 
            />
          </section>

        </div>
      </div>
    </div>
  </section>

  <ToTop />
</template>

<style lang="scss" scoped>
  .form {
    background: #FAFCFC;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 24px;
  }
</style>
