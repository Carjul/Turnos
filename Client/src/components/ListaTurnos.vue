<template>
  <div class="container mx-auto mb-3">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Lista de Turnos</h2>
    </div>
    <!-- Scrollable Content -->
    <div class="overflow-y-auto h-[20rem] lg:h-auto">
      <!-- Grid de Turnos -->

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Tarjeta de Turno -->
        <div v-for="turno in store.turnos" :key="turno._id" class="bg-white rounded-lg shadow-md p-4 border-l-4" :class="{
          'border-yellow-500': turno.estado === 'en espera',
          'border-green-500': turno.estado === 'atendiendo',
          'border-blue-500': turno.estado === 'atendido'
        }">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-bold text-lg">{{ turno.servicio }}</h3>
              <p class=" font-bold text-gray-600">Turno #{{ turno.value }}</p>
            </div>
            <span class="px-2 py-1 text-sm rounded-full" :class="{
              'bg-yellow-100 text-yellow-800': turno.estado === 'en espera',
              'bg-green-100 text-green-800': turno.estado === 'atendiendo',
              'bg-blue-100 text-blue-800': turno.estado === 'atendido'
            }">
              {{ turno.estado }}
            </span>
          </div>

          <div class="flex flex-col space-y-2">
            <p class="text-sm text-gray-600">
              <span class="font-medium">Nombre:</span> {{ turno.name }}
            </p>
            <p class="text-sm text-gray-600">
              <span class="font-medium">Creado:</span>
              {{ turno.createdAt }}
            </p>
          </div>

          <div class="mt-4 flex justify-end space-x-2">
            <button v-if="turno.estado === 'en espera'" @click="llamarTurno(turno._id)"
              class="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm">
              Llamar
            </button>
          </div>
        </div>

        <!-- Mensaje cuando no hay turnos -->
        <div v-if="!store.turnos.length" class="col-span-full text-center py-8 bg-gray-50 rounded-lg">
          <p class="text-gray-500">No hay turnos disponibles</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTurnoStore } from '@/stores/turnoStore'

const store = useTurnoStore()


const llamarTurno = (id: string) => {
  store.llamarTurno(id)
}

onMounted(async () => {
  await store.cargarTurnos()
})
</script>