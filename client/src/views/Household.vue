<template>
  <div>
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
        <tr
          v-for="person in people"
          :key="person.id"
          @click="editPerson(person)"
        >
          <td>{{ person.name }}</td>
          <td>{{ person.age }}</td>
          <td>{{ person.weight }}</td>
          <td>{{ person.height }}</td>
          <td>{{ person.sex }}</td>
          <td>
            <button @click.stop="editPerson(person)" class="btn btn-primary">
              Update
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
</template>

<script>
import * as bootstrap from 'bootstrap'
import { Modal } from 'bootstrap'
import axios from 'axios'

export default {
  data() {
    return {
      people: [],
      showForm: false,
      form: this.resetForm(),
      selectedPerson: null,
      modalInstance: null,
      token: sessionStorage.getItem('token'),
      userid: sessionStorage.getItem('userId'),
      newPerson: {
        name: '',
        // Initialize other properties as needed.
        age: null,
        weight: null,
        height: null,
        sex: ''
      }
    }
  },
  mounted() {
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
      this.form = this.resetForm()
      this.showForm = true
      console.log('From create person: ', this.showForm)
    },
    editPerson(person) {
      console.log(person)
      this.form = { ...person }
      this.showForm = true
    },
    async save() {
      const token = sessionStorage.getItem('token')
      const userid = sessionStorage.getItem('userId')
      try {
        await axios.post(
          `http://localhost:3000/v1/profiles/${userid}/people`,
          this.newPerson,
          {
            headers: {
              usertoken: token
            }
          }
        )
        this.cancel()
        this.loadPeople()
      } catch (error) {
        console.error('Error fetching calories:', error)
      }

      // Update people array logic here...
    },
    async loadPeople() {
      const token = sessionStorage.getItem('token')
      const userid = sessionStorage.getItem('userId')
      try {
        const response = await axios.get(
          `http://localhost:3000/v1/profiles/${userid}/people`,

          {
            headers: {
              usertoken: token
            }
          }
        )
        this.people = response.data
      } catch {}
    },
    cancel() {
      const modalElement = this.$el.querySelector('.modal')
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement) // Get the modal instance
        modalInstance.hide() // Hide the modal properly, removing the backdrop as well
      }
      this.showForm = false // Now, you can safely set showForm to false
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
