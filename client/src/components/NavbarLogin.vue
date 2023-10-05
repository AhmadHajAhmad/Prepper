<template>
    <nav class="navbar navbar-expand-lg" style="background-color: #cfcfcf;">
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
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'NavbarLogin'
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
