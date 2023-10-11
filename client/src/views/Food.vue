<template>
  <div class="navbar-container">
    <NavbarInternal />
    <div class="main-container">
      <div
        class="login-container d-flex justify-content-center align-items-start vh-100"
      >
        <div class="col-12 col-md-10 col-lg-8 p-5">
          <h1>Current Food</h1>
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Calories</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="food in foodList" :key="food.id">
                <td>{{ food.foodname }}</td>
                <td>{{ food.calories }}</td>
                <td>{{ food.weight }}</td>
                <td>
                  <button
                    @click.stop="updateFood(food)"
                    class="btn btn-primary"
                  >
                    Update
                  </button>
                  <button @click.stop="deleteFood(food)" class="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="createFood" class="btn btn-primary">Add Food</button>
          <p v-if="error" class="text-danger mt-2">{{ error }}</p>

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
                    <div class="mb-3 form floating">
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
                    <div class="mb-3 form floating">
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
                class="progress-bar"
                role="progressbar"
                :style="{ width: `${waterQuantity * 4}%` }"
                :aria-valuenow="waterQuantity"
                aria-valuemin="0"
                aria-valuemax="25"
              >
                {{ waterQuantity }} Liters
              </div>
            </div>
            <!-- Control Buttons -->
            <button class="btn btn-light mt-3" @click="increaseWater">
              Increase
            </button>
            <button class="btn btn-dark mt-3 ms-2" @click="decreaseWater">
              Decrease
            </button>
          </div>
        </div>
      </div>
    </div>
    <NavbarInternalBottom />
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from 'vue'
import * as bootstrap from 'bootstrap'
import { Modal } from 'bootstrap'
import axios from 'axios'
import NavbarInternal from '../components/NavbarInternal.vue'
import NavbarInternalBottom from '../components/NavbarInternalBottom.vue'

export default {
  components: {
    NavbarInternal,
    NavbarInternalBottom
  },
  setup() {
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
    const waterQuantity = ref(0)
    const userid = ref(sessionStorage.getItem('userId'))
    const token = ref(sessionStorage.getItem('token'))

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
      console.log(showForm.value)
    }
    const updateFood = (food) => {
      newFood.value = { ...food }
      showForm.value = true
    }

    const getFood = async () => {
      try {
        const response = await axios.get(
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
        const response = await axios.get(
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

        console.log(waterLinks)
      } catch (err) {
        error.value = 'An error occurred while fetching the data.'
      }
    }

    const addFood = async () => {
      try {
        if (newFood.value._id) {
          // If _id exists, it's an update operation
          await axios.patch(
            `http://localhost:3000/v1/profiles/${userid.value}/food/${newFood.value._id}`,
            newFood.value,
            {
              headers: {
                usertoken: token.value
              }
            }
          )
        } else {
          await axios.post(
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
        console.error('Error adding food:', error)
      }
    }

    const deleteFood = async (food) => {
      try {
        await axios.delete(
          `http://localhost:3000/v1/profiles/${userid.value}/food/${food._id}`,
          {
            headers: {
              usertoken: token.value
            }
          }
        )
        getFood()
      } catch (error) {
        console.error('Error deleting food:', error)
      }
    }
    // Uses HATEOAS links to get the request
    const updateWater = async (waterData) => {
      const link = `http://localhost:3000${waterLinks.value.update.href}`
      try {
        await axios.put(link, waterData, {
          headers: {
            usertoken: token.value
          }
        })
      } catch (error) {
        console.error('Error updating water:', error)
      }
    }
    const increaseWater = () => {
      if (waterQuantity.value <= 24.5) {
        waterQuantity.value += 0.5
        updateWater({ waterqty: waterQuantity.value })
      }
    }

    const decreaseWater = () => {
      if (waterQuantity.value >= 0.5) {
        waterQuantity.value -= 0.5
        updateWater({ waterqty: waterQuantity.value })
      }
    }

    onMounted(() => {
      getFood()
      getWater()
    })
    const cancel = () => {
      const modalElement = document.querySelector('.modal') // or use refs.modal if you have ref="modal" on the root modal div
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
      foodList,
      waterList,
      waterLinks,
      error,
      newFood,
      waterQuantity,
      userid,
      token,
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

.progress-bar {
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
</style>
