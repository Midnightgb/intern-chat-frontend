<!-- src/components/layout/SideBarLeft.vue -->
<template>
  <aside
    class="bg-background border-r border-gray-300 flex flex-col items-center gap-2 w-16 h-screen"
  >
    <div class="flex flex-col items-center gap-2 w-full h-full">
      <button class="rounded-lg p-2 w-full" @click="onPrimaryButtonClick">
        <div class="flex items-center justify-center">
          <CircleDot />
        </div>
      </button>
      <div class="flex flex-col items-center p-2 gap-2 w-full flex-grow overflow-y-auto hide-scrollbar snap-y snap-mandatory">
        <!-- Mostrar loader mientras se cargan los canales -->
        <template v-if="loadingChannels">
          <div class="w-full snap-always snap-start">
            <v-skeleton-loader
              v-for="index in 8"
              :key="index"
              :loading="true"
              type="avatar"
              height="64"
              width="100%"
              class="select-none flex items-center justify-center scroll-m-2"
            ></v-skeleton-loader>
          </div>
        </template>
        <!-- Mostrar mensaje de error si hay uno -->
        <template v-else-if="error">
          <div class="flex items-center justify-center w-full snap-always snap-start">
            <span class="text-red-500">Error: {{ error }}</span>
          </div>
        </template>
        <!-- Mostrar lista de canales -->
        <template v-else>
          <span
            v-for="(channel, index) in filteredChannels"
            :key="index"
            class="bg-muted rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full select-none snap-always snap-start"
            @click="onChannelClick(channel)"
          >
            <div class="flex items-center justify-center">
              <!-- Channel icon -->
              <ToolTip
                triggerIcon="Server"
                :tooltipContent="channel.name"
                placement="right"
                color="dark"
                :outline="true"
                :pill="true"
                :square="true"
              />
              <span class="ml-2 text-sm font-medium hidden">{{ channel.name }}</span>
            </div>
          </span>
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
import { useCurrentConversationStore } from '@/stores/conversations/currentConversationStore'
// Components
import ToolTip from '@/components/common/ToolTip.vue'
import { CircleDot } from 'lucide-vue-next'

const channelStore = useChannelStore()
const currentChannelStore = useCurrentChannelStore()
const currentConversationStore = useCurrentConversationStore()

const { channels, loading: loadingChannels, error } = storeToRefs(channelStore)

const filteredChannels = computed(() => {
  return channels.value.filter((channel) => channel.status_channel)
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

const onPrimaryButtonClick = () => {
  console.log('Primary button clicked')
}

const onChannelClick = (channel) => {
  currentChannelStore.updateCurrentChannel(channel.id_channel, channel.name)
  currentConversationStore.clearCurrentConversation()
}
</script>

<style>
@import '@/assets/sidebar-scrollbar.css';
</style>