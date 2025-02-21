<template>
  <NavComponent />
  <div class="container mx-auto p-4">
    <FiltroTurnos />
    <ListaTurnos />
    <ListaTurnosProcess />
  </div>
</template>

<script setup lang="ts">
import ListaTurnos from '@/components/ListaTurnos.vue'
import ListaTurnosProcess from '@/components/ListaTurnosProcess.vue'
import FiltroTurnos from '@/components/FiltroTurnos.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavComponent from '@/components/Nav.vue'

const router = useRouter();

onMounted(() => {
  if (!localStorage.getItem("login")) {
    router.push("/login")
  }
})
</script>