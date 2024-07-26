//src/components/layout/SideBarLeft.vue
<template>
  <aside
    class="bg-background border-r border-gray-300 flex flex-col items-center gap-2 p-4 w-16 sm:w-44 h-screen"
  >
    <div class="flex flex-col items-center gap-2 w-full flex-grow">
      <button
        class="bg-primary rounded-lg p-2 text-primary-foreground w-full"
        @click="onPrimaryButtonClick"
      >
        <div class="flex items-center justify-center">
          <CircleDot />
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
            v-for="(channel, index) in filteredChannels"
            :key="index"
            class="bg-muted rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full"
            @click="onChannelClick(channel)"
          >
            <div class="flex items-center justify-center">
              <!-- Channel icon -->
              <Server />
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
import { onMounted, onUnmounted, computed } from 'vue'

// Stores
import { useChannelStore } from '@/stores/channels/channelStore'
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore'
// Components
import { FwbSpinner } from 'flowbite-vue'
import { Server, CircleDot } from 'lucide-vue-next';

const channelStore = useChannelStore()
const currentChannelStore = useCurrentChannelStore()
        
const filteredChannels = computed(() => {
      return channels.value.filter(channel => channel.status_channel)
  })
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
