// src/components/auth/LoginForm.vue
<template>
  <div class="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">
    <div class="min-h-screen flex fle-col items-center justify-center lg:p-6 p-4">
      <div class="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
        <div>
          <a href="javascript:void(0)">
            <img src="/images/logo-white-abai.png" alt="logo" class="w-52 mb-12 inline-block" />
          </a>
          <h2 class="text-4xl font-extrabold lg:leading-[50px] text-white">
            Bienvenido al Chat Interno de ABAI
          </h2>
          <p class="text-sm mt-6 text-white">
            Conecta con tus compañeros, colabora en proyectos y mantente al día con las últimas
            novedades de ABAI Group. Tu espacio para la comunicación interna y el trabajo en equipo.
          </p>
        </div>

        <form
          @submit.prevent="handleSubmit"
          class="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full text-black"
        >
          <h3 class="text-3xl font-extrabold mb-5 text-blue-900">Inicio de sesión</h3>
          <p v-if="error">
            <AlertMessage :message="error" type="danger" />
          </p>
          <div>
            <input
              id="network_user"
              v-model="state.network_user"
              type="text"
              autocomplete="username"
              required
              class="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800 text-gray-600 placeholder-gray-400"
              placeholder="Usuario"
              :class="{ 'border-red-500': v$.network_user.$error }"
            />
            <p v-if="v$.network_user.$error" class="mt-2 text-sm text-red-600">
              {{ v$.network_user.$errors[0].$message }}
            </p>
          </div>
          <div>
            <input
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800 text-gray-600 placeholder-gray-400"
              placeholder="Contraseña"
              id="password"
              v-model="state.password"
              :class="{ 'border-red-500': v$.password.$error }"
            />

            <p v-if="v$.password.$error" class="mt-2 text-sm text-red-600">
              {{ v$.password.$errors[0].$message }}
            </p>
          </div>
          <div>
            <FwbButton
              type="submit"
              :disabled="loading"
              :loading="loading"
              class="w-full flex justify-center shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300"
            >
              Iniciar Sesión
            </FwbButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
// Components
import { FwbButton } from 'flowbite-vue'
import useLogin from '@composables/useLogin'
import AlertMessage from '@components/common/StatusAlert.vue'

const emit = defineEmits(['login-success'])

const loading = ref(false)
const { state, v$, handleSubmit: originalHandleSubmit, error } = useLogin()

const handleSubmit = async () => {
  if (loading.value) return

  loading.value = true
  try {
    const loginSuccessful = await originalHandleSubmit()
    if (loginSuccessful) {
      emit('login-success')
    }
  } finally {
    loading.value = false
  }
}
</script>
