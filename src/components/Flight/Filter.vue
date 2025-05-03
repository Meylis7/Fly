<script setup>
    import { ref, defineEmits } from 'vue';

    const menuRef = ref(null);
    const emit = defineEmits(['close']);

    const closeMenu = () => {
        emit('close');
    };
</script>

<template>
    <aside ref="menuRef" @click.self="closeMenu"
        class="aside w-full 1xl:w-[350px] h-full bg-[rgba(0,0,0,.5)] 1xl:!bg-transparent">
        <div
            class="p-5 max-w-[calc(100%-100px)] md:max-w-[550px] 1xl:w-full h-full overflow-auto bg-white rounded-xl border border-solid border-[#223a604d] shadow-[0px_4px_5px_rgba(0, 0, 0, 0.15)]">
            <h3 class="text-lg md:text-xl font-semibold mb-10">
                {{ $t("filter.title") }}
            </h3>

            <form class="relative filter-form">
                <div class="block mb-5 border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                    <div class="filter_check mb-[14px]">
                        <input type="checkbox" id="cheap">
                        <label class="text-sm sm:text-base font-normal relative block" for="cheap">{{
                            $t("filter.sort.val_1")
                            }}</label>
                    </div>

                    <div class="filter_check mb-[14px]">
                        <input type="checkbox" id="fast">
                        <label class="text-sm sm:text-base font-normal relative block" for="fast">{{
                            $t("filter.sort.val_2")
                            }}</label>
                    </div>

                    <div class="filter_check">
                        <input type="checkbox" id="time">
                        <label class="text-sm sm:text-base font-normal relative block" for="time">{{
                            $t("filter.sort.val_3")
                            }}</label>
                    </div>
                </div>

                <div class="block mb-5 border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                    <h5 class="text-base md:text-lg font-semibold mb-4">
                        {{ $t("filter.stops.title") }}
                    </h5>

                    <div class="filter_check mb-[14px]">
                        <input type="checkbox" id="nonstop">
                        <label class="text-sm sm:text-base font-normal relative block" for="nonstop">{{
                            $t("filter.stops.val_1") }}
                            (10)</label>
                    </div>

                    <div class="filter_check mb-[14px]">
                        <input type="checkbox" id="1_stop">
                        <label class="text-sm sm:text-base font-normal relative block" for="1_stop">{{
                            $t("filter.stops.val_2") }}
                            (4)</label>
                    </div>

                    <div class="filter_check mb-[14px]">
                        <input type="checkbox" id="2_stop">
                        <label class="text-sm sm:text-base font-normal relative block" for="2_stop">{{
                            $t("filter.stops.val_3") }}
                            (34)</label>
                    </div>
                </div>

                <div class="block mb-5 border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                    <h5 class="text-base md:text-lg font-semibold mb-4">
                        {{ $t("filter.baggage.title") }}
                    </h5>

                    <div class="filter_radio mb-[14px]">
                        <input type="checkbox" id="luggage">
                        <label class="text-sm sm:text-base font-normal relative block" for="luggage">{{
                            $t("filter.baggage.val_1")
                            }}</label>
                    </div>
                </div>

                <div class="flex flex-wrap mb-5 gap-x-[10px] border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                    <h5 class="text-base md:text-lg font-semibold mb-4 w-full">
                        {{ $t("filter.departTime.title") }}
                    </h5>

                    <div class="filter_time mb-[10px] w-[calc(100%-5px)] xsm:w-[calc(50%-5px)]">
                        <input type="checkbox" class="peer hidden" id="depart-morning" checked>
                        <label
                            class="text-sm sm:text-base font-normal relative p-[10px] rounded-lg cursor-pointer flex flex-col items-center border border-solid border-[#223a604d] duration-200 peer-checked:bg-prime-color peer-checked:text-white"
                            for="depart-morning">
                            <span class="block h-[30px] mb-2">
                                <svg class="block object-contain" width="30" height="30" viewBox="0 0 30 30" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path class="peer-checked:!fill-white" fill-rule="evenodd" clip-rule="evenodd"
                                        d="M15.0001 8.57137C18.548 8.57137 21.4286 11.4521 21.4286 14.9999C21.4286 18.5476 18.5479 21.4284 15.0001 21.4284C11.4524 21.4284 8.5716 18.5476 8.5716 14.9999C8.5716 11.4521 11.4524 8.57137 15.0001 8.57137ZM13.9287 1.07142C13.9287 0.479448 14.4081 0 15.0001 0C15.5921 0 16.0715 0.479448 16.0715 1.07142V5.3571C16.0715 5.94908 15.5921 6.42852 15.0001 6.42852C14.4081 6.42852 13.9287 5.94908 13.9287 5.3571V1.07142ZM24.0912 4.39416C24.5105 3.97495 25.1881 3.97495 25.606 4.39416C26.0252 4.81203 26.0252 5.48969 25.606 5.90889L22.5765 8.93832C22.1587 9.35753 21.4797 9.35753 21.0618 8.93832C20.6426 8.52045 20.6426 7.84146 21.0618 7.42359L24.0912 4.39416ZM28.9286 13.9286C29.5206 13.9286 30 14.4081 30 15C30 15.592 29.5206 16.0714 28.9286 16.0714H24.6429C24.0509 16.0714 23.5715 15.592 23.5715 15C23.5715 14.4081 24.0509 13.9286 24.6429 13.9286H28.9286ZM25.6058 24.0912C26.025 24.5104 26.025 25.188 25.6058 25.6059C25.188 26.0251 24.5103 26.0251 24.0911 25.6059L21.0617 22.5765C20.6425 22.1586 20.6425 21.4796 21.0617 21.0617C21.4796 20.6425 22.1585 20.6425 22.5764 21.0617L25.6058 24.0912ZM13.9286 24.643C13.9286 24.051 14.408 23.5715 15 23.5715C15.592 23.5715 16.0714 24.051 16.0714 24.643V28.9286C16.0714 29.5206 15.592 30.0001 15 30.0001C14.408 30.0001 13.9286 29.5206 13.9286 28.9286V24.643ZM7.42359 21.0618C7.84146 20.6426 8.52045 20.6426 8.93832 21.0618C9.35752 21.4797 9.35752 22.1587 8.93832 22.5766L5.90889 25.606C5.48968 26.0252 4.81203 26.0252 4.39416 25.606C3.97495 25.1881 3.97495 24.5105 4.39416 24.0913L7.42359 21.0618ZM5.3571 13.9287C5.94907 13.9287 6.42852 14.4082 6.42852 15.0002C6.42852 15.5921 5.94907 16.0716 5.3571 16.0716H1.07142C0.479448 16.0716 0 15.5921 0 15.0002C0 14.4082 0.479448 13.9287 1.07142 13.9287H5.3571ZM8.93821 7.42376C9.35742 7.84163 9.35742 8.52062 8.93821 8.9385C8.52034 9.3577 7.84135 9.3577 7.42348 8.9385L4.39406 5.90907C3.97485 5.48986 3.97485 4.8122 4.39406 4.39433C4.81193 3.97513 5.48958 3.97513 5.90879 4.39433L8.93821 7.42376Z"
                                        fill="currentColor" />
                                </svg>
                            </span>

                            <p class="text-[13px] font-semibold">
                                {{ $t("filter.departTime.val_1") }}
                            </p>

                            <p class="text-[10px] font-semibold">
                                {{ $t("filter.departTime.text_1") }}
                            </p>
                        </label>
                    </div>

                    <div class="filter_time mb-[10px] w-[calc(100%-5px)] xsm:w-[calc(50%-5px)]">
                        <input type="checkbox" class="peer hidden" id="depart-afternoon">
                        <label
                            class="text-sm sm:text-base font-normal relative p-[10px] rounded-lg cursor-pointer flex flex-col items-center border border-solid border-[#223a604d] duration-200 peer-checked:bg-prime-color peer-checked:text-white"
                            for="depart-afternoon">
                            <span class="block h-[30px] mb-2">
                                <svg class="block object-contain" width="50" height="30" viewBox="0 0 50 30" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path class="peer-checked:!fill-white"
                                        d="M12.5013 1.66667C12.5013 0.745813 11.7555 0 10.8346 0C9.91378 0 9.16797 0.745813 9.16797 1.66667V3.33333C9.16797 4.25418 9.91378 5 10.8346 5C11.7555 5 12.5013 4.25418 12.5013 3.33333V1.66667Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M5.52738 3.17282C4.87735 2.5228 3.82322 2.5228 3.17111 3.17282C2.52109 3.82285 2.52109 4.87906 3.17111 5.52909L4.35026 6.70823C5.00029 7.35826 6.0565 7.35826 6.70652 6.70823C7.35863 6.05821 7.35863 5.00199 6.70652 4.35197L5.52738 3.17282Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M18.4971 3.17282C19.1472 3.82285 19.1472 4.87906 18.4971 5.52909L17.318 6.70823C16.668 7.36034 15.6118 7.36034 14.9617 6.70823C14.3096 6.05821 14.3096 5.00199 14.9617 4.35197L16.1409 3.17282C16.7909 2.5228 17.8471 2.5228 18.4971 3.17282Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M10.8346 6.66663C8.53255 6.66663 6.66797 8.53121 6.66797 10.8333C6.66797 13.1354 8.53255 14.9999 10.8346 14.9999C13.1367 14.9999 15.0013 13.1354 15.0013 10.8333C15.0013 8.53121 13.1367 6.66663 10.8346 6.66663Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M0 10.8335C0 9.91268 0.745813 9.16687 1.66667 9.16687H3.33333C4.25418 9.16687 5 9.91268 5 10.8335C5 11.7544 4.25418 12.5002 3.33333 12.5002H1.66667C0.745813 12.5002 0 11.7544 0 10.8335Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M18.3346 9.1665C17.4138 9.1665 16.668 9.91232 16.668 10.8332C16.668 11.754 17.4138 12.4998 18.3346 12.4998H20.0013C20.9222 12.4998 21.668 11.754 21.668 10.8332C21.668 9.91232 20.9222 9.1665 20.0013 9.1665H18.3346Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M14.9602 14.9584C15.6102 14.3063 16.6664 14.3063 17.3164 14.9584L18.4956 16.1376C19.1456 16.7876 19.1456 17.8417 18.4956 18.4938C17.8456 19.1439 16.7893 19.1439 16.1393 18.4938L14.9602 17.3147C14.3101 16.6647 14.3101 15.6085 14.9602 14.9584Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M6.70652 14.9584C6.0565 14.3063 5.00029 14.3063 4.35026 14.9584L3.17111 16.1376C2.52109 16.7876 2.52109 17.8438 3.17111 18.4938C3.82114 19.1439 4.87735 19.1439 5.52738 18.4938L6.70652 17.3147C7.35863 16.6647 7.35863 15.6085 6.70652 14.9584Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M10.8346 16.6666C11.7555 16.6666 12.5013 17.4124 12.5013 18.3333V20C12.5013 20.9208 11.7555 21.6666 10.8346 21.6666C9.91378 21.6666 9.16797 20.9208 9.16797 20V18.3333C9.16797 17.4124 9.91378 16.6666 10.8346 16.6666Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white" fill-rule="evenodd" clip-rule="evenodd"
                                        d="M25.0001 5C37.1478 5 47.046 14.6272 47.4854 26.6667H48.3333C49.2542 26.6667 50 27.4125 50 28.3333C50 29.2542 49.2542 30 48.3333 30H1.66667C0.745813 30 0 29.2542 0 28.3333C0 27.4125 0.745813 26.6667 1.66667 26.6667H23.3333V6.66667C23.3333 5.74581 24.0792 5 25.0001 5Z"
                                        fill="currentColor" />
                                </svg>
                            </span>

                            <p class="text-[13px] font-semibold">
                                {{ $t("filter.departTime.val_2") }}
                            </p>

                            <p class="text-[10px] font-semibold">
                                {{ $t("filter.departTime.text_2") }}
                            </p>
                        </label>
                    </div>

                    <div class="filter_time w-[calc(100%-5px)] xsm:w-[calc(50%-5px)]">
                        <input type="checkbox" class="peer hidden" id="depart-evening">
                        <label
                            class="text-sm sm:text-base font-normal relative p-[10px] rounded-lg cursor-pointer flex flex-col items-center border border-solid border-[#223a604d] duration-200 peer-checked:bg-prime-color peer-checked:text-white"
                            for="depart-evening">
                            <span class="block h-[30px] mb-2">
                                <svg class="block object-contain" width="30" height="30" viewBox="0 0 30 30" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path class="peer-checked:!fill-white"
                                        d="M10.5028 0.756714C10.4226 0.756714 10.3439 0.769369 10.2679 0.794682C4.15101 2.82803 0.0140395 8.54989 0 14.9973V15.0001C0 23.2755 6.72456 30 15 30H15.0028C21.4501 29.986 27.1721 25.849 29.2053 19.7321C29.2953 19.4621 29.2236 19.164 29.0225 18.9643C28.82 18.7632 28.5233 18.6943 28.2534 18.7857C26.8837 19.2498 25.4466 19.4902 23.9997 19.5001C16.5372 19.5001 10.5031 13.4674 10.5002 6.00633V6.00071C10.5101 4.55374 10.7505 3.1166 11.2146 1.7471C11.2919 1.51789 11.2554 1.26619 11.1133 1.06932C10.9727 0.872445 10.7449 0.757138 10.503 0.757138L10.5028 0.756714Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M26.2503 8.99964C25.9424 8.99964 25.6653 9.18807 25.5528 9.47493L24.823 11.3241L22.9739 12.0539V12.0525C22.6884 12.1664 22.5 12.4434 22.5 12.7499C22.5 13.0579 22.6884 13.3349 22.9739 13.4474L24.823 14.1772L25.5528 16.0264C25.6667 16.3118 25.9423 16.5003 26.2503 16.5003C26.5583 16.5003 26.8339 16.3118 26.9478 16.0264L27.6776 14.1772L29.5267 13.4474C29.8122 13.3349 30.0006 13.0579 30.0006 12.7499C30.0006 12.4434 29.8122 12.1664 29.5267 12.0525L27.6776 11.3241L26.9478 9.47493C26.8353 9.18806 26.5583 8.99964 26.2503 8.99964Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M20.2493 0C19.9414 0 19.6658 0.188432 19.5519 0.475291L18.3974 3.39878L15.4739 4.55326C15.1884 4.66717 15 4.94277 15 5.25074C15 5.55871 15.1884 5.83431 15.4739 5.94821L18.3988 7.10269L19.5533 10.0262H19.5519C19.6658 10.3116 19.9428 10.5001 20.2493 10.5001C20.5573 10.5001 20.8343 10.3116 20.9468 10.0262L22.1013 7.10269L25.0262 5.94821C25.3116 5.83431 25.5001 5.55871 25.5001 5.25074C25.5001 4.94277 25.3116 4.66716 25.0262 4.55326L22.1013 3.39878L20.9468 0.475291C20.8343 0.188425 20.5573 0 20.2493 0Z"
                                        fill="currentColor" />
                                </svg>
                            </span>

                            <p class="text-[13px] font-semibold">
                                {{ $t("filter.departTime.val_3") }}
                            </p>

                            <p class="text-[10px] font-semibold">
                                {{ $t("filter.departTime.text_3") }}
                            </p>
                        </label>
                    </div>
                </div>

                <div class="flex flex-wrap mb-5 gap-x-[10px] border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                    <h5 class="text-base md:text-lg font-semibold mb-4 w-full">
                        {{ $t("filter.arriveTime.title") }}
                    </h5>

                    <div class="filter_time mb-[10px] w-[calc(100%-5px)] xsm:w-[calc(50%-5px)]">
                        <input type="checkbox" class="peer hidden" id="arrive-morning" checked>
                        <label
                            class="text-sm sm:text-base font-normal relative p-[10px] rounded-lg cursor-pointer flex flex-col items-center border border-solid border-[#223a604d] duration-200 peer-checked:bg-prime-color peer-checked:text-white"
                            for="arrive-morning">
                            <span class="block h-[30px] mb-2">
                                <svg class="block object-contain" width="30" height="30" viewBox="0 0 30 30" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path class="peer-checked:!fill-white" fill-rule="evenodd" clip-rule="evenodd"
                                        d="M15.0001 8.57137C18.548 8.57137 21.4286 11.4521 21.4286 14.9999C21.4286 18.5476 18.5479 21.4284 15.0001 21.4284C11.4524 21.4284 8.5716 18.5476 8.5716 14.9999C8.5716 11.4521 11.4524 8.57137 15.0001 8.57137ZM13.9287 1.07142C13.9287 0.479448 14.4081 0 15.0001 0C15.5921 0 16.0715 0.479448 16.0715 1.07142V5.3571C16.0715 5.94908 15.5921 6.42852 15.0001 6.42852C14.4081 6.42852 13.9287 5.94908 13.9287 5.3571V1.07142ZM24.0912 4.39416C24.5105 3.97495 25.1881 3.97495 25.606 4.39416C26.0252 4.81203 26.0252 5.48969 25.606 5.90889L22.5765 8.93832C22.1587 9.35753 21.4797 9.35753 21.0618 8.93832C20.6426 8.52045 20.6426 7.84146 21.0618 7.42359L24.0912 4.39416ZM28.9286 13.9286C29.5206 13.9286 30 14.4081 30 15C30 15.592 29.5206 16.0714 28.9286 16.0714H24.6429C24.0509 16.0714 23.5715 15.592 23.5715 15C23.5715 14.4081 24.0509 13.9286 24.6429 13.9286H28.9286ZM25.6058 24.0912C26.025 24.5104 26.025 25.188 25.6058 25.6059C25.188 26.0251 24.5103 26.0251 24.0911 25.6059L21.0617 22.5765C20.6425 22.1586 20.6425 21.4796 21.0617 21.0617C21.4796 20.6425 22.1585 20.6425 22.5764 21.0617L25.6058 24.0912ZM13.9286 24.643C13.9286 24.051 14.408 23.5715 15 23.5715C15.592 23.5715 16.0714 24.051 16.0714 24.643V28.9286C16.0714 29.5206 15.592 30.0001 15 30.0001C14.408 30.0001 13.9286 29.5206 13.9286 28.9286V24.643ZM7.42359 21.0618C7.84146 20.6426 8.52045 20.6426 8.93832 21.0618C9.35752 21.4797 9.35752 22.1587 8.93832 22.5766L5.90889 25.606C5.48968 26.0252 4.81203 26.0252 4.39416 25.606C3.97495 25.1881 3.97495 24.5105 4.39416 24.0913L7.42359 21.0618ZM5.3571 13.9287C5.94907 13.9287 6.42852 14.4082 6.42852 15.0002C6.42852 15.5921 5.94907 16.0716 5.3571 16.0716H1.07142C0.479448 16.0716 0 15.5921 0 15.0002C0 14.4082 0.479448 13.9287 1.07142 13.9287H5.3571ZM8.93821 7.42376C9.35742 7.84163 9.35742 8.52062 8.93821 8.9385C8.52034 9.3577 7.84135 9.3577 7.42348 8.9385L4.39406 5.90907C3.97485 5.48986 3.97485 4.8122 4.39406 4.39433C4.81193 3.97513 5.48958 3.97513 5.90879 4.39433L8.93821 7.42376Z"
                                        fill="currentColor" />
                                </svg>
                            </span>

                            <p class="text-[13px] font-semibold">
                                {{ $t("filter.departTime.val_1") }}
                            </p>

                            <p class="text-[10px] font-semibold">
                                {{ $t("filter.departTime.text_1") }}
                            </p>
                        </label>
                    </div>

                    <div class="filter_time mb-[10px] w-[calc(100%-5px)] xsm:w-[calc(50%-5px)]">
                        <input type="checkbox" class="peer hidden" id="arrive-afternoon">
                        <label
                            class="text-sm sm:text-base font-normal relative p-[10px] rounded-lg cursor-pointer flex flex-col items-center border border-solid border-[#223a604d] duration-200 peer-checked:bg-prime-color peer-checked:text-white"
                            for="arrive-afternoon">
                            <span class="block h-[30px] mb-2">
                                <svg class="block object-contain" width="50" height="30" viewBox="0 0 50 30" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path class="peer-checked:!fill-white"
                                        d="M12.5013 1.66667C12.5013 0.745813 11.7555 0 10.8346 0C9.91378 0 9.16797 0.745813 9.16797 1.66667V3.33333C9.16797 4.25418 9.91378 5 10.8346 5C11.7555 5 12.5013 4.25418 12.5013 3.33333V1.66667Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M5.52738 3.17282C4.87735 2.5228 3.82322 2.5228 3.17111 3.17282C2.52109 3.82285 2.52109 4.87906 3.17111 5.52909L4.35026 6.70823C5.00029 7.35826 6.0565 7.35826 6.70652 6.70823C7.35863 6.05821 7.35863 5.00199 6.70652 4.35197L5.52738 3.17282Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M18.4971 3.17282C19.1472 3.82285 19.1472 4.87906 18.4971 5.52909L17.318 6.70823C16.668 7.36034 15.6118 7.36034 14.9617 6.70823C14.3096 6.05821 14.3096 5.00199 14.9617 4.35197L16.1409 3.17282C16.7909 2.5228 17.8471 2.5228 18.4971 3.17282Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M10.8346 6.66663C8.53255 6.66663 6.66797 8.53121 6.66797 10.8333C6.66797 13.1354 8.53255 14.9999 10.8346 14.9999C13.1367 14.9999 15.0013 13.1354 15.0013 10.8333C15.0013 8.53121 13.1367 6.66663 10.8346 6.66663Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M0 10.8335C0 9.91268 0.745813 9.16687 1.66667 9.16687H3.33333C4.25418 9.16687 5 9.91268 5 10.8335C5 11.7544 4.25418 12.5002 3.33333 12.5002H1.66667C0.745813 12.5002 0 11.7544 0 10.8335Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M18.3346 9.1665C17.4138 9.1665 16.668 9.91232 16.668 10.8332C16.668 11.754 17.4138 12.4998 18.3346 12.4998H20.0013C20.9222 12.4998 21.668 11.754 21.668 10.8332C21.668 9.91232 20.9222 9.1665 20.0013 9.1665H18.3346Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M14.9602 14.9584C15.6102 14.3063 16.6664 14.3063 17.3164 14.9584L18.4956 16.1376C19.1456 16.7876 19.1456 17.8417 18.4956 18.4938C17.8456 19.1439 16.7893 19.1439 16.1393 18.4938L14.9602 17.3147C14.3101 16.6647 14.3101 15.6085 14.9602 14.9584Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M6.70652 14.9584C6.0565 14.3063 5.00029 14.3063 4.35026 14.9584L3.17111 16.1376C2.52109 16.7876 2.52109 17.8438 3.17111 18.4938C3.82114 19.1439 4.87735 19.1439 5.52738 18.4938L6.70652 17.3147C7.35863 16.6647 7.35863 15.6085 6.70652 14.9584Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M10.8346 16.6666C11.7555 16.6666 12.5013 17.4124 12.5013 18.3333V20C12.5013 20.9208 11.7555 21.6666 10.8346 21.6666C9.91378 21.6666 9.16797 20.9208 9.16797 20V18.3333C9.16797 17.4124 9.91378 16.6666 10.8346 16.6666Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white" fill-rule="evenodd" clip-rule="evenodd"
                                        d="M25.0001 5C37.1478 5 47.046 14.6272 47.4854 26.6667H48.3333C49.2542 26.6667 50 27.4125 50 28.3333C50 29.2542 49.2542 30 48.3333 30H1.66667C0.745813 30 0 29.2542 0 28.3333C0 27.4125 0.745813 26.6667 1.66667 26.6667H23.3333V6.66667C23.3333 5.74581 24.0792 5 25.0001 5Z"
                                        fill="currentColor" />
                                </svg>
                            </span>

                            <p class="text-[13px] font-semibold">
                                {{ $t("filter.departTime.val_2") }}
                            </p>

                            <p class="text-[10px] font-semibold">
                                {{ $t("filter.departTime.text_2") }}
                            </p>
                        </label>
                    </div>

                    <div class="filter_time w-[calc(100%-5px)] xsm:w-[calc(50%-5px)]">
                        <input type="checkbox" class="peer hidden" id="arrive-evening">
                        <label
                            class="text-sm sm:text-base font-normal relative p-[10px] rounded-lg cursor-pointer flex flex-col items-center border border-solid border-[#223a604d] duration-200 peer-checked:bg-prime-color peer-checked:text-white"
                            for="arrive-evening">
                            <span class="block h-[30px] mb-2">
                                <svg class="block object-contain" width="30" height="30" viewBox="0 0 30 30" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path class="peer-checked:!fill-white"
                                        d="M10.5028 0.756714C10.4226 0.756714 10.3439 0.769369 10.2679 0.794682C4.15101 2.82803 0.0140395 8.54989 0 14.9973V15.0001C0 23.2755 6.72456 30 15 30H15.0028C21.4501 29.986 27.1721 25.849 29.2053 19.7321C29.2953 19.4621 29.2236 19.164 29.0225 18.9643C28.82 18.7632 28.5233 18.6943 28.2534 18.7857C26.8837 19.2498 25.4466 19.4902 23.9997 19.5001C16.5372 19.5001 10.5031 13.4674 10.5002 6.00633V6.00071C10.5101 4.55374 10.7505 3.1166 11.2146 1.7471C11.2919 1.51789 11.2554 1.26619 11.1133 1.06932C10.9727 0.872445 10.7449 0.757138 10.503 0.757138L10.5028 0.756714Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M26.2503 8.99964C25.9424 8.99964 25.6653 9.18807 25.5528 9.47493L24.823 11.3241L22.9739 12.0539V12.0525C22.6884 12.1664 22.5 12.4434 22.5 12.7499C22.5 13.0579 22.6884 13.3349 22.9739 13.4474L24.823 14.1772L25.5528 16.0264C25.6667 16.3118 25.9423 16.5003 26.2503 16.5003C26.5583 16.5003 26.8339 16.3118 26.9478 16.0264L27.6776 14.1772L29.5267 13.4474C29.8122 13.3349 30.0006 13.0579 30.0006 12.7499C30.0006 12.4434 29.8122 12.1664 29.5267 12.0525L27.6776 11.3241L26.9478 9.47493C26.8353 9.18806 26.5583 8.99964 26.2503 8.99964Z"
                                        fill="currentColor" />
                                    <path class="peer-checked:!fill-white"
                                        d="M20.2493 0C19.9414 0 19.6658 0.188432 19.5519 0.475291L18.3974 3.39878L15.4739 4.55326C15.1884 4.66717 15 4.94277 15 5.25074C15 5.55871 15.1884 5.83431 15.4739 5.94821L18.3988 7.10269L19.5533 10.0262H19.5519C19.6658 10.3116 19.9428 10.5001 20.2493 10.5001C20.5573 10.5001 20.8343 10.3116 20.9468 10.0262L22.1013 7.10269L25.0262 5.94821C25.3116 5.83431 25.5001 5.55871 25.5001 5.25074C25.5001 4.94277 25.3116 4.66716 25.0262 4.55326L22.1013 3.39878L20.9468 0.475291C20.8343 0.188425 20.5573 0 20.2493 0Z"
                                        fill="currentColor" />
                                </svg>
                            </span>

                            <p class="text-[13px] font-semibold">
                                {{ $t("filter.departTime.val_3") }}
                            </p>

                            <p class="text-[10px] font-semibold">
                                {{ $t("filter.departTime.text_3") }}
                            </p>
                        </label>
                    </div>
                </div>

                <div class="block mb-5 border-solid border-0 border-b border-b-[#E7E7E7] pb-7">
                    <h5 class="text-base md:text-lg font-semibold mb-4">
                        {{ $t("filter.airlines.title") }}
                    </h5>

                    <div class="filter_check mb-[14px]">
                        <input type="checkbox" id="airline_1">
                        <label class="text-sm sm:text-base font-normal relative block" for="airline_1">Аэрофлот</label>
                    </div>

                    <div class="filter_check mb-[14px]">
                        <input type="checkbox" id="airline_2">
                        <label class="text-sm sm:text-base font-normal relative block" for="airline_2">Победа</label>
                    </div>

                    <div class="filter_check mb-[14px]">
                        <input type="checkbox" id="airline_3">
                        <label class="text-sm sm:text-base font-normal relative block" for="airline_3">Уральские
                            авиалинии</label>
                    </div>
                </div>

                <div class="block md:flex md:gap-x-4 sticky -bottom-5 bg-white w-full">
                    <button type="reset"
                        class="text-sm w-full cursor-pointer border border-solid border-[#223A60] rounded-lg p-3 transition-all hover:bg-[#223A60] hover:text-white">
                        {{ $t("filter.btn") }}
                    </button>

                    <button
                        class="text-sm bg-prime-color cursor-pointer w-full text-white block px-6 py-3 mx-auto rounded-lg mt-2 md:mt-0">
                        {{ $t("booking.submit") }}
                    </button>
                </div>
            </form>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
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