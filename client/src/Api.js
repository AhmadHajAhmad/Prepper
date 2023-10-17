import axios from 'axios'
import router from './router.js'

export const Api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000/api/v1',
  timeout: 3000
})

Api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (!error.response || error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      console.log(error.code)
      if (router.currentRoute.path !== '/offline') {
        router.push({ path: '/offline' })
      }
    } else {
      return Promise.reject(error)
    }
  }
)

export default Api
