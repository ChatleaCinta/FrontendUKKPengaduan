import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Pengaduan from '../views/Pengaduan.vue'
import Tanggapan from '../views/Tanggapan.vue'
import Detail from '../views/Detail.vue'
import User from '../views/User.vue'
import Nav from '../views/Navbar.vue'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {default:Home,nav:Nav}
  },
  {
    path: '/login',
    name: 'Login',
    components: {default:Login,nav:Nav}
  },
  {
    path: '/register',
    name: 'Register',
    components: {default:Register,nav:Nav}

  },
  {
    path: '/pengaduan',
    name: 'Pengaduan',
    components: {default:Pengaduan,nav:Nav},
    meta: { 
      requiresAuth: true
    }
    

  },
  {
    path: '/tanggapan',
    name: 'Tanggapan',
    components: {default:Tanggapan,nav:Nav},
    meta: { 
      requiresAuthAdmin: true
    }

  },
  {
    path: '/detail/:idpengaduan',
    name: 'Detail',
    components: {default:Detail,nav:Nav}

  },
  {
    path: '/user',
    name: 'User',
    components: {default:User,nav:Nav},
    meta: { 
      requiresAuthAdmin: true
    }

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else if(to.matched.some(record => record.meta.requiresAuthAdmin)){
    if (store.state.user.role == 'admin' || store.state.user.role == 'staff') {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router