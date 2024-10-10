//src/components/chat/SearchInput.vue
<template>
  <div class="flex items-center justify-between mt-2">
    <div class="relative w-full">
      <input
        v-model="search"
        type="text"
        placeholder="Buscar..."
        class="w-full p-1 rounded-lg bg-slate-200 text-muted-foreground placeholder:text-xs dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
      />
      <button
        v-if="search"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full transition-all hover:text-slate-600 text-slate-400 dark:text-gray-400 dark:hover:text-gray-200"
        @click="clearSearch"
      >
        <CircleX class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CircleX } from 'lucide-vue-next'

const emit = defineEmits(['update:modelValue', 'clear'])
const search = ref('')

watch(search, (newValue) => {
  emit('update:modelValue', newValue)
})

function clearSearch() {
  search.value = ''
  emit('clear')
}
</script>