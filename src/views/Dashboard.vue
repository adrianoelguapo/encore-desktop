<!-- --- Estructura de la vista del panel de usuario --- -->
<template>

  <!-- --- Contenedor principal --- -->
  <div class = "dashboard-container">

    <!-- --- Contenedor principal de la barra de navegación lateral --- -->
    <aside class = "dashboard-sidebar">

      <!-- --- Barra de navegación --- -->
      <nav class = "sidebar-nav">

        <!-- --- Botones de navegación (se recorre el array de tabs definido en el atributo data del export y se crea un botón para cada tab) --- -->
        <button v-for = "tab in tabs" :key = "tab.id" @click = "activeTab = tab.id" :class = "['nav-icon-btn', { active: activeTab === tab.id }]" :title = "tab.label">

          <!-- --- Icono del botón --- -->
          <img :src = "tab.icon" :alt = "tab.label" class = "nav-icon"/>
          
        </button>

        <!-- --- Botón para cerrar sesión --- -->
        <button @click = "handleLogout" class = "nav-icon-btn logout-btn" title = "Log Out">

          <!-- --- Icono del botón --- -->
          <img src = "@/assets/icons/log-out.svg" alt = "Log Out" class = "nav-icon"/>

        </button>

      </nav>

    </aside>

    <!-- --- Contenedor principal del contenido --- -->
    <main class = "dashboard-main">

      <!-- --- Contenedor auxiliar para las tabs --- -->
      <div class = "content-wrapper">

        <!-- --- Pestaña de inicio --- -->
        <div v-if = "activeTab === 'home'" class = "tab-content">

          <!-- --- Header (título) --- -->
          <div class = "tab-header home-header">

            <h1 class = "tab-title">Home</h1>
            
          </div>
          
          <!-- --- Sección de estadísticas --- -->
          <div class = "stats-section">

            <!-- --- Título --- -->
            <h2 class = "section-subtitle">Overview</h2>

            <!-- --- Cuadrícula para meter las cartas de cada stat --- -->
            <div class = "stats-grid">

              <!-- --- Carta que indica el número de reservas --- -->
              <div class = "stat-card">

                <!-- --- Icono de la carta --- -->
                <div class = "stat-icon-wrapper bookings">

                  <img src = "@/assets/icons/bookings.svg" alt = "Bookings" class = "stat-icon"/>

                </div>

                <!-- --- Contenido de la carta --- -->
                <div class = "stat-info">

                  <!-- --- Título --- -->
                  <span class = "stat-label">My Bookings</span>

                  <!-- --- Número de reservas --- -->
                  <span class = "stat-value">{{ bookedActivities.length }}</span>

                </div>

              </div>

              <!-- --- Carta que indica el próximo concierto --- -->
              <div class = "stat-card">

                <!-- --- Icono de la carta --- -->
                <div class = "stat-icon-wrapper next">

                  <img src = "@/assets/icons/concerts.svg" alt = "Next Concert" class = "stat-icon"/>

                </div>

                <!-- --- Información de la carta --- -->
                <div class = "stat-info">

                  <!-- --- Título --- -->
                  <span class = "stat-label">Next Concert</span>

                  <!-- --- Nombre del siguiente concierto reservado --- -->
                  <span class = "stat-value">{{ nextConcertName }}</span>

                </div>

              </div>

            </div>

          </div>

          <!-- --- Sección de acciones de acceso rápido --- -->
          <div class = "quick-access">

            <!-- --- Título --- -->
            <h2 class = "section-subtitle">Continue Exploring</h2>

            <!-- --- Cuadrícula para meter las cartas de cada acción --- -->
            <div class = "action-cards">

              <!-- --- Carta para acceder a la pestaña de conciertos --- -->
              <div class = "action-card" @click = "activeTab = 'concerts'">

                <!-- --- Icono de la carta --- -->
                <div class = "action-icon">

                  <img src = "@/assets/icons/concerts.svg" alt = "Concerts"/>

                </div>

                <!-- --- Info de la acción --- -->
                <div class = "action-details">

                  <!-- --- Título --- -->
                  <span class = "action-name">Find Concerts</span>

                  <!-- --- Descripción --- -->
                  <span class = "action-desc">Browse upcoming festival events</span>

                </div>

              </div>

              <!-- --- Carta para acceder a la pestaña de reservas --- -->
              <div class = "action-card" @click = "activeTab = 'bookings'">

                <!-- --- Icono de la carta --- -->
                <div class = "action-icon">

                  <img src = "@/assets/icons/bookings.svg" alt = "Bookings"/>

                </div>

                <!-- --- Info de la acción --- -->
                <div class = "action-details">

                  <!-- --- Título --- -->
                  <span class = "action-name">My Reservations</span>

                  <!-- --- Descripción --- -->
                  <span class = "action-desc">Check your active bookings</span>

                </div>

              </div>

            </div>

          </div>

        </div>

        <!-- --- Pestaña de conciertos disponibles --- -->
        <div v-if = "activeTab === 'concerts'" class = "tab-content">

          <!-- --- Header --- -->
          <div class = "tab-header">

            <!-- --- Título --- -->
            <h1 class = "tab-title">Available Concerts</h1>

            <!-- --- Contenedor auxiliar para meter el buscador --- -->
            <div class = "header-actions">

              <!-- --- Buscador --- -->
              <input type = "text" v-model = "concertSearchQuery" placeholder = "Search concerts..." class = "search-input"/>

            </div>

          </div>

          <!-- --- Cuadrícula para meter los conciertos que hay disponibles --- -->
          <div class = "activities-grid">

            <!-- --- Por cada actividad existente, se creará una carta (utilizando un componente) --- -->
            <ActivityCard v-for = "activity in filteredConcerts" :key = "activity.id" :activity = "activity" :isAdmin = "false" :isBooked = "isUserBooked(activity.id)" @book = "handleBook" @cancel = "handleCancel"/>

            <!-- --- Si no hay conciertos disponibles, se muestra un mensaje de que no se han encontrado conciertos --- -->
            <div v-if = "filteredConcerts.length === 0" class = "empty-state">No concerts found.</div>

          </div>

        </div>

        <!-- --- Pestaña de reservas --- -->
        <div v-if = "activeTab === 'bookings'" class = "tab-content">

          <!-- --- Header --- -->
          <div class = "tab-header">

            <!-- --- Título --- -->
            <h1 class = "tab-title">My Reservations</h1>

          </div>

          <!-- --- Cuadrícula para meter las actividades --- -->
          <div class = "activities-grid">

            <!-- --- Por cada concierto existente, se creará una carta (utilizando un componente) --- -->
            <ActivityCard v-for = "activity in bookedActivities" :key = "'booked-' + activity.id" :activity = "activity" :isAdmin = "false" :isBooked = "true" @cancel = "handleCancel"/>

            <!-- --- Si no hay conciertos disponibles, se muestra un mensaje de que no se han encontrado conciertos --- -->
            <div v-if = "bookedActivities.length === 0" class = "empty-state">You haven't booked any concerts yet.</div>

          </div>

        </div>

        <!-- --- Pestaña para editar el perfil --- -->
        <div v-if = "activeTab === 'profile'" class = "tab-content">

          <!-- --- Header --- -->
          <div class = "tab-header">

            <!-- Título de la pestaña -->
            <h1 class = "tab-title">Edit Profile</h1>

          </div>
          
          <!-- --- Contenedor del formulario de edición de usuario --- -->
          <div class = "profile-form-container">

            <!-- --- Formulario de edición de usuarios --- -->
            <form @submit.prevent = "handleUpdateProfile" class = "open-form">

              <!-- Input para modificar el nombre completo del usuario -->
              <div class = "floating-input-group">

                <!-- --- Input --- -->
                <input id = "profile-name" type = "text" class = "floating-input" placeholder = " " v-model = "profileForm.name" required/>

                <!-- --- Label --- -->
                <label for = "profile-name" class = "floating-label">Full Name</label>

              </div>

              <!-- --- Input para modificar el nombre de usuario --- -->
              <div class = "floating-input-group">

                <!-- --- Input --- -->
                <input id = "profile-username" type = "text" class = "floating-input" placeholder = " " v-model = "profileForm.username" required/>

                <!-- --- Label --- -->
                <label for = "profile-username" class = "floating-label">Username</label>

              </div>

              <!-- --- Input para modificar la contraseña del usuario --- -->
              <div class = "floating-input-group">

                <!-- --- Input --- -->
                <input id = "profile-password" type = "password" class = "floating-input" placeholder = " " v-model="profileForm.password"/>

                <!-- --- Label --- -->
                <label for = "profile-password" class = "floating-label">Current or New Password</label>

              </div>

              <!-- --- Botón de submit --- -->
              <button type = "submit" class = "save-profile-btn" :disabled = "profileLoading">

                <!-- --- Si el perfil se está cargando, se indica y si no se muestra el texto para actualizar el perfil --- -->
                {{ profileLoading ? 'Saving...' : 'Update Profile' }}

              </button>

            </form>

          </div>

        </div>

        <!-- --- Modal para mensajes informativos (componente) --- -->
        <InfoModal :visible = "infoModal.visible" :title = "infoModal.title" :message = "infoModal.message" :type = "infoModal.type" @close = "infoModal.visible = false"/>

        <!-- --- Modal de confirmación de cancelación de reserva (componente) --- -->
        <ConfirmationModal :visible = "showCancelModal" title = "Cancel Reservation" :message = "cancelModalMessage" @confirm = "confirmCancel" @cancel = "showCancelModal = false"/>

      </div>

    </main>

    <!-- --- Efectos de fondo (componente) --- -->
    <BackgroundEffects />

  </div>

</template>

<!-- --- Lógica de la vista --- -->
<script>

/* --- Importar componentes y el servicio de autenticación --- */
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import ActivityCard from '@/components/ActivityCard.vue'
import InfoModal from '@/components/InfoModal.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import authService from '@/services/authService'

/* --- Exportar la vista --- */
export default {

  /* --- Nombre de la vista --- */
  name: 'DashboardPage',

  /* --- Componentes que utiliza --- */
  components: {

    BackgroundEffects,
    ActivityCard,
    InfoModal,
    ConfirmationModal

  },

  /* --- Estructura de datos de la vista --- */
  data() {

    return {

      /* --- Usuario --- */
      user: null,

      /* --- Pestaña activa --- */
      activeTab: 'home',

      /* --- Lista de conciertos --- */
      activities: [],

      /* --- Lista de reservas del usuario --- */
      userBookings: [],

      /* --- Búsqueda de conciertos --- */
      concertSearchQuery: '',

      /* --- Estado de carga --- */
      loading: false,
      profileLoading: false,

      /* --- Datos del formulario de edición de usuario --- */
      profileForm: {

        name: '',
        username: '',
        password: ''

      },

      /* --- Datos del modal de información --- */
      infoModal: {

        visible: false,
        title: '',
        message: '',
        type: 'info'

      },

      /* --- Datos del modal de cancelar reserva --- */
      showCancelModal: false,
      activityToCancel: null,
      cancelModalMessage: '',

      /* --- Datos de las pestañas --- */
      tabs: [

        { id: 'home', label: 'Home', icon: require('@/assets/icons/home.svg') },
        { id: 'concerts', label: 'Concerts', icon: require('@/assets/icons/concerts.svg') },
        { id: 'profile', label: 'Profile', icon: require('@/assets/icons/users.svg') },
        { id: 'bookings', label: 'My Bookings', icon: require('@/assets/icons/bookings.svg') }

      ]

    }

  },

  /* --- Cuando la vista se carga --- */
  mounted() {

    /* --- Pillar el nombre de usuario del LocalStorage llamando al service de autenticación --- */
    this.user = authService.getCurrentUser()

    /* --- Si se encentra el usuario --- */
    if (this.user) {

      /* --- Se cargan los conciertos --- */
      this.fetchActivities()

      /* --- Se cargan las reservas del usuario --- */
      this.fetchMyBookings()

      /* --- Se carga el nombre y el nombre de usuario del formulario de edición --- */
      this.profileForm.name = this.user.name
      this.profileForm.username = this.user.username

    }

  },

  /* --- Valores computados --- */
  computed: {

    /* --- Conciertos reservados --- */
    bookedActivities() {

      const bookedIds = this.userBookings.map(b => b.activity_id)
      return this.activities.filter(a => bookedIds.includes(a.id))

    },

    /* --- Conciertos filtrados por el buscador --- */
    filteredConcerts() {

      const query = this.concertSearchQuery.toLowerCase()

      return this.activities.filter(a => 

        a.name.toLowerCase().includes(query) && a.state === 'active'

      )

    },

    /* --- Nombre del concierto más próximo a la fecha actual --- */
    nextConcertName() {

      if (this.bookedActivities.length === 0) return 'None scheduled'
      const sorted = [...this.bookedActivities].sort((a, b) => new Date(a.start) - new Date(b.start))

      return sorted[0].name

    }

  },

  /* --- Métodos --- */
  methods: {

    /* --- Manejar el cierre de sesión --- */
    handleLogout() {

      /* --- Se llama al método de cierre de sesión del service de autenticación --- */
      authService.logout()

      /* --- Se redirige al usuario a la página de inicio --- */
      this.$router.push('/')

    },

    /* --- Obtener actividades --- */
    async fetchActivities() {

      try {

        /* --- Se obtiene el token del service de autenticación --- */
        const token = authService.getToken()

        /* --- Se llama al endpoint de conciertos --- */
        const response = await fetch('http://localhost:5000/api/activities', {

          /* --- Se envía el token --- */
          headers: {

            'Auth': `Bearer ${token}`

          }

        })

        /* --- Si la respuesta es exitosa --- */
        if (response.ok) {

          this.activities = await response.json()

        }

      } catch (error) {

        /* --- Si hay error se muestra en la consola --- */
        console.error('Error fetching activities:', error)

      }

    },

    /* --- Obtener reservas del usuario --- */
    async fetchMyBookings() {

      /* --- Si no se encuentra el usuario --- */
      if (!this.user) return

      try {

        /* --- Se obtiene el token del service de autenticación --- */
        const token = authService.getToken()

        /* --- Se llama al endpoint de reservas del usuario --- */
        const response = await fetch(`http://localhost:5000/api/users/${this.user.id}/bookings`, {

          /* --- Se envía el token --- */
          headers: {

            'Auth': `Bearer ${token}`

          }

        })

        /* --- Si la respuesta es exitosa --- */
        if (response.ok) {

          this.userBookings = await response.json()

        }

      } catch (error) {

        /* --- Si hay error se muestra en la consola --- */
        console.error('Error fetching bookings:', error)

      }

    },

    /* --- Método para verificar si el usuario ha reservado el concierto --- */
    isUserBooked(activityId) {

      /* --- Se verifica si el usuario ha reservado el concierto --- */
      return this.userBookings.some(b => b.activity_id === activityId && b.activity_state === 'assist')

    },

    /* --- Método para manejar la reserva de un concierto --- */
    async handleBook(activity) {

      try {

        /* --- Se obtiene el token del service de autenticación --- */
        const token = authService.getToken()

        /* --- Se llama al endpoint de reservas del usuario --- */
        const response = await fetch(`http://localhost:5000/api/users/${this.user.id}/bookings/${activity.id}`, {

          method: 'POST',

          /* --- Se envía el token --- */
          headers: {

            'Auth': `Bearer ${token}`

          }

        })

        /* --- Si la respuesta es exitosa --- */
        if (response.ok) {

          /* --- Se muestra mensaje de éxito en el modal de mensajes de información --- */
          this.showInfo('Success', `Booking confirmed for ${activity.name}!`)

          /* --- Se actualizan los valores de los conciertos y las reservas del usuario --- */
          this.fetchActivities()
          this.fetchMyBookings()

        } else {

          /* --- Si la respuesta no es exitosa se muestra mensaje de error en el modal de mensajes de información --- */
          const error = await response.json()
          this.showInfo('Booking Failed', error.error || 'Could not complete reservation', 'error')

        }

      } catch (error) {

        /* --- Si hay un error se muestra mensaje de error en el modal de mensajes de información --- */
        this.showInfo('Error', 'Unexpected error during booking', 'error')

      }

    },

    /* --- Método para manejar la cancelación de un concierto --- */
    handleCancel(activity) {

      /* --- Se muestra el modal para la cancelación del concierto --- */
      this.activityToCancel = activity;
      this.cancelModalMessage = `Are you sure you want to cancel your reservation for ${activity.name}?`;
      this.showCancelModal = true;

    },

    /* --- Método para confirmar la cancelación de la reserva de un concierto --- */
    async confirmCancel() {

      /* --- Si no se encuentra el concierto, no se hace nada --- */
      if (!this.activityToCancel) return;

      /* --- Se obtiene el concierto --- */
      const activity = this.activityToCancel;

      /* --- Se cierra el modal --- */
      this.showCancelModal = false;

      try {

        /* --- Se obtiene el token llamando al service de autenticación --- */
        const token = authService.getToken()

        /* --- Se llama al endpoint para eliminar la reserva--- */
        const response = await fetch(`http://localhost:5000/api/users/${this.user.id}/bookings/${activity.id}`, {

          method: 'DELETE',

          /* --- Se envía el token--- */
          headers: {

            'Auth': `Bearer ${token}`

          }

        })

        /* --- Si la respuesta es exitosa --- */
        if (response.ok) {

          /* --- Se muestra mensaje de éxito en el modal de mensajes de información --- */
          this.showInfo('Cancelled', 'Reservation cancelled successfully.')

          /* --- Se actualizan los valores de los conciertos y las reservas del usuario --- */
          this.fetchActivities()
          this.fetchMyBookings()

        } else {

          /* --- Si la respuesta no es exitosa se muestra mensaje de error en el modal de mensajes de información --- */
          const error = await response.json()
          this.showInfo('Cancellation Failed', error.error || 'Could not cancel reservation', 'error')

        }

      } catch (error) {

        /* --- Si hay un error se muestra mensaje de error en el modal de mensajes de información --- */
        this.showInfo('Error', 'Unexpected error during cancellation', 'error')

      } finally {

        /* --- Se limpia el concierto a cancelar después de terminar el proceso de cancelación de la reserva --- */
        this.activityToCancel = null;

      }

    },

    /* --- Método para actualizar el perfil del usuario --- */
    async handleUpdateProfile() {

      /* --- Se da por hecho que los datos del perfil aún no han cargado --- */
      this.profileLoading = true;

      try {

        /* --- Se obtiene el token llamando al service de autenticación --- */
        const token = authService.getToken()

        /* --- Se llama al endpoint para actualizar el perfil del usuario --- */
        const response = await fetch(`http://localhost:5000/api/users/${this.user.id}`, {
          method: 'PUT',

          /* --- Se envía el token y el tipo de contenido que habrá en el cuerpo de la solicitud --- */
          headers: {

            'Auth': `Bearer ${token}`,
            'Content-Type': 'application/json'

          },

          /* --- Se envía el formulario del perfil en formato JSON --- */
          body: JSON.stringify(this.profileForm)

        })

        /* --- Si la respuesta es exitosa --- */
        if (response.ok) {

          /* --- Se obtiene la respuesta en formato JSON --- */
          const data = await response.json()

          /* --- Se actualiza el perfil del usuario en memoria --- */
          const updatedUser = authService.updateCurrentUser(data.user)

          /* --- Se actualiza la variable local para que se reflejen los cambios en la vista --- */
          this.user = updatedUser

          /* --- Se muestra mensaje de éxito en el modal de mensajes --- */
          this.showInfo('Success', 'Profile updated successfully.')
          this.profileForm.password = ''

        } else {

          /* --- Si la respuesta no es exitosa se muestra mensaje de error en el modal de mensajes --- */
          const error = await response.json()
          this.showInfo('Error', error.error || 'Failed to update profile', 'error')

        }

      } catch (error) {

        /* --- En caso de error se muestra en el modal de mensajes --- */
        this.showInfo('Error', 'Unexpected error updating profile', 'error')

      } finally {

        /* --- Al final del proceso, se indica que el perfil ya no está cargando --- */
        this.profileLoading = false

      }

    },

    /* --- Método para abrir el modal de mensajes informativos --- */
    showInfo(title, message, type = 'info') {

      this.infoModal = {

        visible: true,
        title,
        message,
        type

      }

    }

  }

}

</script>

<!-- --- Estilos de la vista --- -->
<style scoped>

/* --- Contenedor principal --- */
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

/* --- Barra de navegación --- */
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

/* --- Estilos generales del contenido de la vista --- */
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

}

.tab-header.home-header {

  margin-bottom: 3.5rem;

}

.section-subtitle {

  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;

}

.stats-section {
  
  margin-bottom: 4rem;

}

.stats-grid {

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;

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

.stat-icon-wrapper.bookings { 

  background: rgba(52, 211, 153, 0.15);

}
.stat-icon-wrapper.next {

  background: rgba(139, 92, 246, 0.15); 

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

.quick-access {

  max-width: 1200px;

}

.action-cards {

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

.action-icon img {

  width: 24px;
  height: 24px;
  filter: brightness(0) saturate(100%) invert(100%);
  transition: all 0.3s ease;

}

.action-details {

  display: flex;
  flex-direction: column;

}

.action-name {

  font-weight: 700;
  color: white;
  font-size: 1.1rem;

}

.action-desc {

  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);

}

.action-card:hover {

  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.3);
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);

}

.action-card:hover .action-icon {

  transform: scale(1.05);

}

.action-card:hover .action-icon img {

  transform: scale(1.1);

}

/* --- Pestaña de conciertos --- */
.tab-header {

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-right: 5%;

}

.search-input {

  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.3);
  padding: 1rem 1.5rem;
  border-radius: 14px;
  color: white;
  width: 300px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-family: inherit;

}

.search-input::placeholder {

  font-family: inherit;
  color: rgba(255, 255, 255, 0.4);

}

.search-input:focus {

  outline: none;
  border-color: #8b5cf6;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);

}

.activities-grid {

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
  padding-right: 5%;
  max-height: calc(100vh - 250px);
  overflow-y: auto;
  padding-bottom: 2rem;

}

.empty-state {

  grid-column: 1 / -1;
  text-align: center;
  padding: 5rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
  font-style: italic;

}

/* --- Pestaña de perfil --- */
.profile-form-container {

  max-width: 520px;
  margin-top: 2rem;

}

.open-form {

  display: flex;
  flex-direction: column;
  gap: 2.25rem;

}

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
  outline: none;
  transition: all 0.3s ease;
  font-family: inherit;
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

.save-profile-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: white;
  border: none;
  padding: 1.125rem;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  margin-top: 1rem;
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.35);
}

.save-profile-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
  box-shadow: 0 16px 50px rgba(139, 92, 246, 0.45);
  transform: translateY(-3px);
}

.save-profile-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* --- Barra de scroll --- */
.activities-grid::-webkit-scrollbar {
  width: 8px;
}

.activities-grid::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
}

.activities-grid::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.2);
  border-radius: 10px;
}

.activities-grid::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.4);
}

/* --- Animación de Fade --- */
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