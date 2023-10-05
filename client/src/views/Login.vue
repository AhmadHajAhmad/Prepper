<template>
  <div class="navbar-container">
    <NavbarLogin/>
    <div class="main-container">
      <div class="login-container d-flex justify-content-center align-items-start vh-100">
        <div class="col-12 col-md-8 col-lg-6 p-5">
          <h2>Login</h2>
          <form @submit.prevent="login">
            <div class="container p-3">
              <label for="username">Username:</label>
              <input v-model="username" type="text" id="username" required />
            </div>
            <div class="container p-3">
              <label for="password">Password:</label>
              <input v-model="password" type="password" id="password" required />
            </div>
            <button type="submit" class="btn btn-dark">Login</button>
          </form>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
    <NavbarLoginBottom/>
  </div>
</template>

<script>
import axios from 'axios'
import NavbarLogin from '../components/NavbarLogin.vue'
import NavbarLoginBottom from '../components/NavbarLoginBottom.vue'

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
        console.log('Trying to login')
        // Perform login without dealing with headers
        const response = await axios.post('http://localhost:3000/v1/login/', {
          username: this.username,
          password: this.password
        })

        const userid = response.headers.get('userid')
        const isAdmin = response.headers.get('isadmin')

        // Save the token and user ID in session storage
        // sessionStorage.setItem('token', token)
        sessionStorage.setItem('userId', userid)

        if (isAdmin === 'yes') {
          const token = response.headers.get('admintoken')
          console.log(token)
          console.log(userid)
          sessionStorage.setItem('token', token)
          this.$router.push({
            path: '/admin'
          })
        } else {
          const token = response.headers.get('usertoken')
          sessionStorage.setItem('token', token)
          console.log(token)
          console.log(userid)
          this.$router.push({
            path: '/dashboard'
          })
        }
      } catch (error) {
        console.error('Login error:', error)

        // Handle error
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

.input-group {
  margin-bottom: 15px;
  width: 250px;
}

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
