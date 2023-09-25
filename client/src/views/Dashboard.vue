<template>
  <div class="white-template">
    <div v-if="isLoading" class="loading-message">Loading...</div>
    <div v-else>
      <!-- Display fetched data here -->
      <div class="centered-content">
        <!-- Render the fetched data -->
        <p>Fetched Data:</p>
        <pre>{{ fetchedCalories }}</pre>
        <pre>{{ fetchedWater }}</pre>
        <pre>{{ fetchedPeople }}</pre>
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
      fetchedCalories: null,
      fetchedWater: null,
      fetchedPeople: null,
      isLoading: true,
      token: null, // Initialize token as a data property
      userId: null // Initialize userId as a data property
    }
  },
  methods: {
    async fetchCalories() {
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
        this.fetchedCalories = response.data
      } catch (error) {
        console.error('Error fetching calories:', error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchWater() {
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
          `http://localhost:3000/v1/profile/${userid}/water/`,
          {
            headers: {
              usertoken: token
            }
          }
        )
        console.log('Data from the water ', response.data)
        const liter = response.data[0].waterqty
        this.fetchedWater = `The amounter of water you have is ${liter} liter.`
      } catch (error) {
        console.error('Error fetching calories:', error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchPeople() {
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
          `http://localhost:3000/v1/profile/${userid}/people/`,
          {
            headers: {
              usertoken: token
            }
          }
        )
        console.log('Data from the people ', response.data)
        const people = response.data.length
        this.fetchedPeople = `The number of people in your household is ${people} people.`
      } catch (error) {
        console.error('Error fetching calories:', error)
      } finally {
        this.isLoading = false
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    const functionsToExecute = [
      (vm) => {
        vm.fetchCalories()
      },
      (vm) => {
        vm.fetchWater()
      },
      (vm) => {
        vm.fetchPeople()
      }
    ]

    next((vm) => {
      for (const func of functionsToExecute) {
        func(vm)
      }
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
