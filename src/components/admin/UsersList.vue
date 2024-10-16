<template>
  <article class="relative">
    <HeaderTab title="Usuarios" description="Gestiona todos los usuarios existentes o añade uno nuevo">
      <fwb-button @click="openModal">
        <template #prefix>
          <UserPlus />
        </template>
        Añadir nuevo usuario
      </fwb-button>
    </HeaderTab>
    <section class="flex flex-col gap-4 p-4">
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg">
        <div v-if="userStore.isLoading" class="absolute inset-0 bg-gray-100 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 flex items-center justify-center z-10">
          <fwb-spinner size="12" />
        </div>
        <UserListTable 
          :users="userStore.getUsersForCurrentPage" 
          :pagination="userStore.pagination" 
          @page-change="handlePageChange"
          @limit-change="handleLimitChange"
          @user-updated="handleUserUpdated"
        />
      </div>
    </section>
    
    <fwb-modal v-if="isShowModal" size="xl" position="center" @close="closeModal">
      <template #header>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          Añadir nuevo usuario
        </h3>
      </template>
      <template #body>
        <UserForm @submit="handleFormSubmit" :close-modal="closeModal" />
      </template>
    </fwb-modal>
  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user/users'
import HeaderTab from '@components/common/HeaderTab.vue'
import { FwbButton, FwbSpinner, FwbModal } from 'flowbite-vue'
import UserListTable from '@admin/users/UserListTable.vue'
import UserForm from '@admin/users/UserForm.vue'
import { UserPlus } from 'lucide-vue-next'

const userStore = useUserStore()
const isShowModal = ref(false)

onMounted(async () => {
  await userStore.fetchUsers()
})

async function handlePageChange(newPage) {
  await userStore.fetchUsers(newPage)
}

function openModal() {
  isShowModal.value = true
}

function closeModal() {
  isShowModal.value = false
}

async function handleFormSubmit(formData) {
  try {
    await userStore.createUser(formData)
    isShowModal.value = false
    await userStore.fetchUsers(1)
  } catch (error) {
    console.error('Error creating user:', error)
  }
}

async function handleLimitChange(newLimit) {
  userStore.pagination.limit = newLimit
  await userStore.fetchUsers(1)
}

async function handleUserUpdated(updatedUser) {
  await userStore.updateUser(updatedUser.id_user, updatedUser)
  await userStore.fetchUsers(userStore.pagination.page)
}
</script>