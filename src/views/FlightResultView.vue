<script setup>
  import { ref } from 'vue';

  import Filter from '@/components/Flight/Filter.vue';
  import FlightForm from '@/components/Flight/FlightForm.vue';
  import FlightResultItem from '@/components/Flight/FlightResultItem.vue';

  const activeTab = ref('src-1');

  const setActiveTab = (tab) => {
    activeTab.value = tab;
  };

</script>

<template>
  <section class="pt-[150px]">
    <div class="auto_container">
      <div class="wrapper">
        <FlightForm class="form" />
      </div>
    </div>
  </section>

  <section class="relative pt-20 pb-24 bg-[#F9F9F9]">
    <div class="auto_container">
      <div class="wrapper">
        <div class="flex gap-[30px]">
          <Filter />

          <section class="w-[calc(100%-380px)]">
            <div class="tabs bg-[#EDF0F1] mb-8 flex rounded-xl overflow-hidden w-fit">
              <h3 @click="setActiveTab('src-1')" :class="[
                'tab-item relative cursor-pointer text-base font-semibold p-5 rounded-xl min-w-[180px] text-center text-[#223A60] opacity-40 transition-all',
                activeTab === 'src-1' ? 'text-white bg-prime-color opacity-100' : ''
              ]">
                European source
              </h3>

              <h3 @click="setActiveTab('src-2')" :class="[
                'tab-item relative cursor-pointer text-base font-semibold p-5 rounded-xl min-w-[180px] text-center text-[#223A60] opacity-40 transition-all',
                activeTab === 'src-2' ? 'text-white bg-prime-color opacity-100' : ''
              ]">
                CIS source
              </h3>
            </div>

            <FlightResultItem />
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .form {
    background: #FAFCFC;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 24px;
  }
</style>
