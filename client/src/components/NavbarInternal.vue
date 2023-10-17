<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand">
                <router-link to="/dashboard"><img class="navbar-logo" src="../assets/images/logo.png"></router-link>
            </a>
            <button class="navbar-toggler d-none d-sm-block d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
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
                    <li class="nav-item">
                      <router-link class="nav-link" @click="logOut" to="/login">Log out</router-link>
                    </li>
                </ul>
                <!-- Dark/Light toggle -->
                <label class="theme-switch">
                    <input type="checkbox" @change="toggleTheme" :checked="isDarkTheme">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'NavbarInternal',
  setup() {
    const route = useRoute()
    const currentRoute = ref(route.path)

    // For theme toggle
    const currentTheme = ref(localStorage.getItem('theme') || 'light')
    document.documentElement.setAttribute('data-theme', currentTheme.value)

    const isDarkTheme = ref(currentTheme.value === 'dark')
    const windowWidth = ref(window.innerWidth)
    const lastWidth = ref(window.innerWidth)

    const handleResize = () => {
      windowWidth.value = window.innerWidth

      const navmenu = document.getElementById('navmenu')
      if (!navmenu) return

      if ((windowWidth.value < 576 && lastWidth.value >= 576) ||
          (windowWidth.value >= 992 && lastWidth.value < 992)) {
        if (navmenu.classList.contains('show')) {
          navmenu.classList.remove('show')
        }
      }

      lastWidth.value = windowWidth.value
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

    const logOut = () => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
    }

    // Watch for changes in the route and update the currentRoute
    watch(() => route.path, (newPath) => {
      currentRoute.value = newPath
    })

    onMounted(() => {
      const savedTheme = localStorage.getItem('theme') || 'light'
      currentTheme.value = savedTheme
      document.documentElement.setAttribute('data-theme', currentTheme.value)
      isDarkTheme.value = savedTheme === 'dark'
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      currentRoute,
      currentTheme,
      isDarkTheme,
      toggleTheme,
      logOut,
      windowWidth,
      lastWidth,
      handleResize
    }
  }
}
</script>

<style scoped>
.navbar-logo {
    height: 50px;
    width: auto;
    vertical-align: middle;
    animation: flicker 1.5s infinite alternate;
}

@keyframes flicker {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }

}
</style>
