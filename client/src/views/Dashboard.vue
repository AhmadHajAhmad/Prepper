<template>
  <div class="navbar-container">
    <NavbarInternal/>
    <div class="main-container">
      <div class="centered-content">
        <p>Fetched Data:</p>
        <pre>{{ `Days of calories: ${calories}` }}</pre>
        <pre>{{ `Days of water: ${water}` }}</pre>
        <pre>{{ `Number of people: ${people}` }}</pre>
      </div>
    </div>
    <NavbarInternalBottom/>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import NavbarInternal from '../components/NavbarInternal.vue'
import NavbarInternalBottom from '../components/NavbarInternalBottom.vue'

export default {
  components: {
    NavbarInternal,
    NavbarInternalBottom
  },
  setup() {
    const router = useRouter()
    const calories = ref(null)
    const water = ref(null)
    const people = ref(null)
    const token = ref(sessionStorage.getItem('token'))
    const userId = ref(sessionStorage.getItem('userId'))

    onBeforeMount(() => {
      if (!token.value) {
        console.error('Token not available. User may not be authenticated.')
        router.push({ path: '/login' })
        return
      }

      getCalories()
      getWater()
      getPeople()
    })

    async function getCalories() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/profiles/${userId.value}/calories/days`, {
          headers: { usertoken: token.value }
        })
        calories.value = response.data
      } catch (error) {
        console.log(error)
      }
    }

    async function getWater() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/profiles/${userId.value}/calories/water`, {
          headers: { usertoken: token.value }
        })
        water.value = response.data
      } catch (error) {
        console.log(error)
      }
    }

    async function getPeople() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/profiles/${userId.value}/people`, {
          headers: { usertoken: token.value }
        })
        people.value = response.data.length
      } catch (error) {
        console.log(error)
      }
    }

    return {
      router,
      calories,
      water,
      people,
      getCalories,
      getWater,
      getPeople
    }
  }
}
</script>

<style>
.loading-message {
  font-size: 18px;
  color: #333;
}
.centered-content {
  text-align: center;
  padding: 20px;
}
</style>
