<template>
    <div class="login-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="email">Email:</label>
          <input v-model="email" type="text" id="email" required />
        </div>
        <div class="input-group">
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit" class="login-btn">Register</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const email = ref('')
    const errorMessage = ref('')
    const router = useRouter()

    const register = async () => {
      try {
        console.log('Trying to register')
        await axios.post('http://localhost:3000/v1/register/', {
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
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: 'Arial', sans-serif;
  }

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

  .login-btn {
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .login-btn:hover {
    background-color: #0056b3;
  }

  .error-message {
    margin-top: 15px;
    color: red;
  }
  </style>
