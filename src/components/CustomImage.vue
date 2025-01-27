<template>
     <img
        v-if="!hasError && url"
        :src="url"
        :alt="alt"
        @error="handleError"
      />
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Logo'
    }
  })
  
  const hasError = ref(false)
  
  const handleError = () => {
    hasError.value = true
  }
  </script>
  