<script setup lang="ts">
const emit = defineEmits(['ok', 'close'])

function btnClose() {
  emit('close')
}
function dontClose() {
  //
}
function btnOk() {
  emit('ok')
}
</script>

<template>
  <div
    class="min-h-screen fixed top-0 left-0 flex justify-center items-center z-50 w-screen bg-gray-500 bg-opacity-90"
    @click="btnClose"
  >
    <div
      class="w-72 h-72 flex flex-col justify-center items-center flex-wrap break-words bg-white shadow-md rounded-2xl px-6"
      @click.stop="dontClose"
    >
      <font-awesome-icon
        icon="fa-solid fa-times"
        class="text-red-500 px-5 py-4 border-4 border-red-500 rounded-full"
        size="2xl"
      />
      <label class="font-semibold mt-4">Hapus Data ?</label>
      <label class="text-center text-sm mt-2">Data akan dihapus tidak dapat dikembalikan !</label>
      <div class="flex w-full flex-row justify-center items-center gap-4 mt-4">
        <button
          class="text-white w-full font-semibold bg-red-500 py-2 border hover:bg-red-600 border-red-500 hover:shadow-md rounded-lg"
          @click="btnOk"
        >
          Hapus
        </button>
        <button
          class="bg-white py-2 border w-full font-semibold border-gray-700 rounded-lg hover:shadow-md text-gray-700"
          @click="btnClose"
        >
          Batal
        </button>
      </div>
    </div>
  </div>
</template>