<template>
  <form @submit.prevent="submitForm">
    <div class="grid gap-4 mb-4 sm:grid-cols-2">
      <div>
        <label for="network_user" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario de
          red</label>
        <input type="text" id="network_user" v-model="formData.network_user"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="BB0000" required>
      </div>
      <div>
        <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre
          completo</label>
        <input type="text" id="full_name" v-model="formData.full_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="John Doe" required>
      </div>

      <div class="col-span-2 bg-slate-200 dark:bg-slate-600 p-4 rounded-lg shadow-md">
        <label for="photo" class="block mb-2 text-lg font-semibold text-gray-800 dark:text-white">Foto del usuario</label>
        <div class="flex items-center space-x-4">
          <input type="file" id="photo" @change="handleFileUpload" accept="image/*" class="hidden">
          <label for="photo"
            class="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            Seleccionar archivo
          </label>
        </div>
        <div v-if="imagePreview" class="mt-4 flex justify-center">
          <img :src="imagePreview" alt="Vista previa de la foto"
            class="h-32 w-32 object-cover rounded-full border-4 border-blue-500 shadow-lg">
        </div>
      </div>

      <div>
        <label for="dominio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dominio</label>
        <input type="text" id="dominio" v-model="formData.dominio"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="example.com">
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="formData.password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="••••••••" required>
          <button type="button" @click="togglePasswordVisibility" 
            class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Eye v-if="!showPassword" class="w-5 h-5" />
            <EyeOff v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
      <div>
        <fwb-select v-model="formData.role_id" :options="roles" label="Rol" required />
        <div v-if="error" class="text-red-500 text-sm font-bold">{{ error }}</div>
      </div>
    </div>
    <div class="flex justify-between gap-2">
      <fwb-button type="submit">
        <div class="flex items-center">
          <Plus class="w-4 h-4 mr-2" />
          Añadir nuevo usuario
        </div>
      </fwb-button>
      <fwb-button type="button" color="red" @click="props.closeModal">
        Cancelar
      </fwb-button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { FwbButton, FwbSelect } from 'flowbite-vue';
import { Plus, Eye, EyeOff } from 'lucide-vue-next';

const props = defineProps({
  closeModal: {
    type: Function,
    required: true
  }
})

const roles = [
  { value: '3', name: 'Agente' },
  { value: '2', name: 'Administrador' },
  { value: '1', name: 'Super Admin' },
]

const formData = ref({
  network_user: '',
  full_name: '',
  file: '',
  dominio: '',
  password: '',
  role_id: ''
});

const file = ref(null);
const imagePreview = ref(null);
const error = ref(null);
const emit = defineEmits(['submit']);

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
      formData.value.file = e.target.result;
    };
    reader.readAsDataURL(file.value);
  }
};

const submitForm = () => {
   
  if (!formData.value.network_user || !formData.value.full_name || !formData.value.password || !formData.value.role_id) {
    error.value = "Todos los campos son requeridos";
    return 
  } 
  
  const formDataToSend = new FormData();
  Object.keys(formData.value).forEach(key => {
    formDataToSend.append(key, formData.value[key]);
  });
  
  if (file.value) {
    formDataToSend.append('file', file.value);
  }
  
  emit('submit', formDataToSend);
};

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
