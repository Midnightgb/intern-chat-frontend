<template>
  <div class="mt-4 flex items-center gap-2">
    <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
      <img class="aspect-square h-full w-full" alt="User Avatar" src="/images/placeholder-user.png" />
    </span>
    <input
      v-model="message"
      class="flex h-10 w-full border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 rounded-lg bg-muted px-4 py-2 text-sm"
      placeholder="Type your message..."
      type="text"
    />
    <button @click="sendMessage" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
//import { socketService } from '@/services/socketService';
import { ref } from 'vue';


const message = ref('');

const sendMessage = () => {
  if (message.value.trim() === '') {
    return;
  }

  console.log(message.value);
  //socketService.sendMessage(currentChannelId.value, messageContent.value);
  message.value = ''; // Limpiar el input después de enviar
};
</script>