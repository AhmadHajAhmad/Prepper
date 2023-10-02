<template>
    <div class="container mt-5">

      <!-- List of Users -->
      <div class="row mb-5">
        <div class="col-12">
          <h2>Users</h2>
          <ul class="list-group">
            <li v-for="user in userList" :key="user._id" class="list-group-item">
              <strong>Username: </strong>{{ user.username }}
              <strong>Email: </strong>{{ user.email }}
              <button class="btn btn-danger mt-3 ms-2" @click="deleteUser(user._id)"
              v-if="!['Baseline Admin', 'Baseline User'].includes(user.username)">Delete User</button>
            </li>
          </ul>
        </div>
      </div>

      <!-- List of Food -->
      <div class="row mb-5">
        <div class="col-12">
          <h2>Food</h2>
          <ul class="list-group">
            <li v-for="food in foodList" :key="food._id" class="list-group-item">
              <strong>Name: </strong>{{ food.foodname }}
              <strong>Weight: </strong>{{ food.weight }}
              <strong>Calories: </strong>{{ food.calories }}
            </li>
          </ul>
          <button class="btn btn-danger mt-3 ms-2" @click="deleteList('http://localhost:3000/v1/admins/deletefood', 'food')">Delete List</button>
        </div>
      </div>

      <!-- List of People -->
      <div class="row">
        <div class="col-12">
          <h2>People</h2>
          <ul class="list-group">
            <li v-for="person in peopleList" :key="person._id" class="list-group-item">
              <strong>Name: </strong>{{ person.name }}
              <strong>Age: </strong>{{ person.age }}
              <strong>Height: </strong>{{ person.height }}
              <strong>Weight: </strong>{{ person.weight }}
              <strong>Sex: </strong>{{ person.sex }}
            </li>
          </ul>
          <button class="btn btn-danger mt-3 ms-2" @click="deleteList('http://localhost:3000/v1/admins/deletepersons', 'people')">Delete List</button>
        </div>
      </div>

      <!-- List of supplies-->
      <div class="row">
        <div class="col-12">
          <h2>Supplies</h2>
          <ul class="list-group">
            <li v-for="item in supplyList" :key="item._id" class="list-group-item">
              <strong>Item: </strong>{{ item.itemname }}
              <strong>In Stock: </strong>{{ item.instock }}
            </li>
          </ul>
          <button class="btn btn-danger mt-3 ms-2" @click="deleteList('http://localhost:3000/v1/admins/deletesupplies', 'supplies')">Delete List</button>
        </div>
      </div>

    </div>
  </template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const adminID = ref(null)
    const adminToken = ref(null)
    const foodList = ref([])
    const userList = ref([])
    const peopleList = ref([])
    const supplyList = ref([])

    const getEntities = async (url, targetList, token) => {
      try {
        const response = await axios.get(url, {
          headers: {
            admintoken: token
          }
        })
        targetList.value = response.data
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error)
      }
    }

    const deleteList = async (url, list) => {
      try {
        const token = adminToken.value
        const targetList = list
        await axios.delete(url, {
          headers: {
            admintoken: token
          }
        })
        if (targetList === 'food') {
          foodList.value = null
        } else if (targetList === 'supplies') {
          supplyList.value = null
        } else if (targetList === 'people') {
          peopleList.value = null
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error)
      }
    }

    const deleteUser = async (userId) => {
      try {
        const token = adminToken.value
        const targetUser = userId
        await axios.delete(`http://localhost:3000/v1/profiles/${targetUser}`, {
          headers: {
            admintoken: token
          }
        })

        getEntities(`http://localhost:3000/v1/admins/${adminID.value}/foods`, foodList, adminToken.value)
        getEntities(`http://localhost:3000/v1/admins/${adminID.value}/users`, userList, adminToken.value)
        getEntities(`http://localhost:3000/v1/admins/${adminID.value}/people`, peopleList, adminToken.value)
        getEntities(`http://localhost:3000/v1/admins/${adminID.value}/supplies`, supplyList, adminToken.value)
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }

    onMounted(() => {
      adminID.value = sessionStorage.getItem('userId')
      adminToken.value = sessionStorage.getItem('token')
      getEntities(`http://localhost:3000/v1/admins/${adminID.value}/foods`, foodList, adminToken.value)
      getEntities(`http://localhost:3000/v1/admins/${adminID.value}/users`, userList, adminToken.value)
      getEntities(`http://localhost:3000/v1/admins/${adminID.value}/people`, peopleList, adminToken.value)
      getEntities(`http://localhost:3000/v1/admins/${adminID.value}/supplies`, supplyList, adminToken.value)
    })

    return {
      adminID,
      adminToken,
      foodList,
      userList,
      peopleList,
      supplyList,
      getEntities,
      deleteList,
      deleteUser
    }
  }
}
</script>

  <style scoped>
  /* You can style your component here if needed */
  </style>