<template>

  <div class = "activity-card">

    <div class = "card-header">

      <img :src = "imageUrl" :alt = "activity.name" class = "card-image" @error = "handleImageError"/>

      <div class = "image-overlay"></div>

      <div class = "status-indicator" :class = "activity.state">

        <span class = "pulse-dot"></span>
        {{ activity.state === 'active' ? 'Live' : 'Draft' }}

      </div>

    </div>
    
    <div class = "card-body">

      <div class = "card-info">

        <h3 class = "card-title">{{ activity.name }}</h3>
        <p class = "card-description" v-if = "activity.description">{{ truncateText(activity.description, 60) }}</p>

      </div>
      
      <div class = "card-metrics">

        <div class = "metric">

          <span class = "metric-label">Date & Time</span>
          <span class = "metric-value">

            {{ formatDate(activity.start) }} • {{ formatTime(activity.start) }} - {{ formatTime(activity.finish) }}

          </span>

        </div>

        <div class = "metric">

          <div class = "metric-label">Occupancy</div>
          <div class = "occupancy-bar">

            <div class = "bar-fill" :style = "{ width: occupancyPercent + '%' }"></div>

          </div>

          <span class = "metric-value">{{ activity.users ? activity.users.length : 0 }} / {{ activity.capacity }}</span>

        </div>

      </div>

      <div class = "card-footer" :class = "{ 'user-footer': !isAdmin }">

        <template v-if = "isAdmin">

          <button class = "action-btn edit" @click = "$emit('edit', activity)">

            <span>Modify</span>

          </button>
          
          <button class = "action-btn attendees" @click = "$emit('view-attendees', activity)">

            <span>Attendees</span>

          </button>

          <button class = "action-btn delete" @click = "$emit('delete', activity.id)">

            <img src = "@/assets/icons/trash.svg" class = "btn-icon" alt = "Delete" />

          </button>

        </template>
        
        <template v-else>

          <button v-if = "!isBooked" class = "action-btn book" @click = "$emit('book', activity)" :disabled = "isFull">

            <span>{{ isFull ? 'Activity Full' : 'Book Now' }}</span>

          </button>

          <button v-else class = "action-btn cancel-booking" @click = "$emit('cancel', activity)">

            <span>Cancel Reservation</span>

          </button>

        </template>

      </div>

    </div>

  </div>

</template>

<script>

export default {

  name: 'ActivityCard',

  props: {

    activity: {

      type: Object,
      required: true

    },

    isAdmin: {

      type: Boolean,
      default: true

    },

    isBooked: {

      type: Boolean,
      default: false

    }

  },

  computed: {

    imageUrl() {

      if (this.activity.image) {

        return `http://localhost:5000/static/images/${this.activity.image}`;

      }

      return 'https://via.placeholder.com/400x250?text=No+Image';

    },

    occupancyPercent() {

      if (!this.activity.capacity) return 0;
      const users = this.activity.users ? this.activity.users.length : 0;
      return Math.min((users / this.activity.capacity) * 100, 100);

    },

    isFull() {

      const users = this.activity.users ? this.activity.users.length : 0;
      return users >= this.activity.capacity;

    }

  },

  methods: {

    truncateText(text, length) {

      if (!text) return '';
      return text.length > length ? text.substring(0, length) + '...' : text;

    },

    formatDate(dateString) {

      if (!dateString) return '';
      const date = new Date(dateString);

      return date.toLocaleDateString(undefined, { 

        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 

      });

    },

    formatTime(dateString) {

      if (!dateString) return '';

      const date = new Date(dateString);
      return date.toLocaleTimeString(undefined, { 

        hour: '2-digit', 
        minute: '2-digit' 

      });

    },

    handleImageError(e) {

      e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';

    }

  }

}

</script>

<style scoped>

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

.card-header {

  height: 180px;
  width: 100%;
  position: relative;
  overflow: hidden;

}

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

.status-indicator {

  position: absolute;
  top: 1rem;
  right: 1.2rem;
  padding: 0.4rem 0.8rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 2;

}

.status-indicator.active {

  background: rgba(52, 211, 153, 0.15);
  color: #34d399;

}

.status-indicator.inactive {

  background: rgba(248, 113, 113, 0.15);
  color: #f87171;

}

.pulse-dot {

  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 0 rgba(255, 255, 255, 0.4);

}

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

.card-footer {

  margin-top: auto;
  display: flex;
  gap: 0.8rem;
  padding-top: 0.5rem;

}

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