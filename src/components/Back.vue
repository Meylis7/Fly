<script setup>
    import { defineProps, computed } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';

    const props = defineProps({
        backTo: {
            type: [String, Object],
            default: null,
        },
    });

    const router = useRouter();

    const routeTo = computed(() => {
        return props.backTo || {}; // Return an empty object if backTo is null
    });

    const goBack = (event) => {
        event.preventDefault();

        if (props.backTo) {
            router.push(props.backTo);
        } else {
            router.go(-1);
        }
    };
</script>


<template>
    <RouterLink :to="routeTo" @click="goBack" class="flex items-center text-base font-normal mb-8">
        <span class="block mr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M24 12C24 5.38105 18.6189 0 12 0C5.38105 0 0 5.38105 0 12C0 18.6189 5.38105 24 12 24C18.6189 24 24 18.6189 24 12ZM12.0505 16.7242L8.48842 13.1368C8.18526 12.8337 8.00842 12.4042 8.00842 12C8.00842 11.5958 8.16 11.1663 8.48842 10.8632L12.0758 7.27579C12.7074 6.64421 13.7179 6.64421 14.3495 7.27579C14.9811 7.90737 14.9811 8.91789 14.3495 9.54947L11.8989 12L14.3495 14.4505C14.9811 15.0821 14.9811 16.0926 14.3495 16.7242C13.7179 17.3558 12.6821 17.3558 12.0505 16.7242Z"
                    fill="#223A60" />
            </svg>
        </span>
        Go back
    </RouterLink>
</template>


<style lang="scss" scoped></style>