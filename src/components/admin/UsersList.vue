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
        <div v-if="isLoading" class="absolute inset-0 bg-gray-100 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 flex items-center justify-center z-10">
          <fwb-spinner size="12" />
        </div>
        <UserListTable 
          :users="users" 
          :pagination="pagination" 
          @page-change="handlePageChange"
          @limit-change="handleLimitChange"
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
import { getUsers, createUser } from '@services/api'
import { ref, onMounted } from 'vue'
import HeaderTab from '@components/common/HeaderTab.vue'
import { FwbButton, FwbSpinner, FwbModal } from 'flowbite-vue'
import UserListTable from '@admin/users/UserListTable.vue'
import UserForm from '@admin/users/UserForm.vue'
import { UserPlus } from 'lucide-vue-next'

const users = ref([])
const pagination = ref({
  page: 1,
  limit: 20,
  total_pages: 1,
  total_users: 0
})
const isLoading = ref(false)
const isShowModal = ref(false)

onMounted(async () => {
  await fetchUsers()
})

async function fetchUsers(page = 1) {
  isLoading.value = true
  try {
    const response = await getUsers(page, pagination.value.limit)
    users.value = response.data.users
    pagination.value = {
      page: response.data.page,
      limit: response.data.limit,
      total_pages: response.data.total_pages,
      total_users: response.data.total_users
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    isLoading.value = false
  }
}

async function handlePageChange(newPage) {
  await fetchUsers(newPage)
}

function openModal() {
  isShowModal.value = true
}

function closeModal () {
   
  isShowModal.value = false
}

async function handleFormSubmit(formData) {
  try {
    isLoading.value = true
    await createUser(formData)
    isShowModal.value = false
    await fetchUsers()
  } catch (error) {
    console.error('Error creating user:', error)
  } finally {
    isLoading.value = false
  }
}

async function handleLimitChange(newLimit) {
  pagination.value.limit = newLimit
  await fetchUsers(1) // Reset to first page when changing limit
}
</script>

