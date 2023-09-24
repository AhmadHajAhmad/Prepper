<template>
  <div class="white-template">
    <div v-if="isLoading" class="loading-message">Loading...</div>
    <div v-else>
      <!-- Display fetched data here -->
      <div class="centered-content">
        <!-- Render the fetched data -->
        <p>Fetched Data:</p>
        <pre>{{ fetchedData }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import store from '../store' // Adjust the path based on your directory structure

export default {
  data() {
    return {
      fetchedData: null,
      isLoading: true
    }
  },
  methods: {
    async fetchData() {
      // Get the token and user ID from session storage
      const token = sessionStorage.getItem('token')
      const userid = sessionStorage.getItem('userId')

      if (!token) {
        // Handle the case where the token is not available
        console.error('Token not available. User may not be authenticated.')
        this.$router.push({
          path: '/login'
        })
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/v1/profile/${userid}/calories/days`,
          {
            headers: {
              usertoken: token
            }
          }
        )
        this.fetchedData = response.data
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        this.isLoading = false
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchData()
    })
  }
}
</script>
<style>
.white-template {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.loading-message {
  font-size: 18px;
  color: #333;
}

.centered-content {
  text-align: center;
  padding: 20px;
}

/* Additional styling for your content can be added here */
</style>
