<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import InputForm from '../form/InputForm.vue';
import message from 'ant-design-vue/lib/message'
import 'ant-design-vue/lib/message/style/css';

const props = defineProps({
  datas: { type: [Object], required: false },
  status: { type: String, required: true }
})
const emit = defineEmits(['ok', 'close'])

const data = ref<any>({
  name: '',
  username: '',
  email: '',
  website: ''
})

// const currentData = computed(() => {
//   return props.data
// })
const errorLabel = computed(() => {
  if (!data.value.name) {
    return 'lengkapi nama terlebih dahulu !'
  } else if (!data.value.username) {
    return 'lengkapi username terlebih dahulu !'
  } else if (!data.value.email) {
    return 'lengkapi email terlebih dahulu !'
  } else {
    return 'lengkapi website terlebih dahulu !'
  }
})

function btnClose() {
  emit('close')
}
function dontClose() {
  //
}
function btnOk() {
  if (data.value.name && data.value.username && data.value.email && data.value.website) {
    emit('ok', data)
  } else {
    showMessage()
  }
}
function showMessage() {
  message.error(errorLabel.value)
}

onBeforeMount(() => {
  if (props.status !== 'create') {
    data.value.name = props.datas?.name
    data.value.username = props.datas?.username
    data.value.email = props.datas?.email
    data.value.website = props.datas?.website
  }
})
</script>

<template>
  <div
    class="min-h-screen fixed top-0 left-0 flex justify-center items-center z-50 w-screen bg-gray-500 bg-opacity-90"
    @click="btnClose"
  >
    <div
      class="w-80 h-86 flex flex-col p-4 items-center flex-wrap break-words bg-white shadow-md rounded-2xl"
      @click.stop="dontClose"
    >
      <div class="w-full flex flex-row justify-between">
        <span class="font-semibold text-lg">{{ props.status === 'create' ? 'Tambah Data' : 'Ubah Data' }}</span>
        <font-awesome-icon
          icon="fa-solid fa-times"
          class="cursor-pointer"
          @click.stop="btnClose"
        />
      </div>
      <div class="flex flex-col mt-4 mb-4 w-full">
        <InputForm v-model="data.name" label="Nama" />
        <InputForm v-model="data.username" label="Username" />
        <InputForm v-model="data.email" label="Email" type="email" />
        <InputForm v-model="data.website" label="Website" />
      </div>
      <button class="mt-3 py-2 w-full rounded-full border border-gray-700 text-gray-700 hover:text-white font-medium hover:bg-gray-700" @click="btnOk">{{ props.status === 'create' ? 'Tambah data' : 'Ubah Data' }}</button>
    </div>
  </div>
</template>