<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand">
                <router-link to="/"><img class="navbar-logo" src="../assets/images/logo.png"></router-link>
            </a>
            <button class="navbar-toggler d-none d-sm-block d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navmenu">
                <ul class="navbar-nav ms-auto">
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
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'NavbarLogin',
  data() {
    return {
      currentTheme: 'light', // default value
      windowWidth: window.innerWidth,
      lastWidth: window.innerWidth // Add this line
    }
  },
  computed: {
    isDarkTheme() {
      return this.currentTheme === 'dark'
    }
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth

      const navmenu = document.getElementById('navmenu')
      if (!navmenu) return

      // Close the menu when crossing the xs/sm and md/lg breakpoints
      if ((this.windowWidth < 576 && this.lastWidth >= 576) ||
          (this.windowWidth >= 992 && this.lastWidth < 992)) {
        if (navmenu.classList.contains('show')) {
          navmenu.classList.remove('show')
        }
      }

      // Store the last width for comparison on the next resize
      this.lastWidth = this.windowWidth
    },
    toggleTheme() {
      this.currentTheme = this.isDarkTheme ? 'light' : 'dark'

      // Save the preference to localStorage
      localStorage.setItem('theme', this.currentTheme)

      // Set the new theme
      document.documentElement.setAttribute('data-theme', this.currentTheme)
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme') || 'light'
    this.currentTheme = savedTheme
    document.documentElement.setAttribute('data-theme', this.currentTheme)
    window.addEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.navbar-logo {
    height: 50px;  /* adjust as per your requirement */
    width: auto;
    vertical-align: middle; /* to ensure it aligns well vertically */
    animation: flicker 1.5s infinite alternate;
}

@keyframes flicker {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }

}
</style>
