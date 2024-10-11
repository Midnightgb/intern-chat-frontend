<script setup>
import { ref } from 'vue';
import { useAuthHandlers } from '@handlers/auth'
import { X, Users, Radio, Shield, UserCog, History } from 'lucide-vue-next'

const currentComponent = ref('Usuarios');
const { handleAdminPanel } = useAuthHandlers()

const closeAdminView = () => {
  handleAdminPanel(false)
};

const components = [
  { name: 'Usuarios', icon: Users },
  { name: 'Canales', icon: Radio },
  { name: 'Permisos', icon: Shield },
  { name: 'Roles', icon: UserCog },
  { name: 'Historial', icon: History }
];
</script>

<template>
  <div class="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-hidden">
    <div class="flex h-full">
      <aside class="w-64 bg-gray-100 dark:bg-gray-800 p-6 border-r border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Panel de Admin</h2>
          <button @click="closeAdminView" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X class="w-6 h-6" />
          </button>
        </div>
        <nav>
          <ul class="space-y-2">
            <li v-for="component in components" :key="component.name">
              <a 
                href="#" 
                @click="currentComponent = component.name" 
                :class="[
                  'flex items-center py-2 px-4 rounded transition-colors',
                  currentComponent === component.name 
                    ? 'bg-blue-500 text-white dark:bg-blue-600' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                ]"
              >
                <component :is="component.icon" class="w-5 h-5 mr-3" />
                {{ component.name }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main class="flex-grow p-8 overflow-auto">
        <h2 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">{{ currentComponent }}</h2>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p class="text-gray-600 dark:text-gray-300">Contenido de {{ currentComponent }}</p>
        </div>
      </main>
    </div>
  </div>
</template>