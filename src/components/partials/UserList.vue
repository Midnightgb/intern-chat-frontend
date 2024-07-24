<template>
  <div class="flex flex-col gap-4">
    <div v-for="(user, index) in users" :key="index" class="flex items-center gap-2">
      <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
        <img class="aspect-square h-full w-full" alt="User Avatar" src="/images/placeholder-user.png" />
      </span>
      <div>
        <div class="font-medium">{{ user.name }}</div>
        <div class="text-xs text-muted-foreground">{{ user.message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
});
</script>