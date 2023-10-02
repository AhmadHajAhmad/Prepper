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
          `http://localhost:3000/v1/profiles/${userid}/calories/days`,
          {
            headers: {
              usertoken: token
            }
          }
        )
        const calories = response.data

        if (calories < 1) {
          this.fetchedCalories = 'You are dangerously low on calories.'
        } else {
          this.fetchedCalories = `You have ${calories} days of food left.`
        }
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
          `http://localhost:3000/v1/profiles/${userid}/water/`,
          {
            headers: {
              usertoken: token
            }
          }
        )
        const liters = response.data[0].waterqty
        if (liters < 1) {
          this.fetchedWater = 'You are almost out of water, please replenish your water immediately.'
        } else {
          this.fetchedWater = `The amounter of water you have is ${liters} liters.`
        }
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
          `http://localhost:3000/v1/profiles/${userid}/people/`,
          {
            headers: {
              usertoken: token
            }
          }
        )
        const people = response.data.length
        if (people < 1) {
          this.fetchedPeople = 'You have no people in your household. Go to the household page to add.'
        } else {
          this.fetchedPeople = `The number of people in your household is ${people} people.`
        }
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
