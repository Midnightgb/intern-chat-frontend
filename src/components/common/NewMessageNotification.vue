//src/components/common/NewMessageNotification.vue
<template>
  <div class="fixed px-4 py-2 text-white bg-blue-500 rounded-full shadow-lg cursor-pointer bottom-4 right-4"
      @click="$emit('scroll-to-bottom')">
    New Message
    <span class="ml-2">&#8595;</span>
  </div>
</template>

<script setup>
defineEmits(['scroll-to-bottom']);
</script>