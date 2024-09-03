<template>
  <div class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
      @click="$emit('scroll-to-bottom')">
    New Message
    <span class="ml-2">&#8595;</span>
  </div>
</template>

<script setup>
defineEmits(['scroll-to-bottom']);
</script>