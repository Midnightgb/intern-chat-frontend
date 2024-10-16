<template>
  <div>
    <UserListFilters @filter-change="applyFilters" />
    <div class="relative">
      <fwb-table hoverable>
        <fwb-table-head>
          <fwb-table-head-cell>
            ID Usuario
          </fwb-table-head-cell>
          <fwb-table-head-cell>
            Usuario de red
          </fwb-table-head-cell>
          <fwb-table-head-cell>
            Nombre completo
          </fwb-table-head-cell>
          <fwb-table-head-cell>
            Estado
          </fwb-table-head-cell>
          <fwb-table-head-cell>
            Rol
          </fwb-table-head-cell>
          <fwb-table-head-cell>
            <span class="sr-only">Acciones</span>
          </fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
          <fwb-table-row v-for="user in filteredUsers" :key="user.id_user">
            <fwb-table-cell>
              <TruncatedContent :content="user.id_user" :max-length="10" />
            </fwb-table-cell>
            <fwb-table-cell>
              {{ user.network_user }}
            </fwb-table-cell>
            <fwb-table-cell>
              {{ user.full_name }}
            </fwb-table-cell>
            <fwb-table-cell>
              {{ user.status_user ? 'Activo' : 'Inactivo' }}
            </fwb-table-cell>
            <fwb-table-cell>
              {{ user.role.name }}
            </fwb-table-cell>
            <fwb-table-cell>
              <div v-if="!isSuperAdmin && user.role.name !== 'SUPERADMIN'">
                <UserListActions :user="user"
                  :actions="['view', ...(user.role.name === 'AGENTE' ? ['edit'] : []), 'toggle']"
                  @user-updated="handleUserUpdated" />
              </div>
              <div v-else>
                <UserListActions :user="user" :actions="['view', 'edit', 'toggle']" @user-updated="handleUserUpdated" />
              </div>
            </fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>
    </div>
    <UserListPagination :pagination="pagination" @page-change="onPageChange" @limit-change="onLimitChange" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// components
import TruncatedContent from '@components/common/TruncatedContent.vue'
import {
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from 'flowbite-vue'
import UserListActions from './UserListActions.vue'
import UserListFilters from './UserListFilters.vue'
import UserListPagination from './UserListPagination.vue'
// stores
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@stores/auth'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const isSuperAdmin = user.value.role === 'SUPERADMIN'

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

const handleUserUpdated = (updatedUser) => {
  emit('user-updated', updatedUser)
}

</script>
