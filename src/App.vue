<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view></router-view>
</template>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-100 min-h-screen;
  }
}
</style>