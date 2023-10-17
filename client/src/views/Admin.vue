<template>
    <div class="navbar-container">
      <NavbarAdmin/>
      <div class="main-container">
        <div class="col-12 col-md-10 col-lg-10 p-5">
      <!-- List of Users -->
      <div class="row mb-5">
        <div class="col-12">
          <h2>Users</h2>
          <ul class="list-group">
            <li v-for="user in userList" :key="user._id" class="list-group-item">
              <strong>Username: </strong>{{ user.username }}
              <strong>Email: </strong>{{ user.email }}
              <button class="btn btn-alert mt-3 ms-2" @click="deleteUser(user._id)"
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
          <button class="btn btn-alert mt-3 ms-2" @click="deleteList('http://localhost:3000/v1/admins/deletefood', 'food')">Delete List</button>
        </div>
      </div>

      <!-- List of People -->
      <div class="row mb-5">
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
          <button class="btn btn-alert mt-3 ms-2" @click="deleteList('http://localhost:3000/v1/admins/deletepersons', 'people')">Delete List</button>
        </div>
      </div>

      <!-- List of supplies-->
      <div class="row mb-5">
        <div class="col-12">
          <h2>Supplies</h2>
          <ul class="list-group">
            <li v-for="item in supplyList" :key="item._id" class="list-group-item">
              <strong>Item: </strong>{{ item.itemname }}
              <strong>In Stock: </strong>{{ item.instock }}
            </li>
          </ul>
          <button class="btn btn-alert mt-3 ms-2" @click="deleteList('http://localhost:3000/v1/admins/deletesupplies', 'supplies')">Delete List</button>
        </div>
      </div>
    </div>
      </div>
    <NavbarAdminBottom/>
  </div>
  </template>

<script>
import { ref, onBeforeMount } from 'vue'
import Api from '../Api'
import NavbarAdmin from '../components/NavbarAdmin.vue'
import NavbarAdminBottom from '../components/NavbarAdminBottom.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    NavbarAdmin,
    NavbarAdminBottom
  },
  setup() {
    const router = useRouter()
    const adminID = ref(sessionStorage.getItem('userId'))
    const token = ref(sessionStorage.getItem('admintoken'))
    const userToken = ref(sessionStorage.getItem('token'))
    const foodList = ref([])
    const userList = ref([])
    const peopleList = ref([])
    const supplyList = ref([])

    const getEntities = async (url, targetList) => {
      try {
        const response = await Api.get(url, {
          headers: {
            admintoken: token.value
          }
        })
        targetList.value = response.data
      } catch (error) {
        console.error('Error fetching data')
      }
    }

    const deleteList = async (url, list) => {
      try {
        const targetList = list
        await Api.delete(url, {
          headers: {
            admintoken: token.value
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
        console.error('Error fetching data')
      }
    }

    const deleteUser = async (userId) => {
      try {
        const targetUser = userId
        await Api.delete(`http://localhost:3000/v1/profiles/${targetUser}`, {
          headers: {
            admintoken: token.value
          }
        })

        getEntities(`http://localhost:3000/v1/admins/${adminID.value}/foods`, foodList)
        getEntities(`http://localhost:3000/v1/admins/${adminID.value}/users`, userList)
        getEntities(`http://localhost:3000/v1/admins/${adminID.value}/people`, peopleList)
        getEntities(`http://localhost:3000/v1/admins/${adminID.value}/supplies`, supplyList)
      } catch (error) {
        console.error('Error deleting user')
      }
    }

    onBeforeMount(() => {
      if (!token.value && !userToken.value) {
        console.error('Token not available. User may not be authenticated.')
        router.push({ path: '/login' })
        return
      } else if (userToken.value) {
        console.error('You do not have admin privileges.')
        router.push({ path: '/dashboard' })
        return
      }
      getEntities(`http://localhost:3000/v1/admins/${adminID.value}/foods`, foodList)
      getEntities(`http://localhost:3000/v1/admins/${adminID.value}/users`, userList)
      getEntities(`http://localhost:3000/v1/admins/${adminID.value}/people`, peopleList)
      getEntities(`http://localhost:3000/v1/admins/${adminID.value}/supplies`, supplyList)
    })

    return {
      adminID,
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
