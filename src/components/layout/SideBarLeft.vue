<!-- src/components/layout/SideBarLeft.vue -->
<template>
  <aside
    class="bg-background dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 flex flex-col items-center gap-2 w-16 h-screen"
  >
    <div class="flex flex-col items-center gap-2 w-full h-full bg-gray-100 dark:bg-gray-800">
      <button class="rounded-lg p-2 w-full hover:bg-gray-200 dark:hover:bg-gray-700" @click="onPrimaryButtonClick">
        <div class="flex items-center justify-center">
          <CircleDot class="text-gray-600 dark:text-gray-300" />
        </div>
      </button>
      <div
        class="flex flex-col items-center p-2 gap-2 w-full flex-grow overflow-y-auto hide-scrollbar snap-y snap-mandatory bg-gray-100 dark:bg-gray-800"
      >
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
              class="select-none flex items-center justify-center scroll-m-2 custom-avatar-loader bg-gray-100 dark:bg-gray-800"
            ></v-skeleton-loader>
          </div>
        </template>
        <!-- Mostrar mensaje de error si hay uno -->
        <template v-else-if="error">
          <div class="flex items-center justify-center w-full snap-always snap-start bg-gray-100 dark:bg-gray-800">
            <span class="text-red-500 dark:text-red-400">Error: {{ error }}</span>
          </div>
        </template>
        <!-- Mostrar lista de canales -->
        <template v-else>
          <span
            v-for="(channel, index) in filteredChannels"
            :key="index"
            class="rounded-lg text-muted-foreground dark:text-gray-300 hover:bg-accent hover:text-accent-foreground dark:hover:text-white w-full select-none"
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
                :imgChannel="channel.image_channel"
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
import { useChannelStore } from '@stores/channels/channelStore'
import { useCurrentChannelStore } from '@stores/channels/currentChannelStore'
import { useCurrentConversationStore } from '@stores/conversations/currentConversationStore'
// Components
import ToolTip from '@components/common/ToolTip.vue'
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

<style lang="scss">
@import '@/assets/sidebar-scrollbar.css';
.custom-avatar-loader .v-skeleton-loader__avatar {
  max-height: 42px !important;
  min-height: 42px !important;

  max-width: 42px !important;
  min-width: 42px !important;
  
  width: 42px !important;
  height: 42px !important;
}
</style>
