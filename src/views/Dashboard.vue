<template>
  <div class="dashboard-container">
    <!-- Vertical Sidebar -->
    <aside class="dashboard-sidebar">
      <nav class="sidebar-nav">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['nav-icon-btn', { active: activeTab === tab.id }]"
          :title="tab.label"
        >
          <img :src="tab.icon" :alt="tab.label" class="nav-icon" />
        </button>

        <button @click="handleLogout" class="nav-icon-btn logout-btn" title="Log Out">
          <img src="@/assets/icons/log-out.svg" alt="Log Out" class="nav-icon" />
        </button>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="dashboard-main">
      <div class="content-wrapper">
        <!-- Home Tab -->
        <div v-if="activeTab === 'home'" class="tab-content">
          <h1 class="tab-title">Home</h1>
        </div>

        <!-- Concerts Tab -->
        <div v-if="activeTab === 'concerts'" class="tab-content">
          <h1 class="tab-title">Concerts</h1>
        </div>

        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="tab-content">
          <h1 class="tab-title">Profile</h1>
        </div>

        <!-- My Bookings Tab -->
        <div v-if="activeTab === 'bookings'" class="tab-content">
          <h1 class="tab-title">My Bookings</h1>
        </div>
      </div>
    </main>

    <BackgroundEffects />
  </div>
</template>

<script>
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import authService from '@/services/authService'

export default {
  name: 'DashboardPage',
  components: {
    BackgroundEffects
  },
  data() {
    return {
      user: null,
      activeTab: 'home',
      tabs: [
        { id: 'home', label: 'Home', icon: require('@/assets/icons/home.svg') },
        { id: 'concerts', label: 'Concerts', icon: require('@/assets/icons/concerts.svg') },
        { id: 'profile', label: 'Profile', icon: require('@/assets/icons/users.svg') },
        { id: 'bookings', label: 'My Bookings', icon: require('@/assets/icons/bookings.svg') }
      ]
    }
  },
  mounted() {
    this.user = authService.getCurrentUser()
  },
  methods: {
    handleLogout() {
      authService.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: radial-gradient(ellipse at top, #1a0033 0%, #000000 50%, #0a0015 100%);
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}

/* Sidebar */
.dashboard-sidebar {
  width: 100px;
  height: 85vh;
  margin: auto 0 auto 3%;
  background: rgba(20, 15, 35, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 4px 40px rgba(139, 92, 246, 0.35);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 100;
  padding: 2rem 0;
  gap: 1rem;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  padding: 0 1rem;
}

.nav-icon-btn {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.6);
}

.nav-icon {
  width: 24px;
  height: 24px;
  filter: brightness(0) saturate(100%) invert(100%) opacity(0.6);
  transition: all 0.3s ease;
}

.nav-icon-btn:hover .nav-icon,
.nav-icon-btn.active .nav-icon {
  filter: brightness(0) saturate(100%) invert(100%) opacity(1);
}

.logout-btn .nav-icon {
  filter: brightness(0) saturate(100%) invert(46%) sepia(78%) saturate(4907%) hue-rotate(340deg) brightness(98%) contrast(93%) opacity(0.8);
}

.logout-btn:hover .nav-icon {
  filter: brightness(0) saturate(100%) invert(46%) sepia(78%) saturate(4907%) hue-rotate(340deg) brightness(98%) contrast(93%) opacity(1);
}

.nav-icon-btn:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.2);
  transform: translateY(-2px);
}

.nav-icon-btn.active {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2);
}

.logout-btn {
  margin-top: auto;
  border-color: rgba(239, 68, 68, 0.3);
  color: rgba(239, 68, 68, 0.8);
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.5);
  color: rgba(239, 68, 68, 1);
}

/* Main Content */
.dashboard-main {
  flex: 1;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  margin-top: 5%;
  position: relative;
  z-index: 10;
}

.content-wrapper {
  padding-left: 2rem;
  max-width: 1400px;
  width: 100%;
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

.tab-title {
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -2px;
  color: white;
  margin-bottom: 1%;
  margin-left: 1%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
