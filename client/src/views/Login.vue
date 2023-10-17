<template>
  <div class="navbar-container">
    <NavbarLogin/>
    <div class="main-container">
        <div class="col-12 col-md-8 col-lg-8 p-5">
          <h1>Login</h1>
          <form @submit.prevent="login">
            <div class="container p-3">
              <label for="username">Username:</label>
              <input v-model="username" type="text" id="username" required />
            </div>
            <div class="container p-3">
              <label for="password">Password:</label>
              <input v-model="password" type="password" id="password" required />
            </div>
            <button type="submit" class="btn">Login</button>
          </form>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
      </div>
    <NavbarLoginBottom/>
  </div>
</template>

<script>
import NavbarLogin from '../components/NavbarLogin.vue'
import NavbarLoginBottom from '../components/NavbarLoginBottom.vue'
import Api from '../Api'

export default {
  components: {
    NavbarLogin,
    NavbarLoginBottom
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      try {
        // Perform login without dealing with headers
        const response = await Api.post('http://localhost:3000/v1/login/', {
          username: this.username,
          password: this.password
        })

        const userid = response.headers.get('userid')
        const isAdmin = response.headers.get('isadmin')
        sessionStorage.setItem('userId', userid)

        if (isAdmin === 'yes') {
          const token = response.headers.get('admintoken')
          sessionStorage.setItem('admintoken', token)
          this.$router.push({
            path: '/admin'
          })
        } else {
          const token = response.headers.get('usertoken')
          sessionStorage.setItem('token', token)
          this.$router.push({
            path: '/dashboard'
          })
        }
      } catch (error) {
        console.error('Login error')

        if (error.response && error.response.data.message) {
          this.errorMessage = error.response.data.message
        } else {
          this.errorMessage = 'An error occurred during login.'
        }
      }
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-bottom: 8px;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  margin-top: 15px;
  color: red;
}
</style>
