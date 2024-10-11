<template>
  <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
    <div
      class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
      <div class="flex items-center space-x-3 w-full md:w-auto">
        <fwb-dropdown>
          <template #trigger>
            <button
              class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              type="button">
              <Filter />
              Filtros
              <ChevronDown />
            </button>
          </template>
          <fwb-list-group class="bg-white rounded-lg shadow dark:bg-gray-700">
            <fwb-list-group-item v-for="filter in filters" :key="filter.value">
              <fwb-checkbox 
                v-model="selectedFilters[filter.value]" 
                :value="filter.value" 
                :label="filter.label" 
              />
            </fwb-list-group-item>
          </fwb-list-group>
        </fwb-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Filter, ChevronDown } from 'lucide-vue-next'
import { reactive, watch } from 'vue'
import { FwbCheckbox, FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'

const filters = [
  { value: 'true', label: 'Activo' },
  { value: 'false', label: 'Inactivo' },
  { value: 'AGENTE', label: 'Agente' },
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'SUPERADMIN', label: 'Super Admin' },
]

const selectedFilters = reactive(
  Object.fromEntries(filters.map(filter => [filter.value, false]))
)

watch(() => selectedFilters.true, (newVal) => {
  if (newVal) selectedFilters.false = false
})

watch(() => selectedFilters.false, (newVal) => {
  if (newVal) selectedFilters.true = false
})

const roleWatcher = (role, conflictingRoles) => {
  watch(() => selectedFilters[role], (newVal) => {
    if (newVal) {
      conflictingRoles.forEach(r => selectedFilters[r] = false)
    }
  })
}

roleWatcher('AGENTE', ['ADMIN', 'SUPERADMIN'])
roleWatcher('ADMIN', ['AGENTE', 'SUPERADMIN'])
roleWatcher('SUPERADMIN', ['AGENTE', 'ADMIN'])
</script>