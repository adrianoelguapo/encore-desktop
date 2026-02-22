<!-- --- Estructura de la vista del panel de admin --- -->
<template>

<!-- --- Contenedor principal --- -->
  <div class = "admin-container">

    <!-- --- Contenedor principal de la barra de navegación lateral --- -->
    <aside class = "admin-sidebar">

      <!-- --- Barra de navegación --- -->
      <nav class = "sidebar-nav">

        <!-- --- Botones de navegación (se recorre el array de tabs definido en el atributo data y se crea un botón para cada tab) --- -->
        <button v-for = "tab in tabs" :key = "tab.id" @click = "activeTab = tab.id" :class = "['nav-icon-btn', { active: activeTab === tab.id }]" :title = "tab.label">

          <!-- --- Icono del botón --- -->
          <img :src = "tab.icon" :alt = "tab.label" class = "nav-icon" />

        </button>

        <!-- --- Botón de cerrar sesión --- -->
        <button @click = "handleLogout" class = "nav-icon-btn logout-btn" title = "Log Out">

          <!-- --- Icono del botón --- -->
          <img src = "@/assets/icons/log-out.svg" alt = "Log Out" class = "nav-icon" />

        </button>

      </nav>

    </aside>

    <!-- --- Contenedor principal del contenido --- -->
    <main class = "admin-main">

      <!-- --- Contenedor auxiliar para las tabs --- -->
      <div class = "content-wrapper">
        
        <!-- --- Pestaña de inicio --- -->
        <div v-if = "activeTab === 'home'" class = "tab-content">

          <!-- --- Header (título) --- -->
          <div class = "tab-header home-header">

            <h1 class = "tab-title">Overview</h1>

          </div>
          
          <!-- --- Sección de estadísticas --- -->
          <div class = "stats-section">

            <!-- --- Título --- -->
            <h2 class = "section-subtitle">Stats</h2>

            <!-- --- Cuadrícula para meter las cartas de cada stat --- -->
            <div class = "stats-grid">

              <!-- --- Carta que indica el número de usuarios en la app --- -->
              <div class = "stat-card">

                <!-- --- Icono de la carta --- -->
                <div class = "stat-icon-wrapper users">

                  <img src = "@/assets/icons/users.svg" alt = "Users" class = "stat-icon"/>

                </div>

                <!-- --- Contenido de la carta --- -->
                <div class = "stat-info">

                   <!-- --- Título --- -->
                  <span class = "stat-label">Total Users</span>

                  <!-- --- Número de usuarios --- -->
                  <span class = "stat-value">{{ userCount }}</span>

                </div>

              </div>

              <!-- --- Carta que indica el número de conciertos activos --- -->
              <div class = "stat-card">

                <!-- --- Icono de la carta --- -->
                <div class = "stat-icon-wrapper activities">

                  <img src = "@/assets/icons/concerts.svg" alt = "Concerts" class = "stat-icon"/>

                </div>

                <!-- --- Contenido de la carta --- -->
                <div class = "stat-info">

                  <!-- --- Título --- -->
                  <span class = "stat-label">Active Concerts</span>

                  <!-- --- Número de conciertos activos --- -->
                  <span class = "stat-value">{{ activeActivitiesCount }}</span>

                </div>

              </div>

              <!-- --- Carta que indica el número de reservas --- -->
              <div class = "stat-card">

                <!-- --- Icono de la carta --- -->
                <div class = "stat-icon-wrapper bookings">

                  <img src = "@/assets/icons/bookings.svg" alt = "Bookings" class = "stat-icon"/>

                </div>

                <!-- --- Contenido de la carta --- -->
                <div class = "stat-info">

                  <!-- --- Título --- -->
                  <span class = "stat-label">Total Bookings</span>

                  <!-- --- Número de reservas --- -->
                  <span class = "stat-value">{{ totalBookings }}</span>

                </div>

              </div>

              <!-- --- Carta que indica la capacidad total de los conciertos --- -->
              <div class = "stat-card">

                <!-- --- Icono de la carta --- -->
                <div class = "stat-icon-wrapper revenue">

                  <img src = "@/assets/icons/home.svg" alt = "Revenue" class = "stat-icon" />

                </div>

                <!-- --- Contenido de la carta --- -->
                <div class = "stat-info">

                  <!-- --- Título --- -->
                  <span class = "stat-label">Total Capacity</span>

                  <!-- --- Capacidad total --- -->
                  <span class = "stat-value">{{ totalCapacity }}</span>

                </div>

              </div>

            </div>

          </div>

          <!-- --- Sección de acciones de acceso rápido --- -->
          <div class = "quick-actions-section">

            <!-- --- Título --- -->
            <h2 class = "section-subtitle">Quick Actions</h2>

            <!-- --- Cuadrícula para meter las cartas de cada acción --- -->
            <div class = "actions-grid">

              <!-- --- Carta que permite crear un nuevo concierto --- -->
              <div class = "action-card" @click = "openCreateModal">

                <!-- --- Icono de la carta --- -->
                <div class = "action-icon">

                  <img src = "@/assets/icons/concerts.svg" class = "quick-icon" alt = "Create" />

                </div>

                <!-- --- Contenido de la carta --- -->
                <div class = "action-details">

                  <!-- --- Título --- -->
                  <span class = "action-name">Create New Concert</span>

                  <!-- --- Descripción --- -->
                  <span class = "action-desc">Add a new event to the list</span>

                </div>

              </div>

              <!-- --- Carta que redirige a la pestaña de usuarios --- -->
              <div class = "action-card" @click = "activeTab = 'users'">

                <!-- --- Icono de la carta --- -->
                <div class = "action-icon">

                  <img src = "@/assets/icons/users.svg" class = "quick-icon" alt = "Users"/>

                </div>

                <!-- --- Contenido de la carta --- -->
                <div class = "action-details">

                  <!-- --- Título --- -->
                  <span class = "action-name">Manage Users</span>

                  <!-- --- Descripción --- -->
                  <span class = "action-desc">View and edit user details</span>

                </div>

              </div>

              <!-- --- Carta que redirige a la pestaña de reservas --- -->
              <div class = "action-card" @click = "activeTab = 'bookings'">

                <!-- --- Icono de la carta --- -->
                <div class = "action-icon">

                  <img src = "@/assets/icons/bookings.svg" class = "quick-icon" alt = "Bookings"/>

                </div>

                <!-- --- Contenido de la carta --- -->
                <div class = "action-details">

                  <!-- --- Título --- -->
                  <span class = "action-name">View Bookings</span>

                  <!-- --- Descripción --- -->
                  <span class = "action-desc">Check all active reservations</span>

                </div>

              </div>

            </div>

          </div>

        </div>

        <!-- --- Pestaña de conciertos --- -->
        <div v-if = "activeTab === 'activities'" class = "tab-content">

          <!-- --- Header --- -->
          <div class = "tab-header">

            <!-- --- Título --- -->
            <h1 class = "tab-title">Concerts</h1>

            <!-- --- Botón para crear un nuevo concierto --- -->
            <button class = "btn-create" @click = "openCreateModal">Create Concert</button>

          </div>
          
          <!-- --- Cuando los conciertos se están cargando, se muestra --- -->
          <div v-if = "loading" class = "loading-state">Loading concerts...</div>
          
          <!-- --- Cuando no hay conciertos, se muestra --- -->
          <div v-else-if = "activities.length === 0" class = "empty-state">

            <p>No concerts found. Create your first one!</p>

          </div>
          
          <!-- --- Cuando hay conciertos, se crea un grid para mostrarlos --- -->
          <div v-else class = "activities-grid">

            <!-- --- Se recorren los conciertos y se crea una carta por cada uno --- -->
            <ActivityCard v-for = "activity in filteredActivities" :key = "activity.id" :activity = "activity" :isAdmin = "true" @edit = "handleEditActivity" @delete = "handleDeleteActivity" @view-attendees = "handleViewAttendees"/>

          </div>
          
        </div>

        <!-- --- Pestaña de usuarios --- -->
        <div v-if = "activeTab === 'users'" class = "tab-content">

          <!-- --- Header --- -->
          <div class = "tab-header">

            <!-- --- Título --- -->
            <h1 class = "tab-title">User Management</h1>

            <!-- --- Buscador --- -->
            <div class = "header-actions">

              <input type = "text" v-model = "userSearchQuery" placeholder = "Search users..." class = "search-input"/>

            </div>

          </div>

          <!-- --- Contenedor para mostrar los usuarios --- -->
          <div class = "data-table-container">

            <!-- --- Se mostrarán en una tabla --- -->
            <table class = "data-table">

              <!-- --- Encabezados de la tabla --- -->
              <thead>

                <tr>

                  <th>Name</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <!-- --- Contenido de la tabla --- -->
              <tbody>

                <!-- --- Se recorren los usuarios y se crea una fila por cada uno --- -->
                <tr v-for = "user in filteredUsers" :key = "user.id">

                  <!-- --- Nombre del usuario --- -->
                  <td>{{ user.name }}</td>

                  <!-- --- Nombre de usuario --- -->
                  <td>@{{ user.username }}</td>

                  <!-- --- Rol del usuario --- -->
                  <td>

                    <span class = "role-badge-minimal">{{ user.role }}</span>

                  </td>
                  
                  <!-- --- Botones para modificar o eliminar el usuario --- -->
                  <td class = "action-cell">

                    <button class = "table-btn modify" @click = "handleEditUser(user)">Modify</button>
                    <button class = "table-btn delete" @click = "handleDeleteUser(user)" :disabled = "user.id === (this.user?.id || -1)" v-if = "user.role !== 'admin'">Delete</button>
                  
                  </td>

                </tr>

                <!-- --- Cuando no hay usuarios, se muestra --- -->
                <tr v-if = "filteredUsers.length === 0">

                  <td colspan = "4" class = "empty-table">No users found</td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

        <!-- --- Pestaña de reservas --- -->
        <div v-if = "activeTab === 'bookings'" class = "tab-content">

          <!-- --- Header --- -->
          <div class = "tab-header">

            <!-- --- Título --- -->
            <h1 class = "tab-title">Bookings</h1>

            <!-- --- Buscador --- -->
            <div class = "header-actions">

              <input type = "text" v-model = "bookingSearchQuery" placeholder = "Search by user or concert..." class = "search-input"/>

            </div>

          </div>

          <!-- --- Contenedor para mostrar las reservas --- -->
          <div class = "data-table-container">

            <!-- --- Se mostrarán en una tabla --- -->
            <table class = "data-table">

              <!-- --- Encabezados de la tabla --- -->
              <thead>

                <tr>

                  <th>User</th>
                  <th>Concert</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <!-- --- Contenido de la tabla --- -->
              <tbody>

                <!-- --- Se recorren las reservas y se crea una fila por cada una --- -->
                <tr v-for = "booking in filteredBookings" :key = "booking.booked_at + booking.username">

                  <!-- --- Usuario que reserva --- -->
                  <td>

                    <div class = "booking-user">

                      <span class = "user-main">{{ booking.user_name }}</span>
                      <span class = "user-sub">@{{ booking.username }}</span>

                    </div>

                  </td>

                  <!-- --- Concierto reservado --- -->
                  <td>{{ booking.activity_name }}</td>

                  <!-- --- Fecha de la reserva --- -->
                  <td>{{ formatDateShort(booking.booked_at) }}</td>

                  <!-- --- Estado de la reserva --- -->
                  <td>

                    <span class = "status-badge-minimal">

                      {{ booking.activity_state }}

                    </span>

                  </td>

                  <!-- --- Botón para cancelar la reserva --- -->
                  <td>

                    <button class = "table-btn cancel" @click = "handleCancelBooking(booking)" v-if = "booking.activity_state !== 'cancel'">Cancel</button>

                  </td>

                </tr>

                <!-- --- Cuando no hay reservas, se muestra --- -->
                <tr v-if = "filteredBookings.length === 0">

                  <td colspan = "5" class = "empty-table">No bookings found</td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>
        
      </div>

      <!-- --- Modal para crear o editar conciertos --- -->
      <ActivityModal :visible = "showActivityModal" :loading = "createLoading" :activityData = "selectedActivity" @close = "showActivityModal = false" @save = "handleSaveActivity" @error = "showInfo('Validation Error', $event, 'error')"/>

      <!-- --- Modal de confirmación para eliminar conciertos --- -->
      <ConfirmationModal :visible = "showDeleteModal" title = "Delete Concert" message = "Are you sure you want to delete this concert? This action cannot be undone." @cancel = "showDeleteModal = false" @confirm = "confirmDeleteActivity"/>

      <!-- --- Modal de información --- -->
      <InfoModal :visible = "infoModal.visible" :title = "infoModal.title" :message = "infoModal.message" :type = "infoModal.type" @close = "infoModal.visible = false"/>

      <!-- --- Modal de confirmación para cancelar reservas --- -->
      <ConfirmationModal :visible = "showCancelBookingModal" title = "Cancel Booking" message = "Are you sure you want to cancel this user's reservation?" @confirm = "confirmCancelBooking" @cancel = "showCancelBookingModal = false"/>

      <!-- --- Modal de confirmación para eliminar usuarios --- -->
      <ConfirmationModal :visible = "showDeleteUserModal" title = "Delete User" message = "Are you sure you want to delete this user? This will also cancel all their bookings and remove them from the system." @confirm = "confirmDeleteUser" @cancel = "showDeleteUserModal = false"/>

      <!-- --- Modal para mostrar los asistentes a un concierto --- -->
      <AttendeesModal :visible = "showAttendeesModal" :activity = "selectedActivityForAttendees" :allUsers = "allUsers" @close = "showAttendeesModal = false"/>

      <!-- --- Modal para editar usuarios --- -->
      <UserEditModal :visible = "showUserEditModal" :loading = "editUserLoading" :userData = "selectedUser" @close = "showUserEditModal = false" @save = "handleSaveUser"/>

    </main>

    <!-- --- Efectos de fondo --- -->
    <BackgroundEffects/>

  </div>

</template>

<script>

/* --- Importar componentes y el servicio de autenticación --- */
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import ActivityCard from '@/components/ActivityCard.vue'
import ActivityModal from '@/components/ActivityModal.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import UserEditModal from '@/components/UserEditModal.vue'
import InfoModal from '@/components/InfoModal.vue'
import AttendeesModal from '@/components/AttendeesModal.vue'
import authService from '@/services/authService'

/* --- Exportar la vista --- */
export default {

  /* --- Nombre de la vista --- */
  name: 'AdminDashboardPage',

  /* --- Componentes que utiliza --- */
  components: {

    BackgroundEffects,
    ActivityCard,
    ActivityModal,
    ConfirmationModal,
    UserEditModal,
    InfoModal,
    AttendeesModal

  },

  /* --- Estructura de datos de la vista --- */
  data() {

    return {

      /* --- Usuario actual --- */
      user: null,

      /* --- Pestaña activa --- */
      activeTab: 'home',

      /* --- Pestañas del dashboard --- */
      tabs: [
        
        { id: 'home', label: 'Home', icon: require('@/assets/icons/home.svg') },
        { id: 'activities', label: 'Concerts', icon: require('@/assets/icons/concerts.svg') },
        { id: 'users', label: 'Users', icon: require('@/assets/icons/users.svg') },
        { id: 'bookings', label: 'Bookings', icon: require('@/assets/icons/bookings.svg') }
      
      ],

      /* --- Conciertos --- */
      activities: [],

      /* --- Modal de conciertos --- */
      showActivityModal: false,

      /* --- Carga de conciertos --- */
      loading: false,
      createLoading: false,

      /* --- Concierto seleccionado --- */
      selectedActivity: null,

      /* --- Modal de eliminación de conciertos --- */
      showDeleteModal: false,
      activityToDelete: null,

      /* --- Usuarios --- */
      allUsers: [],

      /* --- Reservas --- */
      bookings: [],

      /* --- Búsqueda de usuarios --- */
      userSearchQuery: '',

      /* --- Búsqueda de reservas --- */
      bookingSearchQuery: '',

      /* --- Modal de edición de usuarios --- */
      showUserEditModal: false,

      /* --- Carga de edición de usuarios --- */
      editUserLoading: false,

      /* --- Usuario seleccionado --- */
      selectedUser: null,

      /* --- Modal de mensajes informativos --- */
      infoModal: {

        visible: false,
        title: '',
        message: '',
        type: 'info'

      },

      /* --- Modal de asistentes a conciertos --- */
      showAttendeesModal: false,
      selectedActivityForAttendees: null,

      /* --- Modal de cancelación de reservas --- */
      showCancelBookingModal: false,
      bookingToCancel: null,

      /* --- Modal de eliminación de usuarios --- */
      showDeleteUserModal: false,
      userToDelete: null

    }

  },

  /* --- Cuando la vista se carga --- */
  mounted() {

    /* --- Pillar el nombre de usuario llamando al service de autenticación --- */
    this.user = authService.getCurrentUser()
    
    /* --- Si se encuentra el usuario y no es admin, redirigir al dashboard --- */
    if (!this.user || this.user.role !== 'admin') {

      this.$router.push('/dashboard')

    } else {

      /* --- Obtener todos los conciertos --- */
      this.fetchActivities()

      /* --- Obtener todos los usuarios --- */
      this.fetchAllUsers()

      /* --- Obtener todas las reservas --- */
      this.fetchBookings()

    }

  },

  /* --- Valores computadas --- */
  computed: {

    /* --- Número de usuarios --- */
    userCount() {

      return this.allUsers.length

    },

    /* --- Número de conciertos activos --- */
    activeActivitiesCount() {

      return this.activities.filter(a => a.state === 'active').length

    },

    /* --- Número total de reservas --- */
    totalBookings() {

      return this.bookings.length

    },

    /* --- Capacidad total de todos los conciertos --- */
    totalCapacity() {

      return this.activities.reduce((sum, a) => sum + (a.capacity || 0), 0)

    },

    /* --- Usuarios filtrados por búsqueda --- */
    filteredUsers() {

      if (!this.userSearchQuery) return this.allUsers

      const query = this.userSearchQuery.toLowerCase()
      return this.allUsers.filter(u => 

        u.name.toLowerCase().includes(query) || u.username.toLowerCase().includes(query)

      )

    },

    /* --- Reservas filtradas por búsqueda --- */
    filteredBookings() {

      if (!this.bookingSearchQuery) return this.bookings

      const query = this.bookingSearchQuery.toLowerCase()
      return this.bookings.filter(b => 

        b.user_name.toLowerCase().includes(query) || b.username.toLowerCase().includes(query) || b.activity_name.toLowerCase().includes(query)

      )

    },

    /* --- Conciertos filtrados por búsqueda --- */
    filteredActivities() {

      return this.activities

    }

  },

  /* --- Métodos --- */
  methods: {

    /* --- Cerrar sesión --- */
    handleLogout() {

      authService.logout()
      this.$router.push('/')

    },

    /* --- Obtener todos los usuarios --- */
    async fetchAllUsers() {

      try {

        /* --- Obtener el token llamando al service de autenticación --- */
        const token = authService.getToken()

        /* --- Hacer la petición a la API --- */
        const response = await fetch('http://localhost:5000/api/users', {

          /* --- Mandar el token en la petición --- */
          headers: {

            'Auth': `Bearer ${token}`

          }

        })
        
        /* --- Si la respuesta es correcta, guardar los usuarios --- */
        if (response.ok) {

          this.allUsers = await response.json()

        }

      } catch (error) {

        /* --- Si hay un error, se devuelve --- */
        console.error('Error fetching users:', error)

      }

    },

    /* --- Obtener todas las reservas --- */
    async fetchBookings() {

      try {

        /* --- Obtener el token llamando al service de autenticación --- */
        const token = authService.getToken()

        /* --- Hacer la petición a la API --- */
        const response = await fetch('http://localhost:5000/api/bookings', {

          /* --- Mandar el token en la petición --- */
          headers: {

            'Auth': `Bearer ${token}`

          }

        })
        
        /* --- Si la respuesta es correcta, guardar las reservas --- */
        if (response.ok) {

          this.bookings = await response.json()

        }

      } catch (error) {

        /* --- Si hay un error, se devuelve --- */
        console.error('Error fetching bookings:', error)

      }
      
    },

    /* --- Formatear la fecha --- */
    formatDateShort(dateString) {

      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString()

    },

    /* --- Eliminar usuario --- */
    handleDeleteUser(user) {

      this.userToDelete = user;
      this.showDeleteUserModal = true;

    },

    /* --- Confirmar eliminación de usuario --- */
    async confirmDeleteUser() {

      /* --- Si no hay usuario seleccionado, no se hace nada --- */
      if (!this.userToDelete) return;

      /* --- Guardar el usuario seleccionado --- */
      const user = this.userToDelete;

      /* --- Cerrar el modal --- */
      this.showDeleteUserModal = false;

      try {

        /* --- Obtener el token llamando al service de autenticación --- */
        const token = authService.getToken()

        /* --- Hacer la petición a la API --- */
        const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {

          method: 'DELETE',

          /* --- Mandar el token en la petición --- */
          headers: {

            'Auth': `Bearer ${token}`

          }

        })
        
        /* --- Si la respuesta es correcta, mostrar un mensaje de éxito --- */
        if (response.ok) {

          this.showInfo('Success', `User @${user.username} deleted.`)
          this.fetchAllUsers()
          this.fetchBookings()
          this.fetchActivities()

        } else {

          /* --- Si la respuesta no es correcta, mostrar un mensaje de error --- */
          const error = await response.json()
          this.showInfo('Error', error.error || 'Failed to delete user', 'error')

        }

      } catch (error) {

        /* --- Si hay un error, mostrar un mensaje de error --- */
        this.showInfo('Error', 'Unexpected error deleting user', 'error')

      } finally {

        /* --- Limpiar el usuario seleccionado --- */
        this.userToDelete = null;

      }

    },

    /* --- Ver los asistentes de un concierto --- */
    handleViewAttendees(activity) {

      this.selectedActivityForAttendees = activity;
      this.showAttendeesModal = true;

    },

    /* --- Cancelar una reserva --- */
    handleCancelBooking(booking) {

      this.bookingToCancel = booking;
      this.showCancelBookingModal = true;

    },

    /* --- Confirmar cancelación de reserva --- */
    async confirmCancelBooking() {

      /* --- Si no hay reserva seleccionada, no se hace nada --- */
      if (!this.bookingToCancel) return;

      /* --- Guardar la reserva seleccionada --- */
      const booking = this.bookingToCancel;

      /* --- Cerrar el modal --- */
      this.showCancelBookingModal = false;

      try {

        /* --- Obtener el token llamando al service de autenticación --- */
        const token = authService.getToken()

        /* --- Hacer la petición a la API --- */
        const response = await fetch(`http://localhost:5000/api/users/${booking.user_id}/bookings/${booking.activity_id}`, {

          method: 'DELETE',

          /* --- Mandar el token en la petición --- */
          headers: {

            'Auth': `Bearer ${token}`

          }

        })
        
        /* --- Si la respuesta es correcta, mostrar un mensaje de éxito --- */
        if (response.ok) {

          this.showInfo('Success', 'Booking cancelled.')
          this.fetchBookings()
          this.fetchActivities()

        } else {

          /* --- Si la respuesta no es correcta, mostrar un mensaje de error --- */
          const error = await response.json()
          this.showInfo('Error', error.error || 'Failed to cancel booking', 'error')

        }

      } catch (error) {

        this.showInfo('Error', 'Unexpected error cancelling booking', 'error')

      } finally {

        this.bookingToCancel = null;

      }

    },

    /* --- Obtener todos los conciertos --- */
    async fetchActivities() {

      /* --- Se asume que aún no han cargado --- */
      this.loading = true

      try {

        /* --- Obtener el token llamando al service de autenticación --- */
        const token = authService.getToken()
        const response = await fetch('http://localhost:5000/api/activities', {

          /* --- Mandar el token en la petición --- */
          headers: {
            
            'Auth': `Bearer ${token}`

          }

        })
        
        /* --- Si la respuesta es correcta, guardar los conciertos --- */
        if (response.ok) {

          this.activities = await response.json()

        }

      } catch (error) {

        /* --- Si hay un error, mostrar un mensaje de error --- */
        console.error('Error fetching activities:', error)

      } finally {

        /* --- Ya están los conciertos cargados --- */
        this.loading = false

      }

    },

    /* --- Abrir el modal de creación de conciertos --- */
    openCreateModal() {

      this.activeTab = 'activities'
      this.selectedActivity = null
      this.showActivityModal = true

    },

    /* --- Abrir el modal de edición de conciertos --- */
    handleEditActivity(activity) {

      this.selectedActivity = activity
      this.showActivityModal = true

    },

    /* --- Abrir el modal de eliminación de conciertos --- */
    handleDeleteActivity(activityId) {

      this.activityToDelete = activityId;
      this.showDeleteModal = true;

    },

    /* --- Confirmar la eliminación de un concierto --- */
    async confirmDeleteActivity() {

      /* --- Si no hay concierto seleccionado, no se hace nada --- */
      if (!this.activityToDelete) return
      
      try {

        /* --- Obtener el token llamando al service de autenticación --- */
        const token = authService.getToken()
        const response = await fetch(`http://localhost:5000/api/activities/${this.activityToDelete}`, {

          method: 'DELETE',
          
          /* --- Mandar el token en la petición --- */
          headers: {

            'Auth': `Bearer ${token}`

          }

        })

        /* --- Si la respuesta es correcta, eliminar el concierto --- */
        if (response.ok) {

          /* --- Eliminar el concierto de la lista --- */
          this.activities = this.activities.filter(a => a.id !== this.activityToDelete)

          /* --- Cerrar el modal de eliminación --- */
          this.showDeleteModal = false

          /* --- Limpiar el concierto seleccionado --- */
          this.activityToDelete = null

          /* --- Mostrar un mensaje de éxito --- */
          this.showInfo('Deleted', 'The concert has been removed successfully.')

        } else {

          /* --- Si la respuesta no es correcta, mostrar un mensaje de error --- */
          this.showInfo('Error', 'Failed to delete concert', 'error')

        }

      } catch (error) {

        /* --- Si hay un error, mostrar un mensaje de error --- */
        console.error('Error deleting activity:', error)

      }

    },

    /* --- Guardar un concierto --- */
    async handleSaveActivity(activityData) {

      /* --- Se asume que se está creando un concierto --- */
      this.createLoading = true

      try {

        /* --- Obtener el token llamando al service de autenticación --- */
        const token = authService.getToken()
        const formData = new FormData()
        
        /* --- Añadir los datos del concierto al formulario --- */
        formData.append('name', activityData.name)
        formData.append('description', activityData.description)
        formData.append('start', new Date(activityData.start).toISOString())
        formData.append('finish', new Date(activityData.finish).toISOString())
        formData.append('capacity', activityData.capacity)
        formData.append('state', activityData.state || 'active')
        
        /* --- Si hay una imagen, añadirla al formulario --- */
        if (activityData.image) {

          formData.append('image', activityData.image)

        }

        /* --- Si se está editando un concierto, usar PUT, si no, usar POST --- */
        const isEdit = !!this.selectedActivity
        const url = isEdit ? `http://localhost:5000/api/activities/${this.selectedActivity.id}` : 'http://localhost:5000/api/activities'
        
        const method = isEdit ? 'PUT' : 'POST'
        
        /* --- Hacer la petición a la API --- */
        const response = await fetch(url, {
          method: method,
          headers: {

            'Auth': `Bearer ${token}`

          },
          body: formData
        })
        
        /* --- Si la respuesta es correcta, actualizar los conciertos --- */
        if (response.ok) {

          await this.fetchActivities()

          /* --- Cerrar el modal de edición --- */
          this.showActivityModal = false

          /* --- Mostrar un mensaje de éxito --- */
          this.showInfo('Success', `Concert ${isEdit ? 'updated' : 'created'} successfully!`)

        } else {

          /* --- Si la respuesta no es correcta, mostrar un mensaje de error --- */
          const error = await response.json()
          this.showInfo('Error', error.error || 'Failed to save concert', 'error')

        }

      } catch (error) {

        /* --- Si hay un error, mostrar un mensaje de error --- */
        console.error('Error saving activity:', error)
        this.showInfo('Error', 'An unexpected error occurred. Check console for details.', 'error')

      } finally {

        /* --- Ya se ha creado, ya no está cargando --- */
        this.createLoading = false

      }

    },

    /* --- Mostrar un mensaje de información en el modal de mensajes informativos --- */
    showInfo(title, message, type = 'info') {

      this.infoModal = {

        visible: true,
        title,
        message,
        type

      }

    },

    /* --- Editar un usuario --- */
    handleEditUser(user) {

      this.selectedUser = user
      this.showUserEditModal = true

    },

    /* --- Guardar un usuario --- */
    async handleSaveUser(userData) {

      /* --- Se asume que se está editando un usuario --- */
      this.editUserLoading = true

      try {

        /* --- Obtener el token llamando al service de autenticación --- */
        const token = authService.getToken()
        
        /* --- Hacer la petición a la API --- */
        const response = await fetch(`http://localhost:5000/api/users/${userData.id}`, {

          method: 'PUT',

          /* --- Mandar el token en la petición --- */
          headers: {

            'Auth': `Bearer ${token}`,
            'Content-Type': 'application/json'

          },

          /* --- Mandar los datos del usuario en la petición --- */
          body: JSON.stringify(userData)

        })
        
        /* --- Si la respuesta es correcta, actualizar los usuarios --- */
        if (response.ok) {

          /* --- Cerrar el modal de edición --- */
          this.showUserEditModal = false

          /* --- Mostrar un mensaje de éxito --- */
          this.showInfo('Success', `User information updated successfully.`)

          /* --- Actualizar los usuarios --- */
          this.fetchAllUsers()

        } else {

          /* --- Si la respuesta no es correcta, mostrar un mensaje de error --- */
          const error = await response.json()
          this.showInfo('Error', error.error || 'Failed to update user', 'error')

        }

      } catch (error) {

        /* --- Si hay un error, mostrar un mensaje de error --- */
        console.error('Error updating user:', error)
        this.showInfo('Error', 'An unexpected error occurred.', 'error')

      } finally {

        /* --- Ya no está cargando, el usuario ya ha sido creado --- */
        this.editUserLoading = false

      }

    }

  }

}

</script>

<!-- --- Estilos de la vista --- -->
<style scoped>

/* --- Contenedor principal --- */
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

/* --- Barra de navegación --- */
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

/* --- Estilos generales del contenido de la vista --- */
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

/* --- Grid de conciertos --- */
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

/* --- Tarjetas de estadísticas --- */
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

.stat-icon-wrapper.users { 

  background: rgba(99, 102, 241, 0.15);

}

.stat-icon-wrapper.activities {

  background: rgba(139, 92, 246, 0.15);

}

.stat-icon-wrapper.bookings {

  background: rgba(52, 211, 153, 0.15);

}

.stat-icon-wrapper.revenue {

  background: rgba(245, 158, 11, 0.15);

}

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

/* --- Grid de acciones de acceso rápido --- */
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
  color: white;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);

}

.quick-icon {

  width: 24px;
  height: 24px;
  filter: brightness(0) saturate(100%) invert(100%);

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

/* --- Buscador --- */
.search-input {

  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.3);
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  color: white;
  font-family: inherit;
  width: 250px;
  transition: all 0.3s ease;

}

.search-input:focus {

  outline: none;
  background: rgba(255, 255, 255, 0.1);
  border-color: #8b5cf6;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.2);

}

/* --- Tablas --- */
.data-table-container {

  background: rgba(20, 15, 35, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);

}

.data-table {

  width: 100%;
  border-collapse: collapse;
  text-align: left;

}

.data-table th {

  padding: 1.2rem;
  background: rgba(139, 92, 246, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;

}

.data-table td {

  padding: 1.2rem;
  color: white;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);

}

.data-table tr:hover {

  background: rgba(139, 92, 246, 0.05);

}

.user-name-cell {

  display: flex;
  align-items: center;
  gap: 1rem;

}

.role-badge {

  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;

}

.role-badge.admin {

  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
  border: 1px solid rgba(139, 92, 246, 0.3);

}

.role-badge.user {

  background: rgba(99, 102, 241, 0.2);
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.3);

}

.role-badge-minimal {

  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;

}

.status-badge-minimal {

  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;

}

.action-cell {

  display: flex;
  gap: 1rem;

}

.text-action-btn {

  background: transparent;
  border: none;
  color: white;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  transition: opacity 0.3s ease;

}

.text-action-btn:hover {

  opacity: 0.7;

}

.text-action-btn.delete {

  color: rgba(255, 255, 255, 0.6);

}

.text-action-btn.delete:hover {

  color: #ef4444;

}

.text-action-btn:disabled {

  opacity: 0.3;
  cursor: not-allowed;

}

/* Table Button Styles */
.table-btn {

  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  font-family: inherit;
  margin-right: 0.5rem;

}

.table-btn.modify {

  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.3);
  color: #a78bfa;

}

.table-btn.modify:hover {

  background: #8b5cf6;
  color: white;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);

}

.table-btn.delete {

  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #f87171;

}

.table-btn.delete:hover:not(:disabled) {

  background: #ef4444;
  color: white;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);

}

.table-btn.cancel {

  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: white;

}

.table-btn.cancel:hover {

  background: #8b5cf6;
  color: white;
  border-color: #8b5cf6;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);

}

.table-btn:disabled {

  opacity: 0.3;
  cursor: not-allowed;

}

.status-badge {

  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;

}

.status-badge.assist {

  background: rgba(52, 211, 153, 0.2);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.3);

}

.status-badge.cancel {

  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);

}

.booking-user {

  display: flex;
  flex-direction: column;

}

.user-main {

  font-weight: 600;

}

.user-sub {

  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);

}

.empty-table {

  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.4);

}

.action-icon-btn {

  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

}

.action-icon-btn.delete {

  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);

}

.action-icon-btn.delete:hover:not(:disabled) {

  background: #ef4444;
  color: white;

}

.action-icon-btn.cancel {

  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.2);

}

.action-icon-btn.cancel:hover {

  background: #f59e0b;
  color: white;

}

.action-icon-btn:disabled {

  opacity: 0.3;
  cursor: not-allowed;

}

/* --- Animación de Fade para las tablas --- */
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