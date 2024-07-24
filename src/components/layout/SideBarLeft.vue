//src/components/layout/SideBarLeft.vue
<template>
  <aside
    class="bg-background border-r border-gray-300 flex flex-col items-center gap-2 p-4 w-16 sm:w-64 h-screen"
  >
    <div class="flex flex-col items-center gap-2 w-full flex-grow">
      <button
        class="bg-primary rounded-lg p-2 text-primary-foreground w-full"
        @click="onPrimaryButtonClick"
      >
        <div class="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
        </div>
      </button>
      <div class="flex flex-col items-center gap-2 w-full flex-grow">
        <template v-if="loading">
          <div class="flex items-center justify-center w-full h-full">
            <fwb-spinner color="gray" size="10" />
          </div>
        </template>
        <template v-else-if="error">
          <div class="flex items-center justify-center w-full">
            <span class="text-red-500">Error: {{ error }}</span>
          </div>
        </template>
        <template v-else>
          <button
            v-for="(channel, index) in channels"
            :key="index"
            class="bg-muted rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full"
            @click="onChannelClick(channel)"
          >
            <div class="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-6 w-6"
              >
                <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
                <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
                <line x1="6" x2="6.01" y1="6" y2="6"></line>
                <line x1="6" x2="6.01" y1="18" y2="18"></line>
              </svg>
              <span class="ml-2 text-sm font-medium hidden sm:inline">{{ channel.name }}</span>
            </div>
          </button>
        </template>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted } from 'vue'
// Stores
import { useChannelStore } from '@/stores/channels/channelStore'
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore'
// Components
import { FwbSpinner } from 'flowbite-vue'

const channelStore = useChannelStore()
const currentChannelStore = useCurrentChannelStore()

onMounted(() => {
  channelStore.initializeStore()
  const intervalId = setInterval(() => {
    channelStore.fetchChannelsIfNeeded()
  }, 60000)

  // Limpiar el intervalo cuando el componente se desmonta
  onUnmounted(() => {
    clearInterval(intervalId)
  })
})

const { channels, loading, error } = storeToRefs(channelStore)

const onPrimaryButtonClick = () => {
  console.log('Primary button clicked')
}

const onChannelClick = (channel) => {
  console.log('Channel clicked:', channel.id_channel, channel.name)
  currentChannelStore.setCurrentChannelId(channel.id_channel)
  currentChannelStore.setCurrentChannelName(channel.name)
}
</script>
