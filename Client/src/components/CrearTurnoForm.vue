<template>
  <div class="container mx-auto">

  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <div class="mb-4">
      <label for="servicio" class="block text-sm font-medium text-gray-700 mb-1">Servicio:</label>
      
      <select v-model="id" id="servicio"
        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option value="">Todos los servicios</option>
        <option v-for="item in storeDesc.Desc" :value="item._id">{{ item.servicio }} - {{ item.name }}</option>

      </select>
    </div>
    <!--   <div class="mb-4">
      <input v-model="name" type="text" placeholder="Nombre del turno"
        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
    </div> -->
    <button @click="crearNuevoTurno"
      class="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Crear Turno
    </button>

  </div>

  <h2 class="text-2xl font-bold text-gray-800 mb-4">Turnos activos</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Tarjeta de Turno -->
      <div v-for="turno in store.turnosClient" :key="turno._id" class="bg-white rounded-lg shadow-md p-4 border-l-4" :class="{
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
          
          <button v-if="turno.estado === 'en espera'"
            @click="cancelarTurno(turno._id)"
            class="bg-yellow-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Cancelar
          </button> 
        </div>
      </div>

      <!-- Mensaje cuando no hay turnos -->
      <div v-if="store.turnosClient.length === 0" class="col-span-full text-center py-8 bg-gray-50 rounded-lg">
        <p class="text-gray-500">No hay turnos disponibles</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTurnoStore } from '@/stores/turnoStore'
import { useConfigStore } from '@/stores/descriptionStore'


const store = useTurnoStore()
const storeDesc = useConfigStore()

const id = ref('')


const crearNuevoTurno = () => {
  let obj = storeDesc.Desc.find((e) => e._id === id.value)
  if (obj) {
    store.crearTurno(obj.servicio, obj.name)

    id.value = ''
  }
}

const cancelarTurno = (id: string) => {
  store.cancelarTurno(id)
}

onMounted(() => {
  storeDesc.cargarConfig()
})
</script>