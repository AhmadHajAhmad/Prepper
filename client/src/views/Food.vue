<template>
  <div class="navbar-container">
    <NavbarInternal />
    <div class="main-container">
      <div
        class="login-container d-flex justify-content-center align-items-start vh-100"
      >
        <div class="col-12 col-md-10 col-lg-8 p-5">
          <h1>Current Food</h1>
          <div class="list-group" v-if="foodList && foodList.length">
            <div
              v-for="item in foodList"
              :key="item._id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <!-- If edit mode is on, display input fields for updating -->
              <template v-if="editMode[item._id]">
                <!-- For foodname -->
                <div class="mb-3 form-floating was-validated">
                  <input
                    v-model="item.foodname"
                    @blur="checkValidity(item)"
                    type="text"
                    placeholder="Name"
                    class="form-control"
                    required
                    pattern="^[A-Za-z]+(\s[A-Za-z]+)*$"
                  />
                  <div class="valid-feedback">looks good!</div>
                  <div class="invalid-feedback">Only Characters accepted!</div>
                </div>

                <!-- For weight -->
                <div class="mb-3 form-floating was-validated">
                  <input
                    v-model="item.weight"
                    @blur="checkValidity(item)"
                    type="text"
                    placeholder="Weight"
                    class="form-control"
                    required
                    pattern="^[1-9]\d*$"
                  />
                  <div class="valid-feedback">looks good!</div>
                  <div class="invalid-feedback">
                    Only Positive Numbers accepted!
                  </div>
                </div>

                <!-- For calories -->
                <div class="mb-3 form-floating was-validated">
                  <input
                    v-model="item.calories"
                    @blur="checkValidity(item)"
                    type="text"
                    placeholder="Calories"
                    class="form-control"
                    required
                    pattern="^[1-9]\d*$"
                  />
                  <div class="valid-feedback">looks good!</div>
                  <div class="invalid-feedback">
                    Only Positive Numbers accepted!
                  </div>
                </div>
              </template>

              <!-- If edit mode is off, display text with ability to click into edit mode -->
              <template v-else>
                <div>
                  <strong>Name: </strong>
                  <span class="me-3" @click="toggleEdit(item)">{{
                    item.foodname
                  }}</span>
                  <strong>Weight: </strong>
                  <span class="me-3" @click="toggleEdit(item)"
                    >{{ item.weight }}<strong>g</strong></span
                  >
                  <strong>Calories: </strong>
                  <span @click="toggleEdit(item)"
                    >{{ item.calories }}<strong>kcal</strong></span
                  >
                </div>
                <!-- Delete Button for each item -->
                <button @click="deleteFood(item)" class="btn btn-dark">
                  Delete
                </button>
              </template>
            </div>
          </div>
          <p v-if="error" class="text-danger mt-2">{{ error }}</p>

          <!-- Button to open the modal -->
          <button @click="createFood" class="btn btn-light">Add Food</button>

          <!-- Bootstrap Modal for Adding Food -->
          <div
            v-if="showForm"
            class="modal"
            id="addFoodModal"
            tabindex="1"
            aria-labelledby="addFoodModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="addFoodModalLabel">
                    Add New Food
                  </h5>
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
                        placeholder="Name"
                        class="form-control"
                        required
                        pattern="^[A-Za-z]+(\s[A-Za-z]+)*$"
                      />
                      <div class="valid-feedback">looks good!</div>
                      <div class="invalid-feedback">
                        Only Characters accepted!
                      </div>
                    </div>
                    <div class="mb-3">
                      <input
                        v-model="newFood.weight"
                        type="text"
                        placeholder="Weight"
                        class="form-control"
                        required
                        pattern="^[1-9]\d*$"
                      />
                      <div class="valid-feedback">looks good!</div>
                      <div class="invalid-feedback">
                        Only Positive Numbers accepted!
                      </div>
                    </div>
                    <div class="mb-3">
                      <input
                        v-model="newFood.calories"
                        type="text"
                        placeholder="Calories"
                        class="form-control"
                        required
                        pattern="^[1-9]\d*$"
                      />
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
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
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
    const editMode = reactive({})
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
    const checkValidity = (item) => {
      item.foodnameValid = /^[A-Za-z]+(\s[A-Za-z]+)*$/.test(item.foodname)
      item.weightValid = /^[1-9]\d*$/.test(item.weight)
      item.caloriesValid = /^[1-9]\d*$/.test(item.calories)

      console.log(item.foodnameValid, item.weightValid, item.caloriesValid)

      if (item.foodnameValid & item.weightValid & item.caloriesValid) {
        updateFood(item) // Call the update method after the check
        // item.foodnameValid = null
        // item.weightValid = null
        // item.caloriesValid = null
        //
      }
    }
    const createFood = () => {
      newFood.value = resetForm()
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
        await axios.post(
          `http://localhost:3000/v1/profiles/${userid.value}/food`,
          newFood.value,
          {
            headers: {
              usertoken: token.value
            }
          }
        )
        cancel()
        getFood()
      } catch (error) {
        console.error('Error adding food:', error)
      }
    }

    const deleteFood = async (foodItem) => {
      try {
        await axios.delete(
          `http://localhost:3000/v1/profiles/${userid.value}/food/${foodItem._id}`,
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

    const updateFood = async (foodItem) => {
      try {
        await axios.patch(
          `http://localhost:3000/v1/profiles/${userid.value}/food/${foodItem._id}`,
          foodItem,
          {
            headers: {
              usertoken: token.value
            }
          }
        )
        editMode[foodItem._id] = false
      } catch (error) {
        console.error('Error updating food:', error)
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

    const toggleEdit = (item) => {
      editMode[item._id] = true
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
      foodList.value.forEach((item) => {
        editMode[item._id] = false
      })
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
      editMode,
      userid,
      token,
      getFood,
      getWater,
      addFood,
      deleteFood,
      updateFood,
      updateWater,
      toggleEdit,
      increaseWater,
      decreaseWater,
      showForm,
      cancel,
      createFood,
      checkValidity
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
