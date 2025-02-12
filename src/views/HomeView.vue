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
            {{ $t("tour.title") }}
          </h2>
          <p class="text-base">
            {{ $t("tour.text") }}
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
            {{ $t("visa.title") }}
          </h2>
          <p class="text-base">
            {{ $t("visa.text") }}
          </p>

          <Visa :Btn="true" />
        </div>
      </div>
    </section>
  </main>
</template>
