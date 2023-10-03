<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <router-link to="/"><img class="navbar-logo" src="../assets/images/logo.png"></router-link>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto">
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
            </div>
        </div>
    </nav>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'NavbarInternal',
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
.navbar-logo {
    height: 50px;  /* adjust as per your requirement */
    width: auto;
    vertical-align: middle; /* to ensure it aligns well vertically */
}
</style>
