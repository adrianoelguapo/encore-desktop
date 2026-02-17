import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import authService from '../services/authService'

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

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const isAuthenticated = authService.isAuthenticated()
  const user = authService.getCurrentUser()

  // Redirect authenticated users from Home to their respective dashboard
  if (to.name === 'Home' && isAuthenticated) {
    if (user && user.role === 'admin') {
      next('/admin-dashboard')
    } else {
      next('/dashboard')
    }
    return
  }

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (requiresAdmin && (!user || user.role !== 'admin')) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
