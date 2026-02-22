<!-- --- Estructura del modal para confirmaciones --- -->
<template>

  <!-- --- Si el modal está visible, se muestra su contenido --- -->
  <div v-if = "visible" class = "modal-overlay" @click.self = "$emit('cancel')">

    <!-- --- Contenedor principal del modal --- -->
    <div class = "modal-container">

      <!-- --- Header --- -->
      <div class = "modal-header">

        <h2 class = "modal-title">{{ title }}</h2>
        <button class = "close-btn" @click = "$emit('cancel')">×</button>

      </div>
      
      <!-- --- Cuerpo del modal --- -->
      <div class = "modal-body">

        <!-- --- Contenido del modal --- -->
        <p class = "modal-message">{{ message }}</p>

      </div>
      
      <!-- --- Footer --- -->
      <div class = "modal-footer">

        <!-- --- Botón de cancelar --- -->
        <button class = "btn btn-secondary" @click = "$emit('cancel')">Cancel</button>

        <!-- --- Botón de confirmar --- -->
        <button class = "btn btn-danger" @click = "$emit('confirm')">Confirm</button>

      </div>

    </div>

  </div>

</template>

<!-- --- Lógica del componente --- -->
<script>

/* --- Exporta el componente --- */
export default {

  name: 'ConfirmationModal',

  /* --- Atributos que se le pasan al componente --- */
  props: {

    /* --- Si es visible o no --- */
    visible: {

      type: Boolean,
      default: false

    },

    /* --- Título del modal --- */
    title: {

      type: String,
      default: 'Confirm Action'

    },

    /* --- Mensaje del modal --- */
    message: {

      type: String,
      default: 'Are you sure you want to proceed?'

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
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  animation: fadeIn 0.3s ease;

}

/* --- Contenedor principal del modal --- */
.modal-container {

  background: #1a1a2e; /* Dark solid background */
  border: 1px solid rgba(139, 92, 246, 0.5);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  animation: slideUp 0.3s ease;
  display: flex;
  flex-direction: column;

}

/* --- Header --- */
.modal-header {

  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 12px 12px 0 0;

}

/* --- Título del modal --- */
.modal-title {

  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;

}

/* --- Botón de cerrar --- */
.close-btn {

  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;

}

.close-btn:hover {

  color: white;

}

/* --- Cuerpo del modal --- */
.modal-body {

  padding: 1.5rem;

}

.modal-message {

  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;

}

/* --- Footer --- */
.modal-footer {

  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0 0 12px 12px;

}

/* --- Botones --- */
.btn {

  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
  font-size: 0.95rem;

}

.btn-secondary {

  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);

}

.btn-secondary:hover {

  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: rgba(255, 255, 255, 0.4);

}

.btn-danger {

  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);

}

.btn-danger:hover {

  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);

}

/* --- Animación para el difuminado del fondo --- */
@keyframes fadeIn {

  from { opacity: 0; }

  to { opacity: 1; }

}

/* --- Animación para el movimiento del modal --- */
@keyframes slideUp {

  from { transform: translateY(20px); opacity: 0; }

  to { transform: translateY(0); opacity: 1; }

}

</style>