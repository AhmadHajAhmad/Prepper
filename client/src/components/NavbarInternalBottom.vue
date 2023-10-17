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
          <li class="nav-item">
            <router-link class="nav-link" @click="logOut" to="/login">Log out</router-link>
          </li>
          <label class="theme-switch">
          <input type="checkbox" @change="toggleTheme" :checked="isDarkTheme">
          <span class="slider round"></span>
        </label>
        </ul>
      </nav>
    </div>
  </template>

<script>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'NavbarInternalBottom',
  setup() {
    const route = useRoute()
    const currentRoute = ref(route.path)
    const currentTheme = ref(localStorage.getItem('theme') || 'light')
    document.documentElement.setAttribute('data-theme', currentTheme.value)

    const isDarkTheme = ref(currentTheme.value === 'dark')

    // Watch for changes in the route and update the currentRoute
    watch(() => route.path, (newPath) => {
      currentRoute.value = newPath
    })
    const logOut = () => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
    }

    const toggleTheme = () => {
      if (isDarkTheme.value) {
        currentTheme.value = 'light'
      } else {
        currentTheme.value = 'dark'
      }
      localStorage.setItem('theme', currentTheme.value)

      // Set the new theme
      document.documentElement.setAttribute('data-theme', currentTheme.value)
      isDarkTheme.value = !isDarkTheme.value
    }

    onMounted(() => {
      const savedTheme = localStorage.getItem('theme') || 'light'
      currentTheme.value = savedTheme
      document.documentElement.setAttribute('data-theme', currentTheme.value)
      isDarkTheme.value = savedTheme === 'dark'
    })

    return {
      currentRoute,
      currentTheme,
      isDarkTheme,
      logOut,
      toggleTheme
    }
  }
}
</script>

  <style scoped>
  .custom-navbar .nav-link {
    color: rgba(255,255,255,.5);
}
  </style>
