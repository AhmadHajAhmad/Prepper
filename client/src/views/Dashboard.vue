<template>
  <div class="navbar-container">
    <NavbarInternal />
    <div class="main-container col-lg-8 col-md-10 col-sm-10 col-12 mx-auto">
      <div class="row">
        <!-- First Column -->
        <div class="col-lg-6 col-md-6 col-sm-12 p-3">
          <p>Food:</p>
          <ve-progress
            HEAD
            :progress="cappedCalories * 7.1"
            :legend="cappedCalories"
            :size = "300"
            thickness="6%"
            color="#982560"
          >
            <span v-if="calories &gt; 14">More than</span>
            <span>{{ cappedCalories }}</span>
            <template #legend-caption>
              <p>Days Stored</p>
            </template>
          </ve-progress>
        </div>

        <!-- Second Column -->
        <div class="col-lg-6 col-md-6 col-sm-12 p-3">
          <p>Water:</p>
          <ve-progress
            HEAD
            :progress="cappedWater * 7.1"
            :legend="cappedWater"
            :size = "300"
            thickness="6%"
          >
            <span v-if="water &gt; 14">More than</span>
            <span>{{ cappedWater }}</span>
            <template #legend-caption>
              <p>Days Stored</p>
            </template>
          </ve-progress>
        </div>

        <!-- Third Column -->
        <div class="col-lg-12 col-md-10 col-sm-8 col-8 mx-auto p-3 text-center">
          <p>Status:</p>
          <div class="status-message">{{ statusMessage }}
          </div>
        </div>
      </div>
    </div>
    <NavbarInternalBottom />
  </div>
</template>

<script>
import { ref, onBeforeMount, computed, watchEffect } from 'vue'
import NavbarInternal from '../components/NavbarInternal.vue'
import NavbarInternalBottom from '../components/NavbarInternalBottom.vue'
import { getStatusMessage } from '../statusMessages'
import { useRouter } from 'vue-router'
import Api from '../Api'

export default {
  components: {
    NavbarInternal,
    NavbarInternalBottom
  },
  setup() {
    const router = useRouter()
    const calories = ref(0)
    const water = ref(0)
    const token = ref(sessionStorage.getItem('token'))
    const adminToken = ref(sessionStorage.getItem('admintoken'))
    const userId = ref(sessionStorage.getItem('userId'))
    const delayedStatusMessage = ref('')
    const circleSize = 300

    onBeforeMount(() => {
      if (!token.value && !adminToken.value) {
        console.error('Token not available. User may not be authenticated.')
        router.push({ path: '/login' })
        return
      } else if (adminToken.value) {
        router.push({ path: '/admin' })
        return
      }
      getCalories()
      getWater()
    })
    watchEffect(() => {
      setTimeout(() => {
        if (water.value <= 0.1 && calories.value <= 0.1) {
          delayedStatusMessage.value =
            'Please add food, water and people. You can do so by visiting the Food and Household pages on the top right corner.'
        } else {
          delayedStatusMessage.value = getStatusMessage(
            cappedCalories.value,
            cappedWater.value
          )
        }
      }, 400)
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
          calories.value = 0
        } else {
          calories.value = parseFloat(response.data).toFixed(2)
        }
      } catch (error) {
        console.log('Cannot retrieve calories')
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
          water.value = 0
        } else {
          water.value = parseFloat(response.data).toFixed(2)
        }
      } catch (error) {
        console.log('Cannot retrieve water')
      }
    }

    const cappedCalories = computed(() => {
      return Math.min(calories.value, 14)
    })

    const cappedWater = computed(() => {
      return Math.min(water.value, 14)
    })

    const statusMessage = computed(() => delayedStatusMessage.value)

    return {
      circleSize,
      router,
      calories,
      water,
      getCalories,
      getWater,
      statusMessage,
      cappedCalories,
      cappedWater
    }
  }
}
</script>
