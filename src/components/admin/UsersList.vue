<template>
  <div>UsersList</div>
</template>

<script setup>
import { getUsers } from '@services/api'
import { ref, onMounted } from 'vue'

const users = ref([])

onMounted(async () => {
  users.value = await getUsersFromDB()
})

async function getUsersFromDB() {
  try {
    const response = await getUsers()
    console.log("response.data", response.data)
    return response.data
  } catch (error) {
    console.error('Error en searchUserInDB:', error)
    return []
  }
}
</script>
