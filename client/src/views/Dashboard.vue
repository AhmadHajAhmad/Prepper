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

export default {
  data() {
    return {
      fetchedData: null,
      isLoading: true // Initially set to true while loading data
    }
  },
  computed: {
    getUserId() {
      return this.$route.query.UserId // Correct the property name
    }
  },
  methods: {
    async fetchData() {
      const userid = this.getUserId
      try {
        const response = await axios.get(
          `http://localhost:3000/v1/profile/${userid}/calories/days`,
          {
            withCredentials: true, // Include cookies in the request
            credentials: 'include' // Specify that credentials should be included
          }
        )
        this.fetchedData = response.data
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        this.isLoading = false // Set isLoading to false after data is fetched
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
