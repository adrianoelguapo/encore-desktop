<!-- --- Estructura del modal para editar un concierto --- -->
<template>

  <!-- --- Si el modal está visible, se muestra su contenido --- -->
  <div v-if = "visible" class = "modal-overlay" @click.self = "$emit('close')">

    <!-- --- Contenedor principal del modal --- -->
    <div class = "modal-container">

      <!-- --- Header --- -->
      <div class = "modal-header">

        <!-- --- Título --- -->
        <h2 class = "modal-title">{{ isEditing ? 'Edit Concert' : 'Create New Concert' }}</h2>
        
        <!-- --- Botón de cerrar --- -->
        <button class = "close-btn" @click = "$emit('close')">×</button>
        
      </div>
      
      <!-- --- Contenido del modal --- -->
      <div class = "modal-body">

        <!-- --- Formulario para editar el concierto --- -->
        <form @submit.prevent = "handleSubmit" class = "activity-form">

          <!-- --- Input para el nombre del concierto --- -->
          <div class = "form-group">

            <label for = "name">Name</label>
            <input type = "text" id = "name" v-model = "form.name" required placeholder = "Event Name" class = "form-input"/>

          </div>
          
          <!-- --- Input para la descripción del concierto --- -->
          <div class = "form-group">

            <label for = "description">Description</label>
            <textarea id = "description" v-model = "form.description" required placeholder = "Event Description" class = "form-input textarea"></textarea>

          </div>
          
          <!-- --- Fila para la fecha y hora de inicio y fin --- -->
          <div class = "form-row">

            <!-- --- Input para la fecha y hora de inicio --- -->
            <div class = "form-group">

              <label for = "start">Start Date & Time</label>
              <input type = "datetime-local" id = "start" v-model = "form.start" required class = "form-input"/>

            </div>
            
            <!-- --- Input para la fecha y hora de fin --- -->
            <div class = "form-group">

              <label for = "finish">End Date & Time</label>
              <input type = "datetime-local" id = "finish" v-model = "form.finish" required class = "form-input"/>

            </div>

          </div>
          
          <!-- --- Fila para la capacidad y la imagen --- -->
          <div class = "form-row">

            <!-- --- Input para la capacidad --- -->
            <div class = "form-group">

              <label for = "capacity">Capacity</label>
              <input type = "number" id = "capacity" v-model.number = "form.capacity" required min = "1" class = "form-input"/>

            </div>
            
            <!-- --- Input para la imagen del concierto --- -->
            <div class = "form-group">

              <label for = "image">Event Image</label>
              <div class = "file-input-wrapper">

                <input type = "file" id = "image" @change = "handleFileUpload" accept = "image/*" class = "file-input"/>

                <!-- --- Nombre de la imagen --- -->
                <div class = "file-label">

                  <span v-if = "imageFile">{{ imageFile.name }}</span>
                  <span v-else-if = "currentImageName">{{ currentImageName }} (Current)</span>
                  <span v-else>Choose an image...</span>

                </div>

              </div>

            </div>

          </div>
          
          <!-- --- Footer del modal --- -->
          <div class = "modal-footer">

            <!-- --- Botón de cancelar --- -->
            <button type = "button" class = "btn btn-secondary" @click = "$emit('close')">Cancel</button>
            
            <!-- --- Botón de guardar --- -->
            <button type = "submit" class = "btn btn-primary" :disabled = "loading">

              <!-- --- Texto del botón de guardar --- -->
              {{ loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Concert') }}

            </button>

          </div>

        </form>

      </div>

    </div>

  </div>

</template>

<!-- --- Lógica del componente --- -->
<script>

/* --- Exportación del componente --- */
export default {

  /* --- Nombre del componente --- */
  name: 'ActivityModal',

  /* --- Atributos que se le pasan al componente --- */
  props: {

    /* --- Si es visible o no --- */
    visible: {

      type: Boolean,
      default: false

    },


    loading: {

      type: Boolean,
      default: false

    },

    /* --- Datos del concierto --- */
    activityData: {

      type: Object,
      
    }

  },

  /* --- Estructura de datos del componente --- */
  data() {

    return {

      /* --- Formulario --- */
      form: {

        name: '',
        description: '',
        start: '',
        finish: '',
        capacity: 100,
        state: 'active'

      },

      /* --- Archivo de imagen --- */
      imageFile: null,
      
      /* --- Nombre de la imagen actual --- */
      currentImageName: null

    }

  },

  /* --- Valores computados --- */
  computed: {

    /* --- Comprobar si se está editando el concierto --- */
    isEditing() {

      return !!this.activityData;

    }

  },

  /* --- Métodos del componente --- */
  methods: {

    /* --- Maneja la carga de la imagen --- */
    handleFileUpload(event) {

      this.imageFile = event.target.files[0];

    },

    /* --- Formatea la fecha para el input --- */
    formatDateForInput(isoString) {

      if (!isoString) return '';

      /* --- Si la fecha no tiene zona horaria ni desfase, le añadimos 'Z' para que se trate como UTC --- */
      let dateValue = isoString;

      if (typeof isoString === 'string' && !isoString.includes('Z') && !isoString.includes('+') && !isoString.match(/-\d{2}:\d{2}$/)) {

        dateValue += 'Z';

      }

      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return '';
      
      /* --- Ajustamos la fecha restando el desfase local para obtener la fecha ISO local --- */
      const offset = date.getTimezoneOffset() * 60000;
      const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
      
      return localISOTime;

    },

    /* --- Maneja el envío del formulario --- */
    handleSubmit() {

      /* --- Comprueba que la fecha de fin sea mayor a la de inicio --- */
      if (new Date(this.form.finish) <= new Date(this.form.start)) {

        this.$emit('error', 'End date must be after start date');
        return;

      }
      
      /* --- Activa el evento para guardar los datos del concierto --- */
      this.$emit('save', {

        ...this.form,
        image: this.imageFile

      });
      
    },

    /* --- Resetea el formulario --- */
    resetForm() {

      this.form = {

        name: '',
        description: '',
        start: '',
        finish: '',
        capacity: 100,
        state: 'active'

      };

      this.imageFile = null;
      this.currentImageName = null;
    }

  },

  /* --- Observa los cambios en las propiedades --- */
  watch: {

    /* --- Observa los cambios en la propiedad visible --- */
    visible(newVal) {

      /* --- Si el modal es visible, se resetea el formulario --- */
      if (newVal) {

        /* --- Si se está editando el concierto, se carga su información --- */
        if (this.activityData) {

          this.form = {

            name: this.activityData.name,
            description: this.activityData.description,
            start: this.formatDateForInput(this.activityData.start),
            finish: this.formatDateForInput(this.activityData.finish),
            capacity: this.activityData.capacity,
            state: this.activityData.state || 'active'

          };

          /* --- Nombre de la imagen actual --- */
          this.currentImageName = this.activityData.image;

        } else {

          /* --- Resetea el formulario --- */
          this.resetForm();

        }

      } else {

        /* --- Resetea el formulario --- */
        this.resetForm();

      }

    }

  },

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
  max-width: 600px;
  max-height: 90vh;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.1);
  overflow: hidden;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;

}

/* --- Header --- */
.modal-header {

  padding: 2rem 2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

}

/* --- Título --- */
.modal-title {

  font-size: 1.5rem;
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

  padding: 2rem;
  overflow-y: auto;

}

/* --- Formulario --- */
.form-group {

  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

}

.form-row {

  display: flex;
  gap: 1.5rem;

}

.form-row .form-group {

  flex: 1;

}

label {

  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;

}

.form-input {

  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(139, 92, 246, 0.2);
  padding: 0.8rem 1rem;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
  width: 100%;

}

.form-input:focus {

  outline: none;
  border-color: #8b5cf6;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.15);

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
  padding: 0.8rem 1rem;
  border-radius: 12px;
  border: 1px dashed rgba(139, 92, 246, 0.4);
  background: rgba(255, 255, 255, 0.02);
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  transition: all 0.3s ease;
  max-width: 100%;

}

.file-label span {

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}

.file-input:hover + .file-label {

  background: rgba(139, 92, 246, 0.1);
  border-color: #8b5cf6;
  color: white;

}

/* --- Footer --- */
.modal-footer {

  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;

}

/* --- Botones --- */
.btn {

  padding: 0.8rem 1.8rem;
  border-radius: 12px;
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
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);

}

.btn-primary:hover:not(:disabled) {

  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);

}

.btn-primary:disabled {

  opacity: 0.6;
  cursor: not-allowed;

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
    transform: translateY(30px) scale(0.98);

  }

  to { 

    opacity: 1;
    transform: translateY(0) scale(1);

  }

}
</style>