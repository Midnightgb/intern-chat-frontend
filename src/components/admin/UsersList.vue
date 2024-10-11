<template>
  <article class="relative overflow-hidden">
    <HeaderTab title="Usuarios" description="Gestiona todos los usuarios existentes o añade uno nuevo">
      <fwb-button>
        <template #prefix>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-2 -ml-1" viewBox="0 0 20 20" fill="currentColor"
            aria-hidden="true">
            <path
              d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
          </svg>
        </template>
        Añadir nuevo usuario
      </fwb-button>
    </HeaderTab>
    <section class="flex flex-col gap-4 p-4">
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg ">
        <UserListFilters />
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
import UserListFilters from '@admin/users/UserListFilters.vue'
import UserListTable from '@admin/users/UserListTable.vue'
import UserListPagination from '@admin/users/UserListPagination.vue'

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