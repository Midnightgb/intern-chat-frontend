import { defineStore } from 'pinia'
import { getUsers, createUser, updateUser } from '@services/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: {},
    pageCache: {},
    pagination: {
      page: 1,
      limit: 20,
      total_pages: 1,
      total_users: 0
    },
    isLoading: false
  }),
  
  actions: {
    async fetchUsers(page = 1) {
      if (this.pageCache[page]) {
        this.pagination = { ...this.pageCache[page].pagination }
        return this.pageCache[page].users
      }

      this.isLoading = true
      try {
        const response = await getUsers(page, this.pagination.limit)
        const fetchedUsers = response.data.users

        fetchedUsers.forEach(user => {
          this.users[user.id_user] = user
        })

        this.pageCache[page] = {
          users: fetchedUsers.map(user => user.id_user),
          pagination: {
            page: response.data.page,
            limit: response.data.limit,
            total_pages: response.data.total_pages,
            total_users: response.data.total_users
          }
        }

        this.pagination = this.pageCache[page].pagination

        return fetchedUsers
      } catch (error) {
        console.error('Error fetching users:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async createUser(formData) {
      this.isLoading = true
      try {
        const newUser = await createUser(formData)
        this.users[newUser.id_user] = newUser
        this.invalidateCache()
        return newUser
      } catch (error) {
        console.error('Error creating user:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updateUser(userId, userData) {
      this.isLoading = true
      try {
        const updatedUser = await updateUser(userId, userData)
        this.users[userId] = updatedUser
        this.invalidateCache()
        return updatedUser
      } catch (error) {
        console.error('Error updating user:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async setLimit(newLimit) {
      this.pagination.limit = newLimit
      this.pagination.page = 1 // Reset to first page when changing limit
      await this.fetchUsers(1) // Fetch users with new limit
    },
    async invalidateCache() {
      this.pageCache = {}
      await this.fetchUsers(1)
    }
  },

  getters: {
    getUsersForCurrentPage: (state) => {
      const currentPage = state.pagination.page
      if (state.pageCache[currentPage]) {
        return state.pageCache[currentPage].users.map(id => state.users[id])
      }
      return []
    }
  }
})