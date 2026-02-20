<template>

  <div v-if = "visible" class = "modal-overlay" @click.self = "$emit('close')">

    <div class = "modal-container">

      <div class = "modal-header">

        <h2 class = "modal-title">Attendees: {{ activity?.name }}</h2>
        <button class = "close-btn" @click = "$emit('close')">×</button>

      </div>
      
      <div class = "modal-body">

        <div v-if = "loading" class = "loading-state">Loading attendees...</div>

        <div v-else-if = "attendeeDetails.length === 0" class = "empty-state">

          <p>No attendees yet for this concert.</p>

        </div>
        
        <div v-else class = "attendees-list">

          <div v-for = "attendee in attendeeDetails" :key = "attendee.username" class = "attendee-item">

            <div class = "attendee-icon">

              <img src = "@/assets/icons/users.svg" alt = "User"/>

            </div>

            <div class = "attendee-info">

              <span class = "attendee-name">{{ attendee.name }}</span>
              <span class = "attendee-username">@{{ attendee.username }}</span>

            </div>

          </div>

        </div>

      </div>
      
      <div class = "modal-footer">

        <button class = "btn btn-secondary" @click = "$emit('close')">Close</button>

      </div>

    </div>

  </div>

</template>

<script>

export default {

  name: 'AttendeesModal',

  props: {

    visible: {

      type: Boolean,
      default: false

    },

    activity: {

      type: Object,
      default: null

    },

    allUsers: {

      type: Array,
      default: () => []

    },

    loading: {

      type: Boolean,
      default: false

    }

  },

  computed: {

    attendeeDetails() {

      if (!this.activity || !this.activity.users) return [];
      
      return this.activity.users.map(username => {

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

<style scoped>

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

.modal-header {

  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

}

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

.modal-body {

  padding: 1.5rem 2rem;
  overflow-y: auto;
  min-height: 100px;

}

.attendees-list {

  display: flex;
  flex-direction: column;
  gap: 1rem;

}

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

.modal-footer {

  padding: 1rem 2rem 1.5rem;
  display: flex;
  justify-content: flex-end;

}

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

@keyframes fadeIn {

  from { opacity: 0; }

  to { opacity: 1; }

}

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
