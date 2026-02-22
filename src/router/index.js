import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import authService from '../services/authService'

/* --- Rutas de la aplicación --- */
const routes = [

  {

    path: '/',
    name: 'Home',
    component: Home

  },

  {

    path: '/login',
    name: 'Login',
    component: Login

  },

  {

    path: '/register',
    name: 'Register',
    component: Register

  },

  {

    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }

  },

  {

    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }

  }

]

/* --- Router --- */
const router = createRouter({

  history: createWebHashHistory(),
  routes

})

/* --- Verificar que el usuario esté autenticado y tenga permisos cada vez que se mueva de una vista a otra --- */
router.beforeEach((to, from, next) => {

  /* --- Verificar si la ruta requiere autenticación o permisos de admin --- */
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const isAuthenticated = authService.isAuthenticated()
  const user = authService.getCurrentUser()

  /* --- A la hora de navegar a la página de inicio, se le lleva a un panel dependiendo de su rol --- */
  if (to.name === 'Home' && isAuthenticated) {


    if (user && user.role === 'admin') {

      next('/admin-dashboard')

    } else {

      next('/dashboard')

    }

    return

  }

  /* --- Si la ruta requiere autenticación y el usuario no está logeado, se le lleva a la página de login, si no se le lleva al panel correspondiente --- */
  if (requiresAuth && !isAuthenticated) {

    next('/login')

  } else if (requiresAdmin && (!user || user.role !== 'admin')) {

    next('/dashboard')

  } else {

    next()

  }

})

export default router
