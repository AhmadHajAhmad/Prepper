<template>
    <div>
        <nav class="navbar fixed-bottom d-block d-sm-none custom-navbar">
        <ul class="nav justify-content-around">
            <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
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
  name: 'NavbarLoginBottom',
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

    onMounted(() => {
      const savedTheme = localStorage.getItem('theme') || 'light'
      currentTheme.value = savedTheme
      document.documentElement.setAttribute('data-theme', currentTheme.value)
      isDarkTheme.value = savedTheme === 'dark'
    })

    return {
      currentTheme,
      isDarkTheme,
      toggleTheme
    }
  }
}
</script>
