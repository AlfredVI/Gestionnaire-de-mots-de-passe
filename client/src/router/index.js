import Vue from 'vue'
import VueRouter from 'vue-router'
import Authentication from '../views/Authentication.vue'
import About from '../views/About.vue'
import General from '../views/General.vue'
import CreateGroup from '../views/CreateGroup.vue'
import CreatePassword from '../views/CreatePassword.vue'

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
  {
    path: '/general',
    name : 'General', 
    component : General
  }, 
  {
    path: '/createGroup',
    name: 'CreateGroup',
    component: CreateGroup
  },
  { path: '/createPassword/:id',
    name: 'CreatePassword',
    component: CreatePassword
  } 
]

const router = new VueRouter({
  routes
})

export default router
