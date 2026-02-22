<!-- --- Estructura de cada carta de cada concierto --- -->
<template>

  <!-- --- Contenedor principal --- -->
  <div class = "activity-card">

    <!-- --- Header --- -->
    <div class = "card-header">

      <!-- --- Imagen del concierto --- -->
      <img :src = "imageUrl" :alt = "activity.name" class = "card-image" @error = "handleImageError"/>

      <!-- --- Elemento para hacer la imagen un poco más oscura --- -->
      <div class = "image-overlay"></div>

    </div>
    
    <!-- --- Cuerpo de la tarjeta --- -->
    <div class = "card-body">

      <!-- --- Detalles del concierto --- -->
      <div class = "card-info">

        <!-- --- Título --- -->
        <h3 class = "card-title">{{ activity.name }}</h3>

        <!-- --- Descripción --- -->
        <p class = "card-description" v-if = "activity.description">{{ truncateText(activity.description, 60) }}</p>

      </div>
      
      <!-- --- Datos --- -->
      <div class = "card-metrics">

        <!-- --- Fecha y hora --- -->
        <div class = "metric">

          <span class = "metric-label">Date & Time</span>
          <span class = "metric-value">

            {{ formatDate(activity.start) }} • {{ formatTime(activity.start) }} - {{ formatTime(activity.finish) }}

          </span>

        </div>

        <!-- --- Plazas disponibles --- -->
        <div class = "metric">

          <div class = "metric-label">Occupancy</div>
          <div class = "occupancy-bar">

            <div class = "bar-fill" :style = "{ width: occupancyPercent + '%' }"></div>

          </div>

          <span class = "metric-value">{{ activity.users ? activity.users.length : 0 }} / {{ activity.capacity }}</span>

        </div>

      </div>

      <!-- --- Footer --- -->
      <div class = "card-footer" :class = "{ 'user-footer': !isAdmin }">

        <!-- --- Si es admin muestra los botones de editar, ver asistentes y eliminar --- -->
        <template v-if = "isAdmin">

          <!-- --- Botón de editar --- -->
          <button class = "action-btn edit" @click = "$emit('edit', activity)">

            <span>Modify</span>

          </button>
          
          <!-- --- Botón de ver asistentes --- -->
          <button class = "action-btn attendees" @click = "$emit('view-attendees', activity)">

            <span>Attendees</span>

          </button>

          <!-- --- Botón de eliminar --- -->
          <button class = "action-btn delete" @click = "$emit('delete', activity.id)">

            <img src = "@/assets/icons/trash.svg" class = "btn-icon" alt = "Delete" />

          </button>

        </template>
        
        <!-- --- Si no es admin muestra los botones de reservar, cancelar reserva y si está finalizado --- -->
        <template v-else>

          <!-- --- Botón de finalizado --- -->
          <button v-if = "isFinished" class = "action-btn finished" disabled>

            <span>Finished</span>

          </button>

          <template v-else>

            <!-- --- Botón de reservar --- -->
            <button v-if = "!isBooked" class = "action-btn book" @click = "$emit('book', activity)" :disabled = "isFull">

              <!-- --- Comprueba si hay plazas disponibles y muestra texto n consecuencia --- -->
              <span>{{ isFull ? 'Activity Full' : 'Book Now' }}</span>

            </button>

            <!-- --- Botón de cancelar reserva --- -->
            <button v-else class = "action-btn cancel-booking" @click = "$emit('cancel', activity)">

              <span>Cancel Reservation</span>

            </button>

          </template>

        </template>

      </div>

    </div>

  </div>

</template>

<!-- --- Lógica del componente --- -->
<script>

/* --- Exportación del componente --- */
export default {

  /* --- Nombre del componente --- */
  name: 'ActivityCard',

  /* --- Atributos que se le pasan al componente --- */
  props: {

    /* --- Concierto a mostrar --- */
    activity: {

      type: Object,
      required: true

    },

    /* --- Si el usuario es admin --- */
    isAdmin: {

      type: Boolean,
      default: true

    },

    /* --- Si el usuario ha reservado ya para ese concierto --- */
    isBooked: {

      type: Boolean,
      default: false

    }

  },

  /* --- Valores computados --- */
  computed: {

    /* --- URL de la imagen --- */
    imageUrl() {

      /* --- Si tiene imagen, se muestra, si no, se muestra una por defecto --- */
      if (this.activity.image) {

        return `http://localhost:5000/static/images/${this.activity.image}`;

      }

      return 'https://via.placeholder.com/400x250?text=No+Image';

    },

    /* --- Porcentaje de la barra de plazas --- */
    occupancyPercent() {

      /* --- Si no hay capacidad, se muestra 0% --- */
      if (!this.activity.capacity) return 0;

      /* --- Número de usuarios --- */
      const users = this.activity.users ? this.activity.users.length : 0;

      /* --- Regla de tres para sacar el % de ancho que se pintará en la barra --- */
      return Math.min((users / this.activity.capacity) * 100, 100);

    },

    /* --- Comprobar si el concierto está lleno --- */
    isFull() {

      const users = this.activity.users ? this.activity.users.length : 0;
      return users >= this.activity.capacity;

    },

    /* --- Comprobar si el concierto ha finalizado --- */
    isFinished() {

      return this.activity.state === 'finished';

    }

  },

  /* --- Métodos --- */
  methods: {

    /* --- Truncar texto del nombre de la imagen para que no deforme la tarjeta --- */
    truncateText(text, length) {

      if (!text) return '';
      return text.length > length ? text.substring(0, length) + '...' : text;

    },

    /* --- Formatear fecha --- */
    formatDate(dateString) {

      if (!dateString) return '';
      
      let dateValue = dateString;
      if (typeof dateString === 'string' && !dateString.includes('Z') && !dateString.includes('+')) {

        dateValue += 'Z';

      }

      const date = new Date(dateValue);

      return date.toLocaleDateString(undefined, { 

        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 

      });

    },

    /* --- Formatear hora --- */
    formatTime(dateString) {

      if (!dateString) return '';

      let dateValue = dateString;
      if (typeof dateString === 'string' && !dateString.includes('Z') && !dateString.includes('+')) {

        dateValue += 'Z';

      }

      const date = new Date(dateValue);
      return date.toLocaleTimeString(undefined, { 

        hour: '2-digit', 
        minute: '2-digit' 

      });

    },

    /* --- Manejar error de imagen --- */
    handleImageError(e) {

      e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';

    }

  }

}

</script>

<!-- --- Estilos del componente --- -->
<style scoped>

/* --- Contenedor principal de la tarjeta --- */
.activity-card {

  background: #120c1d;
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

}

.activity-card:hover {

  transform: translateY(-8px);
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 20px 50px rgba(139, 92, 246, 0.2);

}

/* --- Header --- */
.card-header {

  height: 180px;
  width: 100%;
  position: relative;
  overflow: hidden;

}

/* --- Imagen --- */
.card-image {

  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

}

.activity-card:hover .card-image {

  transform: scale(1.1) rotate(1deg);

}

.image-overlay {

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 0%, rgba(18, 12, 29, 0.8) 100%);

}

/* --- Contenido --- */
.card-body {

  padding: 1.2rem 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

}

.card-info {

  display: flex;
  flex-direction: column;
  gap: 0.3rem;

}

.card-title {

  font-size: 1.4rem;
  font-weight: 800;
  color: white;
  line-height: 1.2;

}

.card-description {

  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;

}

.card-metrics {

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

}

.metric {

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

}

.metric-label {

  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(139, 92, 246, 0.8);

}

.metric-value {

  font-size: 0.95rem;
  color: white;
  font-weight: 500;

}

.occupancy-bar {

  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  margin: 0.2rem 0;
  overflow: hidden;

}

.bar-fill {

  height: 100%;
  background: linear-gradient(to right, #8b5cf6, #6366f1);
  border-radius: 100px;
  transition: width 1s ease-out;

}

/* --- Footer --- */
.card-footer {

  margin-top: auto;
  display: flex;
  gap: 0.8rem;
  padding-top: 0.5rem;

}

/* --- Botones --- */
.action-btn {

  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

}

.action-btn.edit {

  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #8b5cf6;
  flex: 1;
  padding: 0.8rem;
  font-weight: 700;
  font-size: 0.9rem;

}

.action-btn.edit:hover {

  background: #8b5cf6;
  color: white;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);

}

.action-btn.attendees {

  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  flex: 1;
  padding: 0.8rem;
  font-weight: 700;
  font-size: 0.9rem;

}

.action-btn.attendees:hover {

  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);

}

.action-btn.book {

  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: white;
  width: 100%;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 0.8rem;
  font-size: 0.9rem;

}

.action-btn.book:hover:not(:disabled) {

  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(139, 92, 246, 0.4);

}

.action-btn.book:disabled {

  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: not-allowed;

}

.action-btn.cancel-booking {

  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  width: 100%;
  font-weight: 700;
  padding: 0.8rem;
  font-size: 0.9rem;

}

.action-btn.cancel-booking:hover {

  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.5);
  color: rgba(239, 68, 68, 1);
  box-shadow: none;
  transform: translateY(-2px);

}

.action-btn.delete {

  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);

}

.action-btn.finished {

  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  font-weight: 700;
  padding: 0.8rem;
  font-size: 0.9rem;
  cursor: not-allowed;
  text-transform: uppercase;
  letter-spacing: 1px;

}

.btn-icon {

  width: 18px;
  height: 18px;
  filter: brightness(0) saturate(100%) invert(42%) sepia(85%) saturate(1210%) hue-rotate(327deg) brightness(98%) contrast(92%);

}

.action-btn.delete:hover {

  background: #ef4444;

}

.action-btn.delete:hover .btn-icon {

  filter: brightness(0) invert(1);

}

</style>