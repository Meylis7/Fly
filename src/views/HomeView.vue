<script setup>
  import Hero from '@/components/Hero.vue';
  import Tour from '@/components/Tour.vue';
  import Visa from '@/components/Visa.vue';

</script>

<template>
  <main>
    <Hero />

    <section class="banner mt-60 ">
      <div class="auto_container">
        <div class="wrapper">
          <div class="block bg-[url('@/assets/images/banner.png')] bg-no-repeat bg-cover py-16 rounded-[20px]">
            <h4 class="text-3xl font-extrabold text-white text-center max-w-[950px] mx-auto mb-5">
              {{ $t("banner.title") }}
            </h4>
            <div class="flex items-center justify-center gap-[10px]">
              <div class="flex items-center">
                <span class="block mr-2">
                  <img src="@/assets/images/whatsapp.png" alt="media-icon">
                </span>
                <p class="text-xl font-extrabold text-white bg-[#43C653] py-4 px-5 rounded-lg">
                  +993 65 123456
                </p>
              </div>

              <div class="flex items-center">
                <span class="block mr-2">
                  <img src="@/assets/images/telegram.png" alt="media-icon">
                </span>
                <p class="text-xl font-extrabold text-white bg-[#27A7E7] py-4 px-5 rounded-lg">
                  +993 65 123456
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <Tour /> -->
    <section class="tours mt-[60px]">
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
