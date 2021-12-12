import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Submit from '../views/Submit'

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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
