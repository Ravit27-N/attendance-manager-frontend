import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      header: 0
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      header: 1
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      header: 0
    }
  },
  {
    path: '/admin',
    name: 'Test',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      header: 1
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue'),
    meta: {
      header: 1
    }
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('../views/Student.vue'),
    meta: {
      header: 1
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/Report.vue'),
    meta: {
      header: 1
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
