<template>
  <article class="relative">
    <HeaderTab title="Usuarios" description="Gestiona todos los usuarios existentes o añade uno nuevo">
      <fwb-button>
        <template #prefix>
          <UserPlus />
        </template>
        Añadir nuevo usuario
      </fwb-button>
    </HeaderTab>
    <section class="flex flex-col gap-4 p-4">
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg ">
        <UserListTable :users="users" />
        <UserListPagination :pagination="data" />
      </div>
    </section>
  </article>
</template>

<script setup>
import { getUsers } from '@services/api'
import { ref, onMounted } from 'vue'
import HeaderTab from '@components/common/HeaderTab.vue'
import { FwbButton } from 'flowbite-vue'
import UserListTable from '@admin/users/UserListTable.vue'
import UserListPagination from '@admin/users/UserListPagination.vue'
import { UserPlus } from 'lucide-vue-next'

const data = ref({})
const users = ref([])

onMounted(async () => {
  data.value = await getUsersFromDB()
  users.value = data.value.users

  data.value = {
    page: data.value.page,
    limit: data.value.limit,
    total_pages: data.value.total_pages,
    total_users: data.value.total_users
  }
  console.log('data', data.value)
  console.log('users', users.value)
})

async function getUsersFromDB(page = 1, limit = 10) {
  try {
    const response = await getUsers(page, limit)
    return response.data
  } catch (error) {
    console.error('Error en searchUserInDB:', error)
    return []
  }
}
</script>