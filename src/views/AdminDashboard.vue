<template>
  <div class="admin-container">
    <!-- Vertical Sidebar -->
    <aside class="admin-sidebar">
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
    <main class="admin-main">
      <div class="content-wrapper">
        <!-- Home Tab -->
        <div v-if="activeTab === 'home'" class="tab-content">
          <div class="tab-header home-header">
            <h1 class="tab-title">Overview</h1>
            <p class="tab-subtitle" v-if="user">Welcome back, {{ user.username }}. Here's what's happening at Encore Festival.</p>
          </div>

          <div class="stats-section">
            <h2 class="section-subtitle">Stats</h2>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon-wrapper users">
                  <img src="@/assets/icons/users.svg" alt="Users" class="stat-icon" />
                </div>
                <div class="stat-info">
                  <span class="stat-label">Total Users</span>
                  <span class="stat-value">{{ userCount }}</span>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon-wrapper activities">
                  <img src="@/assets/icons/concerts.svg" alt="Concerts" class="stat-icon" />
                </div>
                <div class="stat-info">
                  <span class="stat-label">Active Concerts</span>
                  <span class="stat-value">{{ activeActivitiesCount }}</span>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon-wrapper bookings">
                  <img src="@/assets/icons/bookings.svg" alt="Bookings" class="stat-icon" />
                </div>
                <div class="stat-info">
                  <span class="stat-label">Total Bookings</span>
                  <span class="stat-value">{{ totalBookings }}</span>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon-wrapper revenue">
                  <img src="@/assets/icons/home.svg" alt="Revenue" class="stat-icon" />
                </div>
                <div class="stat-info">
                  <span class="stat-label">Total Attendees</span>
                  <span class="stat-value">{{ totalCapacity }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="quick-actions-section">
            <h2 class="section-subtitle">Quick Actions</h2>
            <div class="actions-grid">
              <div class="action-card" @click="openCreateModal">
                <div class="action-icon">+</div>
                <div class="action-details">
                  <span class="action-name">Create New Concert</span>
                  <span class="action-desc">Add a new event to the list</span>
                </div>
              </div>
              <div class="action-card" @click="activeTab = 'users'">
                <div class="action-icon">👤</div>
                <div class="action-details">
                  <span class="action-name">Manage Users</span>
                  <span class="action-desc">View and edit user details</span>
                </div>
              </div>
              <div class="action-card" @click="activeTab = 'bookings'">
                <div class="action-icon">🎫</div>
                <div class="action-details">
                  <span class="action-name">View Bookings</span>
                  <span class="action-desc">Check all active reservations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Concerts Tab -->
        <div v-if="activeTab === 'activities'" class="tab-content">
          <div class="tab-header">
            <h1 class="tab-title">Concerts</h1>
            <button class="btn-create" @click="openCreateModal">
              <span class="icon">+</span> Create Concert
            </button>
          </div>
          
          <div v-if="loading" class="loading-state">
            Loading concerts...
          </div>
          
          <div v-else-if="activities.length === 0" class="empty-state">
            <p>No concerts found. Create your first one!</p>
          </div>
          
          <div v-else class="activities-grid">
            <ActivityCard 
              v-for="activity in activities" 
              :key="activity.id" 
              :activity="activity" 
              @edit="handleEditActivity"
              @delete="handleDeleteActivity"
            />
          </div>
          
          <ActivityModal 
            :visible="showActivityModal" 
            :loading="createLoading"
            :activityData="selectedActivity"
            @close="showActivityModal = false"
            @save="handleSaveActivity"
          />

          <ConfirmationModal
            :visible="showDeleteModal"
            title="Delete Concert"
            message="Are you sure you want to delete this concert? This action cannot be undone."
            @cancel="showDeleteModal = false"
            @confirm="confirmDeleteActivity"
          />
        </div>

        <!-- Usuarios Tab -->
        <div v-if="activeTab === 'users'" class="tab-content">
          <h1 class="tab-title">Users</h1>
        </div>

        <!-- Reservas Tab -->
        <div v-if="activeTab === 'bookings'" class="tab-content">
          <h1 class="tab-title">Bookings</h1>
        </div>
      </div>
    </main>

    <BackgroundEffects />
  </div>
</template>

<script>
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import ActivityCard from '@/components/ActivityCard.vue'
import ActivityModal from '@/components/ActivityModal.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import authService from '@/services/authService'

export default {
  name: 'AdminDashboardPage',
  components: {
    BackgroundEffects,
    ActivityCard,
    ActivityModal,
    ConfirmationModal
  },
  data() {
    return {
      user: null,
      activeTab: 'home',
      tabs: [
        { id: 'home', label: 'Home', icon: require('@/assets/icons/home.svg') },
        { id: 'activities', label: 'Concerts', icon: require('@/assets/icons/concerts.svg') },
        { id: 'users', label: 'Users', icon: require('@/assets/icons/users.svg') },
        { id: 'bookings', label: 'Bookings', icon: require('@/assets/icons/bookings.svg') }
      ],
      activities: [],
      showActivityModal: false,
      loading: false,
      createLoading: false,
      selectedActivity: null,
      showDeleteModal: false,
      activityToDelete: null,
      allUsers: []
    }
  },
  mounted() {
    this.user = authService.getCurrentUser()
    
    // Verify user is admin
    if (!this.user || this.user.role !== 'admin') {
      this.$router.push('/dashboard')
    } else {
      this.fetchActivities()
      this.fetchAllUsers()
    }
  },
  computed: {
    userCount() {
      return this.allUsers.length
    },
    activeActivitiesCount() {
      return this.activities.filter(a => a.state === 'active').length
    },
    totalBookings() {
      return this.activities.reduce((sum, a) => sum + (a.users ? a.users.length : 0), 0)
    },
    totalCapacity() {
      return this.activities.reduce((sum, a) => sum + (a.capacity || 0), 0)
    }
  },
  methods: {
    handleLogout() {
      authService.logout()
      this.$router.push('/')
    },
    async fetchAllUsers() {
      try {
        const token = authService.getToken()
        const response = await fetch('http://localhost:5000/api/users', {
          headers: {
            'Auth': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          this.allUsers = await response.json()
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async fetchActivities() {
      this.loading = true
      try {
        const token = authService.getToken()
        const response = await fetch('http://localhost:5000/api/activities', {
          headers: {
            'Auth': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          this.activities = await response.json()
        }
      } catch (error) {
        console.error('Error fetching activities:', error)
      } finally {
        this.loading = false
      }
    },
    openCreateModal() {
      this.activeTab = 'activities'
      this.selectedActivity = null
      this.showActivityModal = true
    },
    handleEditActivity(activity) {
      this.selectedActivity = activity
      this.showActivityModal = true
    },
    handleDeleteActivity(id) {
      this.activityToDelete = id
      this.showDeleteModal = true
    },
    async confirmDeleteActivity() {
      if (!this.activityToDelete) return
      
      try {
        const token = authService.getToken()
        const response = await fetch(`http://localhost:5000/api/activities/${this.activityToDelete}`, {
          method: 'DELETE',
          headers: {
            'Auth': `Bearer ${token}`
          }
        })

        if (response.ok) {
          this.activities = this.activities.filter(a => a.id !== this.activityToDelete)
          this.showDeleteModal = false
          this.activityToDelete = null
        } else {
          alert('Failed to delete concert')
        }
      } catch (error) {
        console.error('Error deleting activity:', error)
      }
    },
    async handleSaveActivity(activityData) {
      this.createLoading = true
      try {
        const token = authService.getToken()
        const formData = new FormData()
        
        formData.append('name', activityData.name)
        formData.append('description', activityData.description)
        formData.append('start', new Date(activityData.start).toISOString())
        formData.append('finish', new Date(activityData.finish).toISOString())
        formData.append('capacity', activityData.capacity)
        
        if (activityData.image) {
          formData.append('image', activityData.image)
        }

        const isEdit = !!this.selectedActivity
        const url = isEdit 
          ? `http://localhost:5000/api/activities/${this.selectedActivity.id}`
          : 'http://localhost:5000/api/activities'
        
        const method = isEdit ? 'PUT' : 'POST'
        
        const response = await fetch(url, {
          method: method,
          headers: {
            'Auth': `Bearer ${token}`
            // Content-Type is set automatically with boundary for FormData
          },
          body: formData
        })
        
        if (response.ok) {
          // Refresh list to get updated data
          await this.fetchActivities()
          this.showActivityModal = false
        } else {
          const error = await response.json()
          alert(error.error || 'Failed to save concert')
        }
      } catch (error) {
        console.error('Error saving activity:', error)
        alert('Visualize error details in console')
      } finally {
        this.createLoading = false
      }
    }
  }
}
</script>

<style scoped>
.admin-container {
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
.admin-sidebar {
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
.admin-main {
  flex: 1;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  margin-top: 5%;
  position: relative;
  z-index: 10;
}

.content-wrapper {
  padding-left: 4rem;
  padding-right: 5%;
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

/* Tab Header & Action Button */
.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.home-header {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 3rem;
}

.tab-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  margin-left: 1%;
}

.btn-create {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.btn-create:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
}

.icon {
  font-size: 1.2rem;
  line-height: 1;
}

/* Activities Grid */
.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding-bottom: 2rem;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 4rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
}

.section-subtitle {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  margin-left: 1%;
}

.stats-section, .quick-actions-section {
  margin-bottom: 3rem;
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: rgba(20, 15, 35, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 24px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  background: rgba(139, 92, 246, 0.05);
  box-shadow: 0 15px 40px rgba(139, 92, 246, 0.15);
}

.stat-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-wrapper.users { background: rgba(99, 102, 241, 0.15); }
.stat-icon-wrapper.activities { background: rgba(139, 92, 246, 0.15); }
.stat-icon-wrapper.bookings { background: rgba(52, 211, 153, 0.15); }
.stat-icon-wrapper.revenue { background: rgba(245, 158, 11, 0.15); }

.stat-icon {
  width: 30px;
  height: 30px;
  filter: brightness(0) saturate(100%) invert(100%);
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: white;
}

/* Quick Actions Cards */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: rgba(139, 92, 246, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.1);
  border-radius: 18px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-card:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.3);
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.action-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.action-details {
  display: flex;
  flex-direction: column;
}

.action-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
}

.action-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}
</style>
