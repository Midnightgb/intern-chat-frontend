<template>
  <fwb-modal size="xl" position="center" @close="$emit('close')">
    <template #header>
      <h3 class="text-xl font-medium text-gray-900 dark:text-white">
        Edit User
      </h3>
    </template>
    <template #body>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
          <input type="text" id="name" v-model="editedUser.full_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario de red</label>
          <input type="email" id="email" v-model="editedUser.network_user" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div>
          <label for="dominio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dominio</label>
          <input type="text" id="dominio" v-model="editedUser.dominio" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
          <input type="password" id="password" v-model="editedUser.password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div>
          <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol</label>
          <select id="role" v-model="editedUser.role_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            <option value="1">Super Admin</option>
            <option value="2">Administrador</option>
            <option value="3">Agente</option>
          </select>
        </div>
        <div>
          <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
          <select id="status" v-model="editedUser.status_user" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
        <div>
          <label for="photo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Foto del usuario</label>
          <div class="flex items-center space-x-4">
            <input type="file" id="photo" @change="handleFileUpload" accept="image/*" class="hidden">
            <label for="photo" class="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Seleccionar archivo</label>
          </div>
          <div v-if="imagePreview" class="mt-4 flex justify-center">
            <img :src="imagePreview" alt="Vista previa de la foto" class="h-32 w-32 object-cover rounded-full border-4 border-blue-500 shadow-lg">
          </div>
        </div>
        
      </form>
    </template>
    <template #footer>
      <fwb-button @click="handleSubmit" color="blue">Save changes</fwb-button>
      <fwb-button @click="$emit('close')" color="gray">Cancel</fwb-button>
    </template>
  </fwb-modal>
</template>

<script setup>
import { ref } from 'vue'
import { FwbModal, FwbButton } from 'flowbite-vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'user-updated'])

const editedUser = ref({ ...props.user })

const handleSubmit = () => {
  // Aquí iría la lógica para actualizar el usuario
  // Por ejemplo, una llamada a la API
  // updateUser(editedUser.value)
  emit('user-updated', editedUser.value)
  emit('close')
}

const file = ref(null);
const imagePreview = ref(null);
const error = ref(null);

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
      editedUser.value.file = e.target.result;
    };
    reader.readAsDataURL(file.value);
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>