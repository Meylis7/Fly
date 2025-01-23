<script setup>
  import Filter from '@/components/Flight/Filter.vue';
  import FlightForm from '@/components/Flight/FlightForm.vue';

</script>

<template>
  <section class="pt-[150px]">
    <div class="auto_container">
      <div class="wrapper">
        <FlightForm class="form" />
      </div>
    </div>
  </section>

  <section class="relative pt-20 pb-24 bg-[#w]">
    <div class="auto_container">
      <div class="wrapper">
        <div class="flex gap-[30px]">
          <Filter />

          <section class="w-[calc(100%-380px)]">
            <div class="tabs bg-[#EDF0F1] mb-8 flex rounded-xl overflow-hidden w-fit">
              <h3 class="text-base font-semibold p-5 rounded-xl min-w-[180px] text-center text-white bg-prime-color">
                European source
              </h3>

              <h3 class="text-base font-semibold p-5 rounded-xl min-w-[180px] text-center text-[#223A60] opacity-40">
                CIS source
              </h3>
            </div>

            <div class="card flex p-5 rounded-lg bg-white border border-solid border-[#223a604d]">
              <div class="block">
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <img class=" h-12 object-contain block mr-3" src="@/assets/images/airline-1.png" alt="airline-img">
                    <h4 class=" text-lg font-normal">
                      ABC Airline
                    </h4>
                  </div>

                  <p class="text-base font-normal">Travel Class: Economy</p>
                </div>

                <div class="block">
                  <h6 class="text-base font-normal mb-3">
                    Sun, 29 Jan 2023
                  </h6>

                  <div class="flex items-center">
                    <div class="block">
                      <p class="text-lg font-normal mb-1">14.50</p>
                      <h6 class="text-lg font-normal">Moi Intl, Mombasa Kenya</h6>
                    </div>

                    <div class="block">
                      <p class="text-lg font-normal">
                        9hr 50min
                      </p>

                      <span>
                        
                      </span>
                    </div>

                    <div class="block">
                      <p class="text-lg font-normal mb-1">14.50</p>
                      <h6 class="text-lg font-normal">JFK Terminal, Nairobi, Kenya</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="block">

              </div>
            </div>
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

  .filter_check {
    input {
      display: none;

      &:checked~label {
        &::before {
          background: #223A60;
        }

        &::after {
          opacity: 1;
        }
      }
    }

    label {
      display: block;
      position: relative;
      cursor: pointer;

      &::before {
        content: '';
        transition: all .1s linear;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        background: #EDF0F1;
        border: 1px solid #C2C2C2;
        width: 20px;
        height: 20px;
        border-radius: 3px;
      }

      &::after {
        content: '';
        transition: all .3s linear;
        opacity: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 3px;
        width: 14px;
        height: 14px;
        background: url("@/assets/images/svg/tick.svg") no-repeat center;

      }
    }
  }

  .filter_radio {
    input {
      display: none;

      &:checked~label {
        &::before {
          background: #223A60;
        }

        &::after {
          background: #fff;
          right: 0;
        }
      }
    }

    label {
      display: block;
      position: relative;
      cursor: pointer;

      &::before {
        content: '';
        transition: all .1s linear;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        background: #EDF0F1;
        border: 1px solid #C2C2C2;
        width: 42px;
        height: 20px;
        border-radius: 12px;
      }

      &::after {
        content: '';
        transition: all .4s linear;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 23px;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        background: #223A60;
      }
    }
  }
</style>
