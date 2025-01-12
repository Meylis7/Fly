<script setup>
    import { ref, watch, computed } from 'vue';

    const props = defineProps({
        placeholder: String,
        fetchData: Function, // Function to fetch data (API call)
        minChars: {
            type: Number,
            default: 3,
        },
        modelValue: String
    });
    const emit = defineEmits(['update:modelValue'])

    const inputValue = ref(props.modelValue || '');
    const suggestions = ref([]);
    const showSuggestions = ref(false);
    const loading = ref(false);

    const filteredSuggestions = computed(() => {
        return suggestions.value;
    });

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const fetchSuggestions = async () => {
        if (inputValue.value.length < props.minChars) {
            suggestions.value = [];
            showSuggestions.value = false;
            return;
        }

        loading.value = true;
        try {
            const data = await props.fetchData(inputValue.value);
            suggestions.value = Object.values(data)[0].cities ? Object.values(data)[0].cities : [Object.values(data)[0]]
        } catch (error) {
            console.error("Error fetching data:", error);
            suggestions.value = [];
        } finally {
            loading.value = false;
            showSuggestions.value = true;
        }
    };

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

    const handleInput = () => {
        emit('update:modelValue', inputValue.value)
        debouncedFetchSuggestions();
    };

    const selectSuggestion = (suggestion) => {
        inputValue.value = suggestion.city ? suggestion.city : (suggestion.cityName ? suggestion.cityName.ru : '')
        emit('update:modelValue', inputValue.value)
        suggestions.value = [];
        showSuggestions.value = false;
    };

    watch(() => props.modelValue, (newValue) => {
        inputValue.value = newValue;
    })
</script>

<template>
    <div class="autocomplete-container">
        <input type="text" v-model="inputValue" :placeholder="placeholder"
            class="bg-[#F2F3F4] text-base font-medium p-3 rounded-md focus:ring-1 focus:ring-prime-color"
            @input="handleInput">
        <ul v-if="showSuggestions && filteredSuggestions.length > 0"
            class="flights block absolute top-[calc(100%+10px)] left-0 w-full bg-white rounded-xl shadow-lg overflow-auto max-h-80 z-10">
            <li v-for="(suggestion, index) in filteredSuggestions" :key="index"
                class="p-4 border-solid border-0 border-b border-b-[#84889B] hover:bg-[#303c8526] transition cursor-pointer"
                @click="selectSuggestion(suggestion)">
                <slot name="suggestion" :suggestion="suggestion"></slot>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .autocomplete-container {
        position: relative;
    }
</style>