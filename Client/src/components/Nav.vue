<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter();
const estado = ref(false)
function logout() {
    localStorage.removeItem('login')
    estado.value = false
    router.push('/login')
}

onMounted(() => {
  if (localStorage.getItem("login")) {
    estado.value = true
}

})
</script>
<template>
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

                    <RouterLink to="/config"
                        class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        :class="[$route.path === '/config' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100']">
                        Config
                    </RouterLink>

                    <RouterLink to="/create"
                        class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        :class="[$route.path === '/create' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100']">
                        Crear
                    </RouterLink>
                    <button @click="logout" v-if="estado"
                    class="px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-600 hover:bg-gray-100"
                    title="Cerrar sesión"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>