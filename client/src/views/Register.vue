<template>
  <div class="navbar-container">
    <NavbarLogin/>
    <div class="main-container">
        <div class="col-12 col-md-8 col-lg-6 p-5">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="container p-3">
          <label for="email">Email:</label>
          <input v-model="email" type="text" id="email" required />
        </div>
        <div class="container p-3">
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div class="container p-3">
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
          <PasswordChecker :mypassword="password"></PasswordChecker>
        </div>

        <button type="submit" class="btn btn-dark">Register</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
    <NavbarLoginBottom/>
  </div>
</template>

<script>
import { ref } from 'vue'
// import axios from 'axios'
import { useRouter } from 'vue-router'
import NavbarLogin from '../components/NavbarLogin.vue'
import NavbarLoginBottom from '../components/NavbarLoginBottom.vue'
import PasswordChecker from '../components/PasswordChecker.vue'
import Api from '../Api'

export default {
  components: {
    NavbarLogin,
    NavbarLoginBottom,
    PasswordChecker
  },
  setup() {
    const username = ref('')
    const password = ref('')
    const email = ref('')
    const errorMessage = ref('')
    const router = useRouter()

    const register = async () => {
      try {
        console.log('Trying to register')
        await Api.post('http://localhost:3000/v1/register/', {
          username: username.value,
          password: password.value,
          email: email.value
        })
        router.push('/login')
      } catch (error) {
        console.error('Registration error:', error)

        // Handle error
        if (error.response && error.response.data.message) {
          errorMessage.value = error.response.data.message
        } else {
          errorMessage.value = 'An error occurred during registration.'
        }
      }
    }

    return {
      username,
      password,
      email,
      errorMessage,
      router,
      register
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
