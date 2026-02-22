<!-- --- Estructura del modal para editar un usuario --- -->
<template>

  <!-- --- Transición para que el modal aparezca y desaparezca de forma suave --- -->
  <transition name = "modal-fade">

    <!-- --- Si el modal está visible, se muestra su contenido --- -->
    <div v-if = "visible" class = "modal-overlay" @click.self = "$emit('close')">

      <!-- --- Contenedor principal del modal --- -->
      <div class = "modal-content">

        <!-- --- Header --- -->
        <div class = "modal-header">

          <!-- --- Título --- -->
          <h2 class = "modal-title">Edit User Info</h2>

          <!-- --- Botón de cerrar --- -->
          <button class = "close-btn" @click = "$emit('close')">&times;</button>

        </div>

        <!-- --- Formulario para editar el usuario --- -->
        <form @submit.prevent = "handleSubmit" class = "modal-form">

          <!-- --- Input para el nombre completo --- -->
          <div class = "form-group">

            <label>Full Name</label>
            <input type = "text" v-model = "form.name" placeholder = "Enter user's name" required/>

          </div>

          <!-- --- Input para el nombre de usuario --- -->
          <div class = "form-group">

            <label>Username</label>
            <input type = "text" v-model = "form.username" placeholder = "Enter username" required/>

          </div>

          <!-- --- Footer del modal --- -->
          <div class = "modal-footer">

            <button type = "button" class = "btn-secondary" @click = "$emit('close')">Cancel</button>
            <button type = "submit" class = "btn-primary" :disabled = "loading">

              {{ loading ? 'Saving...' : 'Save Changes' }}

            </button>

          </div>

        </form>

      </div>

    </div>

  </transition>

</template>

<!-- --- Lógica del componente --- -->
<script>

/* --- Exportación del componente --- */
export default {

/* --- Nombre del componente --- */
  name: 'UserEditModal',

  /* --- Atributos que se le pasan al componente --- */
  props: {

    visible: Boolean,
    loading: Boolean,
    userData: Object

  },

  /* --- Estructura de datos del componente --- */
  data() {

    return {

      form: {

        name: '',
        username: ''

      }

    }

  },

  /* --- Observador de cambios en los atributos --- */
  watch: {

    visible(val) {

      /* --- Si el modal es visible y hay datos del usuario, se actualiza el formulario --- */
      if (val && this.userData) {

        this.form = {

          name: this.userData.name,
          username: this.userData.username

        }

      }

    }

  },

  /* --- Métodos --- */
  methods: {

    /* --- Envío del formulario --- */
    handleSubmit() {

      this.$emit('save', { ...this.form, id: this.userData.id })

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
.modal-content {

  background: rgba(20, 15, 35, 0.8);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 24px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.1);
  overflow: hidden;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);

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

/* --- Formulario --- */
.modal-form {

  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

}

.form-group {

  display: flex;
  flex-direction: column;
  gap: 0.6rem;

}

.form-group label {

  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;

}

.form-group input {

  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(139, 92, 246, 0.2);
  padding: 1rem 1.2rem;
  border-radius: 14px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;

}

.form-group input:focus {

  outline: none;
  border-color: #8b5cf6;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.15);

}

/* --- Footer --- */
.modal-footer {

  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;

}

/* --- Botones --- */
.btn-secondary {

  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.8rem 1.8rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: inherit;

}

.btn-secondary:hover {

  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);

}

.btn-primary {

  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  font-family: inherit;

}

.btn-primary:hover:not(:disabled) {

  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);

}

.btn-primary:disabled {

  opacity: 0.5;
  cursor: not-allowed;

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
    transform: translateY(30px) scale(0.95);

  }

  to { 

    opacity: 1;
    transform: translateY(0) scale(1);

  }

}

/* --- Transiciones --- */
.modal-fade-enter-active, .modal-fade-leave-active {

  transition: all 0.3s ease;

}
.modal-fade-enter, .modal-fade-leave-to {

  opacity: 0;

}

</style>