<template>
  <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-title">{{ isEditing ? 'Edit Concert' : 'Create New Concert' }}</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="handleSubmit" class="activity-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required 
              placeholder="Event Name"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="description">Description</label>
            <textarea 
              id="description" 
              v-model="form.description" 
              required 
              placeholder="Event Description"
              class="form-input textarea"
            ></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="start">Start Date & Time</label>
              <input 
                type="datetime-local" 
                id="start" 
                v-model="form.start" 
                required 
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="finish">End Date & Time</label>
              <input 
                type="datetime-local" 
                id="finish" 
                v-model="form.finish" 
                required 
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="capacity">Capacity</label>
              <input 
                type="number" 
                id="capacity" 
                v-model.number="form.capacity" 
                required 
                min="1"
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="image">Event Image</label>
              <div class="file-input-wrapper">
                <input 
                  type="file" 
                  id="image" 
                  @change="handleFileUpload" 
                  accept="image/*"
                  class="file-input"
                />
                <div class="file-label">
                  <span v-if="imageFile">{{ imageFile.name }}</span>
                  <span v-else-if="currentImageName">{{ currentImageName }} (Current)</span>
                  <span v-else>Choose an image...</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Concert') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    activityData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        start: '',
        finish: '',
        capacity: 100
      },
      imageFile: null,
      currentImageName: null
    }
  },
  computed: {
    isEditing() {
      return !!this.activityData;
    }
  },
  methods: {
    handleFileUpload(event) {
      this.imageFile = event.target.files[0];
    },
    formatDateForInput(isoString) {
      if (!isoString) return '';
      // Extract YYYY-MM-DDTHH:mm from ISO string
      return isoString.substring(0, 16);
    },
    handleSubmit() {
      // Validate dates
      if (new Date(this.form.finish) <= new Date(this.form.start)) {
        alert('End date must be after start date');
        return;
      }
      
      this.$emit('save', {
        ...this.form,
        image: this.imageFile
      });
      
      // Reset form handled by parent or watcher on close
    },
    resetForm() {
      this.form = {
        name: '',
        description: '',
        start: '',
        finish: '',
        capacity: 100
      };
      this.imageFile = null;
      this.currentImageName = null;
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        if (this.activityData) {
          // Populate form for editing
          this.form = {
            name: this.activityData.name,
            description: this.activityData.description,
            start: this.formatDateForInput(this.activityData.start),
            finish: this.formatDateForInput(this.activityData.finish),
            capacity: this.activityData.capacity
          };
          this.currentImageName = this.activityData.image;
        } else {
          // Reset form for creation
          this.resetForm();
        }
      } else {
        this.resetForm();
      }
    }
  },

}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-container {
  background: #1a1a2e; /* Darker solid background */
  border: 1px solid rgba(139, 92, 246, 0.5);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(139, 92, 246, 0.1);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: white;
}

.modal-body {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(139, 92, 246, 0.3);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #8b5cf6;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
}

.textarea {
  min-height: 100px;
  resize: vertical;
}

.file-input-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 100%;
}

.file-input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-label {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px dashed rgba(139, 92, 246, 0.5);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  transition: all 0.3s ease;
  max-width: 100%;
}

.file-label span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.file-input:hover + .file-label {
  background: rgba(139, 92, 246, 0.1);
  border-color: #8b5cf6;
  color: white;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
