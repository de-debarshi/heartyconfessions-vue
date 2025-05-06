import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Submit from '../views/Submit'
import ConfessionSingle from '../views/ConfessionSingle'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/submit',
    name: 'Submit',
    component: Submit,
  },
  {
    path: '/confession/:id',
    name: 'ConfessionSingle',
    component: ConfessionSingle,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
