<template>
    <div>
        <nav class="navbar fixed-bottom d-block d-sm-none custom-navbar">
        <ul class="nav justify-content-around">
            <li class="nav-item" v-if="currentRoute !== '/dashboard'">
                        <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
                    </li>
                    <li class="nav-item" v-if="currentRoute !== '/food'">
                        <router-link class="nav-link" to="/food">Food</router-link>
                    </li>
                    <li class="nav-item" v-if="currentRoute !== '/supplies'">
                        <router-link class="nav-link" to="/supplies">Supplies</router-link>
                    </li>
                    <li class="nav-item" v-if="currentRoute !== '/household'">
                        <router-link class="nav-link" to="/household">Household</router-link>
                    </li>
                    <li class="nav-item" v-if="currentRoute !== '/settings'">
                        <router-link class="nav-link" to="/settings">Settings</router-link>
                    </li>
        </ul>
      </nav>
    </div>
  </template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'NavbarInternalBottom',
  setup() {
    const route = useRoute()
    const currentRoute = ref(route.path) // Get the current path

    // Watch for changes in the route and update the currentRoute ref
    watch(() => route.path, (newPath) => {
      currentRoute.value = newPath
    })

    return {
      currentRoute
    }
  }
}
</script>

  <style scoped>
  .custom-navbar .nav-link {
    color: rgba(255,255,255,.5);
}
  </style>
