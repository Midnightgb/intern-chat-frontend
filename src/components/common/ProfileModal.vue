<template>
  <div>
    <ToolTip
      triggerIcon="Settings"
      tooltipContent="Ajustes de usuario"
      :outline="true"
      :pill="true"
      :square="true"
      @click="isOpen = true"
    />
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] overflow-y-auto">
        <div class="container mx-auto py-10 px-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold">Información del Perfil</h2>
            <button @click="isOpen = false" class="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="sr-only">Cerrar</span>
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-6">
              <div class="flex items-center space-x-4">
                <div class="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
                  CN
                </div>
                <div class="space-y-2 flex-1">
                  <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                  <input id="name" v-model="name" type="text" placeholder="Tu nombre" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                </div>
              </div>
              <div class="space-y-2">
                <label for="type" class="block text-sm font-medium text-gray-700">Tipo de Usuario</label>
                <input id="type" v-model="type" type="text" placeholder="Tipo de usuario" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              </div>
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input id="email" v-model="email" type="email" placeholder="tu@ejemplo.com" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              </div>
              <div class="space-y-2">
                <label for="social" class="block text-sm font-medium text-gray-700">Usuario de Red Social</label>
                <input id="social" v-model="social" type="text" placeholder="@usuario" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              </div>
              <div class="space-y-2">
                <label for="theme" class="block text-sm font-medium text-gray-700">Tema de la Aplicación</label>
                <select id="theme" v-model="theme" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <option value="dark">Oscuro</option>
                  <option value="light">Claro</option>
                  <option value="system">Sistema</option>
                </select>
              </div>
            </div>
            <div class="space-y-6">
              <div class="space-y-2">
                <label for="fullName" class="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input id="fullName" v-model="fullName" type="text" placeholder="Nombre Completo" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              </div>
              <div class="space-y-2">
                <label for="domain" class="block text-sm font-medium text-gray-700">Dominio</label>
                <input id="domain" v-model="domain" type="text" placeholder="ejemplo.com" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              </div>
              <div class="space-y-2">
                <h3 class="text-lg font-semibold mb-2">Lista de Permisos</h3>
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permiso</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="permission in permissions" :key="permission.name">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ permission.name }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ permission.granted ? 'Concedido' : 'Denegado' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import ToolTip from '@components/common/ToolTip.vue'

const isOpen = ref(false)
const theme = ref('system')
const name = ref('')
const type = ref('')
const email = ref('')
const social = ref('')
const fullName = ref('')
const domain = ref('')

const permissions = ref([
  { name: "Leer archivos", granted: true },
  { name: "Escribir archivos", granted: true },
  { name: "Eliminar archivos", granted: false },
  { name: "Administrar usuarios", granted: true },
])

watchEffect(() => {
  const handleEsc = (event) => {
    if (event.key === 'Escape' && isOpen.value) {
      isOpen.value = false
    }
  }

  if (isOpen.value) {
    window.addEventListener('keydown', handleEsc)
  } else {
    window.removeEventListener('keydown', handleEsc)
  }

  return () => {
    window.removeEventListener('keydown', handleEsc)
  }
})
</script>