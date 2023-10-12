<template>
  <div class="navbar-container">
    <NavbarInternal />
    <div class="main-container">
      <div class="col-12 col-md-10 col-lg-10 p-5">
      <h1>Household Members</h1>
      <ul class="list-group">
    <li v-for="person in people" :key="person.id" class="list-group-item d-flex justify-content-between align-content-center">
        <div class="item-info">
            <span class="item-detail"><strong>Name:</strong> {{ person.name }}</span>
            <span class="item-detail"><strong>Age:</strong> {{ person.age }}</span>
            <span class="item-detail"><strong>Weight:</strong> {{ person.weight }}</span>
            <span class="item-detail"><strong>Height:</strong> {{ person.height }}</span>
            <span class="item-detail"><strong>Sex:</strong> {{ person.sex }}</span>
        </div>
        <div class="btn-container">
            <button @click.stop="updatePerson(person)" class="btn">Update</button>
            <button @click.stop="deletePerson(person)" class="btn btn-alert">Delete</button>
        </div>
    </li>
</ul>

      <button @click="createPerson" class="btn">
        Create Person
      </button>

      <!-- Integrated Person Form -->
      <div v-if="showForm" class="modal" data-bs-backdrop="static" tabindex="1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">People</h5>
            </div>
            <form
              action=""
              @submit.prevent="save"
              class="was-validated form-floating"
            >
              <div class="modal-body form-floating">
                <div class="mb-3 form-floating">
                  <input
                    v-model="newPerson.name"
                    type="text"
                    class="form-control form-floating"
                    id="personName"
                    placeholder="Person Name"
                    required
                    pattern="^[A-Za-z]+(\s[A-Za-z]+)*$"
                  />
                  <label for="name" class="form-label">Person Name</label>
                  <div class="valid-feedback">looks good!</div>
                  <div class="invalid-feedback">Only Characters accepted!</div>
                </div>

                <div class="mb-3 form-floating">
                  <input
                    v-model="newPerson.age"
                    type="text"
                    class="form-control form-floating"
                    id="personAge"
                    placeholder="Person Age"
                    required
                    pattern="^[1-9]\d*$"
                  />
                  <label for="name" class="form-label">Person Age</label>
                  <div class="valid-feedback">looks good!</div>
                  <div class="invalid-feedback">
                    Only Positive Numbers accepted!
                  </div>
                </div>
                <div class="mb-3 form-floating">
                  <input
                    v-model="newPerson.weight"
                    type="text"
                    class="form-control form-floating"
                    id="personWeight"
                    placeholder="Person Weight"
                    required
                    pattern="^[1-9]\d*$"
                  />
                  <label for="name" class="form-label">Person Weight</label>
                  <div class="valid-feedback">looks good!</div>
                  <div class="invalid-feedback">
                    Only Positive Numbers accepted!
                  </div>
                </div>
                <div class="mb-3 form-floating">
                  <input
                    v-model="newPerson.height"
                    type="text"
                    class="form-control form-floating"
                    id="personHeight"
                    placeholder="Person Height"
                    required
                    pattern="^[1-9]\d*$"
                  />
                  <label for="name" class="form-label">Person Height</label>
                  <div class="valid-feedback">looks good!</div>
                  <div class="invalid-feedback">
                    Only Positive Numbers accepted!
                  </div>
                </div>
                <div class="mb-3">
                  <label for="sex" class="form-label">Sex</label>
                  <select
                    v-model="newPerson.sex"
                    class="form-select"
                    id="sex"
                    placeholder="Person Sex"
                    pattern="^[A-Za-z]+(\s[A-Za-z]+)*$"
                    required
                  >
                    <option value="" disabled selected></option>
                    <option value="Male">male</option>
                    <option value="Female">female</option>
                    <!-- Add other options as needed -->
                  </select>
                </div>
                <!-- ...other modal structure... -->
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
      </div>
    </div>
    <NavbarInternalBottom />
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap'
import { Modal } from 'bootstrap'
// import axios from 'axios'
import NavbarInternal from '../components/NavbarInternal.vue'
import NavbarInternalBottom from '../components/NavbarInternalBottom.vue'
import Api from '../Api.js'

export default {
  components: {
    NavbarInternal,
    NavbarInternalBottom
  },
  data() {
    return {
      people: [],
      showForm: false,
      modalInstance: null,
      newPerson: {
        name: '',
        age: null,
        weight: null,
        height: null,
        sex: ''
      }
    }
  },
  mounted() {
    this.token = sessionStorage.getItem('token')
    this.userid = sessionStorage.getItem('userId')
    this.loadPeople()
  },
  watch: {
    showForm() {
      if (this.showForm) {
        // If showForm is true
        this.$nextTick(() => {
          const modalElement = this.$el.querySelector('.modal')
          if (modalElement) {
            const modalInstance = new Modal(modalElement)
            modalInstance.show()
          } else {
            console.error('Modal element not found')
          }
        })
      }
    }
  },
  methods: {
    createPerson() {
      this.newPerson = this.resetForm()
      this.showForm = true
    },
    updatePerson(person) {
      this.newPerson = { ...person }
      this.showForm = true
    },
    async deletePerson(person) {
      try {
        await Api.delete(
          `http://localhost:3000/v1/profiles/${this.userid}/people/${person._id}`,

          {
            headers: {
              usertoken: this.token
            }
          }
        )
        this.cancel()
        this.loadPeople()
      } catch (error) {
        console.error('Error saving the person:', error)
      }
    },
    async save() {
      try {
        if (this.newPerson._id) {
          // If _id exists, it's an update operation
          await Api.patch(
            `http://localhost:3000/v1/profiles/${this.userid}/people/${this.newPerson._id}`,
            this.newPerson,
            {
              headers: {
                usertoken: this.token
              }
            }
          )
        } else {
          // If _id doesn't exist, it's a create operation
          await Api.post(
            `http://localhost:3000/v1/profiles/${this.userid}/people`,
            this.newPerson,
            {
              headers: {
                usertoken: this.token
              }
            }
          )
        }
        this.cancel() // Close the form modal
        this.loadPeople() // Reload the list of people
      } catch (error) {
        this.cancel()
        this.$router.push({
          path: '/offline'
        })
        console.error('Error saving the person:', error)
      }
    },

    async loadPeople() {
      try {
        const response = await Api.get(
          `http://localhost:3000/v1/profiles/${this.userid}/people`,
          {
            headers: {
              usertoken: this.token
            }
          }
        )
        this.people = response.data
      } catch (error) {
        console.log('Error loading people', error)
      }
    },
    cancel() {
      const modalElement = this.$el.querySelector('.modal')
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement) // Get the modal instance
        modalInstance.hide() // Hide the modal properly, removing the backdrop as well
      }
      this.showForm = false // Now, you can safely set showForm to false
      this.newPerson = this.resetForm()
    },

    resetForm() {
      return {
        name: '',
        age: '',
        weight: '',
        height: '',
        sex: ''
      }
    }
  }
}
</script>
<style scoped>
#delete-all-container {
  top: 0;
  right: 0;
  margin: 10px; /* Optional: for some space from the edges */
}
</style>
