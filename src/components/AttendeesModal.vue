<!-- --- Estructura del modal para ver los asistentes a un concierto --- -->
<template>

  <!-- --- Si el modal está visible, se muestra su contenido --- -->
  <div v-if = "visible" class = "modal-overlay" @click.self = "$emit('close')">

    <!-- --- Contenedor principal del modal --- -->
    <div class = "modal-container">

      <!-- --- Header --- -->
      <div class = "modal-header">

        <!-- --- Título del modal --- -->
        <h2 class = "modal-title">Attendees: {{ activity?.name }}</h2>

        <!-- --- Botón de cerrar --- -->
        <button class = "close-btn" @click = "$emit('close')">×</button>

      </div>
      
      <!-- --- Cuerpo del modal --- -->
      <div class = "modal-body">

        <!-- --- Si está cargando, muestra un mensaje de carga --- -->
        <div v-if = "loading" class = "loading-state">Loading attendees...</div>

        <!-- --- Si no hay asistentes, muestra un mensaje de que no hay asistentes --- -->
        <div v-else-if = "attendeeDetails.length === 0" class = "empty-state">

          <p>No attendees yet for this concert.</p>

        </div>
        
        <!-- --- Si hay asistentes, se muestra la lista --- -->
        <div v-else class = "attendees-list">

          <!-- --- Se recorre la lista de asistentes y se crea un contenedor para cada uno --- -->
          <div v-for = "attendee in attendeeDetails" :key = "attendee.username" class = "attendee-item">

            <!-- --- Icono del asistente --- -->
            <div class = "attendee-icon">

              <img src = "@/assets/icons/users.svg" alt = "User"/>

            </div>

            <!-- --- Información del asistente --- -->
            <div class = "attendee-info">

              <!-- --- Nombre del asistente --- -->
              <span class = "attendee-name">{{ attendee.name }}</span>

              <!-- --- Nombre de usuario del asistente --- -->
              <span class = "attendee-username">@{{ attendee.username }}</span>

            </div>

          </div>

        </div>

      </div>
      
      <!-- --- Footer --- -->
      <div class = "modal-footer">

        <!-- --- Botón de cerrar --- -->
        <button class = "btn btn-secondary" @click = "$emit('close')">Close</button>

      </div>

    </div>

  </div>

</template>

<!-- --- Lógica del componente --- -->
<script>

/* --- Exportación del componente --- */
export default {

  /* --- Nombre del componente --- */
  name: 'AttendeesModal',

  /* --- Atributos que se le pasan al componente --- */
  props: {

    /* --- Si es visible o no --- */
    visible: {

      type: Boolean,
      default: false

    },

    /* --- Concierto del que se recuperan los asistentes --- */
    activity: {

      type: Object,
      default: null

    },

    /* --- Lista de todos los usuarios --- */
    allUsers: {

      type: Array,
      default: () => []

    },

    /* --- Si está cargando o no --- */
    loading: {

      type: Boolean,
      default: false

    }

  },

  /* --- Valores computados --- */
  computed: {

    /* --- Detalles de los asistentes --- */
    attendeeDetails() {

      /* --- Si no hay actividad o no hay usuarios, devuelve un array vacío --- */
      if (!this.activity || !this.activity.users) return [];
      
      /* --- Recorrer la lista de usuarios y crear un array con los detalles de cada uno --- */
      return this.activity.users.map(username => {

        /* --- Buscar el usuario en la lista de todos los usuarios --- */
        const user = this.allUsers.find(u => u.username === username);

        return {

          username: username,
          name: user ? user.name : 'Unknown User'

        };

      });

    }

  }

}

</script>

<!-- --- Estilos del componente --- -->
<style scoped>

/* --- Estilos para el difuminar el fondo y que el modal quede por encima y centrado --- */
.modal-overlay {

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;


}

/* --- Contenedor principal --- */
.modal-container {

  background: rgba(20, 15, 35, 0.8);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.1);
  overflow: hidden;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;

}

/* --- Header --- */
.modal-header {

  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

}

/* --- Título --- */
.modal-title {

  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}

/* --- Botón de cerrar --- */
.close-btn {

  background: transparent;
  border: none;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  line-height: 1;
  transition: all 0.2s;

}

.close-btn:hover {

  color: white;
  transform: rotate(90deg);

}

/* --- Contenido --- */
.modal-body {

  padding: 1.5rem 2rem;
  overflow-y: auto;
  min-height: 100px;

}

/* --- Lista de asistentes --- */
.attendees-list {

  display: flex;
  flex-direction: column;
  gap: 1rem;

}

/* --- Carta de un asistente --- */
.attendee-item {

  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  transition: all 0.3s ease;

}

.attendee-item:hover {

  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.2);
  transform: translateX(4px);

}

.attendee-icon {

  width: 36px;
  height: 36px;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.attendee-icon img {

  width: 18px;
  height: 18px;
  filter: brightness(0) saturate(100%) invert(46%) sepia(35%) saturate(2891%) hue-rotate(224deg) brightness(98%) contrast(92%);

}

.attendee-info {

  display: flex;
  flex-direction: column;

}

.attendee-name {

  color: white;
  font-weight: 600;
  font-size: 1rem;

}

.attendee-username {

  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;

}

.loading-state, .empty-state {

  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  padding: 2rem 0;

}

/* --- Footer --- */
.modal-footer {

  padding: 1rem 2rem 1.5rem;
  display: flex;
  justify-content: flex-end;

}

/* --- Botón --- */
.btn {

  padding: 0.7rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;

}

.btn-secondary {

  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;

}

.btn-secondary:hover {

  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);

}

/* --- Animación para el difuminado del fondo --- */
@keyframes fadeIn {

  from { opacity: 0; }

  to { opacity: 1; }

}

/* --- Animación para el movimiento del modal --- */
@keyframes slideUp {

  from { 

    opacity: 0;
    transform: translateY(20px);

  }

  to { 

    opacity: 1;
    transform: translateY(0);

  }
  
}
</style>
