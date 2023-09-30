import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Household from './views/Household.vue'
import Supplies from './views/Supplies.vue'
import Food from './views/Food.vue'
import Register from './views/Register.vue'
import Admin from './views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/household',
    name: 'household',
    component: Household
  },
  {
    path: '/supplies',
    name: 'supplies',
    component: Supplies
  },
  {
    path: '/food',
    name: 'food',
    component: Food
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
