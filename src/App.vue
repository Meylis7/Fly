<script setup>
  import { RouterView } from 'vue-router'
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
</script>

<template>
  <Header />
  <RouterView />
  <Footer />

</template>

<style lang="scss">
  @use './assets/css/global.scss';

</style>
