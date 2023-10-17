<template>
  <div class="navbar-container">
    <NavbarInternal />
    <div class="main-container">
      <div class="col-12 col-md- col-lg-10 p-5">
        <h1>Supply List</h1>
        <ul class="list-group">
          <li v-for="supply in supplies" :key="supply._id" class="list-group-item d-flex justify-content-between align-content-center">
            <div class="item-info">
            <span class="item-detail"><strong>Item Name:</strong> {{ supply.itemname }}</span>
            <span class="item-detail" v-if=supply.instock><strong>In-Stock: </strong>Yes</span>
            <span class="item-detail" v-if=!supply.instock><strong>In-Stock: </strong>No</span>
        </div>
        <div class="btn-container">
            <button @click.stop="updateSupplies(supply)" class="btn">Update</button>
            <button @click.stop="deleteSupplies(supply)" class="btn btn-alert">Delete</button>
        </div>
      </li>
    </ul>
    <button @click="createSupplies" class="btn">
          Create Supply
        </button>
      </div>
      <div class="centered-content">
        <!-- Integrated Supplies Form -->
        <div
          v-if="showForm"
          class="modal"
          data-bs-backdrop="static"
          tabindex="1"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title">Supplies</h2>
              </div>
              <form
                action=""
                @submit.prevent="save"
                class="was-validated form-floating"
              >
                <div class="modal-body form-floating">
                  <div class="mb-3 form-floating">
                    <input
                      v-model="newSupplies.itemname"
                      type="text"
                      class="form-control form-floating"
                      id="itemname"
                      placeholder="My Test Placeholder"
                      required
                      pattern="^[A-Za-z]+(\s[A-Za-z]+)*$"
                    />
                    <label for="itemname" class="form-label">Item Name</label>
                    <div class="valid-feedback">looks good!</div>
                    <div class="invalid-feedback">
                      Only Characters accepted!
                    </div>
                  </div>
                  <div class="mb-3 form-check form-switch form-check-reverse">
                    <input
                      v-model="newSupplies.instock"
                      type="checkbox"
                      class="form-check-input"
                      id="instock"
                    />
                    <label for="instock" class="form-check-label"
                      >Instock Status</label
                    >
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-primary">Save</button>
                    <button @click="cancel" class="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
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
import { Modal } from 'bootstrap'
import * as bootstrap from 'bootstrap'
import NavbarInternal from '../components/NavbarInternal.vue'
import NavbarInternalBottom from '../components/NavbarInternalBottom.vue'
import Api from '../Api'

export default {
  components: {
    NavbarInternal,
    NavbarInternalBottom
  },
  data() {
    return {
      supplies: [],
      showForm: false,
      modalInstance: null,
      newSupplies: {
        itemname: '',
        instock: false
      }
    }
  },
  mounted() {
    if (!sessionStorage.getItem('token') && !sessionStorage.getItem('admintoken')) {
      console.log('Token not found. Redirecting to login.')
      this.$router.push({ name: 'login' })
      return
    } else if (sessionStorage.getItem('admintoken')) {
      console.log('Token not found. Redirecting to login.')
      this.$router.push({ name: 'admin' })
      return
    }
    this.userid = sessionStorage.getItem('userId')
    this.token = sessionStorage.getItem('token')
    this.getSupplies()
  },
  watch: {
    showForm() {
      if (this.showForm) {
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
      try {
        const response = await Api.get(
          `http://localhost:3000/v1/profiles/${this.userid}/supplies`,
          {
            headers: {
              usertoken: this.token
            }
          }
        )
        if (Array.isArray(response.data) && response.data.length > 0) {
          this.supplies = response.data
        } else {
          this.supplies = []
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.supplies = []
        } else {
          console.log('Eror fetching supplies')
        }
      } finally {
        this.isLoading = false
      }
    },
    createSupplies() {
      this.showForm = true
      this.newSupplies = this.resetForm()
    },
    async save() {
      try {
        if (this.newSupplies._id) {
          await Api.patch(
            `http://localhost:3000/v1/profiles/${this.userid}/supplies/${this.newSupplies._id}`,
            this.newSupplies,
            {
              headers: {
                usertoken: this.token
              }
            }
          )
          this.cancel()
          this.getSupplies()
        } else {
          await Api.post(
            `http://localhost:3000/v1/profiles/${this.userid}/supplies`,
            this.newSupplies,
            {
              headers: {
                usertoken: this.token
              }
            }
          )
          this.cancel()
          this.getSupplies()
        }
      } catch (error) {
        console.error('Error saving the supplies')
      }
    },
    updateSupplies(supply) {
      this.newSupplies = { ...supply }
      this.showForm = true
    },
    async deleteSupplies(supply) {
      try {
        await Api.delete(
          `http://localhost:3000/v1/profiles/${this.userid}/supplies/${supply._id}`,
          {
            headers: {
              usertoken: this.token
            }
          }
        )
        this.cancel()
        this.getSupplies()
      } catch (error) {
        console.error('Error deleting the supplies')
      }
    },
    cancel() {
      const modalElement = this.$el.querySelector('.modal')
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement)
        modalInstance.hide()
      }
      this.showForm = false
      this.newSupplies = this.resetForm()
    },
    resetForm() {
      return {
        itemname: '',
        instock: false
      }
    }
  }
}
</script>
