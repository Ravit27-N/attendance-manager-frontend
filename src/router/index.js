import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

//auth=true (Can Access)
//auth=false (Cannot Access without authenticate)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      header: 0,
      auth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      header: 1,
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      header: 0,
      auth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('../views/Student.vue'),
    meta: {
      header: 1,
      auth: true
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/Report.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import('../views/Chart.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: () => import('../views/PageNotFound.vue'),

  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  console.log(to.meta.auth);
  var Token = sessionStorage.getItem('Token');

  if (to.meta.auth) {
    next();
  } else if (!to.meta.auth && Token == null) {
    next('/login');
  }
  else {
    next();
  }
});

export default router
