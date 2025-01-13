<script setup>
    import { ref } from 'vue';
    import FlightForm from './Flight/FlightForm.vue';
    import HotelForm from './Hotel/HotelForm.vue';

    import clouds from '@/assets/images/clouds.png'

    const activeTab = ref('flights'); // Default active tab is 'flights'

    const setActiveTab = (tab) => {
        activeTab.value = tab; // Change active tab
    };

</script>

<template>
    <section class="hero h-screen w-full bg-[url('./src/assets/images/hero-bg.png')] bg-no-repeat bg-cover relative">
        <div class="auto_container">
            <div class="wrapper pt-[160px]">
                <div class="max-w-[1200px] m-auto">
                    <h1 class="mb-6 text-[38px] leading-snug font-bold text-prime-color text-center">
                        Start your adventure with Jahankeshde <br>
                        where your perfect trip begins.
                    </h1>
                    <!-- <p class="text-lg font-medium opacity-60 text-center">
                        Experience the ease of booking your dream vacations and creating unforgettable memories with
                        Jahankeshde – your ultimate partner for seamless travel planning.
                    </p> -->
                </div>

                <div class="tabs mt-24 flex items-center bg-white rounded-t-3xl w-fit px-6 py-5 gap-5">
                    <button @click="setActiveTab('flights')" :class="[
                        'tab-item flex items-center py-3 cursor-pointer px-8 gap-4 rounded-[10px]',
                        activeTab === 'flights' ? 'bg-prime-color text-white' : ''
                    ]">
                        <span>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_69_11075)">
                                    <path
                                        d="M11.6209 9.33333L8.91544 0H12.1319C12.7608 -2.06927e-06 13.3781 0.169451 13.9189 0.49054C14.4596 0.811629 14.9039 1.27249 15.2049 1.82467L18.9791 9.33333H11.6209ZM24.4986 11.6667H5.81677L2.7986 8.64617C2.52127 8.35391 2.1457 8.17447 1.74408 8.14233C1.34246 8.1102 0.943136 8.22763 0.622858 8.47208C0.302579 8.71652 0.0839495 9.07071 0.00899011 9.46658C-0.0659693 9.86245 0.00803174 10.2721 0.21677 10.6167L3.97344 17.5H12.3128L8.18744 28H11.7609C12.3779 28.0025 12.9844 27.8402 13.5176 27.5299C14.0509 27.2195 14.4916 26.7725 14.7943 26.2348L20.1458 17.5H27.9986V15.1667C27.9986 14.2384 27.6299 13.3482 26.9735 12.6918C26.3171 12.0354 25.4269 11.6667 24.4986 11.6667Z"
                                         :fill="activeTab === 'flights' ? 'white' : '#223A60'" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_69_11075">
                                        <rect width="28" height="28"  :fill="activeTab === 'flights' ? 'white' : '#223A60'" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>

                        <p class="text-base font-bold">
                            Flights
                        </p>
                    </button>

                    <span class="bg-[#D4D7D9] w-[3px] h-[30px] rounded"></span>

                    <button @click="setActiveTab('hotels')" :class="[
                        'tab-item flex items-center py-3 cursor-pointer px-8 gap-4 rounded-[10px]',
                        activeTab === 'hotels' ? 'bg-prime-color text-white' : ''
                    ]">
                        <span>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_69_11080)">
                                    <path
                                        d="M10.5 11.0832C10.5 11.6601 10.3289 12.224 10.0085 12.7037C9.68797 13.1833 9.23244 13.5571 8.69949 13.7779C8.16654 13.9987 7.5801 14.0564 7.01432 13.9439C6.44854 13.8313 5.92884 13.5535 5.52094 13.1456C5.11304 12.7377 4.83525 12.218 4.72271 11.6523C4.61017 11.0865 4.66793 10.5 4.88868 9.96709C5.10944 9.43414 5.48328 8.97862 5.96292 8.65813C6.44256 8.33764 7.00647 8.16658 7.58333 8.16658C8.35688 8.16658 9.09875 8.47387 9.64573 9.02085C10.1927 9.56784 10.5 10.3097 10.5 11.0832ZM28 13.9999V11.6666C28 10.4289 27.5083 9.24192 26.6332 8.36675C25.758 7.49158 24.571 6.99992 23.3333 6.99992H17.5C16.2623 6.99992 15.0753 7.49158 14.2002 8.36675C13.325 9.24192 12.8333 10.4289 12.8333 11.6666V13.9999H28ZM2.33333 16.3332V3.49992C2.33333 3.1905 2.21042 2.89375 1.99162 2.67496C1.77283 2.45617 1.47609 2.33325 1.16667 2.33325C0.857247 2.33325 0.560501 2.45617 0.341709 2.67496C0.122916 2.89375 0 3.1905 0 3.49992L0 24.4999C0 24.8093 0.122916 25.1061 0.341709 25.3249C0.560501 25.5437 0.857247 25.6666 1.16667 25.6666C1.47609 25.6666 1.77283 25.5437 1.99162 25.3249C2.21042 25.1061 2.33333 24.8093 2.33333 24.4999V22.1666H25.6667V24.4999C25.6667 24.8093 25.7896 25.1061 26.0084 25.3249C26.2272 25.5437 26.5239 25.6666 26.8333 25.6666C27.1428 25.6666 27.4395 25.5437 27.6583 25.3249C27.8771 25.1061 28 24.8093 28 24.4999V16.3332H2.33333Z"
                                        :fill="activeTab === 'hotels' ? 'white' : '#223A60'" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_69_11080">
                                        <rect width="28" height="28" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>

                        <p class="text-base font-bold">
                            Hotels
                        </p>
                    </button>
                </div>

                <FlightForm v-if="activeTab === 'flights'" />
                <HotelForm v-if="activeTab === 'hotels'" />
            </div>
        </div>

        <div class="clouds w-full absolute bottom-[-120px] left-0 pointer-events-none user-select-none">
            <img class="w-full" :src="clouds" alt="clouds">
        </div>
    </section>

</template>
