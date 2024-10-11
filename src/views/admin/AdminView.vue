<script setup>
import { ref } from 'vue';
import { useAuthHandlers } from '@handlers/auth'

const currentComponent = ref('Usuarios');
const { handleAdminPanel } = useAuthHandlers()

const closeAdminView = () => {
  handleAdminPanel(false)
};

const components = ['Usuarios', 'Canales', 'Permisos', 'Roles', 'Historial'];
</script>

<template>
  <div class="fixed inset-0 bg-white z-50">
    <button @click="closeAdminView" class="absolute top-4 left-4 text-2xl">&times;</button>
    <div class="flex h-full pt-16">
      <aside class="w-64 bg-gray-100 p-6">
        <nav>
          <ul class="space-y-2">
            <li v-for="component in components" :key="component">
              <a 
                href="#" 
                @click="currentComponent = component" 
                :class="[
                  'block py-2 px-4 rounded transition-colors',
                  currentComponent === component 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ component }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main class="flex-grow p-8">
        <h2 class="text-2xl font-bold mb-4">{{ currentComponent }}</h2>
        <p>Contenido de {{ currentComponent }}</p>
      </main>
    </div>
  </div>
</template>