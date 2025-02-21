<template>
    <div class="bg-white p-4 rounded-lg shadow-md mb-6" v-if="storeDesc.Desc.length && storeDesc.Desc.length > 1">
      <div class="flex items-center gap-4">
        <div class="flex-grow">
          <label for="filtroServicio" class="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Servicio
          </label>
          <select
            id="filtroServicio"
            v-model="selectedService"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Todos los servicios</option>
            <option 
              v-for="servicio in storeDesc.Desc" 
              :key="servicio._id"
              :value="servicio.servicio"
            >
              {{ servicio.servicio }} - {{ servicio.name }}
            </option>
          </select>
        </div>
        <button
          @click="clearFilter"
          class="mt-6 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <span class="sr-only">Limpiar filtro</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useConfigStore } from '@/stores/descriptionStore'
import { useTurnoStore } from '@/stores/turnoStore'

const storeDesc = useConfigStore()
const turnoStore = useTurnoStore()
const selectedService = ref('')

// Observar cambios en el filtro y actualizarlo en el store
watch(selectedService, (newValue) => {
  turnoStore.setFiltro(newValue)
})

// También observar cambios en el filtro del store
watch(() => turnoStore.filtroActivo, (newValue) => {
  selectedService.value = newValue
})

// Limpiar filtro
const clearFilter = () => {
  selectedService.value = ''
}

onMounted(async () => {
  await storeDesc.cargarConfig()
  // Restaurar filtro si existe
  if (turnoStore.filtroActivo) {
    selectedService.value = turnoStore.filtroActivo
  }
})
</script>