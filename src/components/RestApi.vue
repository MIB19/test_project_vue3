<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { computed, onBeforeMount } from 'vue';
import { ref } from 'vue';
import ConfirmModal from '../components/modal/ConfirmModal.vue'
import FormModal from '../components/modal/FormModal.vue'
import router from '@/router';
// import type { User } from '@/util/User';

const usersStore = useUsersStore()

const user = ref()
const status = ref<string>('')
const isLoading = ref<boolean>(true)
const openConfirm = ref<boolean>(false)
const openForm = ref<boolean>(false)
const edit = ref<number | null>()

const getDataUser = computed(() => {
  if (edit.value) {
    return user.value.filter(function(el: any) { return el.id === edit.value })[0]
  } else {
    return {}
  }
})

// router link function 
function visitLink(url: string) {
  window.open('https://' + url)
}
function toHome() {
  router.push('/')
}

// delete data function
function deleteData() {
  usersStore.deleteUser(edit.value || 0)
  openConfirm.value = false
  setData()
  edit.value = null
}
function closeConfirm() {
  edit.value = null
  openConfirm.value = false
}
function showConfirm(id: number) {
  edit.value = id
  openConfirm.value = true
}

// function to open modal form data
function showForm(sts: string, id?: number) {
  if (id) {
    edit.value = id
  }
  status.value = sts
  openForm.value = true
}

// function to close modal form data
function closeForm() {
  edit.value = null
  status.value = ''
  openForm.value = false
}

// handling submit form
function submitForm(value: any) {
  if (status.value === 'create') {
    usersStore.addData(value.value)
  } else {
    usersStore.updateData(value.value, edit.value ? edit.value : 0)
  }
  edit.value = null
  openForm.value = false
  status.value = ''
}

//function for refresh data
function setData() {
  user.value = usersStore.getUser
}


onBeforeMount(async () => {
  await usersStore.loadUser()
  setData()
  isLoading.value = false
})
</script>
<template>
  <figure v-if="!isLoading" class="w-full flex min-h-screen flex bg-gray-500 flex-col lg:px-24 md:px-12 py-24 sm:px-6 px-3">
    <h1 class="text-4xl font-semibold mt-10 text-white">Tabel User</h1>
    <button class="w-36 h-10 bg-gray-100 hover:bg-gray-300 text-gray-700 font-medium rounded-full mt-14" @click="showForm('create')">+ Tambah Data</button>
    
    <!-- table section -->
    <div class="w-full mt-2 overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-400">
        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Nama
            </th>
            <th scope="col" class="px-6 py-3">
              Username
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Website
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(usr, i) in user" :key="i" class="border-b bg-gray-800 border-gray-700 hover:bg-gray-50 hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
              {{ usr.name }}
            </th>
            <td class="px-6 py-4">
              {{ usr.username }}
            </td>
            <td class="px-6 py-4">
              {{ usr.email }}
            </td>
            <td class="px-6 py-4" :class="usr.website ? 'hover:cursor-pointer hover:underline hover:text-white' : ''" @click.stop="usr.website ? visitLink(usr.website) : ''">
              {{ usr.website }}
            </td>
            <td class="px-4 py-3 flex flex-row gap-1.5 items-center">
              <button
                class="py-1.5 px-2.5 rounded-md border hover:bg-gray-100 hover:text-gray-800"
                @click="showForm('update', usr.id)"
              >
                <font-awesome-icon icon="fa-solid fa-pencil" />
              </button>
              <button class="py-1.5 px-2.5 rounded-md border hover:bg-gray-100 hover:text-gray-800" @click.stop="showConfirm(usr.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- End of Table Section -->
    <button class="flex flex-row items-center gap-3 text-white mt-12" @click="toHome">
      <font-awesome-icon icon="fa-solid fa-arrow-right" class="rotate-180" />
      <span class="text-white text-lg font-medium">Back to home</span>
    </button>


    <!-- Modal Component -->
    <ConfirmModal v-if="openConfirm" @ok="deleteData" @close="closeConfirm" />
    <FormModal v-if="openForm" :datas="getDataUser" :status="status" @close="closeForm" @ok="submitForm" />
  </figure>
</template>