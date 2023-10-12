<template>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-center">Server is Offline</h1>
          <p class="text-center">We apologize for the inconvenience. Please try again later.</p>
        </div>
      </div>
      <NavbarLogin/>
    </div>
  </template>
<script>
import NavbarLogin from '../components/NavbarLogin.vue'
export default {
  components: {
    NavbarLogin
  },
  data() {

  }
}
</script>
