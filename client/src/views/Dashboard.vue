<template>
  <div class="navbar-container">
    <NavbarInternal />

    <!-- Bootstrap container for a responsive layout -->
    <div class="main-container col-lg-8 col-md-10 col-sm-10 col-12 mx-auto">
      <div class="row">
        <!-- First Column -->
        <div class="col-lg-4 col-md-4 col-sm-12 p-3 centered-content">
          <p>Food:</p>
          <ve-progress
            HEAD
            :progress="calories * 10"
            :legend="calories"
            thickness="7%"
            animation="duration 1500"
            color="#982560"
          >
            <template #legend-caption>
              <p>Days Stored</p>
            </template>
          </ve-progress>
        </div>

        <!-- Second Column -->
        <div class="col-lg-4 col-md-4 col-sm-12 p-3 centered-content">
          <p>Water:</p>
          <ve-progress
            HEAD
            :progress="water * 10"
            :legend="water"
            thickness="7%"
            animation="duration 1500"
          >
            <template #legend-caption>
              <p>Days Stored</p>
            </template>
          </ve-progress>
        </div>

        <!-- Third Column -->
        <div class="col-lg-4 col-md-4 col-sm-12 p-3 centered-content">
          <p>Food Status:</p>
          <div class="status-message">
            {{ foodStatusMessage }}
          </div>

          <p>Water Status:</p>
          <div class="status-message">
            {{ waterStatusMessage }}
          </div>
        </div>
      </div>
    </div>

    <NavbarInternalBottom />
  </div>
</template>

<script>
import { ref, onBeforeMount, computed } from 'vue'
import NavbarInternal from '../components/NavbarInternal.vue'
import NavbarInternalBottom from '../components/NavbarInternalBottom.vue'
import { getFoodStatusMessage, getWaterStatusMessage } from '../statusMessages'
import { useRouter } from 'vue-router'
import Api from '../Api'

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
        const response = await Api.get(
          `http://localhost:3000/v1/profiles/${userId.value}/calories/days`,
          {
            headers: { usertoken: token.value }
          }
        )
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
        const response = await Api.get(
          `http://localhost:3000/v1/profiles/${userId.value}/calories/water`,
          {
            headers: { usertoken: token.value }
          }
        )
        if (response.data < 0.1 || !response.data) {
          water.value = 0.1
        } else {
          water.value = parseFloat(response.data).toFixed(2)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const foodStatusMessage = computed(() => {
      if (calories.value === null) return 'You have zero food' // Optional loading message
      return getFoodStatusMessage(calories.value)
    })

    const waterStatusMessage = computed(() => {
      if (water.value === null) return 'You have Zero water' // Optional loading message
      return getWaterStatusMessage(water.value)
    })

    async function getPeople() {
      try {
        const response = await Api.get(
          `http://localhost:3000/v1/profiles/${userId.value}/people`,
          {
            headers: { usertoken: token.value }
          }
        )
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
      getPeople,
      foodStatusMessage,
      waterStatusMessage
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
