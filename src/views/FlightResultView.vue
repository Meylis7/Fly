<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Vue3Lottie } from 'vue3-lottie'
import LoadAnimationJSON from '@/assets/ticket-loading.json'
import NotFoundJson from '@/assets/not-found.json'
import axios from 'axios'


import Filter from '@/components/Flight/Filter.vue';
import FlightForm from '@/components/Flight/FlightForm.vue';
import FlightResultItem from '@/components/Flight/FlightResultItem.vue';
import LoadMore from '@/components/LoadMore.vue'
import ToTop from '@/components/ToTop.vue'

const API_BASE_URL = 'https://www.flyashgabat.com:4443/api/search/tfusion/flights'
const API_TOKEN = '123' // Use environment variables in production

const route = useRoute()
const displayedFlights = ref([]);
const flights = ref([])
const loading = ref(true)
const error = ref(null)
const searchData = ref({});

const itemsPerPage = ref(8);

// Helper to format dates to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return null
  const d = new Date(date)
  return d.toISOString().split('T')[0]
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

    const response = await axios.get(API_BASE_URL, {
      params: queryParams,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    })

    return response.data
  } catch (error) {
    console.error('Flight search error:', error)
    throw error
  }
}

onMounted(async () => {
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
    flights.value = results.data.flights

    const travellersCount = searchParams.adults + searchParams.children + searchParams.infants;
    const routingId = results.data.routing_id;

    searchData.value = {
      travellers_count: travellersCount,
      routing_id: routingId
    };
    

    // Initialize displayed flights
    displayedFlights.value = flights.value.slice(0, itemsPerPage.value);
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

</script>

<template>
  <section class="pt-[150px]">
    <div class="auto_container">
      <div class="wrapper">
        <FlightForm class="form" />
      </div>
    </div>
  </section>

  <section class="relative pt-20 pb-24 bg-[#F9F9F9]">
    <div class="auto_container">
      <div class="wrapper">
        <div v-if="loading" class="w-full min-h-[700px]">
          <Vue3Lottie :animationData="LoadAnimationJSON" class="!w-[400px] !h-[400px]" />
        </div>

        <div v-else-if="noFlightsFound && !loading" class="w-full pt-10 flex flex-col items-center min-h-[700px]">
          <h4 class="text-3xl font-semibold text-center">
            No flights found.
          </h4>

          <Vue3Lottie :animationData="NotFoundJson" class="!w-[400px] !h-[400px]" />

        </div>

        <div v-else class="flex items-start gap-[30px]">
          <Filter />

          <section class="w-[calc(100%-380px)] flex flex-col">
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
              <FlightResultItem
               v-for="(flight, index) in displayedFlights"
                :key="flight.id" 
                :flight="flight"
                :searchData="searchData"
                :index="index"
                class="last:mb-0" />
            </div>

            <LoadMore v-if="displayedFlights.length < flights.length" :items="flights" :itemsPerPage="itemsPerPage"
              @loaded="handleFlightsLoaded" />
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
