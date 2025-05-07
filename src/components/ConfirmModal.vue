<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h3 class="modal-title">{{ title }}</h3>
      <p class="modal-message">{{ message }}</p>
      <div class="modal-actions">
        <button class="modal-btn cancel" @click="$emit('cancel')">{{ cancelText }}</button>
        <button class="modal-btn confirm" @click="$emit('confirm')">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  visible: Boolean,
  title: String,
  message: String,
  cancelText: String,
  confirmText: String,
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 32px 24px 24px 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  min-width: 320px;
  max-width: 90vw;
  text-align: center;
}
.modal-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
}
.modal-message {
  font-size: 1rem;
  margin-bottom: 24px;
}
.modal-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}
.modal-btn {
  min-width: 100px;
  padding: 10px 0;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.modal-btn.cancel {
  background: #e5e6ea;
  color: #444;
}
.modal-btn.confirm {
  background: #373e7b;
  color: #fff;
}
.modal-btn.cancel:hover {
  background: #d1d2d6;
}
.modal-btn.confirm:hover {
  background: #23285a;
}
</style> 