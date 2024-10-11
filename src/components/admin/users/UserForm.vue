<template>
  <form @submit.prevent="submitForm">
    <div class="grid gap-4 mb-4 sm:grid-cols-2">
      <div>
        <label for="network_user" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario de red</label>
        <input type="text" id="network_user" v-model="formData.network_user" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="BB0000" required>
      </div>
      <div>
        <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre completo</label>
        <input type="text" id="full_name" v-model="formData.full_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="John Doe" required>
      </div>
      <div>
        <label for="photo_url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL de la foto</label>
        <input type="url" id="photo_url" v-model="formData.photo_url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="https://example.com/avatar.jpg" required>
      </div>
      <div>
        <label for="dominio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dominio</label>
        <input type="text" id="dominio" v-model="formData.dominio" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example.com" required>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
        <input type="password" id="password" v-model="formData.password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required>
      </div>
      <div>
        <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol</label>
        <select id="role" v-model="formData.role_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
          <option value="1">Agente</option>
          <option value="2">Administrador</option>
          <option value="3">Super Admin</option>
        </select>
      </div>
    </div>
    <button type="submit" class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
      <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
      Añadir nuevo usuario
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  network_user: '',
  full_name: '',
  photo_url: '',
  dominio: '',
  password: '',
  role_id: '1'
});

const emit = defineEmits(['submit']);

const submitForm = () => {
  emit('submit', formData.value);
};
</script>

