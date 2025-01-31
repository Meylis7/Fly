<script setup>
  import Hero from '@/components/Hero.vue';
  import Tour from '@/components/Tour.vue';
  import Visa from '@/components/Visa.vue';

</script>

<template>
  <main>
    <Hero />

    <!-- <Tour /> -->
    <section class="tours mt-60">
      <div class="auto_container">
        <div class="wrapper relative">
          <h2 class=" text-[32px] text-prime-color font-semibold mb-4">
            Explore the Tours
          </h2>
          <p class="text-base">
            Planning a getaway or heading home? Our travel tools make every journey seamless.
          </p>

          <Tour :Btn="true" />
        </div>
      </div>
    </section>

    <!-- <Visa /> -->
    <section class="visa mt-[60px] mb-[100px]">
      <div class="auto_container">
        <div class="wrapper relative">
          <h2 class=" text-[32px] text-prime-color font-semibold mb-4">
            Unlock the World with Your Visa
          </h2>
          <p class="text-base">
            Wherever you're headed, our tools ensure a smooth and stress-free journey.
          </p>

          <Visa :Btn="true" />
        </div>
      </div>
    </section>
  </main>
</template>
