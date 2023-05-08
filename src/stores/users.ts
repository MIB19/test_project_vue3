import axios from 'axios'
import { defineStore } from 'pinia'
import { type User } from '../util/User'

export type RootState = {
  users: User[];
};

export const useUsersStore = defineStore('users', {
  state: (): RootState => ({
    users: [],
  }),
  getters: {
    getUser: (state) => state.users,
  },
  actions: {
    async loadUser() {
      const storage = JSON.parse(localStorage.getItem('user') || '{}')
      if (Object.keys(storage).length === 0) {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users')
          this.setLocalStorage(response.data)
          this.users = response.data
        } catch (e) {
          console.error(e)
        }
      } else {
        this.users = storage
      }
    },
    addData(data: User) {
      let max_num = 0
      for (const i in this.users) {
        if (this.users[i].id > max_num) {
          max_num = this.users[i].id
        }
      }
      data.id = max_num
      this.users.push(data)
      this.setLocalStorage(this.users)
    },
    updateData(data: User, id: number) {
      const user = this.users
      for (const i in user) {
        if (user[i].id === id) {
          user[i].name = data.name
          user[i].username = data.username
          user[i].email = data.email
          user[i].website = data.website
        }
      }
      this.users = user
    },
    deleteUser(id: number) {
      this.users = this.users.filter(function(el) { return el.id !== id })
      this.setLocalStorage(this.users)
    },
    setLocalStorage(data: User[]) {
      localStorage.setItem('user', JSON.stringify(data))
    }
  },
})
