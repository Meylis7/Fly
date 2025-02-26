<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const modalVisible = ref(false);
const TIMER_DURATION = 20 * 60 * 1000; // 10 seconds for testing 10 seconds for testing (Change to 20 * 60 * 1000 for 20 min)

// Function to check if session expired
const checkTimer = () => {
  const startTime = localStorage.getItem("ticketSearchStartTime");
  if (!startTime) return;

  const elapsed = Date.now() - parseInt(startTime, 10);
  if (elapsed >= TIMER_DURATION) {
    modalVisible.value = true; // Show the modal
  }
};

// Function to reset expired session when the page loads
const resetIfExpired = () => {
  const startTime = localStorage.getItem("ticketSearchStartTime");
  if (!startTime) return;

  const elapsed = Date.now() - parseInt(startTime, 10);
  if (elapsed >= TIMER_DURATION) {
    // Reset session and make sure the modal is not visible
    localStorage.removeItem("ticketSearchStartTime");
    modalVisible.value = false;
  }
};

// Function to start the timer if not already started
const startTimer = () => {
  if (!localStorage.getItem("ticketSearchStartTime")) {
    localStorage.setItem("ticketSearchStartTime", Date.now().toString());
  }
};

// Interval to check time every second (for testing)
let interval;
onMounted(() => {
  resetIfExpired(); // First, reset the session if already expired
  startTimer(); // Start the timer if it's not running
  checkTimer(); // Check if the session is already expired
  interval = setInterval(checkTimer, 1000); // Run check every second
});

onUnmounted(() => {
  clearInterval(interval);
});

// Function to handle timeout action
const handleTimeout = (event) => {
  event.preventDefault();
  localStorage.removeItem("ticketSearchStartTime"); // Reset session
  modalVisible.value = false;

  if (route.path === "/flight/book") {
    router.go(-1); // If on FlightBookingView.vue, go back one page
  } else {
    location.reload(); // If on FlightResultView.vue, reload the page
  }
};
</script>

<template>
  <div>
    <!-- Modal Window (Hidden Until Time is Up) -->
    <div v-if="modalVisible" class="modal-overlay">
      <div class="modal">
        <p>Your session has expired. Please go back and refresh.</p>
        <button @click="handleTimeout">OK</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200; /* Ensures it's above everything */
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
button {
  background: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
