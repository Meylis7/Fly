<script setup>
    import { RouterLink } from 'vue-router';

</script>

<template>
    <div>
        <img class="w-full h-[320px] object-cover rounded-[20px]" src="../assets/images/visa.png" alt="visa-img">

        <div
            class="relative -mt-10 ml-auto p-5 flex items-center justify-between shadow-lg rounded-tl-2xl rounded-br-2xl rounded-bl-2xl rounded-tr-0 bg-white w-[calc(100%-50px)]">
            <div>
                <h4>
                    Таиланд
                </h4>
                <p>
                    80 $
                </p>
            </div>

            <RouterLink class="cursor-pointer">
                <p class="text-white text-base font-semibold flex items-center p-4 rounded-[20px] bg-[#223A60]">
                    Book

                    <span class="block ml-3">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.287 7.2546V16.0934C18.287 16.4249 18.1489 16.7287 17.9279 16.9497C17.6793 17.1983 17.3755 17.3364 17.044 17.3364C16.3535 17.364 15.7734 16.784 15.8011 16.0934L15.7734 10.2653L7.32129 18.7175C6.82411 19.2147 6.05071 19.2147 5.55353 18.7175C5.08396 18.2479 5.05634 17.4469 5.55353 16.9497L14.0057 8.49757H8.20518C7.51464 8.52519 6.9346 7.94514 6.96222 7.2546C6.9346 6.56407 7.51464 5.98402 8.20518 6.01164H17.044C17.7345 5.98402 18.3146 6.56407 18.287 7.2546Z"
                                fill="white" />
                        </svg>
                    </span>
                </p>
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss"></style>