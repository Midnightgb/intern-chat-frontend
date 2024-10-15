<template>
    <section>
        <ToolTip triggerIcon="Settings" tooltipContent="Ajustes de usuario" :outline="true" :pill="true" :square="true"
            @click="isOpen = true" />
        <div v-if="isOpen"
            class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl h-[90vh] overflow-y-auto">
                <div class="container mx-auto py-5 px-9">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">{{ headerTitle }}</h2>
                        <button @click="isOpen = false"
                            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span class="sr-only">Cerrar</span>
                        </button>
                    </div>

                    <div v-if="user" class="flex gap-6">
                        <!-- Columna izquierda (información principal) -->
                        <div class="space-y-6 flex-1">
                            <div class="flex items-center space-x-4">
                                <!-- Avatar -->
                                <span
                                    class="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 text-2xl font-bold">
                                    <ImageLoader 
                                        v-if="currentContentPhoto" 
                                        :message="{ photo_url: currentContentPhoto }"
                                        class="aspect-square h-full w-full" 
                                    />
                                    <CircleUserRound v-else size="32" class="aspect-square h-full w-full" />
                                </span>
                                <!-- Nombre -->
                                <div class="space-y-2 flex-1">
                                    <label for="name"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                                    <input id="name" v-model="currentContentName" type="text" disabled
                                        class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white" />
                                </div>
                            </div>

                            <!-- Cantidad de mensajes -->
                            <div class="space-y-2">
                                <label for="type"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad de
                                    mensajes</label>
                                <input id="messageCount" v-model="currentContentMessage" type="text" disabled
                                    class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white" />
                            </div>

                            <!-- Cantidad de Integrantes -->
                            <div class="space-y-2">
                                <label for="memberCount"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad de
                                    Integrantes</label>
                                <input id="memberCount" :value="totalIntegrantes" type="text" disabled
                                    class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white" />
                            </div>

                            <!-- Botón Limpiar Chat solo para canales -->
                            <div v-if="currentContentType === 'Channel'" class="space-y-2">
                                <button
                                    class="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                    @click="showDateInputs = true">
                                    Limpiar Chat
                                </button>
                            </div>

                            <!-- Inputs para fechas -->
                            <div v-if="showDateInputs" class="space-y-4 mt-4">
                                <div class="flex space-x-4">
                                    <div class="flex-1">
                                        <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Inicio (DD-MM-YYYY)</label>
                                        <input 
                                            id="startDate" 
                                            v-model="startDate" 
                                            type="text"
                                            placeholder="DD-MM-YYYY"
                                            @input="formatDateInput('start')"
                                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white" 
                                        />
                                    </div>
                                    <div class="flex-1">
                                        <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Final (DD-MM-YYYY)</label>
                                        <input 
                                            id="endDate" 
                                            v-model="endDate" 
                                            type="text"
                                            placeholder="DD-MM-YYYY"
                                            @input="formatDateInput('end')"
                                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white" 
                                        />
                                    </div>
                                </div>
                                <div class="flex justify-between mt-4">
                                    <button @click="confirmDates" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Confirmar</button>
                                    <button @click="cancelDates" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Cancelar</button>
                                </div>
                            </div>
                        </div>
                        <!-- Columna derecha (lista de usuarios) -->
                        <div class="flex-1 space-y-4">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Usuarios</h3>
                            <div v-if="currentContentStore.loading" class="text-center">
                                <p>Cargando usuarios...</p>
                            </div>
                            <ul v-else class="space-y-2">
                                <li v-for="(user, index) in uniqueUsers" :key="index"
                                    class="p-3 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm dark:text-white">
                                    {{ user.users.full_name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue';
import ToolTip from '@components/common/ToolTip.vue';
import { useAuthStore } from '@stores/auth';
import { useCurrentContentStore } from '@stores/messages/contentStore';
import { storeToRefs } from 'pinia';
import ImageLoader from '@components/common/AvatarLoader.vue';
import { CircleUserRound } from 'lucide-vue-next';

const authStore = useAuthStore();
const currentContentStore = useCurrentContentStore();

const { user } = storeToRefs(authStore);
const { currentContentName, currentContentPhoto, currentContentMessage, currentContentType, currentContentChannelId, currentContentUsers } = storeToRefs(currentContentStore);

const isOpen = ref(false);
const showDateInputs = ref(false); // Para controlar la visualización de los inputs de fecha
const startDate = ref(''); // Para almacenar la fecha de inicio
const endDate = ref(''); // Para almacenar la fecha final

const totalIntegrantes = computed(() => {
    return currentContentType.value === 'Conversation' ? 2 : currentContentMessage.value;
});

const headerTitle = computed(() => {
    return currentContentType.value === 'Conversation' ? 'Información de la conversación' : 'Información del canal';
});


function confirmDates() {
    // Validar el formato de las fechas
    if (!isValidDateFormat(startDate.value) || !isValidDateFormat(endDate.value)) {
        alert('Por favor, introduce las fechas en el formato DD-MM-YYYY y sin letras.');
        return;
    }

    console.log('Fechas confirmadas:', startDate.value, endDate.value);
    // Aquí puedes agregar la lógica que necesites para manejar las fechas.
    showDateInputs.value = false; // Cerrar el formulario de fechas.
}


function cancelDates() {
    showDateInputs.value = false; // Cerrar el formulario de fechas.
}

function formatDateInput(type) {
    let inputValue = type === 'start' ? startDate.value : endDate.value;

    // Eliminar caracteres no permitidos
    inputValue = inputValue.replace(/[^0-9-]/g, '');

    // Formatear la entrada para agregar guiones automáticamente
    if (inputValue.length > 10) {
        inputValue = inputValue.slice(0, 10);
    } else {
        if (inputValue.length > 2 && inputValue.charAt(2) !== '-') {
            inputValue = inputValue.slice(0, 2) + '-' + inputValue.slice(2);
        }
        if (inputValue.length > 5 && inputValue.charAt(5) !== '-') {
            inputValue = inputValue.slice(0, 5) + '-' + inputValue.slice(5);
        }
    }

    // Actualizar el valor del input correspondiente
    if (type === 'start') {
        startDate.value = inputValue;
    } else {
        endDate.value = inputValue;
    }
}

function isValidDateFormat(dateString) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/; // Formato DD-MM-YYYY
    return regex.test(dateString);
}

const uniqueUsers = computed(() => {
    const userMap = new Map();
    currentContentUsers.value.forEach(user => {
        if (!userMap.has(user.users.id_user)) {
            userMap.set(user.users.id_user, user);
        }
    });
    return Array.from(userMap.values());
});

watchEffect(() => {
    if (isOpen.value && currentContentType.value === 'Channel' && currentContentChannelId.value) {
        currentContentStore.getUsersChannel(currentContentChannelId.value).catch((error) => {
            console.error('Error fetching channel users:', error);
        });
    }
});
</script>

