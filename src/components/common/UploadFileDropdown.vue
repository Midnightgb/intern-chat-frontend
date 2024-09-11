//src/components/common/UploadFileDropdown.vue
<template>
  <fwb-dropdown placement="top" text="top">
    <template #trigger>
      <Paperclip class="w-5 h-5 transition-colors cursor-pointer hover:text-blue-600" />
    </template>
    <fwb-list-group class="w-64 max-w-xs transition-opacity shadow-lg shadow-gray-500">
      <div class="relative p-2">
        <fwb-file-input
          v-if="!file"
          v-model="file"
          dropzone
          @change="handleFileChange"
        >
        </fwb-file-input>
        <div v-else class="relative">
          <img 
            v-if="filePreview" 
            :src="filePreview" 
            alt="File preview" 
            class="object-cover w-full h-32 rounded-lg"
          />
          <div v-else class="flex items-center justify-center w-full h-32 bg-gray-200 rounded-lg">
            <span class="text-sm text-gray-600">{{ file.name }}</span>
          </div>
          <button
            @click="clearFile"
            class="absolute p-1 bg-white rounded-full shadow-md top-2 right-2 hover:bg-gray-200"
          >
            <span class="text-xl text-red-600">✕</span>
          </button>
        </div>
      </div>
    </fwb-list-group>
  </fwb-dropdown>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Paperclip } from 'lucide-vue-next'
import { FwbFileInput, FwbDropdown, FwbListGroup } from 'flowbite-vue'

const file = ref(null)
const filePreview = ref(null)

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0]
  if (selectedFile) {
    file.value = selectedFile
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        filePreview.value = e.target.result
      }
      reader.readAsDataURL(selectedFile)
    } else {
      filePreview.value = null
    }
  }
}

const clearFile = () => {
  file.value = null
  filePreview.value = null
}

// Emitir el archivo seleccionado al componente padre
const emit = defineEmits(['fileSelected'])
watch(file, (newFile) => {
  emit('fileSelected', newFile)
})
</script>