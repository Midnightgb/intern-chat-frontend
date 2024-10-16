<template>
  <div>
    <UserListFilters @filter-change="applyFilters" />
    <ListTable
      :items="filteredUsers"
      :headers="['ID Usuario', 'Usuario de red', 'Nombre completo', 'Estado', 'Rol']"
      :fields="['id_user', 'network_user', 'full_name', 'status_user', 'role']"
      keyField="id_user"
      :formatters="formatters"
      :hasActions="true"
    >
      <template #cell-id_user="{ value }">
        <TruncatedContent :content="value" :max-length="10" />
      </template>
      <template #cell-status_user="{ value }">
        {{ value ? 'Activo' : 'Inactivo' }}
      </template>
      <template #cell-role="{ value }">
        {{ value.name }}
      </template>
      <template #actions="{ item }">
        <div v-if="!isSuperAdmin && item.role.name !== 'SUPERADMIN'">
          <UserListActions
            :user="item"
            :actions="['view', ...(item.role.name === 'AGENTE' ? ['edit'] : []), 'toggle']"
            @user-updated="handleUserUpdated"
          />
        </div>
        <div v-else>
          <UserListActions
            :user="item"
            :actions="['view', 'edit', 'toggle']"
            @user-updated="handleUserUpdated"
          />
        </div>
      </template>
    </ListTable>
    <UserListPagination :pagination="pagination" @page-change="onPageChange" @limit-change="onLimitChange" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ListTable from '@admin/common/ListTable.vue'
import TruncatedContent from '@components/common/TruncatedContent.vue'
import UserListActions from './UserListActions.vue'
import UserListFilters from './UserListFilters.vue'
import UserListPagination from './UserListPagination.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@stores/auth'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const isSuperAdmin = computed(() => user.value.role === 'SUPERADMIN')

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

const emit = defineEmits(['page-change', 'limit-change', 'user-updated'])

const activeFilters = ref({})

const applyFilters = (filters) => {
  activeFilters.value = filters
}

const filteredUsers = computed(() => {
  return props.users.filter(user => {
    if (activeFilters.value.true && !user.status_user) return false
    if (activeFilters.value.false && user.status_user) return false
    const roleFilters = ['AGENTE', 'ADMIN', 'SUPERADMIN']
    const activeRoleFilters = roleFilters.filter(role => activeFilters.value[role])
    if (activeRoleFilters.length > 0 && !activeRoleFilters.includes(user.role.name)) return false
    return true
  })
})

const formatters = {
  id_user: (value) => value,
  network_user: (value) => value,
  full_name: (value) => value,
  status_user: (value) => value ? 'Activo' : 'Inactivo',
  role: (value) => value.name
}

const onPageChange = (newPage) => {
  emit('page-change', newPage)
}

const onLimitChange = (newLimit) => {
  emit('limit-change', newLimit)
}

const handleUserUpdated = (updatedUser) => {
  emit('user-updated', updatedUser)
}
</script>