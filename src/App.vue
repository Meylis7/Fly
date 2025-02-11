<script setup>
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
const route = useRoute();
</script>

<template>
  <!-- Show Header only if not on signup or signin routes -->
  <Header v-if="!['/signup', '/signin'].includes(route.path)" />

  <!-- Main content -->
  <RouterView />

  <!-- Show Footer only if not on signup or signin routes -->
  <Footer v-if="!['/signup', '/signin'].includes(route.path)" />
</template>

<style lang="scss">
@use './assets/css/global.scss';
</style>
