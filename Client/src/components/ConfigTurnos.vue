<template>
    <h1 class="text-2xl font-bold mb-4">Config de Turnos</h1>

    <div class="container mx-auto mb-8">
        <div class="bg-white p-6 rounded-lg shadow-md mb-8">
            <div class="mb-4">
                <input v-model="servicio" type="text" placeholder="Nombre del servicio"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div class="mb-4">
                <input v-model="name" type="text" placeholder="Nombre del turno o nombre de quién atienda"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <button @click="Create()"
                class="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Crear
            </button>

        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="item in store.Desc" :key="item._id"
                class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div class="p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">
                                {{ item.servicio }}
                            </h3>
                            <p class="text-gray-600 mt-1">
                                Nombre: {{ item.name }}
                            </p>
                        </div>
                        <button @click="DeleteDesc(item._id)"
                            class="p-1 hover:bg-red-100 rounded-full transition-colors" title="Eliminar servicio">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="!store.Desc.length" class="col-span-full text-center py-8 bg-gray-50 rounded-lg">
                <p class="text-gray-500">No hay turnos disponibles</p>
            </div>
        </div>
    </div>
    <div class="container mx-auto">
        <h1 class="text-2xl font-bold mb-4">Reiniciar Turnos</h1>
        <button @click="eliminarTodos"
            class="bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-2">
            Reiniciar
        </button>
    </div>

</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useConfigStore } from '@/stores/descriptionStore'
import { useTurnoStore } from '@/stores/turnoStore';

const servicio = ref('')
const name = ref('')
const store = useConfigStore();
const store2 = useTurnoStore()


const Create = () => {
    if (servicio.value && name.value) {
        store.crearConfig(servicio.value, name.value)
        name.value = ''
        servicio.value = ''
    }

}
const DeleteDesc = (id: string) => {
    store.DeleteConfig(id)
}

const eliminarTodos = () => {
    store2.deleteAllTurnos()
}
onMounted(() => {
    store.cargarConfig()
})

</script>