<template>
  <div class="navbar-container">
    <NavbarInternal/>
    <div class="main-container">
      <div class="col-12 col-md-8 col-lg-6 p-5">
    <h1>Settings</h1>
    <form @submit.prevent="updateProfile">
      <div class="mb-3">
        <label for="username" class="form-label">User Name</label>
        <input
          type="text"
          class="form-control"
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
        />
      </div>
      <div class="mb-3">
        <label for="newPassword" class="form-label">New Password</label>
        <input
          type="password"
          class="form-control"
          id="newPassword"
          v-model="newPassword"
        />
        <div class="progress">
          <div class="bar"></div>
        </div>
      </div>
      <div class="mb-3">
        <label for="confirmNewPassword" class="form-label">Confirm New Password</label>
        <input
          type="password"
          class="form-control"
          id="confirmNewPassword"
          v-model="confirmNewPassword"
        />
      </div>
      <div class="mb-3">
        <button type="submit" class="btn ms-2" @click="updateProfile">Update</button>
        <button type="button" class="btn ms-2" @click="cancel">Cancel</button>
      </div>
    </form>
    <div v-if="emptyFields" class="alert alert-danger" role="alert">
      Please fill in all fields
    </div>
    <div v-if="passwordsDoNotMatch" class="alert alert-danger" role="alert">
      New password does not match with reapeated password
    </div>
    <div v-if="passwordsDoNotMatchDB" class="alert alert-danger" role="alert">
      Old password does not match with stored password
    </div>
    <div v-if="passwordsConfirmed" class="alert alert-success" role="alert">
      Password changed
    </div>
    <div v-if="passwordsNotStrong" class="alert alert-success" role="alert" style="text-align: left;">
      Password not strong enough to be accepted! it should meet the following criteria
      <ul style="text-align: left;">
        <li>Minimum characters: 8 </li>
        <li>Atleast one capital letter</li>
        <li>Atleast one small letter</li>
        <li>Atleast one numeric value</li>
        <li>Atleast one Special character</li>
      </ul>
    </div>
  </div>
</div>
  <NavbarInternalBottom/>
</div>
</template>

<script>
// import axios from 'axios'
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
      username: '',
      oldPassword: '',
      oldPasswordDb: '',
      newPassword: '',
      confirmNewPassword: '',
      emptyFields: false,
      passwordsDoNotMatch: false,
      passwordsConfirmed: false,
      passwordsDoNotMatchDB: false,
      passwordsNotStrong: false,
      modalView: null,
      progressBar: null
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
    this.getUserName()
    this.passwordchecker()
  },
  methods: {
    getUserName() {
      const userid = sessionStorage.getItem('userId')
      const updateUrl = `http://localhost:3000/v1/profiles/${userid}`
      Api.get(updateUrl).then(response => {
        this.username = response.data.username
        this.oldPasswordDb = response.data.password
      })
        .catch(error => {
          console.error('Error updating the password:', error)
        })
    },
    updateProfile() {
      // Check if any fields are empty
      if (!this.newPassword || !this.confirmNewPassword || !this.oldPassword) {
        this.emptyFields = true
      } else {
        this.emptyFields = false
        // checks if old password matches database
        if (this.oldPassword !== this.oldPasswordDb) {
          this.passwordsDoNotMatchDB = true
        } else {
          this.passwordsDoNotMatchDB = false
          // Checks if the new passwords entered match each other
          if (this.newPassword !== this.confirmNewPassword) {
            this.passwordsDoNotMatch = true
          } else {
            this.passwordsDoNotMatch = false
            // Checks if password is strong
            if (!this.newPassword.length > 7 || // Criteria 1: new password has length 8
            !/[0-9>]/.test(this.newPassword) || // Criteria 2: new password has atleast one numeric
            !/[a-z>]/.test(this.newPassword) || // Criteria 3: new password has atleast one small letter
            !/[A-Z]/.test(this.newPassword) || // Criteria 4: new password has atleaset one Capital letter
            !/[!@#$%^&*()_+{}\\:;<>,.?~\\-]/.test(this.newPassword)) {
              this.passwordsNotStrong = true
            } else {
              // If all checks pass, change password
              this.passwordsNotStrong = false
              const userid = sessionStorage.getItem('userId')
              const updateUrl = `http://localhost:3000/v1/profiles/${userid}`
              const requestData = {
                password: this.newPassword
              }
              Api.patch(updateUrl, requestData)
                .then(response => {
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
          }
        }
      }
    },
    cancel() {
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmNewPassword = ''
      this.emptyFields = false
      this.passwordsDoNotMatch = false
      this.passwordsDoNotMatchDB = false
      this.passwordsNotStrong = false
      this.progressBar.style.cssText = 'width: unset'
    },
    passwordchecker() {
      const passwordText = document.querySelector('#newPassword')
      this.progressBar = document.querySelector('.bar')
      passwordText.onkeyup = () => {
        this.checkPasswordStrength(passwordText.value, this.progressBar)
      }
    },
    checkPasswordStrength(passwordText, progressBar) {
      let strength = 0
      if (passwordText.length === 0) { progressBar.style.cssText = 'width: 0%' }
      if (/[0-9>]/.test(passwordText)) { strength++ }
      if (/[a-z>]/.test(passwordText)) { strength++ }
      if (passwordText.length > 7) { strength++ }
      if (/[A-Z]/.test(passwordText)) { strength++ }
      if (/[!@#$%^&*()_+{}\\:;<>,.?~\\-]/.test(this.newPassword)) { strength++ }
      switch (strength) {
        case 1:
          progressBar.style.cssText = `width: ${strength / 5 * 100}%; background-color: red`
          break
        case 2:
          progressBar.style.cssText = `width: ${strength / 5 * 100}%; background-color: orangered`
          break
        case 3:
          progressBar.style.cssText = `width: ${strength / 5 * 100}%; background-color: gold`
          break
        case 4:
          progressBar.style.cssText = `width: ${strength / 5 * 100}%; background-color: deepskyblue`
          break
        case 5:
          progressBar.style.cssText = `width: ${strength / 5 * 100}%; background-color: green`
          break
      }
    }
  }
}
</script>

<style scoped>
#newPasswordText{
  color: red;
  position: absolute;
  left: 0px;
}
.progress{
  height: 0.4rem;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 4rem;
}
.bar{
  width: 0%;
  height: 100%;
  background-color: red;
  border-radius: inherit;
  transition: .4% ease-in-out;
}
</style>
