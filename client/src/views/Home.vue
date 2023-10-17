<template>
  <div class="splash-container">
    <router-link to="/login">
      <img src="../assets/images/logo.png" alt="Prepper Logo" class="splash-logo">
    </router-link>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'

export default {
  name: 'Home',

  setup() {
    onBeforeMount(() => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('admintoken')
    })
  }
}
</script>

<style scoped>
.splash-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: radial-gradient(circle at center, transparent, #2c3e50 80%), url('../assets/images/splashbackground.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.splash-logo {
  max-width: 350px;
  max-height: 350px;
  margin-bottom: 20px;
  animation: flicker 1.5s infinite alternate;
}

@keyframes flicker {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }

}

</style>
