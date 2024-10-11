<template>
  <div class="overflow-x-auto">
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
        <tr v-for="user in users" :key="user.id_user" class="border-b dark:border-gray-700">
          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ user.id_user }}
          </th>
          <td class="px-4 py-3">{{ user.network_user }}</td>
          <td class="px-4 py-3">{{ user.full_name }}</td>
          <td class="px-4 py-3">{{ user.status_user ? 'Activo' : 'Inactivo' }}</td>
          <td class="px-4 py-3">{{ user.role.name }}</td>
          <td class="px-4 py-3 flex items-center justify-end">
            <UserListActions :user="user" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import UserListActions from './UserListActions.vue'

defineProps({
  users: {
    type: Array,
    required: true
  }
})
</script>

