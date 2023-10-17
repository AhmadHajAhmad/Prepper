<template>
  <div class="navbar-container">
    <NavbarInternal />
    <div class="main-container">
        <div class="col-12 col-md-10 col-lg-10 p-5">
          <h1>Food List</h1>
          <ul class="list-group">
    <li v-for="food in foodList" :key="food.id" class="list-group-item d-flex justify-content-between align-content-center">
        <div class="item-info">
            <span class="item-detail"><strong>Food Name:</strong> {{ food.foodname }}</span>
            <span class="item-detail"><strong>Weight:</strong> {{ food.weight }} gram</span>
            <span class="item-detail"><strong>Calories:</strong> {{ food.calories }} kcal</span>
        </div>
        <div class="btn-container">
            <button @click.stop="updateFood(food)" class="btn">Update</button>
            <button @click.stop="deleteFood(food)" class="btn btn-alert">Delete</button>
        </div>
    </li>
</ul>

          <button @click="createFood" class="btn">Add Food</button>

          <!-- Bootstrap Modal for Adding Food -->
          <div
            v-if="showForm"
            class="modal"
            data-bs-backdrop="static"
            tabindex="1"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Add New Food</h5>
                </div>
                <form
                  action=""
                  @submit.prevent="addFood"
                  class="was-validated form-floating"
                >
                  <div class="modal-body form-floating">
                    <div class="mb-3 form-floating">
                      <input
                        v-model="newFood.foodname"
                        type="text"
                        class="form-control form-floating"
                        id="foodName"
                        placeholder="Food Name"
                        required
                        pattern="^[A-Za-z]+(\s[A-Za-z]+)*$"
                      />
                      <label for="name" class="form-label">Food Name</label>
                      <div class="valid-feedback">looks good!</div>
                      <div class="invalid-feedback">
                        Only Characters accepted!
                      </div>
                    </div>
                    <div class="mb-3 form-floating">
                      <input
                        v-model="newFood.weight"
                        type="text"
                        class="form-control form-floating"
                        id="foodWeight"
                        placeholder="Weight"
                        required
                        pattern="^[1-9]\d*$"
                      />
                      <label for="name" class="form-label">Food Weight</label>
                      <div class="valid-feedback">looks good!</div>
                      <div class="invalid-feedback">
                        Only Positive Numbers accepted!
                      </div>
                    </div>
                    <div class="mb-3 form-floating">
                      <input
                        v-model="newFood.calories"
                        type="text"
                        placeholder="Calories"
                        class="form-control form-floating"
                        id="foodWeight"
                        required
                        pattern="^[1-9]\d*$"
                      />
                      <label for="name" class="form-label">Food Calories</label>
                      <div class="valid-feedback">looks good!</div>
                      <div class="invalid-feedback">
                        Only Positive Numbers accepted!
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-primary">Save</button>
                    <button @click="cancel" class="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div>
            <!-- Progress Bar -->
            <div class="progress">
              <div
                id="water-bar"
                role="progressbar"
                :style="{ width: `${waterQuantity / 2}%` }"
                :aria-valuenow="waterQuantity"
                aria-valuemin="0"
                aria-valuemax="25"
              >
                <p id="water-text">{{ waterQuantity }} Liters</p>
              </div>
            </div>
            <!-- Control Buttons -->
            <button class="btn mt-3 ms-2" @click="decreaseWater">
              Decrease Water
            </button>
            <button class="btn mt-3 ms-2" @click="increaseWater">
              Increase Water
            </button>
          </div>
        </div>
      </div>
    <NavbarInternalBottom />
  </div>
</template>

<script>
import { ref, onBeforeMount, watch, nextTick } from 'vue'
import * as bootstrap from 'bootstrap'
import { Modal } from 'bootstrap'
import NavbarInternal from '../components/NavbarInternal.vue'
import NavbarInternalBottom from '../components/NavbarInternalBottom.vue'
import Api from '../Api'
import { useRouter } from 'vue-router'

export default {
  components: {
    NavbarInternal,
    NavbarInternalBottom
  },
  setup() {
    const router = useRouter()
    const foodList = ref([])
    const waterList = ref([])
    const waterLinks = ref(null)
    const error = ref(null)
    const newFood = ref({
      foodname: '',
      weight: null,
      calories: null
    })
    const showForm = ref(false)
    let updateWaterTimer
    const waterQuantity = ref(0)
    const userid = ref(sessionStorage.getItem('userId'))
    const token = ref(sessionStorage.getItem('token'))
    const adminToken = ref(sessionStorage.getItem('admintoken'))

    watch(showForm, (newVal) => {
      if (newVal) {
        // If showForm becomes true
        nextTick(() => {
          const modalElement = document.querySelector('.modal')
          if (modalElement) {
            const modalInstance = new Modal(modalElement)
            modalInstance.show()
          } else {
            console.error('Modal element not found')
          }
        })
      }
    })
    const createFood = () => {
      newFood.value = resetForm()
      showForm.value = true
    }
    const updateFood = (food) => {
      newFood.value = { ...food }
      showForm.value = true
    }

    const getFood = async () => {
      try {
        const response = await Api.get(
          `http://localhost:3000/v1/profiles/${userid.value}/food`,
          {
            headers: {
              usertoken: token.value
            }
          }
        )
        foodList.value = response.data
      } catch (err) {
        error.value = 'An error occurred while fetching the data.'
      }
    }

    const getWater = async () => {
      try {
        const response = await Api.get(
          `http://localhost:3000/v1/profiles/${userid.value}/water`,
          {
            headers: {
              usertoken: token.value
            }
          }
        )
        waterList.value = response.data
        waterQuantity.value = waterList.value[0].waterqty

        // Store HATEOAS links
        if (waterList.value[0]._links) {
          waterLinks.value = waterList.value[0]._links
        }
      } catch (err) {
        error.value = 'An error occurred while fetching the data.'
      }
    }

    const addFood = async () => {
      try {
        if (newFood.value._id) {
          await Api.patch(
            `http://localhost:3000/v1/profiles/${userid.value}/food/${newFood.value._id}`,
            newFood.value,
            {
              headers: {
                usertoken: token.value
              }
            }
          )
        } else {
          await Api.post(
            `http://localhost:3000/v1/profiles/${userid.value}/food`,
            newFood.value,
            {
              headers: {
                usertoken: token.value
              }
            }
          )
        }
        cancel()
        getFood()
      } catch (error) {
        console.error('Error adding food')
      }
    }

    const deleteFood = async (food) => {
      try {
        await Api.delete(
          `http://localhost:3000/v1/profiles/${userid.value}/food/${food._id}`,
          {
            headers: {
              usertoken: token.value
            }
          }
        )
        getFood()
      } catch (error) {
        console.error('Error deleting food')
      }
    }
    // Uses HATEOAS links to get the request
    const updateWater = async (waterData) => {
      const link = `http://localhost:3000${waterLinks.value.update.href}`
      try {
        await Api.put(link, waterData, {
          headers: {
            usertoken: token.value
          }
        })
      } catch (error) {
        console.error('Error updating water')
      }
    }

    const triggerUpdate = () => {
      clearTimeout(updateWaterTimer)
      updateWaterTimer = setTimeout(() => updateWater({ waterqty: waterQuantity.value }), 750)
    }

    const increaseWater = () => {
      if (waterQuantity.value < 10) {
        waterQuantity.value += 1
      } else if (waterQuantity.value >= 10 && waterQuantity.value < 50) {
        waterQuantity.value += 2
      } else if (waterQuantity.value >= 50 && waterQuantity.value < 100) {
        waterQuantity.value += 5
      } else if (waterQuantity.value >= 100 && waterQuantity.value <= 190) {
        waterQuantity.value += 10
      }
      triggerUpdate()
    }

    const decreaseWater = () => {
      if (waterQuantity.value >= 1 && waterQuantity.value <= 10) {
        waterQuantity.value -= 1
      } else if (waterQuantity.value > 10 && waterQuantity.value <= 50) {
        waterQuantity.value -= 2
      } else if (waterQuantity.value > 50 && waterQuantity.value <= 100) {
        waterQuantity.value -= 5
      } else if (waterQuantity.value > 100) {
        waterQuantity.value -= 10
      }
      triggerUpdate()
    }

    onBeforeMount(() => {
      if (!token.value && !adminToken.value) {
        console.error('Token not available. User may not be authenticated.')
        router.push({ path: '/login' })
        return
      } else if (adminToken.value) {
        router.push({ path: '/admin' })
        return
      }
      getFood()
      getWater()
    })
    const cancel = () => {
      const modalElement = document.querySelector('.modal')
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement)
        modalInstance.hide()
      }
      showForm.value = false
      newFood.value = resetForm()
    }
    const resetForm = () => {
      return {
        foodname: '',
        weight: null,
        calories: null
      }
    }

    return {
      router,
      foodList,
      waterList,
      waterLinks,
      error,
      newFood,
      waterQuantity,
      userid,
      token,
      triggerUpdate,
      getFood,
      getWater,
      addFood,
      deleteFood,
      updateWater,
      increaseWater,
      decreaseWater,
      showForm,
      cancel,
      createFood,
      updateFood
    }
  }
}
</script>
<style scoped>

@keyframes waterEffect {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 100px;
  }
}
/* ID-Selectors for CSS styling */
#water-bar {
  background-color: rgb(0, 64, 116);
  background-image: linear-gradient(
    45deg,
    #3498db 25%,
    transparent 25%,
    transparent 50%,
    #3498db 50%,
    #3498db 75%,
    transparent 75%,
    transparent
  );
  background-size: 50px 50px;
  animation: waterEffect 1s linear infinite;
}

#water-text {
  color: aliceblue;
}
</style>
