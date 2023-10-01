<template>
  <div class="container mt-5">
    <h2>Settings</h2>
    <h3>(Logged in as: {{ usernameHeading }})</h3>
    <form @submit.prevent="updateProfile">
      <div class="mb-3">
        <label for="username" class="form-label">User Name</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
          disabled
        />
      </div>
      <div class="mb-3">
        <label for="oldPassword" class="form-label">Old Password</label>
        <input
          type="password"
          class="form-control"
          id="oldPassword"
          v-model="oldPassword"
          placeholder="Enter old password"
        />
      </div>
      <div class="mb-3">
        <label for="newPassword" class="form-label">New Password</label>
        <input
          type="password"
          class="form-control"
          id="newPassword"
          v-model="newPassword"
          placeholder="Enter new password"
        />
      </div>
      <div class="mb-3">
        <label for="confirmNewPassword" class="form-label">Confirm New Password</label>
        <input
          type="password"
          class="form-control"
          id="confirmNewPassword"
          v-model="confirmNewPassword"
          placeholder="Repeat newly entered password"
        />
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary" @click="updateProfile">Update</button>
        <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
      </div>
    </form>
    <div v-if="passwordsDoNotMatch" class="alert alert-danger" role="alert">
      New Password does not match with reapeated password
    </div>
    <div v-if="passwordsDoNotMatchDB" class="alert alert-danger" role="alert">
      Old Password does not match with stored password
    </div>
    <div v-if="passwordsConfirmed" class="alert alert-success" role="alert">
      Passwords changed.
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '', // Use the username from sessionStorage
      oldPassword: '',
      oldPasswordDb: '',
      newPassword: '',
      confirmNewPassword: '',
      passwordsDoNotMatch: false,
      passwordsConfirmed: false,
      passwordsDoNotMatchDB: false,
      modalView: null,
      usernameHeading: ''
    }
  },
  mounted() {
    this.getUserName()
  },
  methods: {
    getUserName() {
      const userid = sessionStorage.getItem('userId')
      const updateUrl = `http://localhost:3000/v1/profiles/${userid}`
      axios.get(updateUrl).then(response => {
        this.username = response.data.username
        this.oldPasswordDb = response.data.password
        this.usernameHeading = this.username
        console.log(this.username)
        console.log(this.oldPasswordDb)
      })
        .catch(error => {
          console.error('Error updating the password:', error)
        })
    },
    updateProfile() {
      // checks if New Password not equal to ConfirmedPassword
      if (this.newPassword !== this.confirmNewPassword) {
        this.passwordsDoNotMatch = true
      // checks if Old Password equals to password saved to the saved password
      } else if (this.oldPassword !== this.oldPasswordDb) {
        this.passwordsDoNotMatchDB = true
      } else {
        this.passwordsDoNotMatch = false
        this.passwordsDoNotMatchDB = false

        // Send a request to update the user profile
        // You can use Axios or another HTTP library for this
        const userid = sessionStorage.getItem('userId')
        const updateUrl = `http://localhost:3000/v1/profiles/${userid}`
        const requestData = {
          password: this.newPassword
        }
        // Example using Axios:
        axios.patch(updateUrl, requestData)
          .then(response => {
          // Handle success
            this.passwordsConfirmed = true
            this.cancel()
            setTimeout(() => {
              this.passwordsConfirmed = false
            }, 2000)
          })
          .catch(error => {
            console.error('Error updating the password:', error)
          })
      }
    },
    cancel() {
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmNewPassword = ''
      this.passwordsDoNotMatch = false
      this.passwordsDoNotMatchDB = false
    }
  }
}
</script>

<style scoped>
/* Add styling if needed */
</style>
