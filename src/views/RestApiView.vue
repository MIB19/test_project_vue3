<script setup lang="ts">
import RestApi from '../components/RestApi.vue'
import HeaderSection from '../components/layout/NavbarSection.vue'
</script>
<template>
  <main>
    <HeaderSection />
    <RestApi class="bg-gray-500" />
  </main>
</template>