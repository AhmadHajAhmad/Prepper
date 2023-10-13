<template>
  <div class="navbar-container" id="offline-page">
    <NavbarLogin/>
    <div class="main-container">
      <div class="col content-center">
        <h1 class="text-center">Server is currently offline</h1>
        <p class="text-center">We apologize for the inconvenience. Please try again later.</p>
        <svg id="sadSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
          <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
            <path d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 4 C 22.393 4 4 22.393 4 45 s 18.393 41 41 41 s 41 -18.393 41 -41 S 67.607 4 45 4 z"></path>
            <circle cx="30.344" cy="33.274" r="5.864"></circle>
            <circle cx="59.663999999999994" cy="33.274" r="5.864"></circle>
            <path d="M 72.181 65.49 c -0.445 0 -0.893 -0.147 -1.265 -0.451 c -7.296 -5.961 -16.5 -9.244 -25.916 -9.244 c -9.417 0 -18.62 3.283 -25.916 9.244 c -0.854 0.7 -2.115 0.572 -2.814 -0.283 c -0.699 -0.855 -0.572 -2.115 0.283 -2.814 C 24.561 55.398 34.664 51.795 45 51.795 c 10.336 0 20.438 3.604 28.447 10.146 c 0.855 0.699 0.982 1.959 0.283 2.814 C 73.335 65.239 72.76 65.49 72.181 65.49 z"></path>
          </g>
        </svg>
      </div>
    </div>
    <NavbarLoginBottom/>
  </div>
</template>

<script>
import NavbarLogin from '../components/NavbarLogin.vue'
import NavbarLoginBottom from '../components/NavbarLoginBottom.vue'

export default {
  components: {
    NavbarLogin,
    NavbarLoginBottom
  },
  data() {

  }
}
</script>

<style scoped>

#offline-page .main-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1; /* This will make the main-container fill up the available space */
}

#offline-page .content-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#offline-page .centered-image {
    max-width: 100%; /* To ensure the image doesn't overflow the container */
    margin-top: 20px; /* Optional: Provides some spacing between the text and the image */
}

</style>
