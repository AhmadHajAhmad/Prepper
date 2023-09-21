import axios from 'axios'
import { ref } from 'vue'

export const Api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000/api'
})

export const useApi = () => {
  const error = ref(null)

  const get = async (endpoint) => {
    try {
      const response = await Api.get(endpoint)
      return response.data
    } catch (e) {
      error.value = e
      throw e
    }
  }

  // You can add more methods like post, put, delete, etc.

  return { error, get }
}
