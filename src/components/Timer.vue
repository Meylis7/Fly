<script setup>
import { ref, onMounted, onUnmounted, watch, defineExpose } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const props = defineProps({
  mode: {
    type: String,
    default: 'result', // 'result' or 'booking'
  },
});

const router = useRouter();
const route = useRoute();
const modalVisible = ref(false);
const TIMER_DURATION = 10 * 60 * 1000; // 10 minutes
let interval;

function clearTimer() {
  clearInterval(interval);
  interval = null;
  localStorage.removeItem("ticketSearchStartTime");
}

const startTimer = () => {
  localStorage.setItem("ticketSearchStartTime", Date.now().toString());

  console.log('timer started')

  if (interval) clearInterval(interval);
  interval = setInterval(checkTimer, 1000);
};

defineExpose({ startTimer });

const checkTimer = () => {
  const startTime = localStorage.getItem("ticketSearchStartTime");
  if (!startTime) return;
  const elapsed = Date.now() - parseInt(startTime, 10);
  if (elapsed >= TIMER_DURATION) {
    modalVisible.value = true;
    clearTimer();
  }
};

onMounted(() => {
  // Only auto-start in result mode for backward compatibility
  if (props.mode === 'result') {
    // Do not auto-start, parent should call startTimer
  } else if (props.mode === 'booking') {
    // In booking, timer should already be running if user came from results
    if (localStorage.getItem("ticketSearchStartTime")) {
      if (interval) clearInterval(interval);
      interval = setInterval(checkTimer, 1000);
    }
  }
});

onUnmounted(() => {
  clearInterval(interval);
});

const handleTimeout = (event) => {
  event?.preventDefault?.();
  modalVisible.value = false;
  clearTimer();
  if (props.mode === 'booking') {
    // Go back to results
    router.go(-1);
  } else {
    // Refresh search results
    location.reload();
  }
};
</script>

<template>
  <div>
    <div v-if="modalVisible" class="modal-overlay">
      <div class="modal">
        <p v-if="props.mode === 'result'">
          {{ $t('timer.resultTitle') }}
        </p>
        <p v-else>
          {{ $t('timer.bookingTitle') }}
        </p>
        <button @click="handleTimeout">
          {{ props.mode === 'result' ? $t('timer.resultBtn') : $t('timer.bookingBtn') }}
        </button>
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
    z-index: 200;
  }
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  button {
    background: #373e7b;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 600;
    margin-top: 16px;
  }
</style>
