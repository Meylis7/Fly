<script setup>
    import { ref } from 'vue';
    import { useUserStore } from '@/stores/userStore';
    import { RouterLink } from 'vue-router';
    import { Vue3Lottie } from 'vue3-lottie'
    import router from '@/router';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    import LoginSlider from '@/components/LoginSlider.vue';
    import apiService from '@/services/apiService';
    import LoadingJson from '@/assets/btn-load.json'

    const userStore = useUserStore();
    const loading = ref(false);

    const form = ref({
        firstname: '',
        lastname: '',
        email: '',
        company: '',
        password: '',
        password_confirmation: '',
        terms: false
    });

    const errors = ref({});

    const validateForm = () => {
        errors.value = {};

        if (!form.value.firstname) errors.value.firstname = "First name is required";
        if (!form.value.lastname) errors.value.lastname = "Last name is required";
        if (!form.value.email) {
            errors.value.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
            errors.value.email = "Invalid email format";
        }
        if (!form.value.company) errors.value.company = "Company name is required";
        if (!form.value.password) errors.value.password = "Password is required";
        if (form.value.password.length < 6) errors.value.password = "Password must be at least 6 characters";
        if (form.value.password !== form.value.password_confirmation) {
            errors.value.password_confirmation = "Passwords do not match";
        }
        // if (!form.value.terms) errors.value.terms = "You must agree to the terms and policies";

        return Object.keys(errors.value).length === 0;
    };

    const register = async () => {

        if (!validateForm()) return;

        loading.value = true;
        try {
            const userData = {
                firstname: form.value.firstname,
                lastname: form.value.lastname,
                email: form.value.email,
                company: form.value.company,
                password: form.value.password,
                password_confirmation: form.value.password_confirmation
            };

            const data = await apiService.registerUser(userData);

            // ✅ Use Pinia to set user data
            userStore.setUser(data.data.user, data.data.token);

            // Show success message
            toast.success("Registration successful!", { autoClose: 3000 });

            router.push({
                name: 'home',
                force: true
            })

        } catch (error) {
            const errorMessage = error.message || "Registration failed";
            toast.error(errorMessage, { autoClose: 3000 });
        } finally {
            loading.value = false;
        }
    };
</script>

<template>
    <section class="bg-[#F9F9F9] min-h-screen pt-[70px]">
        <div class="auto_container">
            <div class="wrapper">
                <RouterLink to="/" class="logo block mb-[30px]">
                    <img src="@/assets/images/logo.png" alt="logo">
                </RouterLink>

                <div class="flex items-center justify-between">
                    <LoginSlider class="w-[calc(50%-10px)] hidden xxl:block" />

                    <form class="w-full xxl:w-[calc(50%-10px)] flex flex-wrap justify-between"
                        @submit.prevent="register">
                        <h2 class="text-lg xxl:text-3xl font-normal mb-4 w-full">
                            {{ $t("signUp.title") }}
                        </h2>
                        <p class="text-sm xxl:text-base font-normal mb-12 w-full">
                            {{ $t("signUp.text") }}
                        </p>

                        <div class="block relative mb-6 w-full lg:w-[calc(50%-10px)]">
                            <label class="absolute left-2 -top-2 px-2 bg-[#F9F9F9] text-sm font-normal">
                                {{ $t("signUp.name.label") }}
                            </label>
                            <input v-model="form.firstname" type="text"
                                class="w-full !bg-[#F9F9F9] text-base font-normal border border-solid rounded py-[18px] px-4"
                                :class="errors.firstname ? 'border-red-500' : 'border-[#223a604d]'">
                            <p v-if="errors.firstname" class="text-red-500 text-sm">{{ errors.firstname }}</p>
                        </div>

                        <div class="block relative mb-6 w-full lg:w-[calc(50%-10px)]">
                            <label class="absolute left-2 -top-2 px-2 bg-[#F9F9F9] text-sm font-normal">
                                {{ $t("signUp.lastName.label") }}
                            </label>
                            <input v-model="form.lastname" type="text"
                                class="w-full !bg-[#F9F9F9] text-base font-normal border border-solid rounded py-[18px] px-4"
                                :class="errors.lastname ? 'border-red-500' : 'border-[#223a604d]'">
                            <p v-if="errors.lastname" class="text-red-500 text-sm">{{ errors.lastname }}</p>
                        </div>

                        <div class="block relative mb-6 w-full lg:w-[calc(50%-10px)]">
                            <label class="absolute left-2 -top-2 px-2 bg-[#F9F9F9] text-sm font-normal">
                                {{ $t("signUp.email.label") }}
                            </label>
                            <input v-model="form.email" type="email"
                                class="w-full !bg-[#F9F9F9] text-base font-normal border border-solid rounded py-[18px] px-4"
                                :class="errors.email ? 'border-red-500' : 'border-[#223a604d]'">
                            <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
                        </div>

                        <div class="block relative mb-6 w-full lg:w-[calc(50%-10px)]">
                            <label class="absolute left-2 -top-2 px-2 bg-[#F9F9F9] text-sm font-normal">
                                {{ $t("signUp.company.label") }}
                            </label>
                            <input v-model="form.company" type="text"
                                class="w-full !bg-[#F9F9F9] text-base font-normal border border-solid rounded py-[18px] px-4"
                                :class="errors.company ? 'border-red-500' : 'border-[#223a604d]'">
                            <p v-if="errors.company" class="text-red-500 text-sm">{{ errors.company }}</p>
                        </div>

                        <div class="block relative mb-6 w-full">
                            <label class="absolute left-2 -top-2 px-2 bg-[#F9F9F9] text-sm font-normal">
                                {{ $t("signUp.password.label") }}
                            </label>
                            <input v-model="form.password" type="password"
                                class="w-full !bg-[#F9F9F9] text-base font-normal border border-solid rounded py-[18px] px-4"
                                :class="errors.password ? 'border-red-500' : 'border-[#223a604d]'">
                            <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
                            <button type="button" class="absolute bottom-5 right-3 w-6 block cursor-pointer">
                                <svg width="24" height="25" class="object-contain" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20.2481 21.5001C20.1496 21.5003 20.0521 21.4809 19.9611 21.4432C19.8701 21.4054 19.7875 21.3501 19.718 21.2803L3.21798 4.78025C3.08327 4.63845 3.00928 4.44964 3.01178 4.25407C3.01428 4.0585 3.09309 3.87164 3.23139 3.73334C3.36969 3.59504 3.55655 3.51624 3.75212 3.51373C3.94769 3.51123 4.1365 3.58522 4.2783 3.71994L20.7783 20.2199C20.8831 20.3248 20.9545 20.4584 20.9834 20.6039C21.0123 20.7493 20.9975 20.9001 20.9407 21.0371C20.884 21.1741 20.7879 21.2912 20.6646 21.3736C20.5414 21.456 20.3964 21.5 20.2481 21.5001V21.5001ZM11.6231 15.3056L9.19549 12.8779C9.18158 12.8641 9.16369 12.855 9.14435 12.8519C9.12501 12.8488 9.10518 12.8518 9.08764 12.8606C9.07011 12.8693 9.05576 12.8833 9.0466 12.9006C9.03744 12.918 9.03394 12.9377 9.03658 12.9571C9.13459 13.587 9.43032 14.1693 9.88103 14.62C10.3317 15.0707 10.9141 15.3665 11.5439 15.4645C11.5633 15.4671 11.5831 15.4636 11.6004 15.4544C11.6177 15.4453 11.6317 15.4309 11.6405 15.4134C11.6492 15.3959 11.6522 15.376 11.6491 15.3567C11.646 15.3374 11.6369 15.3195 11.6231 15.3056ZM12.3731 9.69463L14.8045 12.1251C14.8184 12.1391 14.8364 12.1483 14.8558 12.1516C14.8752 12.1548 14.8952 12.1518 14.9128 12.143C14.9305 12.1343 14.9449 12.1201 14.9541 12.1027C14.9633 12.0853 14.9667 12.0654 14.9639 12.0459C14.8662 11.4152 14.5702 10.832 14.1189 10.3807C13.6676 9.92942 13.0844 9.63348 12.4538 9.53572C12.4342 9.53271 12.4143 9.53594 12.3967 9.54496C12.3791 9.55398 12.3648 9.56833 12.3559 9.58595C12.3469 9.60358 12.3438 9.62357 12.3469 9.64309C12.35 9.66261 12.3592 9.68064 12.3731 9.69463V9.69463Z"
                                        fill="black" />
                                    <path
                                        d="M23.0156 13.3137C23.1708 13.0702 23.2529 12.7872 23.252 12.4984C23.2512 12.2096 23.1675 11.9271 23.0109 11.6844C21.7706 9.76625 20.1614 8.13688 18.3577 6.97203C16.3594 5.68203 14.1562 5 11.985 5C10.8404 5.00157 9.7035 5.1882 8.61843 5.55266C8.58807 5.56276 8.56079 5.58046 8.5392 5.60409C8.51761 5.62772 8.50242 5.65647 8.49509 5.68763C8.48776 5.71878 8.48853 5.75129 8.49732 5.78207C8.50611 5.81284 8.52263 5.84085 8.54531 5.86344L10.7597 8.07781C10.7827 8.10086 10.8113 8.11752 10.8427 8.12615C10.8741 8.13478 10.9072 8.13508 10.9387 8.12703C11.6893 7.94412 12.4744 7.95752 13.2183 8.16595C13.9622 8.37438 14.6399 8.77082 15.1862 9.3171C15.7325 9.86338 16.1289 10.5411 16.3373 11.285C16.5458 12.0289 16.5592 12.8139 16.3762 13.5645C16.3683 13.596 16.3686 13.629 16.3773 13.6603C16.3859 13.6916 16.4025 13.7202 16.4255 13.7431L19.6106 16.9306C19.6438 16.9638 19.6881 16.9834 19.735 16.9855C19.7819 16.9876 19.8278 16.972 19.8637 16.9419C21.0898 15.8968 22.1522 14.6739 23.0156 13.3137ZM12 17C11.3188 17 10.6465 16.8454 10.0337 16.5478C9.42094 16.2502 8.88375 15.8173 8.46263 15.2819C8.04151 14.7464 7.74745 14.1223 7.60262 13.4567C7.45779 12.7911 7.46598 12.1012 7.62656 11.4392C7.63452 11.4077 7.63417 11.3747 7.62555 11.3434C7.61692 11.3121 7.60031 11.2836 7.57734 11.2606L4.44422 8.12609C4.41099 8.09283 4.36649 8.07327 4.31952 8.07127C4.27255 8.06927 4.22655 8.08499 4.19062 8.11531C3.04734 9.09078 1.9875 10.2777 1.01859 11.6647C0.84899 11.9081 0.755584 12.1965 0.750243 12.4931C0.744901 12.7897 0.827865 13.0813 0.988591 13.3306C2.22656 15.268 3.81937 16.8997 5.59547 18.0486C7.59656 19.3437 9.74625 20 11.985 20C13.1412 19.9969 14.2899 19.8143 15.39 19.4586C15.4206 19.4488 15.4482 19.4313 15.4702 19.4078C15.4921 19.3842 15.5076 19.3554 15.5152 19.3242C15.5227 19.2929 15.5222 19.2602 15.5134 19.2293C15.5047 19.1983 15.4882 19.1701 15.4655 19.1473L13.2403 16.9227C13.2174 16.8997 13.1888 16.8831 13.1575 16.8744C13.1262 16.8658 13.0932 16.8655 13.0617 16.8734C12.7141 16.9577 12.3577 17.0002 12 17V17Z"
                                        fill="black" />
                                </svg>
                            </button>
                        </div>

                        <div class="block relative mb-6 w-full">
                            <label class="absolute left-2 -top-2 px-2 bg-[#F9F9F9] text-sm font-normal">
                                {{ $t("signUp.confirmPass.label") }}
                            </label>
                            <input v-model="form.password_confirmation" type="password"
                                class="w-full !bg-[#F9F9F9] text-base font-normal border border-solid rounded py-[18px] px-4"
                                :class="errors.password_confirmation ? 'border-red-500' : 'border-[#223a604d]'">
                            <p v-if="errors.password_confirmation" class="text-red-500 text-sm">{{
                                errors.password_confirmation }}</p>
                            <button type="button" class="absolute bottom-5 right-3 w-6 block cursor-pointer">
                                <svg width="24" height="25" class="object-contain" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20.2481 21.5001C20.1496 21.5003 20.0521 21.4809 19.9611 21.4432C19.8701 21.4054 19.7875 21.3501 19.718 21.2803L3.21798 4.78025C3.08327 4.63845 3.00928 4.44964 3.01178 4.25407C3.01428 4.0585 3.09309 3.87164 3.23139 3.73334C3.36969 3.59504 3.55655 3.51624 3.75212 3.51373C3.94769 3.51123 4.1365 3.58522 4.2783 3.71994L20.7783 20.2199C20.8831 20.3248 20.9545 20.4584 20.9834 20.6039C21.0123 20.7493 20.9975 20.9001 20.9407 21.0371C20.884 21.1741 20.7879 21.2912 20.6646 21.3736C20.5414 21.456 20.3964 21.5 20.2481 21.5001V21.5001ZM11.6231 15.3056L9.19549 12.8779C9.18158 12.8641 9.16369 12.855 9.14435 12.8519C9.12501 12.8488 9.10518 12.8518 9.08764 12.8606C9.07011 12.8693 9.05576 12.8833 9.0466 12.9006C9.03744 12.918 9.03394 12.9377 9.03658 12.9571C9.13459 13.587 9.43032 14.1693 9.88103 14.62C10.3317 15.0707 10.9141 15.3665 11.5439 15.4645C11.5633 15.4671 11.5831 15.4636 11.6004 15.4544C11.6177 15.4453 11.6317 15.4309 11.6405 15.4134C11.6492 15.3959 11.6522 15.376 11.6491 15.3567C11.646 15.3374 11.6369 15.3195 11.6231 15.3056ZM12.3731 9.69463L14.8045 12.1251C14.8184 12.1391 14.8364 12.1483 14.8558 12.1516C14.8752 12.1548 14.8952 12.1518 14.9128 12.143C14.9305 12.1343 14.9449 12.1201 14.9541 12.1027C14.9633 12.0853 14.9667 12.0654 14.9639 12.0459C14.8662 11.4152 14.5702 10.832 14.1189 10.3807C13.6676 9.92942 13.0844 9.63348 12.4538 9.53572C12.4342 9.53271 12.4143 9.53594 12.3967 9.54496C12.3791 9.55398 12.3648 9.56833 12.3559 9.58595C12.3469 9.60358 12.3438 9.62357 12.3469 9.64309C12.35 9.66261 12.3592 9.68064 12.3731 9.69463V9.69463Z"
                                        fill="black" />
                                    <path
                                        d="M23.0156 13.3137C23.1708 13.0702 23.2529 12.7872 23.252 12.4984C23.2512 12.2096 23.1675 11.9271 23.0109 11.6844C21.7706 9.76625 20.1614 8.13688 18.3577 6.97203C16.3594 5.68203 14.1562 5 11.985 5C10.8404 5.00157 9.7035 5.1882 8.61843 5.55266C8.58807 5.56276 8.56079 5.58046 8.5392 5.60409C8.51761 5.62772 8.50242 5.65647 8.49509 5.68763C8.48776 5.71878 8.48853 5.75129 8.49732 5.78207C8.50611 5.81284 8.52263 5.84085 8.54531 5.86344L10.7597 8.07781C10.7827 8.10086 10.8113 8.11752 10.8427 8.12615C10.8741 8.13478 10.9072 8.13508 10.9387 8.12703C11.6893 7.94412 12.4744 7.95752 13.2183 8.16595C13.9622 8.37438 14.6399 8.77082 15.1862 9.3171C15.7325 9.86338 16.1289 10.5411 16.3373 11.285C16.5458 12.0289 16.5592 12.8139 16.3762 13.5645C16.3683 13.596 16.3686 13.629 16.3773 13.6603C16.3859 13.6916 16.4025 13.7202 16.4255 13.7431L19.6106 16.9306C19.6438 16.9638 19.6881 16.9834 19.735 16.9855C19.7819 16.9876 19.8278 16.972 19.8637 16.9419C21.0898 15.8968 22.1522 14.6739 23.0156 13.3137ZM12 17C11.3188 17 10.6465 16.8454 10.0337 16.5478C9.42094 16.2502 8.88375 15.8173 8.46263 15.2819C8.04151 14.7464 7.74745 14.1223 7.60262 13.4567C7.45779 12.7911 7.46598 12.1012 7.62656 11.4392C7.63452 11.4077 7.63417 11.3747 7.62555 11.3434C7.61692 11.3121 7.60031 11.2836 7.57734 11.2606L4.44422 8.12609C4.41099 8.09283 4.36649 8.07327 4.31952 8.07127C4.27255 8.06927 4.22655 8.08499 4.19062 8.11531C3.04734 9.09078 1.9875 10.2777 1.01859 11.6647C0.84899 11.9081 0.755584 12.1965 0.750243 12.4931C0.744901 12.7897 0.827865 13.0813 0.988591 13.3306C2.22656 15.268 3.81937 16.8997 5.59547 18.0486C7.59656 19.3437 9.74625 20 11.985 20C13.1412 19.9969 14.2899 19.8143 15.39 19.4586C15.4206 19.4488 15.4482 19.4313 15.4702 19.4078C15.4921 19.3842 15.5076 19.3554 15.5152 19.3242C15.5227 19.2929 15.5222 19.2602 15.5134 19.2293C15.5047 19.1983 15.4882 19.1701 15.4655 19.1473L13.2403 16.9227C13.2174 16.8997 13.1888 16.8831 13.1575 16.8744C13.1262 16.8658 13.0932 16.8655 13.0617 16.8734C12.7141 16.9577 12.3577 17.0002 12 17V17Z"
                                        fill="black" />
                                </svg>
                            </button>
                        </div>

                        <button type="submit" :disabled="loading"
                            class="w-full text-center justify-center py-[14px] mb-4 text-base bg-[#223A60] text-white flex items-center gap-2 mx-auto rounded-lg mt-4 lg:mt-10 disabled:opacity-50 disabled:cursor-not-allowed">
                            <div v-if="loading" class="flex items-center pl-6 py-0">
                                {{ $t("loading") }}
                                <Vue3Lottie :animationData="LoadingJson" class="!w-[50px] !h-[50px]" />
                            </div>
                            <p v-else class="md:px-6 md:py-2">
                                {{ $t("signUp.createAccount") }}
                            </p>
                        </button>

                        <p v-if="errors.api" class="text-red-500 text-center w-full">{{ errors.api }}</p>

                        <p class="text-sm font-medium text-[#112211] text-center w-full">
                            {{ $t("signUp.accountText") }} <RouterLink to="/signin" class="text-[#FF8682]">{{
                                $t("signIn.title") }}</RouterLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
    .terms {
        input {
            display: none;

            &:checked~label {
                &::before {
                    border-color: #223A60;
                }

                &::after {
                    background: #223A60;
                    opacity: 1;
                }
            }
        }

        label {
            position: relative;
            cursor: pointer;

            &::before {
                content: '';
                display: block;
                margin-right: 10px;
                width: 18px;
                height: 18px;
                border: 1px solid #112211;
                border-radius: 3px;
            }

            &::after {
                content: '✓';
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 3px;
                width: 18px;
                height: 18px;
                font-size: 14px;
                font-weight: 500;
                color: #fff;
                opacity: 0;
                transition: all .2s linear;

                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>