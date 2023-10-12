// serverAvailabilityService.js
import axios from 'axios'

const isServerOnline = async function () {
  try {
    console.log('hello from offline')
    await axios.head('http://localhost:3000') // Replace 'your-server-url' with your actual server URL
    return true
  } catch (error) {
    return false
  }
}

export default isServerOnline
