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
import { toggleUserStatus } from '@/services/api'

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

const labelMap = {
  view: 'Ver',
  edit: 'Editar',
  toggle: (user) => user.status_user ? 'Desactivar' : 'Activar'
}

const actionMap = {
  view: { label: labelMap.view, value: 'show' },
  edit: { label: labelMap.edit, value: 'edit' },
  toggle: { label: labelMap.toggle(props.user), value: 'toggle' }
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
    case 'toggle':
      confirmToggleStatus()
      break
  }
}

const handleUserUpdated = (updatedUser) => {
  emit('user-updated', updatedUser)
}

const confirmToggleStatus = () => {
  const action = props.user.status_user ? 'desactivar' : 'activar'
  Swal.fire({
    title: `¿Estás seguro?`,
    text: `¿Deseas ${action} este usuario?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `Sí, ${action}!`,
    cancelButtonText: 'Cancelar',
    customClass: {
      container: 'swal2-container-custom'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      handleToggleUserStatus(props.user.id_user)
    }
  })
}

const handleToggleUserStatus = async (id_user) => {
  try {
    await toggleUserStatus(id_user)
    const action = props.user.status_user ? 'desactivado' : 'activado'
    Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)}!`,
      text: `El usuario ha sido ${action}.`,
      icon: 'success',
      customClass: {
        container: 'swal2-container-custom'
      }
    })
    emit('user-updated', { ...props.user, status_user: !props.user.status_user })
  } catch (error) {
    console.error(error)
    Swal.fire({
      title: 'Error!',
      text: `No se pudo ${props.user.status_user ? 'desactivar' : 'activar'} el usuario. Por favor, intente nuevamente.`,
      icon: 'error',
      customClass: {
        container: 'swal2-container-custom'
      }
    })
  }
}
</script>

<style>
body.swal2-shown> :not(.swal2-container) {
  transition: 0.1s filter;
  filter: blur(3px);
}
</style>
