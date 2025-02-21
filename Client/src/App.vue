<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useTurnoStore } from '@/stores/turnoStore'

const store = useTurnoStore()

onMounted(()=>{
  if(localStorage.getItem('turnos')){
  //@ts-expect-error
  store.turnosClient= JSON.parse(localStorage.getItem('turnos'))
}

})
</script>

<template class="flex px-4 py-3 h-12 w-full">
  <header class="bg-white shadow">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo or Brand -->
        <div class="flex-shrink-0">
          <span class="text-xl font-bold text-indigo-600">Turnos</span>
        </div>

        <!-- Navigation Links -->
        <div class="flex space-x-2">
          <RouterLink to="/" class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="[$route.path === '/' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100']">
            Inicio
          </RouterLink>

          <RouterLink to="/config" class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="[$route.path === '/config' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100']">
            Config
          </RouterLink>

          <RouterLink to="/create" class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="[$route.path === '/create' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100']">
            Crear
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>
