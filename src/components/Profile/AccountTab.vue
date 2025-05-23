<script setup>
import { reactive, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import apiService from '@/services/apiService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const userStore = useUserStore();

const state = reactive({
    user: '',
    userInfo: {
        firstname: '',
        lastname: '',
        company: '',
    }
})


onMounted(async () => {
    userStore.loadUser();  // Ensure user data is loaded first

    // Object.assign(state.userInfo.firstname, userStore.user.firstname); // Reactively update

    state.userInfo = userStore.user;
});

const updateUser = async () => {

    try {
        const userData = {
            firstname: state.userInfo.firstname,
            lastname: state.userInfo.lastname,
            company: state.userInfo.company
        };

        const response = await apiService.updateUser(userData);

        // ✅ Use Pinia to set user data
        userStore.updateUser(response.data);

        // Show success message
        toast.success("Update successful!", { autoClose: 3000 });

    } catch (error) {
        const errorMessage = error.message || "Registration failed";
        toast.error(errorMessage, { autoClose: 3000 });
    }
};

</script>

<template>
    <form @submit.prevent="updateUser" class="flex flex-wrap gap-8">
        <div class="block w-full md:w-[calc(50%-16px)] ">
            <label class="text-base font-normal block mb-3">
                {{ $t("profile.accaunt.firstName.label") }}
            </label>
            <input v-model="state.userInfo.firstname" type="text"
                class="bg-[#F9F9F9] py-[14px] px-5 w-full rounded-lg cursor-auto" placeholder="Aman">
        </div>

        <div class="block w-full md:w-[calc(50%-16px)] ">
            <label class="text-base font-normal block mb-3">
                {{ $t("profile.accaunt.lastname.label") }}
            </label>
            <input v-model="state.userInfo.lastname" type="text"
                class="bg-[#F9F9F9] py-[14px] px-5 w-full rounded-lg cursor-auto" placeholder="Amanov">
        </div>

        <div class="block w-full md:w-[calc(50%-16px)] ">
            <label class="text-base font-normal block mb-3">
                {{ $t("profile.accaunt.company.label") }}
            </label>
            <input v-model="state.userInfo.company" type="text"
                class="bg-[#F9F9F9] py-[14px] px-5 w-full rounded-lg cursor-auto" placeholder="Asuda HJ">
        </div>

        <div class="w-full flex justify-end">
            <button type="submit"
                class="min-w-40 w-full md:w-auto cursor-pointer flex items-center justify-center bg-prime-color text-white py-4 rounded-lg text-sm font-medium">
                <span class="block mr-[10px]">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.8559 2.17988L14.8558 2.17985C14.8123 2.13202 14.7595 2.09351 14.7007 2.06665C14.6419 2.03979 14.5782 2.02514 14.5135 2.02358C14.4489 2.02202 14.3846 2.03358 14.3245 2.05757C14.2645 2.08157 14.2099 2.11749 14.1641 2.16316L14.1641 2.16318L13.7776 2.54783C13.7351 2.59031 13.7112 2.64792 13.7112 2.70798C13.7112 2.76803 13.7351 2.82563 13.7775 2.86812C13.7775 2.86812 13.7775 2.86812 13.7776 2.86813L14.1319 3.22186L14.132 3.22191C14.153 3.24306 14.178 3.25985 14.2056 3.2713C14.2331 3.28275 14.2627 3.28864 14.2925 3.28864C14.3224 3.28864 14.3519 3.28275 14.3795 3.2713C14.407 3.25985 14.4321 3.24306 14.4531 3.22191L14.4532 3.22183L14.83 2.84686L14.8301 2.84683M14.8559 2.17988L14.8732 2.16407C15.055 2.36313 15.0372 2.67313 14.8466 2.86345L14.8301 2.84683M14.8559 2.17988C15.0287 2.36901 15.0124 2.66473 14.8301 2.84683M14.8559 2.17988L14.8301 2.84683M7.35472 8.96035L7.3547 8.96037C7.32335 8.99159 7.30056 9.03036 7.28853 9.07294L7.28822 9.07404L7.28819 9.07403L7.0274 9.8508C7.02245 9.86773 7.02213 9.88568 7.02647 9.90278C7.03085 9.92001 7.03979 9.93574 7.05236 9.94831C7.06493 9.96088 7.08066 9.96983 7.09789 9.9742C7.11499 9.97854 7.13294 9.97822 7.14987 9.97328L7.92601 9.71248L7.9271 9.71212L7.9271 9.71214C7.96969 9.70011 8.00846 9.67732 8.03968 9.64597L8.0397 9.64595L13.6709 4.00415C13.6709 4.00414 13.6709 4.00412 13.6709 4.00411C13.7186 3.95585 13.7454 3.8907 13.7454 3.82282C13.7454 3.75494 13.7187 3.6898 13.6709 3.64154L7.35472 8.96035ZM7.35472 8.96035L12.996 3.32911C13.0443 3.28091 13.1098 3.25385 13.178 3.25385C13.2463 3.25385 13.3117 3.28091 13.3601 3.32911L13.6709 3.64149L7.35472 8.96035Z"
                            fill="white" stroke="#4C4850" stroke-width="0.046875" />
                        <path
                            d="M12.5731 6.55188L8.76406 10.3684C8.61684 10.516 8.4359 10.6255 8.23688 10.6875L7.4275 10.9584C7.23542 11.0127 7.03234 11.0147 6.8392 10.9644C6.64606 10.914 6.46985 10.813 6.32871 10.6719C6.18758 10.5308 6.08662 10.3546 6.03626 10.1614C5.9859 9.96828 5.98794 9.76521 6.04219 9.57312L6.31313 8.76375C6.37492 8.56478 6.48421 8.38385 6.63156 8.23656L10.4481 4.42688C10.4831 4.39193 10.5069 4.3474 10.5166 4.2989C10.5263 4.25041 10.5214 4.20014 10.5025 4.15445C10.4836 4.10875 10.4515 4.06969 10.4104 4.0422C10.3693 4.01471 10.321 4.00002 10.2716 4H3.75C3.28587 4 2.84075 4.18437 2.51256 4.51256C2.18437 4.84075 2 5.28587 2 5.75V13.25C2 13.7141 2.18437 14.1592 2.51256 14.4874C2.84075 14.8156 3.28587 15 3.75 15H11.25C11.7141 15 12.1592 14.8156 12.4874 14.4874C12.8156 14.1592 13 13.7141 13 13.25V6.72844C13 6.67899 12.9853 6.63066 12.9578 6.58956C12.9303 6.54846 12.8912 6.51643 12.8456 6.49753C12.7999 6.47864 12.7496 6.47371 12.7011 6.48338C12.6526 6.49306 12.6081 6.51689 12.5731 6.55188Z"
                            fill="white" />
                    </svg>
                </span>

                {{ $t("profile.accaunt.edit") }}
            </button>
        </div>
    </form>

</template>

<style lang="scss" scoped></style>