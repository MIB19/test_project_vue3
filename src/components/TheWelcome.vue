<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
function toRestApi() {
  router.push('/rest-api')
}
</script>

<template>
  <figure class="w-full flex flex-col min-h-screen items-center gap-8 justify-center">
    <h2 class="text-4xl font-semibold">Selamat datang di Aplikasi saya !</h2>
    <img src="/WelcomeBanner.svg" class="h-96 object-contain" />
    <button
      class="py-2 border-2 border-green-500 flex text-green-500 flex-row items-center gap-3 rounded-full px-10 font-semibold hover:bg-green-500 hover:text-white"
      @click="toRestApi"
    >
      Lanjut
      <font-awesome-icon icon="fa-solid fa-arrow-right" />
    </button>
  </figure>
</template>
