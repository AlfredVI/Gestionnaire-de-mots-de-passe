import Vue from 'vue'
import VueRouter from 'vue-router'
import Authentication from '../views/Authentication.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Authentication',
    component: Authentication
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
]

const router = new VueRouter({
  routes
})

export default router
