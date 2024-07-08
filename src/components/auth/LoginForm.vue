<template>
  <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        v-model="state.email"
        type="email"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        :class="{ 'border-red-500': v$.email.$error }"
      >
      <p v-if="v$.email.$error" class="mt-2 text-sm text-red-600">{{ v$.email.$errors[0].$message }}</p>
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input
        id="password"
        v-model="state.password"
        type="password"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        :class="{ 'border-red-500': v$.password.$error }"
      >
      <p v-if="v$.password.$error" class="mt-2 text-sm text-red-600">{{ v$.password.$errors[0].$message }}</p>
    </div>
    <div>
      <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Sign in
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { loginValidators } from '@/validators/loginValidators'

const state = reactive({
  email: '',
  password: ''
})

const v$ = useVuelidate(loginValidators, state)

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    console.log('Form is valid. Submitting...', state)
  } else {
    console.log('Form is invalid')
  }
}
</script>