<template>
  <div>
    <UserListFilters @filter-change="applyFilters" />
    <div class="relative">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-4 py-3">ID Usuario</th>
            <th scope="col" class="px-4 py-3">Usuario de red</th>
            <th scope="col" class="px-4 py-3">Nombre completo</th>
            <th scope="col" class="px-4 py-3">Estado</th>
            <th scope="col" class="px-4 py-3">Rol</th>
            <th scope="col" class="px-4 py-3">
              <span class="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id_user" class="border-b dark:border-gray-700">
            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <TruncatedContent :content="user.id_user" :max-length="10" />
            </th>
            <td class="px-4 py-3">{{ user.network_user }}</td>
            <td class="px-4 py-3">{{ user.full_name }}</td>
            <td class="px-4 py-3">{{ user.status_user ? 'Activo' : 'Inactivo' }}</td>
            <td class="px-4 py-3">{{ user.role.name }}</td>
            <td class="px-4 py-3 flex items-center justify-end">
              <div v-if="!isSuperAdmin && user.role.name !== 'SUPERADMIN'">
                <UserListActions :user="user" :actions="['view', ...(user.role.name === 'AGENTE' ? ['edit'] : []), ...(user.status_user ? ['delete'] : [])]"/>
              </div>
              <div v-else>  
                <UserListActions :user="user" :actions="['view', 'edit', ...(user.status_user ? ['delete'] : [])]" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <UserListPagination 
      :pagination="pagination" 
      @page-change="onPageChange"
      @limit-change="onLimitChange"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import TruncatedContent from '@components/common/TruncatedContent.vue'
import UserListActions from './UserListActions.vue'
import UserListFilters from './UserListFilters.vue'
import UserListPagination from './UserListPagination.vue'
import { useAuthStore } from '@stores/auth'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
console.log(user)
const isSuperAdmin = user.value.role === 'SUPERADMIN'
console.log(isSuperAdmin)

const props = defineProps({
  users: {
    type: Array,
    required: true
  },
  pagination: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['page-change', 'limit-change'])

const activeFilters = ref({})

const applyFilters = (filters) => {
  activeFilters.value = filters
}

const filteredUsers = computed(() => {
  return props.users.filter(user => {
    // Filter by status
    if (activeFilters.value.true && !user.status_user) return false
    if (activeFilters.value.false && user.status_user) return false

    // Filter by role
    const roleFilters = ['AGENTE', 'ADMIN', 'SUPERADMIN']
    const activeRoleFilters = roleFilters.filter(role => activeFilters.value[role])
    if (activeRoleFilters.length > 0 && !activeRoleFilters.includes(user.role.name)) return false

    return true
  })
})

const onPageChange = (newPage) => {
  emit('page-change', newPage)
}

const onLimitChange = (newLimit) => {
  emit('limit-change', newLimit)
}
</script>

