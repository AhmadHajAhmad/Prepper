<template>
  <div class="navbar-container">
    <NavbarInternal/>

    <!-- Bootstrap container for a responsive layout -->
    <div class="main-container col-lg-8 col-md-10 col-sm-10 col-12 mx-auto">
      <div class="row">

        <!-- First Column -->
        <div class="col-lg-4 col-md-4 col-sm-12 p-3 centered-content">
          <p>Food:</p>
          <ve-progress
          :progress="(calories * 10)"
          :legend="calories"
          thickness="7%"
          color="#982560">
            <template #legend-caption>
              <p>Days Stored</p>
            </template>
          </ve-progress>
        </div>

        <!-- Second Column -->
        <div class="col-lg-4 col-md-4 col-sm-12 p-3 centered-content">
          <p>Water:</p>
          <ve-progress
          :progress="(water * 10)"
          :legend="water"
          thickness="7%">
            <template #legend-caption>
              <p>Days Stored</p>
            </template>
          </ve-progress>
        </div>

        <!-- Third Column -->
        <div class="col-lg-4 col-md-4 col-sm-12 p-3 centered-content">
          <p>Placeholder:</p>
          <p>
            Lorem ipsum dolor sit amet. Et alias molestiae aut impedit aspernatur et quas accusamus qui laborum quas ut nobis dolorem ea voluptates quidem. Qui voluptatem velit sit animi ratione eos omnis illo qui sint iste a veritatis omnis eos galisum nemo?
          </p>
        </div>

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
        if (response.data < 0.1 || !response.data) {
          calories.value = 0.1
        } else {
          calories.value = parseFloat(response.data).toFixed(2)
        }
      } catch (error) {
        console.log(error)
      }
    }

    async function getWater() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/profiles/${userId.value}/calories/water`, {
          headers: { usertoken: token.value }
        })
        if (response.data < 0.1 || !response.data) {
          water.value = 0.1
        } else {
          water.value = parseFloat(response.data).toFixed(2)
        }
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
