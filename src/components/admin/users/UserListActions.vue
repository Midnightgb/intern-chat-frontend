<template>
  <fwb-dropdown placement="left">
    <template #trigger>
      <button :id="`user-${user.id_user}-dropdown-button`"
        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
        type="button">
        <Ellipsis />
      </button>
    </template>
    <div class="z-50">
      <fwb-list-group class="bg-white rounded-lg shadow dark:bg-gray-700">
        <fwb-list-group-item v-for="action in availableActions" :key="action.value" @click="handleAction(action.value)"
          class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
          {{ action.label }}
        </fwb-list-group-item>
      </fwb-list-group>
    </div>
  </fwb-dropdown>

  <UserViewModal v-if="showViewModal" :user="user" @close="showViewModal = false" />
  <UserEditModal v-if="showEditModal" :user="user" @close="showEditModal = false" @user-updated="handleUserUpdated" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { Ellipsis } from 'lucide-vue-next'
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
import Swal from 'sweetalert2'
import UserViewModal from './UserViewModal.vue'
import UserEditModal from './UserEditModal.vue'
import { deleteUser } from '@/services/api'

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  actions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['user-updated', 'user-deleted'])

const showViewModal = ref(false)
const showEditModal = ref(false)

const actionMap = {
  view: { label: 'Ver', value: 'show' },
  edit: { label: 'Editar', value: 'edit' },
  delete: { label: 'Eliminar', value: 'delete' }
}

const availableActions = computed(() => {
  return props.actions.map(action => actionMap[action]).filter(Boolean)
})

const handleAction = (action) => {
  switch (action) {
    case 'show':
      showViewModal.value = true
      break
    case 'edit':
      showEditModal.value = true
      break
    case 'delete':
      confirmDelete()
      break
  }
}

const confirmDelete = () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'Cancelar',
    customClass: {
      container: 'swal2-container-custom'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const id_user = props.user.id_user
      console.log('id_user', id_user)
      handleDeleteUser(id_user)
    }
  })
}

const handleDeleteUser = async (id_user) => {
  try {
    console.log('eliminando', id_user)
    await deleteUser(id_user)
    Swal.fire({
      title: 'Eliminado!',
      text: 'El usuario ha sido eliminado.',
      icon: 'success',
      customClass: {
        container: 'swal2-container-custom'
      }
    })
    emit('user-deleted', id_user)
  } catch (error) {
    console.error(error)
    Swal.fire({
      title: 'Error!',
      text: 'No se pudo eliminar el usuario. Por favor, intente nuevamente.',
      icon: 'error',
      customClass: {
        container: 'swal2-container-custom'
      }
    })
  }
}

const handleUserUpdated = (updatedUser) => {
  emit('user-updated', updatedUser)
}
</script>

<style>
body.swal2-shown> :not(.swal2-container) {
  transition: 0.1s filter;
  filter: blur(3px);
}
</style>
