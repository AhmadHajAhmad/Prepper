<template>
    <div>
        <nav class="navbar fixed-bottom d-block d-sm-none custom-navbar" style="background-color: #cfcfcf;">
        <ul class="nav justify-content-around">
            <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
            </li>
        </ul>
      </nav>
    </div>
  </template>

<script>
export default {
  name: 'NavbarLoginBottom'
}
</script>

  <style scoped>
  .custom-navbar .nav-link {
    color: rgba(40, 40, 40, 0.5);
}
  </style>
