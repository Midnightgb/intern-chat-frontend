<template>
  <fwb-dropdown placement="top" text="top">
    <template #trigger>
      <Paperclip class="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
    </template>
    <fwb-list-group class="shadow-lg shadow-gray-500 transition-opacity max-w-xs w-64">
      <fwb-file-input
        v-model="file"
        dropzone
        @change="handleFileChange"
      />
      <div v-if="filePreview" class="relative mt-2">
        <img :src="filePreview" alt="File preview" class="w-full h-auto max-h-48 object-contain" />
        <button
          @click="clearFilePreview"
          class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
        >
          <span class="text-red-600 text-xl">✕</span>
        </button>
      </div>
    </fwb-list-group>
  </fwb-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { Paperclip } from 'lucide-vue-next'
import { FwbFileInput, FwbDropdown, FwbListGroup } from 'flowbite-vue'

const file = ref(null)
const filePreview = ref(null)

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0]
  if (selectedFile) {
    const reader = new FileReader()
    reader.onload = (e) => {
      filePreview.value = e.target.result
    }
    reader.readAsDataURL(selectedFile)
  }
}

const clearFilePreview = () => {
  filePreview.value = null
  file.value = null
}
</script>

<style scoped>
/* Aquí puedes añadir estilos específicos si es necesario */
</style>
