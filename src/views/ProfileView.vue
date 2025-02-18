<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import AccountTab from '@/components/Profile/AccountTab.vue';
import StaysTab from '@/components/Profile/StaysTab.vue';
import FlightsTab from '@/components/Profile/FlightsTab.vue';

const router = useRouter();
const userStore = useUserStore();
const activeTab = ref('flights');

const setActiveTab = (tab) => {
    if (tab === 'logout') {
        // Logout via Pinia store
        userStore.logout();

        // Redirect to home
        router.push({ name: 'home', force: true });
    } else {
        activeTab.value = tab;
    }
};
</script>

<template>
    <section class="profile mt-[150px] pt-[50px] pb-[100px] bg-[#F9F9F9]">
        <div class="auto_container">
            <div class="wrapper">
                <div class="pofile_header">
                    <div class="w-full">
                        <img src="@/assets/images/profile-bg.png" class="w-full" alt="profile-bg">
                    </div>

                    <div class="flex flex-col items-center relative -mt-32">
                        <img src="@/assets/images/user.png" class="w-40 object-contain" alt="user-img">

                        <h4 class="text-2xl font-semibold mb-2">
                            {{ userStore.user?.firstname }} {{ userStore.user?.lastname }}
                        </h4>

                        <p class="text-base font-normal">
                            {{ userStore.user?.email }}
                        </p>

                    </div>

                    <div class="flex items-start justify-between mt-8">
                        <aside
                            class="w-[350px] py-[30px] px-5 rounded-xl bg-white border border-solid border-[#223a604d] shadow-[0px_4px_16px_rgba(17, 34, 17, 0.05)]">
                            <h5 @click="setActiveTab('account')" :class="[
                                'tab-item relative flex items-center cursor-pointer p-5 pl-0 rounded-[10px] text-[#112211] text-base font-semibold transition-all',
                                activeTab === 'account' ? 'bg-[#F9F9F9] pl-5' : ''
                            ]">
                                <span v-if="activeTab === 'account'"
                                    class="block absolute top-0 left-0 w-[3px] h-full bg-[#223A60] rounded-xl"></span>
                                Account
                            </h5>

                            <h5 @click="setActiveTab('flights')" :class="[
                                'tab-item relative flex items-center cursor-pointer p-5 pl-0 rounded-[10px] text-[#112211] text-base font-semibold transition-all',
                                activeTab === 'flights' ? 'bg-[#F9F9F9] pl-5' : ''
                            ]">
                                <span v-if="activeTab === 'flights'"
                                    class="block absolute top-0 left-0 w-[3px] h-full bg-[#223A60] rounded-xl"></span>
                                Flights
                            </h5>

                            <h5 @click="setActiveTab('stays')" :class="[
                                'tab-item relative flex items-center cursor-pointer p-5 pl-0 rounded-[10px] text-[#112211] text-base font-semibold transition-all',
                                activeTab === 'stays' ? 'bg-[#F9F9F9] pl-5' : ''
                            ]">
                                <span v-if="activeTab === 'stays'"
                                    class="block absolute top-0 left-0 w-[3px] h-full bg-[#223A60] rounded-xl"></span>
                                Stays
                            </h5>
                            <h5 @click="setActiveTab('logout')" :class="[
                                'tab-item relative flex items-center text-red-700 cursor-pointer p-5 pl-0 rounded-[10px] text-[#112211] text-base font-semibold transition-all',
                                activeTab === 'logout' ? 'bg-[#F9F9F9] pl-5' : ''
                            ]">
                                <span v-if="activeTab === 'logout'"
                                    class="block absolute top-0 left-0 w-[3px] h-full bg-[#223A60] rounded-xl"></span>
                                Logout
                            </h5>
                        </aside>

                        <div
                            class="w-[calc(100%-370px)] py-[30px] px-5 rounded-xl bg-white border border-solid border-[#223a604d] shadow-[0px_4px_16px_rgba(17, 34, 17, 0.05)]">
                            <AccountTab v-if="activeTab === 'account'" />
                            <FlightsTab v-if="activeTab === 'flights'" />
                            <StaysTab v-if="activeTab === 'stays'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>