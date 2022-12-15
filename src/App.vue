<template>
  <v-app>
    <div v-if="$route.meta.header === 1">
      <Navbar/>
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components: {
   Navbar
  },
  data: () => ({
    //
  }),
  
};
</script>
