<template>
  <div class="container p-4">
    <h1 class="display-4">DIT342 Frontend</h1>
    <p class="lead">Welcome to your DIT342 Frontend Vue.js App</p>
    <button class="btn btn-primary btn_message" @click="getMessage">Get Message from Server</button>
    <p>Message from the server:<br/>
    {{ message }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import { Api } from '@/Api'

export default {
  name: 'home',
  setup() {
    const message = ref('none')

    const getMessage = async () => {
      try {
        const response = await Api.get('/')
        message.value = response.data.message
      } catch (error) {
        message.value = error.message
      }
    }

    return {
      message,
      getMessage
    }
  }
}
</script>

<style scoped>
.btn_message {
  margin-bottom: 1em;
}
</style>
