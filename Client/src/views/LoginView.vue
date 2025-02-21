<template>
    <!-- Add Back Button -->
  <button 
    @click="router.push('/create')"
    class="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
    title="Volver a crear turnos"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-6 w-6 text-gray-600" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M10 19l-7-7m0 0l7-7m-7 7h18" 
      />
    </svg>
  </button>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
        </div>
        <form class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email" class="sr-only">Email</label>
              <input
                id="email"
                type="email"
                v-model="objUser.correo"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Contraseña</label>
              <input
                id="password"
                type="password"
                v-model="objUser.contraseña"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>
  
          <div>
            <button
              @click.prevent="Login"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Lock icon -->
                <svg class="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </span>
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  if (localStorage.getItem("login")) {
    router.push("/")
}
})
const objUser = ref({
  correo: "",
  contraseña: "",
});
function Login(){
 let secreto = {
    user:'admin',
    password:'12345'
 }
    if(objUser.value.correo == secreto.user && objUser.value.contraseña == secreto.password
    ){
        localStorage.setItem("login", "true");
        router.push("/");
    }else{
        alert("Usuario o contraseña incorrectos")
    }
}
</script>