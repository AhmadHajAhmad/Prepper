<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="input-group">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit" class="login-btn">Login</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
<script>
import axios from 'axios'
export default {
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
        const response = await axios.post('http://localhost:3000/v1/login/', {
          username: this.username,
          password: this.password
        })
        console.log('Response:', response)
        // this.$router.push('/')

        // Placeholder instead of rerouting.
        alert('Logged in successfully.')
      } catch (error) {
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

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-btn {
  background-color: #007BFF;
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
