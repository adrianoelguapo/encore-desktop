<template>
  <!-- Navigation Bar -->
  <div class="navigation-container">

    <nav class="navigation-bar">
        <div class="navigation-wrapper">
        <router-link to="/" class="logo-link">
            <h1 class="logo-text">Encore Festival</h1>
        </router-link>
        
        <div class="auth-buttons-group">
          <template v-if="isAuthenticated">
            <button @click="handleLogout" class="logout-button">Log Out</button>
          </template>
          <template v-else>
            <router-link to="/login" class="login-button">Log In</router-link>
            <router-link to="/register" class="register-button">Register</router-link>
          </template>
        </div>
        </div>
    </nav>
    
  </div>
</template>

<script>
import authService from '@/services/authService'

export default {
  name: 'NavbarComponent',
  data() {
    return {
      isAuthenticated: false
    }
  },
  mounted() {
    this.checkAuth()
    // Listen for auth changes
    window.addEventListener('storage', this.checkAuth)
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.checkAuth)
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = authService.isAuthenticated()
    },
    handleLogout() {
      authService.logout()
      this.isAuthenticated = false
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.navigation-container{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.navigation-bar {
  width: 70%;
  position: relative;
  z-index: 100;
  padding: 2rem 2rem 0;
  display: flex;
  justify-content: center;
}

.navigation-wrapper {
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(20, 15, 35, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 4px 40px rgba(139, 92, 246, 0.35);
}

.logo-link {
  text-decoration: none;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.8px;
}

.auth-buttons-group {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.login-button,
.register-button {
  padding: 0.75rem 1.75rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Geist', sans-serif;
  text-decoration: none;
  display: inline-block;
}

.login-button {
  color: #ffffff;
  background: transparent;
  padding: 0.75rem 0;
}

.login-button:hover {
  color: rgba(255, 255, 255, 0.7);
}

.register-button {
  background: #c4b5fd;
  color: #1a0a2e;
}

.register-button:hover {
  background: #ddd6fe;
  transform: translateY(-2px);
}

.logout-button {
  padding: 0.75rem 1.75rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  background: #c4b5fd;
  color: #1a0a2e;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Geist', sans-serif;
}

.logout-button:hover {
  transform: translateY(-2px);
}
</style>
