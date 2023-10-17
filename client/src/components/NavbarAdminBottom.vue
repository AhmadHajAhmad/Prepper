<template>
    <div>
        <nav class="navbar fixed-bottom d-block d-sm-none custom-navbar">
        <ul class="nav justify-content-around">
            <li class="nav-item">
                <router-link class="nav-link" @click="logOut" to="/login">Log Out</router-link>
            </li>
        </ul>
         <!-- Dark/Light toggle -->
         <label class="theme-switch">
          <input type="checkbox" @change="toggleTheme" :checked="isDarkTheme">
          <span class="slider round"></span>
        </label>
      </nav>
    </div>
  </template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'NavbarAdminBottom',
  setup() {
    const currentTheme = ref(localStorage.getItem('theme') || 'light')
    document.documentElement.setAttribute('data-theme', currentTheme.value)

    const isDarkTheme = ref(currentTheme.value === 'dark')

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
      sessionStorage.removeItem('admintoken')
      sessionStorage.removeItem('userId')
    }

    onMounted(() => {
      const savedTheme = localStorage.getItem('theme') || 'light'
      currentTheme.value = savedTheme
      document.documentElement.setAttribute('data-theme', currentTheme.value)
      isDarkTheme.value = savedTheme === 'dark'
    })

    return {
      currentTheme,
      isDarkTheme,
      logOut,
      toggleTheme
    }
  }
}
</script>
