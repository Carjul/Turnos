<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useTurnoStore } from '@/stores/turnoStore'

const store = useTurnoStore()

onMounted(() => {
  if (localStorage.getItem('turnos')) {
    //@ts-expect-error
    store.turnosClient = JSON.parse(localStorage.getItem('turnos'))
  }

})
</script>

<template class="flex px-4 py-3 h-12 w-full">
  <RouterView />
</template>
