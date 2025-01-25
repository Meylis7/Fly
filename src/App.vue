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
  @import './assets/css/global.scss';

</style>
