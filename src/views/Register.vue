<template>
  <div class="page-container">
    <Navbar />

    <!-- Register Content -->
    <main class="auth-content">
      <div class="auth-container">
        <!-- Header -->
        <div class="auth-header">
          <h1 class="page-title">Join Us</h1>
          <p class="page-subtitle">Start your festival experience today</p>
        </div>

        <!-- Form -->
        <form class="open-form" @submit.prevent="handleRegister">
          <div class="floating-input-group">
            <input
              id="name"
              type="text"
              class="floating-input"
              placeholder=" "
              v-model="name"
              required
            />
            <label for="name" class="floating-label">Full Name</label>
          </div>

          <div class="floating-input-group">
            <input
              id="username"
              type="text"
              class="floating-input"
              placeholder=" "
              v-model="username"
              required
            />
            <label for="username" class="floating-label">Username</label>
          </div>

          <div class="floating-input-group">
            <input
              id="password"
              type="password"
              class="floating-input"
              placeholder=" "
              v-model="password"
              required
            />
            <label for="password" class="floating-label">Password</label>
          </div>

          <div class="floating-input-group">
            <input
              id="confirm-password"
              type="password"
              class="floating-input"
              placeholder=" "
              v-model="confirmPassword"
              required
            />
            <label for="confirm-password" class="floating-label">Confirm Password</label>
          </div>

          <button type="submit" class="action-button">
            Create Account
          </button>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>

        <!-- Footer -->
        <div class="auth-footer">
          <p class="footer-message">
            Already have an account?
            <router-link to="/login" class="link-text">Log in here</router-link>
          </p>
        </div>
      </div>

    </main>

    <BackgroundEffects />

  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import authService from '@/services/authService'

export default {
  name: 'RegisterPage',
  components: {
    Navbar,
    BackgroundEffects
  },
  data() {
    return {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleRegister() {
      this.errorMessage = ''

      const result = await authService.register(this.name, this.username, this.password)
      
      if (result.success) {
        // Redirect based on user role
        if (result.user.role === 'admin') {
          this.$router.push('/admin-dashboard')
        } else {
          this.$router.push('/dashboard')
        }
      } else {
        this.errorMessage = result.error
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(ellipse at top, #1a0033 0%, #000000 50%, #0a0015 100%);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}

/* Auth Content */
.auth-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 10;
  overflow-y: auto;
}

.auth-container {
  width: 100%;
  max-width: 520px;
  margin: 2rem 0;
}

/* Header */
.auth-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ffffff 0%, #e0d5ff 40%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  letter-spacing: -2px;
  line-height: 1;
}

.page-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  letter-spacing: -0.3px;
}

/* Open Form - No Card */
.open-form {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

/* Floating Input Groups */
.floating-input-group {
  position: relative;
}

.floating-input {
  width: 100%;
  padding: 1.25rem 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(139, 92, 246, 0.3);
  font-size: 1.125rem;
  color: #ffffff;
  font-family: 'Geist', sans-serif;
  outline: none;
  transition: all 0.3s ease;
}

.floating-label {
  position: absolute;
  left: 0;
  top: 1.25rem;
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
  pointer-events: none;
  transition: all 0.3s ease;
}

.floating-input:focus {
  border-bottom-color: #8b5cf6;
}

.floating-input:focus ~ .floating-label,
.floating-input:not(:placeholder-shown) ~ .floating-label {
  top: -1.5rem;
  font-size: 0.875rem;
  color: #c4b5fd;
  font-weight: 600;
}

/* Error Message */
.error-message {
  color: #ff6b6b;
  font-size: 0.95rem;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
}

/* Action Button */
.action-button {
  width: 100%;
  padding: 1.125rem;
  margin-top: 1rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  border: none;
  border-radius: 14px;
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Geist', sans-serif;
  letter-spacing: -0.5px;
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.35);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-button:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
  box-shadow: 0 16px 50px rgba(139, 92, 246, 0.45);
  transform: translateY(-3px);
}

/* Footer */
.auth-footer {
  text-align: center;
  margin-top: 2.5rem;
}

.footer-message {
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
}

.link-text {
  color: #c4b5fd;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.link-text:hover {
  color: #ddd6fe;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.75rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .floating-input,
  .floating-label {
    font-size: 1rem;
  }
  
  .auth-header {
    margin-bottom: 3rem;
  }
  
  .open-form {
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .auth-content {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2.25rem;
  }
  
  .auth-header {
    margin-bottom: 2.5rem;
  }
}
</style>
