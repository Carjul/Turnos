<template>
  <NavComponent />
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Gestión de Turnos</h2>
    <CrearTurnoForm />
  </div>
</template>

<script setup lang="ts">
import CrearTurnoForm from '@/components/CrearTurnoForm.vue'
import NavComponent from '@/components/Nav.vue'

</script>