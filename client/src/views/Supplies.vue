<template>
    <div class="white-template">
        <!-- Display fetched data here -->
        <div>
          <h2>Supply List</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>In-Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="supply in supplies" :key="supply._id">
                <td>{{ supply.itemname }}</td>
                <td>{{ supply.instock }}</td>
                <td><button @click.stop="updateSupplies(supply)" class="btn btn-primary">Update
                    </button>
                    <button @click.stop="deleteSupplies(supply)" class="btn btn-danger">Delete
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="createSupplies" class="btn btn-primary">Create Supplies</button>
        </div>
        <div class="centered-content">
          <!-- Render the fetched data -->
          <p>Supplies Data Creation Form or List</p>

    <!-- Integrated Supplies Form -->
    <div v-if="showForm" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Supplies</h5>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="itemname" class="form-label">Item Name</label>
              <input
                v-model="newSupplies.itemname"
                type="text"
                class="form-control"
                id="itemnameCtrl"
              />
            </div>
            <div class="mb-3">
              <label for="instock" class="form-label">Instock Status</label>
              <input
                v-model="newSupplies.instock"
                type="boolean"
                class="form-control"
                id="instockCtrl"
              />
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
    <!-- Integrated Supplies Form ends here -->
  </div>
    </div>
  </template>

<script>
import axios from 'axios'
import { Modal } from 'bootstrap'
import * as bootstrap from 'bootstrap'

export default {
  data() {
    return {
      token: null, // Initialize token as a data property
      userId: null, // Initialize userId as a data property
      supplies: [], // Store the list of supplies here
      showForm: false,
      modalInstance: null,
      newSupplies: {
        itemname: '',
        instock: false
      }
    }
  },
  mounted() {
    this.getSupplies()
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
    async getSupplies() {
      const userid = sessionStorage.getItem('userId')
      const token = sessionStorage.getItem('token')
      try {
        const response = await axios.get(
          `http://localhost:3000/v1/profiles/${userid}/supplies`,
          // `http://localhost:3000/v1/profiles/${userid}/calories/days`,
          {
            headers: {
              usertoken: token
            }
          }
        )
        this.supplies = response.data
      } catch (error) {
        console.error('Error fetching calories:', error)
      } finally {
        this.isLoading = false
      }
    },
    createSupplies() {
      this.showForm = true
      console.log('From create person: ', this.showForm)
      this.newSupplies = this.resetForm()
    },
    async save() {
      const token = sessionStorage.getItem('token')
      const userid = sessionStorage.getItem('userId')
      try {
        await axios.post(
          `http://localhost:3000/v1/profiles/${userid}/supplies`,
          this.newSupplies,
          {
            headers: {
              usertoken: token
            }
          }
        )
        this.cancel()
        this.getSupplies()
      } catch (error) {
        console.error('Error saving the supplies:', error)
      }
    },
    updateSupplies(supply) {
      this.newSupplies = { ...supply }
      this.showForm = true
    },
    async deleteSupplies(supply) {
      const token = sessionStorage.getItem('token')
      const userid = sessionStorage.getItem('userId')
      try {
        await axios.delete(
          `http://localhost:3000/v1/profiles/${userid}/supplies/${supply._id}`,
          {
            headers: {
              usertoken: token
            }
          }
        )
        this.cancel()
        this.getSupplies()
      } catch (error) {
        console.error('Error deleting the supply:', error)
      }
    },
    cancel() {
      const modalElement = this.$el.querySelector('.modal')
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement) // Get the modal instance
        modalInstance.hide() // Hide the modal properly, removing the backdrop as well
      }
      this.showForm = false // Now, you can safely set showForm to false
      this.newSupplies = this.resetForm()
    },
    resetForm() {
      return {
        itemnameCtrl: '',
        instockCtrl: false
      }
    }
  }
}
</script>
<style>
.white-template {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.loading-message {
  font-size: 18px;
  color: #333;
}

.centered-content {
  text-align: center;
  padding: 20px;
}

/* Additional styling for your content can be added here */
</style>
