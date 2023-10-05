<template>
  <div class="navbar-container">
    <NavbarInternal/>
    <div class="main-container">
    <h1>Household Members</h1>
    <div id="delete-all-container">
      <button @click="deleteAllPeople" class="btn btn-danger">
        Delete All Members
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Weight</th>
          <th>Height</th>
          <th>Sex</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in people" :key="person.id">
          <td>{{ person.name }}</td>
          <td>{{ person.age }}</td>
          <td>{{ person.weight }}</td>
          <td>{{ person.height }}</td>
          <td>{{ person.sex }}</td>
          <td>
            <button @click.stop="updatePerson(person)" class="btn btn-primary">
              Update
            </button>
            <button @click.stop="deletePerson(person)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="createPerson" class="btn btn-primary">Create Person</button>

    <!-- Integrated Person Form -->
    <div v-if="showForm" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Person</h5>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                v-model="newPerson.name"
                type="text"
                class="form-control"
                id="name"
              />
            </div>
            <div class="mb-3">
              <label for="age" class="form-label">Age</label>
              <input
                v-model="newPerson.age"
                type="number"
                class="form-control"
                id="age"
              />
            </div>
            <div class="mb-3">
              <label for="weight" class="form-label">Weight in kg</label>
              <input
                v-model="newPerson.weight"
                type="number"
                class="form-control"
                id="weight"
              />
            </div>
            <div class="mb-3">
              <label for="height" class="form-label">Height in cm</label>
              <input
                v-model="newPerson.height"
                type="number"
                class="form-control"
                id="height"
              />
            </div>
            <div class="mb-3">
              <label for="sex" class="form-label">Sex</label>
              <select v-model="newPerson.sex" class="form-select" id="sex">
                <option value="" disabled selected>Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <!-- Add other options as needed -->
              </select>
            </div>
            <!-- ...other modal structure... -->
          </div>
          <div class="modal-footer">
            <button @click="save" class="btn btn-primary">Save</button>
            <button @click="cancel" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    <NavbarInternalBottom/>
  </div>
</template>

<script>
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
        await axios.delete(
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
    async deleteAllPeople() {
      try {
        await axios.delete(
          `http://localhost:3000/v1/profiles/${this.userid}/people/`,

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
          await axios.patch(
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
          await axios.post(
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
        console.error('Error saving the person:', error)
      }
    },

    async loadPeople() {
      try {
        const response = await axios.get(
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
