//src/components/common/ImageLoader.vue
<template>
  <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 z-10">
    <v-skeleton-loader
      v-if="loading"
      type="avatar"
      class="absolute inset-0 custom-margin-avatar-loader"
    />
    <img
      v-if="cachedAvatarSrc"
      :src="cachedAvatarSrc"
      alt="User Avatar"
      class="aspect-square h-full w-full object-cover"
      @load="onImageLoad"
      @error="onImageError"
    />
    <CircleUserRound
      v-if="!cachedAvatarSrc || error"
      size="32"
      class="aspect-square h-full w-full"
    />
  </span>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { CircleUserRound } from 'lucide-vue-next'
import { imageCache } from '@/utils/imageCache'
import { getUserAvatar } from '@/utils/helpers'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const loading = ref(true)
const error = ref(false)
const cachedAvatarSrc = ref(null)

const avatarSrc = computed(() => {
  return getUserAvatar(
    props.message,
    props.message.user_recipient ? 'user_recipient' : props.message.users ? 'users' : props.message.photo_url ? 'photo_url' : 'users_send'
  )
})

function onImageLoad() {
  loading.value = false
}

function onImageError() {
  loading.value = false
  error.value = true
}

onMounted(async () => {
  if (avatarSrc.value) {
    try {
      cachedAvatarSrc.value = await imageCache.getImage(avatarSrc.value)
    } catch (error) {
      console.error('Error loading cached image:', error)
      cachedAvatarSrc.value = avatarSrc.value
    }
  }
  loading.value = false
})
</script>
<style lang="scss">
.custom-margin-avatar-loader .v-skeleton-loader__avatar {
  margin: 0 !important;
}
</style>
