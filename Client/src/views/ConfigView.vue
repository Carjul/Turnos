<template>
  <NavComponent />
  <div class="container mx-auto p-4">
    <ConfigTurnos />
  </div>
</template>

<script setup lang="ts">
import ConfigTurnos from '@/components/ConfigTurnos.vue';
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